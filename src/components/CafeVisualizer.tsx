import React, { useEffect, useRef } from 'react';
import type { Lesson } from '../types/game';
import { Sparkles, MessageSquare, Coffee } from 'lucide-react';

interface CafeVisualizerProps {
  lesson: Lesson;
  isBrewing: boolean;
  dayCustomersServed: number;
}

export const CafeVisualizer: React.FC<CafeVisualizerProps> = ({
  lesson,
  isBrewing,
  dayCustomersServed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas steam animation particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; size: number; alpha: number; speedY: number }[] = [];

    const createParticles = () => {
      if (particles.length < 25) {
        particles.push({
          x: canvas.width / 2 + (Math.random() * 40 - 20),
          y: canvas.height - 30,
          size: Math.random() * 4 + 2,
          alpha: Math.random() * 0.6 + 0.2,
          speedY: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isBrewing) {
        createParticles();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();

        p.y -= p.speedY;
        p.alpha -= 0.01;

        if (p.alpha <= 0 || p.y < 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isBrewing]);

  return (
    <div className="relative w-full bg-gradient-to-b from-amber-950/80 via-stone-900 to-stone-950 border border-amber-900/40 rounded-3xl overflow-hidden shadow-2xl p-6 flex flex-col justify-between min-h-[320px]">
      {/* Background Decor & Neon Sign */}
      <div className="absolute top-4 left-6 flex items-center space-x-2 bg-stone-950/80 border border-amber-500/30 px-3 py-1 rounded-full shadow-inner">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span className="text-xs font-bold text-amber-300 tracking-wider uppercase">
          JAVA CAFE • DAY {lesson.day} ({dayCustomersServed}/3 Served)
        </span>
      </div>

      {/* Java Joe Mentor Advice Box */}
      <div className="absolute top-4 right-6 max-w-xs bg-stone-900/90 border border-amber-500/40 p-3 rounded-2xl shadow-xl flex items-start space-x-2 text-xs">
        <div className="text-2xl">🧔</div>
        <div>
          <div className="font-bold text-amber-400">Java Joe Advice</div>
          <div className="text-stone-300 italic">{lesson.javaJoeTip}</div>
        </div>
      </div>

      {/* Steam Canvas */}
      <canvas
        ref={canvasRef}
        width={400}
        height={250}
        className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      />

      {/* Main Cafe Stage */}
      <div className="relative z-20 flex items-end justify-between mt-12 px-4">
        {/* Java Jones Barista Sprite */}
        <div className="flex flex-col items-center group">
          <div className="relative mb-2">
            <div className="text-6xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] transform transition-transform group-hover:scale-105">
              🧑‍🍳
            </div>
            {isBrewing && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full animate-bounce">
                Brewing!
              </div>
            )}
          </div>
          <div className="bg-amber-900/80 border border-amber-500/50 px-3 py-1 rounded-xl text-center shadow-lg">
            <div className="text-xs font-extrabold text-amber-200">Java Jones</div>
            <div className="text-[10px] text-amber-400/80">Barista & Developer</div>
          </div>
        </div>

        {/* Coffee Machine & Pouring Station */}
        <div className="flex flex-col items-center mx-4">
          <div className="relative bg-stone-900 border-2 border-amber-700/60 p-4 rounded-2xl shadow-2xl flex flex-col items-center min-w-[140px]">
            <div className="flex items-center space-x-2 text-amber-400 mb-1">
              <Coffee className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-bold text-stone-200">ESPRESSO 3000</span>
            </div>

            {/* Coffee Cup Fill Animation */}
            <div className="w-12 h-14 bg-stone-950 border-2 border-amber-600/60 rounded-b-xl relative overflow-hidden flex items-end justify-center my-2 shadow-inner">
              <div
                className={`w-full bg-gradient-to-t from-amber-900 to-amber-700 transition-all duration-700 ${
                  isBrewing ? 'h-full' : 'h-2'
                }`}
              />
              <span className="absolute text-xs z-10">☕</span>
            </div>

            <div className="flex space-x-1">
              <div className={`w-2 h-2 rounded-full ${isBrewing ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`} />
              <div className="w-2 h-2 rounded-full bg-stone-700" />
            </div>
          </div>
          <div className="text-[10px] text-stone-400 mt-1 font-mono">
            Status: {isBrewing ? 'Executing Code...' : 'Ready'}
          </div>
        </div>

        {/* Customer Sprite & Speech Bubble */}
        <div className="flex flex-col items-center">
          {/* Customer Speech Bubble */}
          <div className="bg-stone-900 border border-amber-400/60 p-3 rounded-2xl shadow-2xl max-w-xs mb-3 relative animate-fade-in">
            <div className="flex items-center space-x-1.5 mb-1">
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-xs text-amber-300">{lesson.customer.name}</span>
              <span className="text-[10px] bg-stone-800 text-stone-400 px-1.5 py-0.5 rounded">
                {lesson.customer.title}
              </span>
            </div>
            <div className="text-xs text-stone-200 italic mb-2">"{lesson.customer.dialogue}"</div>
            <div className="bg-stone-950 p-2 rounded-xl border border-stone-800 text-[11px] text-amber-200 font-mono">
              <span className="font-bold text-amber-400">Order Challenge: </span>
              {lesson.customer.orderText}
            </div>

            {/* Bubble arrow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-900 border-r border-b border-amber-400/60 rotate-45" />
          </div>

          <div className="text-6xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
            {lesson.customer.avatar}
          </div>
        </div>
      </div>
    </div>
  );
};
