import React from 'react';
import { RotateCcw } from 'lucide-react';

interface GameOverModalProps {
  isOpen: boolean;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen, onRestart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-rose-600/60 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-scale-up text-stone-100 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto text-3xl">
          📉
        </div>

        <div>
          <h2 className="text-2xl font-black text-rose-400">BANKRUPTCY ALERT!</h2>
          <p className="text-xs text-stone-300 mt-2 leading-relaxed">
            Repeated syntax errors ruined coffee recipes, resulting in refund fines and lost customers. Cash dropped below $0!
          </p>
        </div>

        <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 text-xs text-stone-400 space-y-1">
          <div className="font-bold text-amber-400">Java Joe Advice:</div>
          <p className="italic">
            "Don't worry Jones! Syntax errors happen to every master coder. Check your closing brackets, typos, and console logs, then try again!"
          </p>
        </div>

        <button
          onClick={onRestart}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl active:scale-98 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart Franchise Campaign</span>
        </button>
      </div>
    </div>
  );
};
