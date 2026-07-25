import React, { useState } from 'react';
import {
  Download,
  Monitor,
  Apple,
  Sparkles,
  BookOpen,
  LogOut,
  Wifi,
  WifiOff,
  Coffee,
  CheckCircle,
  Terminal,
  RotateCcw,
  Zap,
  Lock,
  Mail,
  UserPlus,
  LogIn,
  AlertCircle
} from 'lucide-react';
import { runJavaScript } from '../utils/jsRunner';
import { soundEngine } from '../utils/audio';
import { signIn, signUp } from '../utils/supabase';
import type { SupabaseSession } from '../utils/supabase';

interface TitleScreenProps {
  onOpenSaveSlots: () => void;
  onOpenCodex: () => void;
  activeSaveName: string | null;
  onContinueGame: () => void;
  userEmail: string | null;
  isGuest: boolean;
  onSignOut: () => void;
  onOpenAuth?: () => void;
  onAuthenticated?: (session: SupabaseSession) => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onOpenSaveSlots,
  onOpenCodex,
  activeSaveName,
  onContinueGame,
  userEmail,
  isGuest,
  onSignOut,
  onAuthenticated,
}) => {
  const [downloading, setDownloading] = useState<string | null>(null);

  // ── Simulator State ─────────────────────────────────────
  const [customerPatience, setCustomerPatience] = useState(100);
  const [cash, setCash] = useState(150);
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewSuccess, setBrewSuccess] = useState(false);
  const [simulatorCode, setSimulatorCode] = useState<string>(
    '// Serve Customer #1: Double Shot Caramel Macchiato\nfunction brewOrder(shots, syrup) {\n  let cost = shots * 2.50 + (syrup ? 1.00 : 0);\n  let customerPay = 6.00;\n  return customerPay - cost > 0;\n}\n\nreturn brewOrder(2, true);'
  );
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "System ready. JS Engine v19 online.",
    "Customer #1 [Devin the Senior Coder] orders Double Shot Caramel Macchiato!",
    "Click 'RUN ESPRESSO CODE' to brew..."
  ]);

  // ── Curriculum State ────────────────────────────────────
  const [activeWeek, setActiveWeek] = useState(1);

  // ── Inline Auth State ───────────────────────────────────
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

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

  // Run Code in Simulator
  const handleRunSimulator = () => {
    setIsBrewing(true);
    soundEngine.playBrew();

    setTimeout(() => {
      const res = runJavaScript(simulatorCode, []);
      setIsBrewing(false);

      if (res.success) {
        soundEngine.playSuccess();
        soundEngine.playCash();
        setBrewSuccess(true);
        const earned = 25;
        setCash((prev) => prev + earned);
        setConsoleLogs((prev) => [
          ...prev,
          `> EXEC: brewOrder(2, true) -> true`,
          `☕ Order Complete! Customer Devin is delighted! +$${earned} Revenue ($${cash + earned} total).`
        ]);
        setTimeout(() => setBrewSuccess(false), 1200);
      } else {
        soundEngine.playError();
        setCustomerPatience((prev) => Math.max(10, prev - 25));
        setConsoleLogs((prev) => [
          ...prev,
          `❌ Syntax Error: ${res.logs.join(" ") || "Failed to fulfill drink recipe"}`,
          `⚠️ Refund penalty: -$15 fine deducted!`
        ]);
      }
    }, 600);
  };

  const handleResetSimulator = () => {
    setCustomerPatience(100);
    setCash(150);
    setSimulatorCode(
      '// Serve Customer #1: Double Shot Caramel Macchiato\nfunction brewOrder(shots, syrup) {\n  let cost = shots * 2.50 + (syrup ? 1.00 : 0);\n  let customerPay = 6.00;\n  return customerPay - cost > 0;\n}\n\nreturn brewOrder(2, true);'
    );
    setConsoleLogs([
      "Simulator reset.",
      "Customer #1 [Devin the Senior Coder] orders Double Shot Caramel Macchiato!",
      "Click 'RUN ESPRESSO CODE' to brew..."
    ]);
  };

  const handleInlineAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError('Please enter both email and password.');
      return;
    }

    if (authPassword.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    setAuthLoading(true);

    try {
      if (authMode === 'signup') {
        const result = await signUp(authEmail.trim(), authPassword);
        if (!result.ok) {
          setAuthError(result.error || 'Signup failed. Please try again.');
        } else if (result.session && onAuthenticated) {
          onAuthenticated(result.session);
        } else {
          setAuthSuccess('Account created! Check your email to confirm, then sign in.');
          setAuthMode('signin');
        }
      } else {
        const result = await signIn(authEmail.trim(), authPassword);
        if (!result.ok) {
          setAuthError(result.error || 'Login failed. Check your credentials.');
        } else if (result.session && onAuthenticated) {
          onAuthenticated(result.session);
        }
      }
    } catch {
      setAuthError('Network error. Please check your connection.');
    } finally {
      setAuthLoading(false);
    }
  };

  const curriculumWeeks = [
    {
      week: 1,
      title: "Foundations & Customer Orders",
      subtitle: "The Corner Coffee Stand (Days 1–7)",
      boss: "The Rush Hour Rush (Day 7)",
      project: "Interactive Customer Order Logic",
      topics: [
        "Variables, Let/Const & Primitive Types",
        "String Concatenation & Template Literals (`${}`)",
        "Arithmetic Operators & Financial Math",
        "Boolean Expressions & Order Logic (if / else)",
        "Arrays: Drink Menu Lists & Order Queues"
      ]
    },
    {
      week: 2,
      title: "Data Structures & Menu Functions",
      subtitle: "Downtown Espresso Bar (Days 8–14)",
      boss: "The Secret Recipe Critic (Day 14)",
      project: "Inventory & Recipe Manager",
      topics: [
        "Objects & Key-Value Ingredient Inventories",
        "Array Transformation Methods (.map, .filter, .reduce)",
        "Custom Recipe Functions & Return Values",
        "Arrow Functions & ES6 Short Syntax",
        "Looping Mechanics (for...of, while loops)"
      ]
    },
    {
      week: 3,
      title: "OOP Barista & Store Upgrades",
      subtitle: "Tech Park Roastery (Days 15–21)",
      boss: "The Franchise Auditor (Day 21)",
      project: "Espresso Machine OOP Engine",
      topics: [
        "Classes, Objects & Constructors (`class Barista`)",
        "Inheritance & Method Overriding (`CommercialGrinder`)",
        "Method Chaining & `this` Keyword Context",
        "Promises & Async Brew Timers (setTimeout, Promise)",
        "Error Handling (`try / catch / finally`)"
      ]
    },
    {
      week: 4,
      title: "Real-World Web & Franchise Empire",
      subtitle: "Metropolis Flagship (Days 22–28)",
      boss: "The World Espresso Championship (Day 28)",
      project: "Full Coffee Shop Web App & Save Sync",
      topics: [
        "Fetching Live Data with REST APIs (`fetch()`)",
        "Parsing JSON Save State & Local Storage Sync",
        "DOM Event Manipulation & Interactive UI",
        "State Management & Store Expansion Mechanics",
        "Packaging Standalone Desktop Executables"
      ]
    }
  ];

  const selectedCurriculum = curriculumWeeks.find((w) => w.week === activeWeek)!;

  const storeLocations = [
    {
      id: 1,
      name: "The Corner Stand",
      type: "Starter Cart in the Alley",
      days: "Days 1–7",
      icon: "🏪",
      desc: "Master basic JavaScript order variables and if/else conditional logic while serving 3 customers a day."
    },
    {
      id: 2,
      name: "Downtown Espresso Bar",
      type: "High-Traffic Financial District",
      days: "Days 8–14",
      icon: "☕",
      desc: "Handle complex drink objects and array iteration methods (.map / .filter) for busy office commuters."
    },
    {
      id: 3,
      name: "Tech Park Roastery",
      type: "Enterprise Software Campus",
      days: "Days 15–21",
      icon: "💻",
      desc: "Implement OOP Barista classes, espresso machine inheritance, and async promise brew timers."
    },
    {
      id: 4,
      name: "Cyberpunk Neon Cafe",
      type: "Nightlife Cyber Harbor",
      days: "Days 22–27",
      icon: "🌆",
      desc: "Master JSON save persistence, REST API fetching, and advanced ES6+ software patterns."
    },
    {
      id: 5,
      name: "Grand Metropolis Empire",
      type: "Flagship Coffee Kingdom",
      days: "Day 28 Final",
      icon: "🏰",
      desc: "Conquer the World Espresso Championship and manage all 5 store locations simultaneously!"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* ── STICKY NAVIGATION HEADER ──────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-stone-900 bg-stone-950/90 backdrop-blur-md px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-stone-950 font-black text-xl shadow-lg shadow-amber-600/30 group-hover:scale-105 transition-transform">
              ☕
            </div>
            <div>
              <span className="font-black text-base tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                JAVA JONES
              </span>
              <span className="text-[10px] text-amber-500/80 block font-bold">JavaScript Espresso Empire</span>
            </div>
          </a>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-bold text-stone-400">
            <a href="#simulator-section" className="hover:text-amber-300 transition-colors">☕ Simulator</a>
            <a href="#curriculum-section" className="hover:text-amber-300 transition-colors">📜 28-Day Syllabus</a>
            <a href="#franchise-section" className="hover:text-amber-300 transition-colors">🏬 5 Locations</a>
            <a href="#download-section" className="hover:text-amber-300 transition-colors">💻 Download App</a>
            <a href="#login-section" className="hover:text-amber-300 transition-colors">🔑 Barista Login</a>
          </nav>

          <div className="flex items-center space-x-3">
            {userEmail ? (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:flex items-center space-x-1.5 text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2.5 py-1 rounded-full font-bold">
                  <Wifi className="w-3 h-3" />
                  <span className="max-w-[120px] truncate">{userEmail}</span>
                </span>
                <button
                  onClick={onSignOut}
                  className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-rose-950 border border-stone-800 hover:border-rose-800 text-xs font-bold text-stone-400 hover:text-rose-400 flex items-center space-x-1.5 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:flex items-center space-x-1.5 text-[10px] bg-stone-900 text-stone-400 border border-stone-800 px-2.5 py-1 rounded-full font-bold">
                  <WifiOff className="w-3 h-3 text-stone-500" />
                  <span>{isGuest ? 'Guest Mode' : 'Local Mode'}</span>
                </span>
                <a
                  href="#login-section"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-xs font-bold text-amber-300 transition-all flex items-center space-x-1.5"
                >
                  <Wifi className="w-3.5 h-3.5" />
                  <span>Cloud Save / Log In</span>
                </a>
              </div>
            )}

            <button
              onClick={onOpenCodex}
              className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-bold text-amber-300 flex items-center space-x-1.5 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">24 JS Codex</span>
            </button>
          </div>
        </div>
      </header>


      {/* ── SECTION 1: HERO & INTERACTIVE ESPRESSO SIMULATOR PLAYGROUND ── */}
      <section id="simulator-section" className="max-w-6xl mx-auto w-full px-6 pt-12 pb-16 text-center relative z-10 scroll-mt-20">
        
        {/* RETRO TITLE BANNER */}
        <div className="inline-flex items-center space-x-2 bg-amber-950/80 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 shadow-inner mb-4">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>AN EPIC 28-DAY JAVASCRIPT &amp; COFFEE SIMULATOR</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-stone-100 drop-shadow-2xl">
          JAVA JONES:{' '}
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            ESPRESSO EMPIRE
          </span>
        </h1>
        
        <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
          Master JavaScript programming by building Java Joe's Coffee Empire! Serve 3 custom JavaScript drink orders per day, avoid syntax penalties, buy commercial upgrades, and expand to 5 store locations.
        </p>

        {/* HERO CTA BUTTONS */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {activeSaveName ? (
            <button
              onClick={onContinueGame}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-stone-950 font-black text-sm uppercase tracking-wider flex items-center space-x-2 shadow-xl active:scale-98 transition-all"
            >
              <Coffee className="w-5 h-5 fill-current" />
              <span>▶️ Continue Game: {activeSaveName}</span>
            </button>
          ) : null}

          <button
            onClick={onOpenSaveSlots}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-sm uppercase tracking-wider flex items-center space-x-2 shadow-xl shadow-amber-500/20 active:scale-98 transition-all"
          >
            <Coffee className="w-5 h-5 fill-current" />
            <span>{activeSaveName ? 'Select Save Slot' : '☕ Start Brewing Now (Guest Mode)'}</span>
          </button>

          <a
            href="#login-section"
            className="px-7 py-4 rounded-2xl bg-amber-950/80 hover:bg-amber-900/90 border border-amber-500/50 text-amber-200 font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2 shadow-lg transition-all"
          >
            <Wifi className="w-5 h-5 text-amber-400" />
            <span>☁️ Save Progress Online (Sign Up)</span>
          </a>

          <a
            href="#download-section"
            className="px-7 py-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-200 font-bold text-sm flex items-center space-x-2 transition-all"
          >
            <Download className="w-5 h-5 text-amber-400" />
            <span>💻 Download Desktop Game</span>
          </a>
        </div>

        {/* INTERACTIVE BARISTA COFFEE SIMULATOR & CODE PLAYGROUND */}
        <div className="mt-12 rounded-3xl border-4 border-amber-500/60 bg-stone-900/95 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.2)] text-left">
          
          {/* Coffee Shop Visualizer Stage */}
          <div className="relative h-[240px] sm:h-[280px] w-full bg-gradient-to-b from-amber-950/40 via-stone-900 to-stone-950 p-6 flex flex-col justify-between border-b border-stone-800 overflow-hidden">
            
            {/* Stage Top Bar HUD */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-extrabold text-amber-400 bg-amber-950 border border-amber-500/40 px-3 py-1 rounded-full">
                  STORE #1: THE CORNER STAND
                </span>
                <span className="text-xs font-bold text-stone-400 hidden sm:inline">
                  Customer 1 of 3 Today
                </span>
              </div>

              <div className="flex items-center space-x-4 font-mono text-xs">
                <span className="text-emerald-400 font-black">REVENUE: <strong>${cash}</strong></span>
                <span className="text-amber-300 font-bold">TIP BONUS: <strong>1.5x</strong></span>
              </div>
            </div>

            {/* Brew Success Animation */}
            {brewSuccess && (
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none bg-emerald-950/40 backdrop-blur-xs">
                <div className="text-3xl sm:text-5xl font-black text-amber-300 animate-bounce flex items-center space-x-3 bg-stone-950/90 px-6 py-3 rounded-2xl border border-amber-400">
                  <span>☕</span>
                  <span>PERFECT BREW! +$25 REVENUE!</span>
                </div>
              </div>
            )}

            {/* Coffee Shop Counter Stage Entities */}
            <div className="relative z-10 flex justify-between items-end pb-4 px-4 sm:px-10">
              
              {/* Barista Java Jones */}
              <div className="flex flex-col items-center">
                <div className="text-xs font-bold text-amber-300 bg-stone-950 px-2.5 py-1 rounded border border-amber-500/30 mb-2">
                  🧑‍🍳 Java Jones (Barista)
                </div>
                <div className={`text-6xl sm:text-7xl filter drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] ${isBrewing ? 'animate-bounce' : ''}`}>
                  ☕
                </div>
              </div>

              {/* Center Espresso Pouring Beam */}
              <div className="flex flex-col items-center justify-center space-y-1 mb-4">
                <span className="text-xs font-bold text-amber-300 bg-stone-950/80 px-3 py-1 rounded-full border border-amber-400/50 animate-pulse">
                  {isBrewing ? "⚡ BREWING ESPRESSO..." : "☕ READY TO BREW"}
                </span>
                <div className="text-amber-400 font-mono text-base tracking-widest">
                  ═══ ☕ ═══►
                </div>
              </div>

              {/* Waiting Customer */}
              <div className="flex flex-col items-center">
                <div className="text-xs font-bold text-sky-300 bg-stone-950 px-2.5 py-1 rounded border border-sky-500/30 mb-2">
                  👨‍💻 Devin (Senior Coder)
                </div>
                <div className="text-6xl sm:text-7xl filter drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                  🙋‍♂️
                </div>
              </div>
            </div>

            {/* Customer Patience Bar */}
            <div className="relative z-10">
              <div className="flex justify-between text-[10px] font-bold text-stone-400 mb-1">
                <span>DEVIN'S PATIENCE</span>
                <span>{customerPatience}%</span>
              </div>
              <div className="h-2 rounded-full bg-stone-950 overflow-hidden border border-stone-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${customerPatience}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Code Playground Controls */}
          <div className="p-4 sm:p-6 bg-stone-950 font-mono text-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="font-extrabold text-stone-200">Interactive JavaScript Code Playground</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleRunSimulator}
                  disabled={isBrewing}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-md disabled:opacity-50 transition-all"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{isBrewing ? 'BREWING...' : 'RUN ESPRESSO CODE'}</span>
                </button>
                <button
                  onClick={handleResetSimulator}
                  className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition-all"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Code Input */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-3">
                <div className="text-[10px] text-stone-500 font-bold mb-1">recipe.js</div>
                <textarea
                  value={simulatorCode}
                  onChange={(e) => setSimulatorCode(e.target.value)}
                  className="w-full h-28 bg-transparent text-amber-300 font-mono text-xs focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Console Output */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-3 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-stone-500 font-bold mb-1">Terminal Output Console</div>
                  <div className="space-y-1 text-xs max-h-24 overflow-y-auto">
                    {consoleLogs.map((log, index) => (
                      <div
                        key={index}
                        className={
                          log.includes("Order Complete")
                            ? "text-emerald-400 font-bold"
                            : log.includes("Error") || log.includes("penalty")
                            ? "text-rose-400 font-bold"
                            : "text-stone-300"
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── SECTION 2: 28-DAY JAVASCRIPT BARISTA SYLLABUS (#curriculum-section) ── */}
      <section id="curriculum-section" className="py-20 bg-stone-900 border-t border-b border-stone-800 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full">
              28-Day Barista Curriculum
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-100">
              What You Will Learn &amp; Master
            </h2>
            <p className="text-sm text-stone-400 max-w-2xl mx-auto">
              From day 1 JavaScript variables to day 28 Object-Oriented coffee engines and REST APIs. Every single day unlocks real-world JavaScript software skills through gamified barista challenges.
            </p>
          </div>

          {/* Interactive Week Switcher Tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {curriculumWeeks.map((item) => {
              const isActive = activeWeek === item.week;
              return (
                <button
                  key={item.week}
                  onClick={() => setActiveWeek(item.week)}
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border ${
                    isActive
                      ? "border-amber-400 bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20 scale-105"
                      : "border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700 hover:text-stone-200"
                  }`}
                >
                  WEEK {item.week}: {item.title}
                </button>
              );
            })}
          </div>

          {/* Active Week Details Card */}
          <div className="mt-8 bg-stone-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-stone-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  WEEK {selectedCurriculum.week} OF 4
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-stone-100 mt-1">
                  {selectedCurriculum.subtitle}
                </h3>
                <p className="text-xs text-stone-400 mt-1">Focus Area: {selectedCurriculum.title}</p>
              </div>

              <div className="bg-rose-950/60 border border-rose-500/40 p-4 rounded-2xl text-left">
                <div className="text-[10px] text-rose-300 font-bold uppercase">👑 Store Challenge Target</div>
                <div className="text-lg font-black text-stone-100 mt-0.5">{selectedCurriculum.boss}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Core Topics Covered */}
              <div>
                <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Core JavaScript Concepts Unlocked:</span>
                </h4>
                <ul className="space-y-3">
                  {selectedCurriculum.topics.map((topic, index) => (
                    <li key={index} className="flex items-start space-x-3 text-xs sm:text-sm text-stone-200">
                      <span className="w-5 h-5 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
                        ✓
                      </span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Capstone Project */}
              <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase">🛠️ End-of-Week Capstone Project</span>
                  <h4 className="text-xl font-black text-stone-100 mt-1">{selectedCurriculum.project}</h4>
                  <p className="mt-3 text-xs text-stone-400 leading-relaxed">
                    Build a complete, standalone JavaScript module from scratch using the week's concepts. Save it directly to your barista save slot!
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-stone-800 pt-4 text-xs font-mono text-amber-300">
                  <span>Daily Customer Goal: 3 Orders</span>
                  <span>Weekly Earnings: +$500 Cash</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gamification Mechanics Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-stone-950 border border-stone-800 p-6 rounded-3xl space-y-3">
              <div className="text-3xl">🎯</div>
              <h3 className="text-lg font-black text-amber-300">Daily 3-Customer Rush</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Serve 3 custom JavaScript coffee orders per day with live in-browser code execution and instant error feedback.
              </p>
            </div>

            <div className="bg-stone-950 border border-stone-800 p-6 rounded-3xl space-y-3">
              <div className="text-3xl">☕</div>
              <h3 className="text-lg font-black text-emerald-300">Equipment Shop</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Use earned customer revenue to buy commercial grinders, double boilers, and steam wands for income multipliers.
              </p>
            </div>

            <div className="bg-stone-950 border border-stone-800 p-6 rounded-3xl space-y-3">
              <div className="text-3xl">🏬</div>
              <h3 className="text-lg font-black text-purple-300">5 Store Franchises</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Expand Java Joe's from Starter Cart in the Alley to Downtown Tech Hub, Cyber Harbor, and Metropolis.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ── SECTION 3: 5 COFFEE SHOP FRANCHISE LOCATIONS (#franchise-section) ── */}
      <section id="franchise-section" className="py-20 max-w-6xl mx-auto px-6 scroll-mt-20">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full">
            5 Store Locations
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-100">
            Expand Java Joe's Coffee Empire
          </h2>
          <p className="text-sm text-stone-400 max-w-2xl mx-auto">
            Unlock new coffee shop store locations as you progress through the 28-day campaign!
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {storeLocations.map((loc) => (
            <div
              key={loc.id}
              className="bg-stone-900 border border-stone-800 hover:border-amber-500/50 p-5 rounded-3xl flex flex-col justify-between transition-all"
            >
              <div>
                <div className="text-4xl mb-3">{loc.icon}</div>
                <h3 className="font-extrabold text-base text-amber-300">{loc.name}</h3>
                <span className="text-[10px] text-stone-500 block font-bold mt-0.5">{loc.type}</span>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">{loc.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                <span>{loc.days}</span>
                <span>Store #{loc.id}</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── SECTION 4: OFFLINE DESKTOP EDITION DOWNLOAD (#download-section) ── */}
      <section id="download-section" className="max-w-6xl mx-auto w-full px-6 py-16 scroll-mt-20">
        <div className="rounded-3xl border-4 border-amber-500/70 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 p-8 sm:p-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <span className="inline-block rounded-full bg-emerald-950 border border-emerald-800 px-3.5 py-1 text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">
                100% OFFLINE PLAYABLE • ZERO WI-FI NEEDED
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-amber-300">
                Download JavaJones Desktop Edition
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Get the standalone single executable application bundle for Windows or Mac. Double-click to launch immediately and play the full 28-day campaign offline!
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-400 pt-2 justify-center lg:justify-start">
                <span className="bg-stone-950 border border-stone-800 px-3 py-1 rounded-xl">📦 Portable Single App</span>
                <span className="bg-stone-950 border border-stone-800 px-3 py-1 rounded-xl">⚡ Native JS Runner</span>
                <span className="bg-stone-950 border border-stone-800 px-3 py-1 rounded-xl">💾 3 Local Save Slots</span>
              </div>
            </div>

            {/* Download Buttons Stack */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto">
              <button
                onClick={() => handleDownload('windows')}
                disabled={downloading === 'windows'}
                className="py-4 px-8 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-stone-950 font-black text-sm flex items-center justify-center space-x-3 shadow-xl active:scale-95 transition-all disabled:opacity-50"
              >
                <Monitor className="w-5 h-5" />
                <div className="text-left">
                  <div className="leading-tight font-black">{downloading === 'windows' ? 'Downloading...' : 'Download Windows (.exe)'}</div>
                  <div className="text-[10px] font-mono text-stone-950/80">Standalone 64-Bit App</div>
                </div>
              </button>

              <button
                onClick={() => handleDownload('mac')}
                disabled={downloading === 'mac'}
                className="py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-sm flex items-center justify-center space-x-3 shadow-xl active:scale-95 transition-all disabled:opacity-50"
              >
                <Apple className="w-5 h-5" />
                <div className="text-left">
                  <div className="leading-tight font-black">{downloading === 'mac' ? 'Downloading...' : 'Download Mac (.dmg)'}</div>
                  <div className="text-[10px] font-mono text-stone-950/80">Apple Silicon &amp; Intel</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ── SECTION 5: INLINE BARISTA AUTHENTICATION PORTAL (#login-section) ── */}
      <section id="login-section" className="py-20 bg-stone-900 border-t border-stone-800 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full">
            Cloud Save Portal
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-100 mt-3">
            Barista Login &amp; Cloud Sync
          </h2>
          <p className="text-sm text-stone-400 mt-2 max-w-xl mx-auto">
            Sync your 3 save slots across browsers and devices via cloud backup!
          </p>

          <div className="mt-10 max-w-md mx-auto bg-stone-950 border-2 border-amber-500/50 rounded-3xl p-8 shadow-2xl text-left">
            {userEmail ? (
              <div className="text-center space-y-4">
                <span className="text-5xl">☕</span>
                <h3 className="text-xl font-black text-amber-300">Signed In: {userEmail}</h3>
                <p className="text-xs text-stone-400">
                  Cloud save slot sync is active. Your 3 local save slots will automatically back up to the cloud!
                </p>
                <button
                  onClick={onContinueGame}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 font-black text-xs text-stone-950 uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
                >
                  🚀 Enter Coffee Shop Game
                </button>
              </div>
            ) : (
              <form onSubmit={handleInlineAuthSubmit} className="space-y-4">
                {/* Tab Switcher */}
                <div className="flex bg-stone-900 rounded-2xl p-1 border border-stone-800">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('signin'); setAuthError(null); setAuthSuccess(null); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 ${
                      authMode === 'signin'
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-md'
                        : 'text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('signup'); setAuthError(null); setAuthSuccess(null); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 ${
                      authMode === 'signup'
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-md'
                        : 'text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Sign Up</span>
                  </button>
                </div>

                {authError && (
                  <div className="flex items-start space-x-2 bg-rose-950/60 border border-rose-500/40 rounded-xl p-3 text-xs text-rose-300">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {authSuccess && (
                  <div className="flex items-start space-x-2 bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-3 text-xs text-emerald-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{authSuccess}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500/60 rounded-xl pl-10 pr-3 py-3 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none"
                      placeholder="barista@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 focus:border-amber-500/60 rounded-xl pl-10 pr-3 py-3 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  disabled={authLoading}
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 font-black text-xs text-stone-950 uppercase tracking-wider shadow-lg transition-all disabled:opacity-50"
                >
                  {authLoading ? 'Authenticating...' : authMode === 'signup' ? '☁️ Create Account & Sync' : '☕ Sign In & Load Saves'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FOOTER ─────────────────────────────── */}
      <footer className="py-6 px-6 border-t border-stone-900 bg-stone-950 text-center text-xs text-stone-500">
        <p>Java Jones: JavaScript Espresso Empire • Built for Learning JavaScript Foundations</p>
      </footer>
    </div>
  );
};
