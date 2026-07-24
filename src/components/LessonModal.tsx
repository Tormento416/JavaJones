import React from 'react';
import type { Lesson } from '../types/game';
import { BookOpen, Play } from 'lucide-react';

interface LessonModalProps {
  lesson: Lesson;
  isOpen: boolean;
  onStartDay: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({ lesson, isOpen, onStartDay }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-scale-up text-stone-100">
        {/* Header Badge */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-stone-950 font-black text-2xl shadow-lg shadow-amber-600/30">
              ☕
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                DAY {lesson.day} • {lesson.conceptName}
              </span>
              <h2 className="text-xl font-black text-stone-100">{lesson.title}</h2>
            </div>
          </div>
          <div className="bg-stone-950 px-3 py-1 rounded-xl border border-stone-800 text-xs font-mono text-emerald-400 font-bold">
            +${lesson.rewardMoney} Profit
          </div>
        </div>

        {/* Story Dialogue */}
        <div className="bg-stone-950 border border-amber-900/40 p-4 rounded-2xl flex items-start space-x-3">
          <span className="text-3xl">🧔</span>
          <div>
            <div className="font-bold text-xs text-amber-400 mb-1">Java Joe Says:</div>
            <p className="text-xs text-stone-300 leading-relaxed italic">{lesson.story}</p>
          </div>
        </div>

        {/* Concept Theory Explanation */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Today's JavaScript Lesson:</span>
          </div>
          <div className="bg-stone-950 border border-stone-800 p-4 rounded-2xl text-xs text-stone-200 leading-relaxed">
            {lesson.explanation}
          </div>
        </div>

        {/* Customer Target Preview */}
        <div className="bg-amber-950/30 border border-amber-800/40 p-3 rounded-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{lesson.customer.avatar}</span>
            <div>
              <div className="font-bold text-xs text-amber-200">{lesson.customer.name}</div>
              <div className="text-[10px] text-stone-400">{lesson.customer.title}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-stone-400">Daily Target</div>
            <div className="text-xs font-mono font-bold text-amber-400">3 Customers / $150</div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStartDay}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 active:scale-98 transition-all"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Open Shop & Start Day {lesson.day}!</span>
        </button>
      </div>
    </div>
  );
};
