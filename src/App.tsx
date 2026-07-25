import React, { useState, useEffect, useCallback } from 'react';
import type { GameState, RunResult, Upgrade } from './types/game';
import { LESSONS } from './data/lessons';
import { INITIAL_UPGRADES } from './data/upgrades';
import { runJavaScript } from './utils/jsRunner';
import { soundEngine } from './utils/audio';

import { getStoredSession, getValidSession, signOut } from './utils/supabase';
import type { SupabaseSession } from './utils/supabase';
import { downloadSaveSlots, mergeSaveSlots, debouncedUpload } from './utils/saveSync';

import { AuthScreen } from './components/AuthScreen';
import { TitleScreen } from './components/TitleScreen';
import { SaveSlotModal } from './components/SaveSlotModal';
import type { SaveSlotData } from './components/SaveSlotModal';
import { Header } from './components/Header';
import { CafeVisualizer } from './components/CafeVisualizer';
import { CodeEditor } from './components/CodeEditor';
import { ConsoleOutput } from './components/ConsoleOutput';
import { LessonModal } from './components/LessonModal';
import { ShopUpgrades } from './components/ShopUpgrades';
import { CodexModal } from './components/CodexModal';
import { FranchiseMap } from './components/FranchiseMap';
import { DownloadModal } from './components/DownloadModal';
import { GameOverModal } from './components/GameOverModal';
import { VictoryModal } from './components/VictoryModal';

const SAVE_SLOTS_KEY = 'java_jones_save_slots_v2';
const ACTIVE_SLOT_KEY = 'java_jones_active_slot_id_v2';

const DEFAULT_SAVE_SLOTS: SaveSlotData[] = [
  { id: 'slot_1', slotNumber: 1, baristaName: 'Java Jones', avatar: '🧑‍🍳', gameState: null, lastSavedAt: null },
  { id: 'slot_2', slotNumber: 2, baristaName: 'Java Jones', avatar: '👩‍💻', gameState: null, lastSavedAt: null },
  { id: 'slot_3', slotNumber: 3, baristaName: 'Java Jones', avatar: '🧔‍♂️', gameState: null, lastSavedAt: null },
];

const createDefaultGameState = (): GameState => ({
  currentDay: 1,
  cash: 150,
  totalCustomersServed: 0,
  dayCustomersServed: 0,
  currentStoreId: 'store_1',
  purchasedUpgrades: [],
  completedDays: [],
  soundEnabled: true,
  gameStatus: 'playing',
  activeTab: 'barista',
});

