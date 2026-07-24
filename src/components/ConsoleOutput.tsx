import React from 'react';
import type { RunResult } from '../types/game';
import { Terminal, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface ConsoleOutputProps {
  runResult: RunResult | null;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({ runResult }) => {
  return (
    <div className="bg-stone-950 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full">
      {/* Header */}
      <div className="bg-stone-900/90 border-b border-stone-800 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-xs text-stone-200 tracking-wide uppercase">
            Console Output & Validation
          </span>
        </div>
        {runResult && (
          <span
            className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
              runResult.success
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}
          >
            {runResult.success ? 'ORDER SUCCESS ☕' : 'SYNTAX / RECIPE FAIL ❌'}
          </span>
        )}
      </div>

      <div className="p-4 space-y-4 font-mono text-xs overflow-auto flex-1 max-h-[300px]">
        {/* If no execution run yet */}
        {!runResult && (
          <div className="text-stone-500 italic py-6 text-center">
            Click "Serve & Brew (Run)" to execute your JavaScript code...
          </div>
        )}

        {/* Errors */}
        {runResult?.error && (
          <div className="bg-rose-950/60 border border-rose-800/60 p-3 rounded-2xl text-rose-300 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-rose-400">Execution Error:</div>
              <div className="whitespace-pre-wrap">{runResult.error}</div>
            </div>
          </div>
        )}

        {/* Console Logs */}
        {runResult && runResult.logs.length > 0 && (
          <div>
            <div className="text-[10px] text-stone-500 uppercase font-bold mb-1">
              Console Logs:
            </div>
            <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-2xl text-stone-200 space-y-1">
              {runResult.logs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-stone-600 select-none">&gt;</span>
                  <span className="text-amber-200 font-mono whitespace-pre-wrap">{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Test Suite Validation */}
        {runResult && runResult.testResults.length > 0 && (
          <div>
            <div className="text-[10px] text-stone-500 uppercase font-bold mb-1">
              Recipe Requirements Checklist:
            </div>
            <div className="space-y-1.5">
              {runResult.testResults.map((t, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-xl border flex items-center space-x-2 ${
                    t.passed
                      ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-800/40 text-rose-300'
                  }`}
                >
                  {t.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span>{t.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
