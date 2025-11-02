import React, { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

interface Interactive3DTextProps {
  text?: string;
  className?: string;
  subtitle?: string;
  showParticles?: boolean;
}

const Interactive3DText: React.FC<Interactive3DTextProps> = ({
  text = 'VITS',
  className = '',
  subtitle = 'INTERACTIVE EXPERIENCE',
  showParticles = true,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (showParticles) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 1,
      }));
      setParticles(newParticles);
    }
  }, [showParticles]);

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
      {/* Load Mechfire font */}
      <link href="https://fonts.cdnfonts.com/css/mechfire" rel="stylesheet" />

      {/* Animated particles */}
      {showParticles && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-teal-400 opacity-30 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.speed * 5}s ease-in-out infinite`,
            animationDelay: `${particle.id * 0.1}s`,
          }}
        />
      ))}

      {/* Main text container */}
      <div 
        className="relative text-center"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 15}deg) rotateX(${-mousePos.y * 15}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Background glow */}
        <div 
          className={`absolute inset-0 blur-3xl transition-opacity duration-500 ${
            isHovered ? 'opacity-70' : 'opacity-30'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(45,212,191,0.4) 0%, transparent 70%)',
            transform: 'scale(1.5)',
          }}
        />

        {/* Text */}
        <div className="relative flex items-center justify-center gap-1">
          {letters.map((letter, index) => (
            <div 
              key={index}
              className={`relative font-black text-9xl transition-all duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              style={{
                fontFamily: "'Mechfire', 'Impact', sans-serif",
                color: '#ffffff',
                textShadow: '0 0 40px rgba(255, 255, 255, 0.5)',
                transform: isHovered ? `rotate(${(index % 2 ? 1 : -1) * 2}deg)` : 'rotate(0deg)',
              }}
            >
              {letter}
              {/* 3D layers */}
              <div 
                className="absolute inset-0 -z-10" 
                style={{
                  transform: 'translate(-4px, 4px)',
                  color: '#94a3b8',
                  opacity: 0.4,
                }}
              >
                {letter}
              </div>
              <div 
                className="absolute inset-0 -z-20" 
                style={{
                  transform: 'translate(-8px, 8px)',
                  color: '#475569',
                  opacity: 0.3,
                }}
              >
                {letter}
              </div>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div 
            className={`mt-8 text-teal-300 text-xl tracking-widest transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-2'
            }`}
            style={{
              fontFamily: "'Mechfire', 'Impact', sans-serif",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Interactive3DText;