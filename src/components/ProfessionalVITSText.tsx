import React, { useState, useEffect } from 'react';

interface ProfessionalVITSTextProps {
  text?: string;
  className?: string;
  subtitle?: string;
  showParticles?: boolean;
}

const ProfessionalVITSText: React.FC<ProfessionalVITSTextProps> = ({
  text = 'VITS',
  className = '',
  subtitle = 'ICT Society of St. Sylvester\'s College',
  showParticles = true,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const letters = text.split('');

  return (
    <div 
      className={`relative w-full h-screen overflow-hidden flex items-center justify-center ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-5 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 5}% ${50 + mousePos.y * 5}%, 
            rgba(59, 130, 246, 0.15) 0%, 
            transparent 60%)`,
        }}
      />

      {/* Minimal floating elements - only if enabled */}
      {showParticles && (
        <>
          <div
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: '20%',
              top: '30%',
              transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 5}px)`,
              transition: 'transform 0.8s ease-out',
            }}
          />
          <div
            className="absolute w-1 h-1 bg-blue-300/15 rounded-full"
            style={{
              left: '80%',
              top: '70%',
              transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -3}px)`,
              transition: 'transform 0.8s ease-out',
            }}
          />
          <div
            className="absolute w-0.5 h-0.5 bg-slate-400/20 rounded-full"
            style={{
              left: '15%',
              top: '80%',
              transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 4}px)`,
              transition: 'transform 0.8s ease-out',
            }}
          />
        </>
      )}

      {/* Main text container with subtle 3D effects */}
      <div 
        className="relative text-center transition-all duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 2}deg) rotateX(${-mousePos.y * 1}deg)`,
        }}
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 blur-3xl transition-all duration-700"
            style={{
              background: `radial-gradient(circle, 
                rgba(59, 130, 246, ${isHovered ? 0.08 : 0.04}) 0%, 
                transparent 70%)`,
              transform: 'scale(1.5)',
            }}
          />
        </div>

        {/* Professional text styling */}
        <div className="relative flex items-center justify-center gap-2 md:gap-3">
          {letters.map((letter, index) => (
            <div 
              key={index}
              className={`relative font-bold text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] select-none transition-all duration-300 ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
              style={{
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                color: '#ffffff',
                textShadow: `
                  0 0 30px rgba(59, 130, 246, 0.3),
                  0 4px 8px rgba(0, 0, 0, 0.3)
                `,
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
              }}
            >
              {letter}
              
              {/* Single subtle depth layer */}
              <div 
                className="absolute inset-0 font-bold text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] select-none"
                style={{
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  color: 'rgba(148, 163, 184, 0.15)',
                  transform: 'translate(-2px, 2px)',
                  zIndex: -1,
                }}
              >
                {letter}
              </div>

              {/* Minimal outline */}
              <div 
                className="absolute inset-0 font-bold text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] select-none"
                style={{
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  WebkitTextStroke: '1px rgba(59, 130, 246, 0.1)',
                  WebkitTextFillColor: 'transparent',
                  opacity: isHovered ? 0.8 : 0.4,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {letter}
              </div>
            </div>
          ))}
        </div>

        {/* Clean subtitle */}
        {subtitle && (
          <div 
            className={`mt-8 md:mt-12 text-lg md:text-xl lg:text-2xl font-normal tracking-wide transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-70'
            }`}
            style={{
              color: '#e2e8f0',
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Minimal hover indicator */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute border border-blue-400/10 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
              animation: 'subtlePulse 2s ease-in-out infinite',
            }}
          />
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes subtlePulse {
            0%, 100% { 
              opacity: 0.1; 
              transform: translate(-50%, -50%) scale(1); 
            }
            50% { 
              opacity: 0.05; 
              transform: translate(-50%, -50%) scale(1.05); 
            }
          }
        `
      }} />
    </div>
  );
};

export default ProfessionalVITSText;