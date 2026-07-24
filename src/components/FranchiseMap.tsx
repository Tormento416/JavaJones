import React from 'react';
import { FRANCHISE_LOCATIONS } from '../data/upgrades';
import type { GameState } from '../types/game';
import { MapPin, Lock, CheckCircle2, DollarSign, Calendar, X } from 'lucide-react';

interface FranchiseMapProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
  onSelectStore: (storeId: string) => void;
}

export const FranchiseMap: React.FC<FranchiseMapProps> = ({
  isOpen,
  onClose,
  gameState,
  onSelectStore,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-6 animate-scale-up text-stone-100 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-100">Java Joe's Franchise Map</h2>
              <p className="text-xs text-stone-400">Unlock 5 coffee locations across the city over 28 days!</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map Locations Grid */}
        <div className="space-y-4 overflow-auto p-1 flex-1">
          {FRANCHISE_LOCATIONS.map((loc) => {
            const isUnlocked =
              gameState.currentDay >= loc.requiredDay && gameState.cash >= loc.requiredCash;
            const isCurrent = gameState.currentStoreId === loc.id;

            return (
              <div
                key={loc.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-amber-950/40 border-amber-500 shadow-xl'
                    : isUnlocked
                    ? 'bg-stone-950 border-stone-800 hover:border-amber-500/50'
                    : 'bg-stone-950/40 border-stone-800/60 opacity-60'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl p-2 bg-stone-900 border border-stone-800 rounded-2xl shrink-0">
                    {loc.image}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-extrabold text-base text-stone-100">{loc.name}</h3>
                      {isCurrent && (
                        <span className="bg-amber-500 text-stone-950 font-black text-[10px] uppercase px-2 py-0.5 rounded-full">
                          Active Store
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 max-w-md">{loc.description}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 w-full md:w-auto">
                  {/* Lock requirements */}
                  <div className="flex items-center space-x-3 text-xs mb-2">
                    <span className="flex items-center space-x-1 text-stone-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Day {loc.requiredDay}+</span>
                    </span>
                    <span className="flex items-center space-x-1 font-mono text-emerald-400">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>${loc.requiredCash}</span>
                    </span>
                  </div>

                  {/* Unlock / Select Button */}
                  {isUnlocked ? (
                    <button
                      onClick={() => onSelectStore(loc.id)}
                      disabled={isCurrent}
                      className={`px-4 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 transition-all ${
                        isCurrent
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 cursor-default'
                          : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 active:scale-95 shadow-md'
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Currently Managing</span>
                        </>
                      ) : (
                        <span>Manage Store</span>
                      )}
                    </button>
                  ) : (
                    <div className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-500 text-xs font-bold flex items-center space-x-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked (Day {loc.requiredDay} / ${loc.requiredCash})</span>
                    </div>
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
