import React, { useState } from 'react';

interface SimpleVITSTextProps {
  text?: string;
  className?: string;
  subtitle?: string;
  showParticles?: boolean;
}

const SimpleVITSText: React.FC<SimpleVITSTextProps> = ({
  text = 'VITS',
  className = '',
  subtitle = 'ICT Society of St. Sylvester\'s College',
  showParticles = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative w-full h-screen overflow-hidden flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Simple background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black opacity-95" />

      {/* Simple particles */}
      {showParticles && (
        <>
          <div className="absolute w-2 h-2 bg-blue-400/30 rounded-full top-1/4 left-1/4 animate-pulse" />
          <div className="absolute w-1 h-1 bg-cyan-400/40 rounded-full top-3/4 right-1/4 animate-bounce" />
          <div className="absolute w-1.5 h-1.5 bg-indigo-400/35 rounded-full top-1/2 right-1/3 animate-ping" />
        </>
      )}

      {/* Main text */}
      <div className="relative text-center z-10">
        <div className="relative">
          <h1 
            className={`font-bold text-8xl md:text-9xl select-none transition-all duration-300 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              color: '#ffffff',
              textShadow: `
                0 0 30px rgba(59, 130, 246, 0.5),
                0 8px 16px rgba(0, 0, 0, 0.3)
              `,
            }}
          >
            {text}
          </h1>
          
          {/* Simple depth effect */}
          <div 
            className="absolute inset-0 font-bold text-8xl md:text-9xl select-none -z-10"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              color: 'rgba(59, 130, 246, 0.2)',
              transform: 'translate(-4px, 4px)',
            }}
          >
            {text}
          </div>
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p 
            className={`mt-8 text-xl md:text-2xl font-normal tracking-wide transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-80'
            }`}
            style={{
              color: '#e2e8f0',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Simple hover effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute border border-blue-400/20 rounded-full animate-ping"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SimpleVITSText;