import React, { useState } from 'react';
import { downloadDesktopBundle } from '../utils/downloadDesktopApp';
import { Download, Monitor, Apple, Check, X, ShieldCheck } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadExe = (platform: 'windows' | 'mac') => {
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

  const handleDownloadZipFallback = async (platform: 'windows' | 'mac') => {
    setDownloading(`${platform}-zip`);
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
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 animate-scale-up text-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-100">Download 1-Click Desktop App</h2>
              <p className="text-xs text-stone-400">Standalone Executable Applications for Windows (.exe) & Mac (.dmg)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feature Banner */}
        <div className="bg-stone-950 p-3.5 rounded-2xl border border-amber-500/30 flex items-start space-x-3 text-xs text-stone-300">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300">Single Executable Application (No CLI Required):</span>
            <p className="text-[11px] text-stone-400 mt-0.5">
              The <code className="text-amber-300 font-mono">.exe</code> and <code className="text-amber-300 font-mono">.dmg</code> downloads are single application files that open the game immediately upon double-clicking. All components and files load automatically in the background.
            </p>
          </div>
        </div>

        {/* Download Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Windows (.exe) Option */}
          <div className="bg-stone-950 border border-stone-800 hover:border-amber-500/50 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sky-400">
                <Monitor className="w-6 h-6" />
                <span className="font-extrabold text-sm text-stone-100">Windows (.exe)</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Standalone <code className="text-amber-300 font-mono">JavaJones-Windows.exe</code> application file. Opens game immediately on 1 click!
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleDownloadExe('windows')}
                disabled={downloading === 'windows'}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-stone-950 font-black text-xs flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition-all disabled:opacity-50"
              >
                {downloading === 'windows' ? (
                  <>
                    <Check className="w-4 h-4 text-stone-950" />
                    <span>Downloading .exe...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Windows (.exe)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDownloadZipFallback('windows')}
                className="w-full py-1 text-center text-[10px] text-stone-400 hover:text-amber-300 underline"
              >
                Or download Windows (.zip archive)
              </button>
            </div>
          </div>

          {/* Mac (.dmg) Option */}
          <div className="bg-stone-950 border border-stone-800 hover:border-amber-500/50 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-amber-400">
                <Apple className="w-6 h-6" />
                <span className="font-extrabold text-sm text-stone-100">Mac (.dmg)</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Standalone <code className="text-amber-300 font-mono">JavaJones-Mac.dmg</code> application file. Opens game immediately on 1 click!
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleDownloadExe('mac')}
                disabled={downloading === 'mac'}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition-all disabled:opacity-50"
              >
                {downloading === 'mac' ? (
                  <>
                    <Check className="w-4 h-4 text-stone-950" />
                    <span>Downloading .dmg...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Mac (.dmg)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDownloadZipFallback('mac')}
                className="w-full py-1 text-center text-[10px] text-stone-400 hover:text-amber-300 underline"
              >
                Or download Mac (.zip archive)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