export const App: React.FC = () => {
  // ── Auth State ───────────────────────────────────────────
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // ── View State: title → game | auth ──────────────────────
  const [currentView, setCurrentView] = useState<'auth' | 'title' | 'game'>('title');
  const [isSaveSlotModalOpen, setIsSaveSlotModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);

  // ── Save Slots ───────────────────────────────────────────
  const [saveSlots, setSaveSlots] = useState<SaveSlotData[]>(() => {
    try {
      const saved = localStorage.getItem(SAVE_SLOTS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [...DEFAULT_SAVE_SLOTS];
  });

  const [activeSlotId, setActiveSlotId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(ACTIVE_SLOT_KEY);
    } catch {
      return null;
    }
  });

  // ── Game State ───────────────────────────────────────────
  const [gameState, setGameState] = useState<GameState>(createDefaultGameState());
  const [upgrades] = useState<Upgrade[]>(INITIAL_UPGRADES);
  const [code, setCode] = useState<string>('');
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [isBrewing, setIsBrewing] = useState<boolean>(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState<boolean>(false);

  const currentLesson = LESSONS.find((l) => l.day === gameState.currentDay) || LESSONS[0];

  // ── Check for existing session on mount ──────────────────
  useEffect(() => {
    const checkSession = async () => {
      const stored = getStoredSession();
      if (stored) {
        // Validate / refresh the stored session
        const valid = await getValidSession();
        if (valid) {
          setSession(valid);
          setIsGuest(false);

          // Sync cloud saves on login
          try {
            const cloudSlots = await downloadSaveSlots(valid);
            if (cloudSlots && cloudSlots.length > 0) {
              setSaveSlots((local) => {
                const merged = mergeSaveSlots(local, cloudSlots);
                localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(merged));
                return merged;
              });
            }
          } catch {
            // cloud sync failed — continue with local
          }
        } else {
          setIsGuest(true);
        }
      } else {
        setIsGuest(true);
      }
      setAuthChecked(true);
      // Title screen remains active (always first)
    };
    checkSession();
  }, []);

  // ── Set starter code when day changes ────────────────────
  useEffect(() => {
    setCode(currentLesson.starterCode);
    setRunResult(null);
    if (currentView === 'game') {
      setIsLessonModalOpen(true);
    }
  }, [gameState.currentDay, currentView]);

  // ── Persist save slots to localStorage ───────────────────
  useEffect(() => {
    try {
      localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(saveSlots));
    } catch {
      // ignore
    }
  }, [saveSlots]);

  // ── Persist active slot ID ───────────────────────────────
  useEffect(() => {
    if (activeSlotId) {
      try {
        localStorage.setItem(ACTIVE_SLOT_KEY, activeSlotId);
      } catch {
        // ignore
      }
    }
  }, [activeSlotId]);

  // ── Sync active game state back into its save slot ───────
  useEffect(() => {
    if (activeSlotId) {
      setSaveSlots((prev) =>
        prev.map((slot) =>
          slot.id === activeSlotId
            ? {
                ...slot,
                gameState,
                lastSavedAt: new Date().toISOString(),
              }
            : slot
        )
      );
    }
  }, [gameState, activeSlotId]);

  // ── Cloud sync: upload save slots when they change ───────
  useEffect(() => {
    if (session && !isGuest) {
      debouncedUpload(session, saveSlots);
    }
  }, [saveSlots, session, isGuest]);

  // ── Sound sync ───────────────────────────────────────────
  useEffect(() => {
    soundEngine.setEnabled(gameState.soundEnabled);
  }, [gameState.soundEnabled]);

  // ── Auth Handlers ────────────────────────────────────────
  const handleAuthenticated = useCallback(async (newSession: SupabaseSession) => {
    setSession(newSession);
    setIsGuest(false);
    setCurrentView('title');

    // Pull cloud saves on sign-in
    try {
      const cloudSlots = await downloadSaveSlots(newSession);
      if (cloudSlots && cloudSlots.length > 0) {
        setSaveSlots((local) => {
          const merged = mergeSaveSlots(local, cloudSlots);
          localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(merged));
          return merged;
        });
      }
    } catch {
      // continue with local
    }
  }, []);

  const handleContinueAsGuest = useCallback(() => {
    setIsGuest(true);
    setSession(null);
    setCurrentView('title');
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOut();
    setSession(null);
    setIsGuest(false);
    setCurrentView('auth');
  }, []);

  // ── Save Slot Handlers ──────────────────────────────────
  const handleSelectSlot = (slotId: string, customBaristaName?: string) => {
    const targetSlot = saveSlots.find((s) => s.id === slotId);
    if (!targetSlot) return;

    setActiveSlotId(slotId);

    if (!targetSlot.gameState) {
      // Create new save file
      const newGameState = createDefaultGameState();
      const updatedSlots = saveSlots.map((s) =>
        s.id === slotId
          ? {
              ...s,
              baristaName: customBaristaName || 'Java Jones',
              gameState: newGameState,
              lastSavedAt: new Date().toISOString(),
            }
          : s
      );
      setSaveSlots(updatedSlots);
      setGameState(newGameState);
    } else {
      // Load existing save file
      setGameState(targetSlot.gameState);
    }

    setIsSaveSlotModalOpen(false);
    setCurrentView('game');
    setIsLessonModalOpen(true);
  };

  const handleDeleteSlot = (slotId: string) => {
    setSaveSlots((prev) =>
      prev.map((s) =>
        s.id === slotId ? { ...s, gameState: null, lastSavedAt: null } : s
      )
    );
    if (activeSlotId === slotId) {
      setActiveSlotId(null);
    }
  };

  // ── Gameplay Handlers ───────────────────────────────────
  const calculateIncomeBonusMultiplier = () => {
    let totalBonus = 1.0;
    upgrades.forEach((u) => {
      if (gameState.purchasedUpgrades.includes(u.id)) {
        totalBonus += u.incomeBonusPercent / 100;
      }
    });
    return totalBonus;
  };

  const handleRunCode = () => {
    setIsBrewing(true);
    soundEngine.playBrew();

    setTimeout(() => {
      const res = runJavaScript(code, currentLesson.testCases);
      setRunResult(res);
      setIsBrewing(false);

      if (res.success) {
        soundEngine.playSuccess();

        const bonus = calculateIncomeBonusMultiplier();
        const earned = Math.round(currentLesson.rewardMoney * currentLesson.customer.tipMultiplier * bonus);

        soundEngine.playCash();

        const nextServedInDay = gameState.dayCustomersServed + 1;
        const nextTotalServed = gameState.totalCustomersServed + 1;
        const nextCash = gameState.cash + earned;

        if (nextServedInDay >= 3) {
          const nextDay = gameState.currentDay + 1;
          const completed = Array.from(new Set([...gameState.completedDays, gameState.currentDay]));

          if (gameState.currentDay >= 28) {
            soundEngine.playFanfare();
            setGameState((prev) => ({
              ...prev,
              cash: nextCash,
              dayCustomersServed: nextServedInDay,
              totalCustomersServed: nextTotalServed,
              completedDays: completed,
              gameStatus: 'game_victory',
            }));
          } else {
            setGameState((prev) => ({
              ...prev,
              cash: nextCash,
              currentDay: nextDay,
              dayCustomersServed: 0,
              totalCustomersServed: nextTotalServed,
              completedDays: completed,
            }));
          }
        } else {
          setGameState((prev) => ({
            ...prev,
            cash: nextCash,
            dayCustomersServed: nextServedInDay,
            totalCustomersServed: nextTotalServed,
          }));
        }
      } else {
        soundEngine.playError();
        const fine = 15;
        const newCash = gameState.cash - fine;

        if (newCash < 0) {
          setGameState((prev) => ({
            ...prev,
            cash: newCash,
            gameStatus: 'bankrupt',
          }));
        } else {
          setGameState((prev) => ({
            ...prev,
            cash: newCash,
          }));
        }
      }
    }, 600);
  };

  const handleResetCode = () => {
    setCode(currentLesson.starterCode);
    setRunResult(null);
    soundEngine.playClick();
  };

  const handleToggleSound = () => {
    setGameState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleOpenTab = (tab: 'barista' | 'codex' | 'upgrades' | 'franchise') => {
    soundEngine.playClick();
    setGameState((prev) => ({ ...prev, activeTab: tab }));
  };

  const handleBuyUpgrade = (upgradeId: string) => {
    const upg = upgrades.find((u) => u.id === upgradeId);
    if (!upg || gameState.cash < upg.cost) return;

    soundEngine.playCash();
    setGameState((prev) => ({
      ...prev,
      cash: prev.cash - upg.cost,
      purchasedUpgrades: [...prev.purchasedUpgrades, upgradeId],
    }));
  };

  const handleSelectStore = (storeId: string) => {
    soundEngine.playClick();
    setGameState((prev) => ({
      ...prev,
      currentStoreId: storeId,
      activeTab: 'barista',
    }));
  };

  const handleResetCurrentGame = () => {
    const defaultState = createDefaultGameState();
    setGameState(defaultState);
    setIsLessonModalOpen(true);
  };

  const activeSlot = saveSlots.find((s) => s.id === activeSlotId && s.gameState);

  // ── Loading splash while checking session ────────────────
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-2xl mx-auto animate-pulse shadow-xl shadow-amber-600/20">
            ☕
          </div>
          <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Loading Java Jones...</p>
        </div>
      </div>
    );
  }

  // ── Auth Screen ──────────────────────────────────────────
  if (currentView === 'auth') {
    return (
      <AuthScreen
        onAuthenticated={handleAuthenticated}
        onContinueAsGuest={handleContinueAsGuest}
      />
    );
  }

  // ── Title Screen ─────────────────────────────────────────
  if (currentView === 'title') {
    return (
      <>
        <TitleScreen
          onOpenSaveSlots={() => setIsSaveSlotModalOpen(true)}
          onOpenCodex={() => {
            setCurrentView('game');
            setGameState((prev) => ({ ...prev, activeTab: 'codex' }));
          }}
          activeSaveName={activeSlot ? activeSlot.baristaName : null}
          onContinueGame={() => setCurrentView('game')}
          userEmail={session?.user.email ?? null}
          isGuest={isGuest}
          onSignOut={handleSignOut}
          onOpenAuth={() => setCurrentView('auth')}
        />

        <SaveSlotModal
          isOpen={isSaveSlotModalOpen}
          onClose={() => setIsSaveSlotModalOpen(false)}
          saveSlots={saveSlots}
          onSelectSlot={handleSelectSlot}
          onDeleteSlot={handleDeleteSlot}
        />
      </>
    );
  }

  // ── Main Coffee Shop Gameplay ────────────────────────────
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950 flex flex-col">
      {/* Header */}
      <Header
        gameState={gameState}
        onToggleSound={handleToggleSound}
        onOpenTab={handleOpenTab}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
        onResetGame={handleResetCurrentGame}
        onGoToLanding={() => setCurrentView('title')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* Barista View (Main Gameplay) */}
        {gameState.activeTab === 'barista' && (
          <div className="space-y-6 animate-fade-in">
            {/* Visualizer Stage */}
            <CafeVisualizer
              lesson={currentLesson}
              isBrewing={isBrewing}
              dayCustomersServed={gameState.dayCustomersServed}
            />

            {/* Split Code Editor & Console Output Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[380px]">
              <CodeEditor
                lesson={currentLesson}
                code={code}
                onChangeCode={setCode}
                onRunCode={handleRunCode}
                onResetCode={handleResetCode}
                isExecuting={isBrewing}
              />

              <ConsoleOutput runResult={runResult} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-900 bg-stone-950 py-4 px-6 text-center text-xs text-stone-500">
        <p>Java Jones: JavaScript Espresso Empire • Built for Learning JavaScript Foundations</p>
      </footer>

      {/* Modals */}
      <LessonModal
        lesson={currentLesson}
        isOpen={isLessonModalOpen && gameState.gameStatus === 'playing'}
        onStartDay={() => setIsLessonModalOpen(false)}
        onClose={() => {
          setIsLessonModalOpen(false);
          setCurrentView('title');
        }}
      />

      <ShopUpgrades
        isOpen={gameState.activeTab === 'upgrades'}
        onClose={() => handleOpenTab('barista')}
        upgrades={upgrades}
        gameState={gameState}
        onBuyUpgrade={handleBuyUpgrade}
      />

      <CodexModal
        isOpen={gameState.activeTab === 'codex'}
        onClose={() => handleOpenTab('barista')}
      />

      <FranchiseMap
        isOpen={gameState.activeTab === 'franchise'}
        onClose={() => handleOpenTab('barista')}
        gameState={gameState}
        onSelectStore={handleSelectStore}
      />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      <SaveSlotModal
        isOpen={isSaveSlotModalOpen}
        onClose={() => setIsSaveSlotModalOpen(false)}
        saveSlots={saveSlots}
        onSelectSlot={handleSelectSlot}
        onDeleteSlot={handleDeleteSlot}
      />

      <GameOverModal
        isOpen={gameState.gameStatus === 'bankrupt'}
        onRestart={handleResetCurrentGame}
      />

      <VictoryModal
        isOpen={gameState.gameStatus === 'game_victory'}
        onRestart={handleResetCurrentGame}
      />
    </div>
  );
};

export default App;
