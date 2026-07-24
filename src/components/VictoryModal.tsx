import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RefreshCw } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  onRestart: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({ isOpen, onRestart }) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-400/60 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 animate-scale-up text-stone-100 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 text-stone-950 flex items-center justify-center mx-auto text-4xl shadow-xl shadow-amber-500/30 animate-bounce">
          👑
        </div>

        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            28-DAY CAMPAIGN COMPLETE!
          </span>
          <h2 className="text-2xl font-black text-amber-300 mt-1">
            JAVASCRIPT MASTER CERTIFICATION
          </h2>
          <p className="text-xs text-stone-300 mt-2 leading-relaxed">
            You mastered all 24 core JavaScript concepts, served thousands of customers, and built Java Joe's 5-store coffee franchise empire across the metropolis!
          </p>
        </div>

        <div className="bg-stone-950 p-4 rounded-2xl border border-amber-500/30 text-xs text-amber-200 space-y-2">
          <div className="flex items-center justify-center space-x-1.5 font-bold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>Official Certification Awarded to Java Jones</span>
          </div>
          <p className="text-stone-300 italic text-[11px]">
            "Java Jones has proven complete mastery over Variables, Functions, Closures, Async/Await, Prototypes, Modules, ES6+, and Architecture!"
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <button
            onClick={onRestart}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 active:scale-98 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Play Again / Free Sandbox Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};
