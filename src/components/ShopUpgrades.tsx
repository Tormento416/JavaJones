import React from 'react';
import type { Upgrade, GameState } from '../types/game';
import { ShoppingBag, Check, X } from 'lucide-react';

interface ShopUpgradesProps {
  isOpen: boolean;
  onClose: () => void;
  upgrades: Upgrade[];
  gameState: GameState;
  onBuyUpgrade: (upgradeId: string) => void;
}

export const ShopUpgrades: React.FC<ShopUpgradesProps> = ({
  isOpen,
  onClose,
  upgrades,
  gameState,
  onBuyUpgrade,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-6 animate-scale-up text-stone-100 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-100">Java Joe's Equipment Shop</h2>
              <p className="text-xs text-stone-400">Upgrade machines & beans to boost customer tips!</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800 text-sm font-mono font-bold text-emerald-400">
              ${gameState.cash.toFixed(2)} Cash
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Upgrades List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto p-1 flex-1">
          {upgrades.map((upgrade) => {
            const isOwned = gameState.purchasedUpgrades.includes(upgrade.id);
            const canAfford = gameState.cash >= upgrade.cost;

            return (
              <div
                key={upgrade.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isOwned
                    ? 'bg-stone-950/60 border-emerald-800/40 opacity-90'
                    : canAfford
                    ? 'bg-stone-950 border-amber-500/30 hover:border-amber-500/60 shadow-lg'
                    : 'bg-stone-950/40 border-stone-800/60 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">☕</span>
                      <h3 className="font-bold text-sm text-stone-100">{upgrade.name}</h3>
                    </div>
                    <span className="text-xs font-mono font-extrabold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-lg border border-amber-800/40">
                      +{upgrade.incomeBonusPercent}% Tips
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mb-4">{upgrade.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-800/60">
                  <span className="font-mono font-bold text-sm text-emerald-400">
                    ${upgrade.cost}
                  </span>

                  {isOwned ? (
                    <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Owned</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => onBuyUpgrade(upgrade.id)}
                      disabled={!canAfford}
                      className={`px-4 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 shadow-md transition-all ${
                        canAfford
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 active:scale-95'
                          : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      <span>Buy Equipment</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
