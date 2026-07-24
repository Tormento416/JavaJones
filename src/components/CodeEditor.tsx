import React, { useState } from 'react';
import type { Lesson } from '../types/game';
import { Play, RotateCcw, Lightbulb, Code } from 'lucide-react';

interface CodeEditorProps {
  lesson: Lesson;
  code: string;
  onChangeCode: (newCode: string) => void;
  onRunCode: () => void;
  onResetCode: () => void;
  isExecuting: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  lesson,
  code,
  onChangeCode,
  onRunCode,
  onResetCode,
  isExecuting,
}) => {
  const [showHint, setShowHint] = useState(false);

  const lines = code.split('\n');

  return (
    <div className="bg-stone-950 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full">
      {/* Editor Header / Toolbar */}
      <div className="bg-stone-900/90 border-b border-stone-800 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-xs text-stone-200 tracking-wide uppercase">
            {lesson.conceptName} • Editor
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Hint Toggle */}
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium flex items-center space-x-1 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
          </button>

          {/* Reset Code */}
          <button
            onClick={onResetCode}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
            title="Reset Starter Code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Run Code Button */}
          <button
            onClick={onRunCode}
            disabled={isExecuting}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-extrabold text-xs flex items-center space-x-1.5 shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isExecuting ? 'Brewing...' : 'Serve & Brew (Run)'}</span>
          </button>
        </div>
      </div>

      {/* Java Joe Hint Drawer */}
      {showHint && (
        <div className="bg-amber-950/40 border-b border-amber-800/40 p-3 px-4 text-xs text-amber-200 flex items-start space-x-2 animate-fade-in">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300">Solution Guide: </span>
            <span>{lesson.explanation}</span>
          </div>
        </div>
      )}

      {/* Code Textarea & Line Numbers */}
      <div className="relative flex-1 bg-stone-950 p-4 font-mono text-xs overflow-auto min-h-[220px]">
        <div className="flex">
          {/* Line Numbers */}
          <div className="select-none text-stone-600 text-right pr-4 border-r border-stone-800/60 leading-relaxed font-mono">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code Textarea */}
          <textarea
            value={code}
            onChange={(e) => onChangeCode(e.target.value)}
            spellCheck={false}
            className="w-full bg-transparent text-amber-100 focus:outline-none pl-4 resize-none leading-relaxed font-mono whitespace-pre min-h-[200px]"
            placeholder="// Type your JavaScript code here..."
          />
        </div>
      </div>
    </div>
  );
};
