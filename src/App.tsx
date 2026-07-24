import React, { useState, useEffect } from 'react';
import type { GameState, RunResult, Upgrade } from './types/game';
import { LESSONS } from './data/lessons';
import { INITIAL_UPGRADES } from './data/upgrades';
import { runJavaScript } from './utils/jsRunner';
import { soundEngine } from './utils/audio';

import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { CafeVisualizer } from './components/CafeVisualizer';
import { CodeEditor } from './components/CodeEditor';
import { ConsoleOutput } from './components/ConsoleOutput';
import { LessonModal } from './components/LessonModal';
import { ShopUpgrades } from './components/ShopUpgrades';
import { CodexModal } from './components/CodexModal';
import { FranchiseMap } from './components/FranchiseMap';
import { DownloadModal } from './components/DownloadModal';
import { AccountModal } from './components/AccountModal';
import { GameOverModal } from './components/GameOverModal';
import { VictoryModal } from './components/VictoryModal';

const STORAGE_KEY = 'java_jones_game_state_v1';
const PROFILE_KEY = 'java_jones_user_profile_v1';

export const App: React.FC = () => {
  // Page view state: default to 'landing'
  const [currentView, setCurrentView] = useState<'landing' | 'game'>('landing');

  // User Barista Account Profile
  const [userProfile, setUserProfile] = useState<{ name: string; title: string; avatar: string } | null>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return null;
  });

  // Game state
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    return {
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
    };
  });

  const [upgrades] = useState<Upgrade[]>(INITIAL_UPGRADES);
  const [code, setCode] = useState<string>('');
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [isBrewing, setIsBrewing] = useState<boolean>(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState<boolean>(true);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false);

  const currentLesson = LESSONS.find((l) => l.day === gameState.currentDay) || LESSONS[0];

  // Set starter code when day changes
  useEffect(() => {
    setCode(currentLesson.starterCode);
    setRunResult(null);
    setIsLessonModalOpen(true);
  }, [gameState.currentDay]);

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (e) {
      // ignore
    }
  }, [gameState]);

  // Persist profile
  useEffect(() => {
    if (userProfile) {
      try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(userProfile));
      } catch (e) {
        // ignore
      }
    }
  }, [userProfile]);

  // Sound sync
  useEffect(() => {
    soundEngine.setEnabled(gameState.soundEnabled);
  }, [gameState.soundEnabled]);

  // Calculate tip multiplier based on purchased upgrades
  const calculateIncomeBonusMultiplier = () => {
    let totalBonus = 1.0;
    upgrades.forEach((u) => {
      if (gameState.purchasedUpgrades.includes(u.id)) {
        totalBonus += u.incomeBonusPercent / 100;
      }
    });
    return totalBonus;
  };

  // Run Code / Serve Customer handler
  const handleRunCode = () => {
    setIsBrewing(true);
    soundEngine.playBrew();

    setTimeout(() => {
      const res = runJavaScript(code, currentLesson.testCases);
      setRunResult(res);
      setIsBrewing(false);

      if (res.success) {
        // Customer satisfied!
        soundEngine.playSuccess();

        const bonus = calculateIncomeBonusMultiplier();
        const earned = Math.round(currentLesson.rewardMoney * currentLesson.customer.tipMultiplier * bonus);

        soundEngine.playCash();

        const nextServedInDay = gameState.dayCustomersServed + 1;
        const nextTotalServed = gameState.totalCustomersServed + 1;
        const nextCash = gameState.cash + earned;

        if (nextServedInDay >= 3) {
          // Quota of 3 customers reached for today!
          const nextDay = gameState.currentDay + 1;
          const completed = Array.from(new Set([...gameState.completedDays, gameState.currentDay]));

          if (gameState.currentDay >= 28) {
            // Victory!
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
            // Advance to next day
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
          // Stay on current day, increment served count
          setGameState((prev) => ({
            ...prev,
            cash: nextCash,
            dayCustomersServed: nextServedInDay,
            totalCustomersServed: nextTotalServed,
          }));
        }
      } else {
        // Syntax Error or Test Fail! Refund penalty fine
        soundEngine.playError();
        const fine = 15;
        const newCash = gameState.cash - fine;

        if (newCash < 0) {
          // Bankrupt!
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

  const handleResetGame = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGameState({
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
    setIsLessonModalOpen(true);
  };

  const handleSaveAccount = (name: string, title: string, avatar: string) => {
    setUserProfile({ name, title, avatar });
  };

  // If on landing page
  if (currentView === 'landing') {
    return (
      <>
        <LandingPage
          onStartGame={() => setCurrentView('game')}
          onOpenAccount={() => setIsAccountModalOpen(true)}
          onOpenCodex={() => {
            setCurrentView('game');
            setGameState((prev) => ({ ...prev, activeTab: 'codex' }));
          }}
          userProfileName={userProfile ? userProfile.name : null}
        />

        <AccountModal
          isOpen={isAccountModalOpen}
          onClose={() => setIsAccountModalOpen(false)}
          currentName={userProfile ? userProfile.name : null}
          onSaveAccount={handleSaveAccount}
        />
      </>
    );
  }

  // Main Game View
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950 flex flex-col">
      {/* Header */}
      <Header
        gameState={gameState}
        onToggleSound={handleToggleSound}
        onOpenTab={handleOpenTab}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
        onResetGame={handleResetGame}
        onGoToLanding={() => setCurrentView('landing')}
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

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        currentName={userProfile ? userProfile.name : null}
        onSaveAccount={handleSaveAccount}
      />

      <GameOverModal
        isOpen={gameState.gameStatus === 'bankrupt'}
        onRestart={handleResetGame}
      />

      <VictoryModal
        isOpen={gameState.gameStatus === 'game_victory'}
        onRestart={handleResetGame}
      />
    </div>
  );
};

export default App;
