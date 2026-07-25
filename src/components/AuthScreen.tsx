import React, { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus, Loader2, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { signIn, signUp } from '../utils/supabase';
import type { SupabaseSession } from '../utils/supabase';

interface AuthScreenProps {
  onAuthenticated: (session: SupabaseSession) => void;
  onContinueAsGuest: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onAuthenticated,
  onContinueAsGuest,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const result = await signUp(email.trim(), password);
        if (!result.ok) {
          setError(result.error || 'Signup failed. Please try again.');
        } else if (result.session) {
          // Signed up and auto-confirmed
          onAuthenticated(result.session);
        } else {
          // Email confirmation required
          setSuccessMessage('Account created! Check your email to confirm, then sign in.');
          setMode('signin');
        }
      } else {
        const result = await signIn(email.trim(), password);
        if (!result.ok) {
          setError(result.error || 'Login failed. Check your credentials.');
        } else if (result.session) {
          onAuthenticated(result.session);
        }
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col items-center justify-center selection:bg-amber-500 selection:text-stone-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-amber-600/8 blur-[100px] rounded-full pointer-events-none" />

      {/* Logo + Title */}
      <div className="text-center space-y-3 mb-8 relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-600 to-yellow-500 text-3xl shadow-xl shadow-amber-600/20 mx-auto">
          ☕
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          JAVA JONES:{' '}
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            ESPRESSO EMPIRE
          </span>
        </h1>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          Sign in to sync your save files across devices via cloud backup
        </p>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-sm bg-stone-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-md relative z-10 space-y-5">
        {/* Tab Switcher */}
        <div className="flex bg-stone-950 rounded-2xl p-1 border border-stone-800">
          <button
            onClick={() => { setMode('signin'); setError(null); setSuccessMessage(null); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 ${
              mode === 'signin'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-md'
                : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => { setMode('signup'); setError(null); setSuccessMessage(null); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 ${
              mode === 'signup'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-md'
                : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-start space-x-2 bg-rose-950/60 border border-rose-500/40 rounded-xl px-3 py-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="flex items-start space-x-2 bg-emerald-950/60 border border-emerald-500/40 rounded-xl px-3 py-2.5 text-xs text-emerald-300">
            <Wifi className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              autoComplete="email"
              className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500/60 rounded-xl pl-10 pr-3 py-3 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition-colors"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 6 characters)"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500/60 rounded-xl pl-10 pr-3 py-3 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/15 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{mode === 'signup' ? 'Creating Account...' : 'Signing In...'}</span>
              </>
            ) : (
              <>
                {mode === 'signup' ? (
                  <UserPlus className="w-4 h-4" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 h-px bg-stone-800" />
          <span className="text-[10px] text-stone-600 font-bold uppercase">or</span>
          <div className="flex-1 h-px bg-stone-800" />
        </div>

        {/* Guest Mode */}
        <button
          onClick={onContinueAsGuest}
          className="w-full py-3 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all"
        >
          <WifiOff className="w-3.5 h-3.5" />
          <span>Continue as Guest (Offline Only)</span>
        </button>

        <p className="text-[10px] text-stone-600 text-center leading-relaxed">
          Guest mode saves locally only. Sign in to sync saves across devices.
        </p>
      </div>

      {/* Footer */}
      <p className="text-[10px] text-stone-600 mt-8 relative z-10">
        Java Jones: JavaScript Espresso Empire • Powered by Supabase
      </p>
    </div>
  );
};
