import type { RunResult } from '../types/game';

export function runJavaScript(
  code: string,
  testCases: { description: string; validate: (logs: string[], result: any, windowScope?: any) => boolean }[]
): RunResult {
  const logs: string[] = [];
  let result: any = undefined;
  let errorMsg: string | null = null;

  // Custom console object to capture log output
  const customConsole = {
    log: (...args: any[]) => {
      const formatted = args
        .map((arg) => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        })
        .join(' ');
      logs.push(formatted);
    },
    error: (...args: any[]) => {
      logs.push(`[ERROR] ${args.join(' ')}`);
    },
    warn: (...args: any[]) => {
      logs.push(`[WARN] ${args.join(' ')}`);
    },
    info: (...args: any[]) => {
      logs.push(`[INFO] ${args.join(' ')}`);
    },
  };

  try {
    // Basic syntax check first
    new Function(code);

    // Create execution scope with mocked DOM / console if needed
    const scopeWindow: Record<string, any> = {};

    // Wrap execution to capture return value and console output
    const executor = new Function('console', 'window', 'document', 'localStorage', `
      "use strict";
      ${code}
    `);

    // Mock minimal localStorage for lessons that test storage
    const mockStorage: Record<string, string> = {};
    const customLocalStorage = {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, val: string) => { mockStorage[key] = String(val); },
      removeItem: (key: string) => { delete mockStorage[key]; },
      clear: () => { for (const k in mockStorage) delete mockStorage[k]; },
    };

    // Execute user code
    result = executor(customConsole, scopeWindow, undefined, customLocalStorage);

  } catch (err: any) {
    if (err instanceof SyntaxError) {
      errorMsg = `Syntax Error: ${err.message}`;
    } else {
      errorMsg = `${err.name || 'Runtime Error'}: ${err.message}`;
    }
  }

  // Evaluate test cases
  const testsPassed: boolean[] = [];
  const testResults: { description: string; passed: boolean }[] = [];

  if (errorMsg) {
    // If syntax/runtime error occurred, all tests fail
    testCases.forEach((tc) => {
      testsPassed.push(false);
      testResults.push({ description: tc.description, passed: false });
    });
  } else {
    testCases.forEach((tc) => {
      let passed = false;
      try {
        passed = tc.validate(logs, result);
      } catch {
        passed = false;
      }
      testsPassed.push(passed);
      testResults.push({ description: tc.description, passed });
    });
  }

  const allPassed = !errorMsg && testResults.length > 0 && testResults.every((t) => t.passed);

  return {
    success: allPassed,
    logs,
    result,
    error: errorMsg,
    testsPassed,
    testResults,
  };
}
