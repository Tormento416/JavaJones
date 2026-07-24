import React, { useState } from 'react';
import { UserPlus, UserCheck, X, Check } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string | null;
  onSaveAccount: (name: string, title: string, avatar: string) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  currentName,
  onSaveAccount,
}) => {
  const [name, setName] = useState(currentName || 'Java Jones');
  const [title, setTitle] = useState('Junior Barista & JS Developer');
  const [avatar, setAvatar] = useState('🧑‍🍳');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSaveAccount(name.trim(), title, avatar);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const avatars = ['🧑‍🍳', '👩‍💻', '👨‍💻', '🧔‍♂️', '🚀', '☕', '🎧', '👑'];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6 animate-scale-up text-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-100">Barista Account & Profile</h2>
              <p className="text-xs text-stone-400">Save progress under your personal profile</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
              Select Barista Avatar:
            </label>
            <div className="flex items-center space-x-2 overflow-x-auto p-1">
              {avatars.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setAvatar(av)}
                  className={`text-2xl p-2 rounded-2xl border transition-all ${
                    avatar === av
                      ? 'bg-amber-500/20 border-amber-400 scale-110 shadow-lg'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Barista Name */}
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1">
              Barista Name / Username:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Java Jones"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500/50"
              required
            />
          </div>

          {/* Barista Title */}
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1">
              Barista Title:
            </label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500/50"
            >
              <option value="Junior Barista & JS Developer">Junior Barista & JS Developer</option>
              <option value="Senior Espresso Architect">Senior Espresso Architect</option>
              <option value="Fullstack Coffee Master">Fullstack Coffee Master</option>
              <option value="Async Brew Specialist">Async Brew Specialist</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl active:scale-98 transition-all"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-stone-950" />
                <span>Account Profile Saved!</span>
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Save Barista Account</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
