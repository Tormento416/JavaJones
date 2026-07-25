import React, { useState } from 'react';
import { Play, Download, Monitor, Apple, ShieldCheck, Sparkles, BookOpen, UserPlus } from 'lucide-react';

interface LandingPageProps {
  onStartGame: () => void;
  onOpenAccount: () => void;
  onOpenCodex: () => void;
  userProfileName: string | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartGame,
  onOpenAccount,
  onOpenCodex,
  userProfileName,
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
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col selection:bg-amber-500 selection:text-stone-950">
      {/* Landing Page Navbar */}
      <nav className="bg-stone-900/90 border-b border-amber-900/40 backdrop-blur-md sticky top-0 z-40 px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <a
              href="https://tormento-learning-games.vercel.app/"
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-bold transition-colors flex items-center space-x-1 border border-amber-900/50"
              title="Return Home to Games Portal"
            >
              <span>&lt; Return Home</span>
            </a>

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-stone-950 font-black text-xl shadow-lg shadow-amber-600/30">
              ☕
            </div>
            <div>
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                JAVA JONES
              </span>
              <span className="text-xs text-amber-500/80 block font-bold">JavaScript Espresso Empire</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenCodex}
              className="text-xs font-semibold text-stone-300 hover:text-amber-300 flex items-center space-x-1.5 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>24 JS Concepts</span>
            </button>

            <button
              onClick={onOpenAccount}
              className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center space-x-1.5 transition-all border border-stone-700"
            >
              {userProfileName ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Account: {userProfileName}</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Create Account / Login</span>
                </>
              )}
            </button>

            <button
              onClick={onStartGame}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Enter Coffee Shop</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-amber-950/80 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>LEARN JAVASCRIPT WHILE RUNNING A COFFEE EMPIRE • 28-DAY CAMPAIGN</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-stone-100">
            Master JavaScript Foundations & Build Java Joe's{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Coffee Empire
            </span>
          </h1>

          <p className="text-stone-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            You are <strong>Java Jones</strong>! Over the next 28 days, serve 3 customers a day, solve real JavaScript code recipes, avoid syntax failure bankruptcy, buy espresso machine upgrades, and expand to 5 store locations!
          </p>

          {/* Dedicated Download Bar Banner */}
          <div className="bg-stone-900/90 border-2 border-amber-500/50 p-6 rounded-3xl shadow-2xl max-w-3xl mx-auto space-y-4 text-left backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-2">
                <Download className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-sm text-stone-100 uppercase tracking-wider">
                  Download Standalone 1-Click Desktop App
                </h3>
              </div>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full font-bold flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>No Installation / No CLI Required</span>
              </span>
            </div>

            <p className="text-xs text-stone-300">
              Download the single executable application bundle for Windows (<code className="text-amber-300">.exe</code>) or Mac (<code className="text-amber-300">.dmg</code>). Double-click to launch immediately!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Windows .exe Download */}
              <button
                onClick={() => handleDownload('windows')}
                disabled={downloading === 'windows'}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-stone-950 font-black text-xs flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                <Monitor className="w-4 h-4" />
                <span>{downloading === 'windows' ? 'Downloading...' : 'Download for Windows (.exe)'}</span>
              </button>

              {/* Mac .dmg Download */}
              <button
                onClick={() => handleDownload('mac')}
                disabled={downloading === 'mac'}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                <Apple className="w-4 h-4" />
                <span>{downloading === 'mac' ? 'Downloading...' : 'Download for Mac (.dmg)'}</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStartGame}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 active:scale-98 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{userProfileName ? `Continue Campaign as ${userProfileName}` : 'Start 28-Day Web Campaign'}</span>
            </button>

            <button
              onClick={onOpenAccount}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-200 font-extrabold text-sm flex items-center justify-center space-x-2 transition-all"
            >
              <UserPlus className="w-4 h-4 text-amber-400" />
              <span>{userProfileName ? 'Manage Profile' : 'Create Free Account'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-stone-100">Why Play Java Jones?</h2>
          <p className="text-xs text-stone-400">Everything you need to master modern JavaScript and software engineering concepts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-lg">
              📜
            </div>
            <h3 className="font-extrabold text-base text-stone-100">24 JS Core Concepts</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Master variables, operators, closures, `this`, prototypes, array `.reduce()`, Promises, async/await, ES6+, regex, and OOP classes.
            </p>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-lg">
              ☕
            </div>
            <h3 className="font-extrabold text-base text-stone-100">Coffee Shop Economy</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Serve 3 customers a day to hit your daily revenue target. Syntax errors cost refund fine penalties—don't go bankrupt!
            </p>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center font-bold text-lg">
              🏙️
            </div>
            <h3 className="font-extrabold text-base text-stone-100">5 Store Locations</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Expand Java Joe's franchise from Starter Alley to Downtown Tech Hub, Cyber Harbor, Silicon Square, and Metropolis.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-900 bg-stone-950 py-6 px-6 text-center text-xs text-stone-500 mt-auto">
        <p>Java Jones: JavaScript Espresso Empire • Built for Learning JavaScript Foundations</p>
      </footer>
    </div>
  );
};
