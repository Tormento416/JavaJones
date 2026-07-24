import React, { useState } from 'react';
import { CONCEPTS_CODEX } from '../data/lessons';
import { BookOpen, Search, Code, Check, X } from 'lucide-react';

interface CodexModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodexModal: React.FC<CodexModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredConcepts = CONCEPTS_CODEX.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-4xl w-full p-6 shadow-2xl space-y-6 animate-scale-up text-stone-100 max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-100">24 Core JavaScript Concepts Codex</h2>
              <p className="text-xs text-stone-400">Master all 24 foundation topics for Java Joe's coffee empire!</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative shrink-0">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search concepts (e.g. Promises, Closures, Arrays, async/await)..."
            className="w-full bg-stone-950 border border-stone-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Concept Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto p-1 flex-1">
          {filteredConcepts.map((concept, index) => (
            <div
              key={concept.id}
              className="bg-stone-950 border border-stone-800 hover:border-amber-500/40 p-4 rounded-2xl space-y-3 shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-950/60 text-amber-300 border border-amber-800/40 px-2 py-0.5 rounded-md">
                  #{index + 1} • {concept.category}
                </span>
                <button
                  onClick={() => handleCopy(concept.id, concept.example)}
                  className="text-[11px] text-stone-400 hover:text-amber-300 flex items-center space-x-1"
                >
                  {copiedId === concept.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Code className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="font-extrabold text-sm text-stone-100">{concept.name}</h3>
              <p className="text-xs text-stone-300 leading-relaxed">{concept.summary}</p>

              <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl font-mono text-[11px] text-amber-200 whitespace-pre overflow-x-auto">
                {concept.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
