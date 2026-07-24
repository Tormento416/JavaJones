import React, { useState } from 'react';
import type { GameState } from '../types/game';
import { Save, Play, Trash2, Plus, X, Calendar, DollarSign, Coffee } from 'lucide-react';

export interface SaveSlotData {
  id: string; // 'slot_1', 'slot_2', 'slot_3'
  slotNumber: number;
  baristaName: string;
  avatar: string;
  gameState: GameState | null;
  lastSavedAt: string | null;
}

interface SaveSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  saveSlots: SaveSlotData[];
  onSelectSlot: (slotId: string, baristaName?: string) => void;
  onDeleteSlot: (slotId: string) => void;
}

export const SaveSlotModal: React.FC<SaveSlotModalProps> = ({
  isOpen,
  onClose,
  saveSlots,
  onSelectSlot,
  onDeleteSlot,
}) => {
  const [newGameSlotId, setNewGameSlotId] = useState<string | null>(null);
  const [baristaNameInput, setBaristaNameInput] = useState('Java Jones');

  if (!isOpen) return null;

  const handleStartNewGame = (slotId: string) => {
    onSelectSlot(slotId, baristaNameInput.trim() || 'Java Jones');
    setNewGameSlotId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-500/50 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 animate-scale-up text-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Save className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-100">Select Game Save File</h2>
              <p className="text-xs text-stone-400">Choose a save slot to track your 28-day coffee empire progress</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Save Slots List */}
        <div className="space-y-4">
          {saveSlots.map((slot) => {
            const isEmpty = !slot.gameState;

            return (
              <div
                key={slot.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isEmpty
                    ? 'bg-stone-950/60 border-stone-800/80 hover:border-amber-500/40'
                    : 'bg-stone-950 border-amber-500/40 hover:border-amber-500 shadow-xl'
                }`}
              >
                {/* Slot Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-2xl shrink-0">
                    {slot.avatar || '☕'}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold uppercase text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-md">
                        SLOT {slot.slotNumber}
                      </span>
                      <h3 className="font-extrabold text-base text-stone-100">
                        {isEmpty ? 'Empty Save File' : slot.baristaName}
                      </h3>
                    </div>

                    {!isEmpty && slot.gameState ? (
                      <div className="flex items-center space-x-3 text-xs text-stone-400 mt-1">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>Day {slot.gameState.currentDay} / 28</span>
                        </span>
                        <span className="flex items-center space-x-1 font-mono text-emerald-400">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>${slot.gameState.cash.toFixed(2)}</span>
                        </span>
                        <span className="flex items-center space-x-1 text-stone-400">
                          <Coffee className="w-3.5 h-3.5 text-amber-400" />
                          <span>{slot.gameState.totalCustomersServed} Served</span>
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-stone-500 mt-1">Click to create a new campaign save slot</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  {isEmpty ? (
                    newGameSlotId === slot.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={baristaNameInput}
                          onChange={(e) => setBaristaNameInput(e.target.value)}
                          placeholder="Barista Name"
                          className="bg-stone-900 border border-amber-500/60 rounded-xl px-3 py-1.5 text-xs text-stone-100 focus:outline-none w-32"
                        />
                        <button
                          onClick={() => handleStartNewGame(slot.id)}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-stone-950 font-black text-xs"
                        >
                          Create
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setNewGameSlotId(slot.id)}
                        className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center space-x-1.5 transition-all"
                      >
                        <Plus className="w-4 h-4 text-amber-400" />
                        <span>New Game</span>
                      </button>
                    )
                  ) : (
                    <>
                      <button
                        onClick={() => onSelectSlot(slot.id)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs flex items-center space-x-1.5 shadow-md active:scale-95 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Load Save File</span>
                      </button>

                      <button
                        onClick={() => onDeleteSlot(slot.id)}
                        className="p-2 rounded-xl bg-stone-900 hover:bg-rose-950 text-stone-500 hover:text-rose-400 border border-stone-800 transition-colors"
                        title="Delete Save File"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
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
