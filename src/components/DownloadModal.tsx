import React, { useState } from 'react';
import { downloadDesktopBundle } from '../utils/downloadDesktopApp';
import { Download, Monitor, Apple, Check, X } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = async (platform: 'windows' | 'mac') => {
    setDownloading(platform);
    try {
      await downloadDesktopBundle(platform);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setDownloading(null), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-6 animate-scale-up text-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-100">Download Standalone Desktop App</h2>
              <p className="text-xs text-stone-400">1-Click Offline Desktop Apps for Windows & Mac</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-300 leading-relaxed bg-stone-950 p-3 rounded-2xl border border-stone-800">
          No CLI or terminal required! The downloadable zip contains all components, game assets, and a <strong className="text-amber-400">1-click double-clickable application launcher</strong> so you can play offline instantly.
        </p>

        {/* Download Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Windows Download */}
          <div className="bg-stone-950 border border-stone-800 hover:border-amber-500/50 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sky-400">
                <Monitor className="w-6 h-6" />
                <span className="font-extrabold text-sm text-stone-100">Windows (.exe / .zip)</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Includes <code className="text-amber-300">JavaJones-Launcher.bat</code> 1-click executable + full offline app bundle.
              </p>
            </div>

            <button
              onClick={() => handleDownload('windows')}
              disabled={downloading === 'windows'}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-stone-950 font-black text-xs flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              {downloading === 'windows' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>Packaging Zip...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Windows App</span>
                </>
              )}
            </button>
          </div>

          {/* Mac Download */}
          <div className="bg-stone-950 border border-stone-800 hover:border-amber-500/50 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-stone-200">
                <Apple className="w-6 h-6 text-amber-400" />
                <span className="font-extrabold text-sm text-stone-100">Mac (.dmg / .zip)</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Includes <code className="text-amber-300">JavaJones-Launcher.command</code> 1-click launcher + offline app bundle.
              </p>
            </div>

            <button
              onClick={() => handleDownload('mac')}
              disabled={downloading === 'mac'}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              {downloading === 'mac' ? (
                <>
                  <Check className="w-4 h-4 text-stone-950" />
                  <span>Packaging Zip...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Mac App</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
