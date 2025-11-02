import React, { useState, useEffect } from 'react';

const ScrollEffects: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      
      // Determine scroll direction
      if (scrollTop > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(scrollTop);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/20">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 transition-all duration-300 ease-out relative"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Glowing tip */}
          <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-r from-transparent to-white/30 blur-sm" />
          <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-r from-transparent to-cyan-400 shadow-lg shadow-cyan-400/50" />
        </div>
      </div>

      {/* Floating scroll indicator */}
      {scrollProgress > 10 && (
        <div className="fixed bottom-8 right-8 z-40 transition-all duration-500 opacity-80 hover:opacity-100">
          <div className="relative w-16 h-16 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Circular progress */}
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#progressGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={175.929}
                strokeDashoffset={175.929 - (175.929 * scrollProgress) / 100}
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 1)" />
                  <stop offset="50%" stopColor="rgba(6, 182, 212, 1)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 1)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Percentage text */}
          <div className="text-center mt-2 text-xs text-white/60 font-mono">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(59, 130, 246, 0.6), rgba(6, 182, 212, 0.6));
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(59, 130, 246, 0.8), rgba(6, 182, 212, 0.8));
        }

        /* Hide scrollbar for carousel */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default ScrollEffects;