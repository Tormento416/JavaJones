import React from 'react';
import type { GameState } from '../types/game';
import { FRANCHISE_LOCATIONS } from '../data/upgrades';
import { Volume2, VolumeX, ShoppingBag, BookOpen, MapPin, Coffee, DollarSign, RotateCcw } from 'lucide-react';

interface HeaderProps {
  gameState: GameState;
  onToggleSound: () => void;
  onOpenTab: (tab: 'barista' | 'codex' | 'upgrades' | 'franchise') => void;
  onResetGame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  gameState,
  onToggleSound,
  onOpenTab,
  onResetGame,
}) => {
  const currentStore = FRANCHISE_LOCATIONS.find((s) => s.id === gameState.currentStoreId) || FRANCHISE_LOCATIONS[0];
  const quotaMet = gameState.dayCustomersServed >= 3;

  return (
    <header className="bg-stone-900/90 border-b border-amber-900/40 backdrop-blur-md sticky top-0 z-40 px-4 py-3 shadow-xl text-stone-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Title & Store Location */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-black text-xl shadow-lg shadow-amber-600/30">
            ☕
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Java Jones: JavaScript Espresso Empire
            </h1>
            <div className="flex items-center space-x-2 text-xs text-amber-400/80 font-medium">
              <span>{currentStore.image} {currentStore.name}</span>
              <span>•</span>
              <span className="text-stone-400">Day {gameState.currentDay} of 28</span>
            </div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="flex items-center space-x-4 bg-stone-950/60 border border-stone-800/80 px-4 py-1.5 rounded-2xl">
          {/* Cash */}
          <div className="flex items-center space-x-1.5">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="font-mono font-bold text-emerald-400 text-base">
              ${gameState.cash.toFixed(2)}
            </span>
          </div>

          <div className="h-4 w-px bg-stone-800" />

          {/* Daily Quota Target */}
          <div className="flex items-center space-x-2">
            <Coffee className="w-4 h-4 text-amber-400" />
            <div className="text-xs">
              <span className="text-stone-400">Daily Target: </span>
              <span className={`font-mono font-bold ${quotaMet ? 'text-emerald-400' : 'text-amber-400'}`}>
                {gameState.dayCustomersServed} / 3 Served
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Barista Tab */}
          <button
            onClick={() => onOpenTab('barista')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              gameState.activeTab === 'barista'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <span>☕ Barista</span>
          </button>

          {/* Upgrades Shop */}
          <button
            onClick={() => onOpenTab('upgrades')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              gameState.activeTab === 'upgrades'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Upgrades</span>
          </button>

          {/* Codex */}
          <button
            onClick={() => onOpenTab('codex')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              gameState.activeTab === 'codex'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>JS Codex</span>
          </button>

          {/* Franchise Map */}
          <button
            onClick={() => onOpenTab('franchise')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              gameState.activeTab === 'franchise'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Franchise</span>
          </button>

          {/* Reset Progress */}
          <button
            onClick={onResetGame}
            className="p-2 rounded-xl bg-stone-800/60 hover:bg-stone-800 text-stone-400 hover:text-rose-400 transition-colors"
            title="Reset Game Progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl bg-stone-800/60 hover:bg-stone-800 text-stone-300 transition-colors"
            title={gameState.soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {gameState.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-500" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
