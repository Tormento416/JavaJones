import React, { useState } from 'react';
import { Play, Download, Monitor, Apple, ShieldCheck, Sparkles, BookOpen, Save, LogOut, Wifi, WifiOff } from 'lucide-react';

interface TitleScreenProps {
  onOpenSaveSlots: () => void;
  onOpenCodex: () => void;
  activeSaveName: string | null;
  onContinueGame: () => void;
  userEmail: string | null;
  isGuest: boolean;
  onSignOut: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onOpenSaveSlots,
  onOpenCodex,
  activeSaveName,
  onContinueGame,
  userEmail,
  isGuest,
  onSignOut,
}) => {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (platform: 'windows' | 'mac') => {
    setDownloading(platform);
    const link = document.createElement('a');
    if (platform === 'windows') {
      link.href = '/downloads/JavaJones-Windows.exe';
      link.download = 'JavaJones-Windows.exe';
    } else {
      link.href = '/downloads/JavaJones-Mac.dmg';
      link.download = 'JavaJones-Mac.dmg';
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloading(null), 1500);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-stone-900 bg-stone-950/80 backdrop-blur-md relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-stone-950 font-black text-xl shadow-lg shadow-amber-600/30">
            ☕
          </div>
          <div>
            <span className="font-black text-base tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              JAVA JONES
            </span>
            <span className="text-[10px] text-amber-500/80 block font-bold">JavaScript Espresso Empire</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Auth Status Badge */}
          {userEmail ? (
            <div className="flex items-center space-x-2">
              <span className="hidden sm:flex items-center space-x-1.5 text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2.5 py-1 rounded-full font-bold">
                <Wifi className="w-3 h-3" />
                <span className="max-w-[120px] truncate">{userEmail}</span>
              </span>
              <button
                onClick={onSignOut}
                className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-rose-950 border border-stone-800 hover:border-rose-800 text-xs font-bold text-stone-400 hover:text-rose-400 flex items-center space-x-1.5 transition-all"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : isGuest ? (
            <span className="flex items-center space-x-1.5 text-[10px] bg-stone-900 text-stone-500 border border-stone-800 px-2.5 py-1 rounded-full font-bold">
              <WifiOff className="w-3 h-3" />
              <span>Guest Mode</span>
            </span>
          ) : null}

          <button
            onClick={onOpenCodex}
            className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-bold text-amber-300 flex items-center space-x-1.5 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>24 JS Codex</span>
          </button>
        </div>
      </header>

      {/* Main Front Screen Center */}
      <main className="max-w-4xl mx-auto w-full px-6 py-12 flex flex-col items-center text-center space-y-8 relative z-10 my-auto">
        <div className="inline-flex items-center space-x-2 bg-amber-950/80 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>A 28-DAY JAVASCRIPT CODING & COFFEE SIMULATOR</span>
        </div>

        {/* Title Logo Banner */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-stone-100 drop-shadow-2xl">
            JAVA JONES:{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              ESPRESSO EMPIRE
            </span>
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Serve 3 customers a day, master 24 JavaScript core concepts, buy espresso machine upgrades, and expand to 5 store locations!
          </p>
        </div>

        {/* Arcade Menu Action Buttons */}
        <div className="w-full max-w-md space-y-3 pt-2">
          {activeSaveName ? (
            <button
              onClick={onContinueGame}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 active:scale-98 transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Continue Save: {activeSaveName}</span>
            </button>
          ) : null}

          <button
            onClick={onOpenSaveSlots}
            className="w-full py-4 rounded-2xl bg-stone-900 border-2 border-amber-500/50 hover:border-amber-400 text-stone-100 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl active:scale-98 transition-all"
          >
            <Save className="w-5 h-5 text-amber-400" />
            <span>{activeSaveName ? 'Select Save Slot / New Game' : 'Start New Game / Select Save File'}</span>
          </button>

          <button
            onClick={onOpenCodex}
            className="w-full py-3.5 rounded-2xl bg-stone-950 border border-stone-800 hover:border-stone-700 text-stone-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Browse 24 JavaScript Concepts</span>
          </button>
        </div>

        {/* Front Screen Desktop Application Download Bar */}
        <div className="w-full max-w-2xl bg-stone-900/90 border border-amber-500/40 p-5 rounded-3xl shadow-2xl space-y-3 text-left backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4 text-amber-400" />
              <h3 className="font-extrabold text-xs text-stone-100 uppercase tracking-wider">
                1-Click Desktop Application Download
              </h3>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Offline Executable App</span>
            </span>
          </div>

          <p className="text-[11px] text-stone-400">
            Download the standalone single executable for Windows (<code className="text-amber-300 font-mono">.exe</code>) or Mac (<code className="text-amber-300 font-mono">.dmg</code>). Double-click to launch immediately without CLI or web login!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Windows Download */}
            <button
              onClick={() => handleDownload('windows')}
              disabled={downloading === 'windows'}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-stone-950 font-black text-xs flex items-center justify-center space-x-2 shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              <Monitor className="w-4 h-4" />
              <span>{downloading === 'windows' ? 'Downloading...' : 'Download Windows (.exe)'}</span>
            </button>

            {/* Mac Download */}
            <button
              onClick={() => handleDownload('mac')}
              disabled={downloading === 'mac'}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs flex items-center justify-center space-x-2 shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              <Apple className="w-4 h-4" />
              <span>{downloading === 'mac' ? 'Downloading...' : 'Download Mac (.dmg)'}</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 border-t border-stone-900 bg-stone-950 text-center text-xs text-stone-500 relative z-10">
        <p>Java Jones: JavaScript Espresso Empire • Built for Learning JavaScript Foundations</p>
      </footer>
    </div>
  );
};
