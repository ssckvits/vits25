import React, { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
}

interface SimpleEnhanced3DVITSTextProps {
  text?: string;
  className?: string;
  subtitle?: string;
  showParticles?: boolean;
}

const SimpleEnhanced3DVITSText: React.FC<SimpleEnhanced3DVITSTextProps> = ({
  text = 'VITS',
  className = '',
  subtitle = 'ICT Society of St. Sylvester\'s College',
  showParticles = true,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [time, setTime] = useState(0);

  // Generate dynamic particles
  useEffect(() => {
    if (showParticles) {
      const colors = ['#00ffff', '#0080ff', '#8000ff', '#ff0080', '#ff8000', '#80ff00'];
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.3,
      }));
      setParticles(newParticles);
    }
  }, [showParticles]);

  // Animation timer
  useEffect(() => {
    if (!showParticles) return;
    
    const interval = setInterval(() => {
      setTime(prev => prev + 0.05);
    }, 50);
    
    return () => clearInterval(interval);
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
      {/* Dynamic background gradient */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 15}% ${50 + mousePos.y * 15}%, 
            rgba(0,255,255,0.3) 0%, 
            rgba(128,0,255,0.2) 40%, 
            rgba(255,0,128,0.1) 70%, 
            transparent 100%)`,
          transition: 'all 0.5s ease',
        }}
      />

      {/* Animated particles */}
      {showParticles && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full transition-all duration-1000"
          style={{
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x + Math.sin(time * particle.speed) * 10}%`,
            top: `${particle.y + Math.cos(time * particle.speed * 0.8) * 8}%`,
            opacity: particle.opacity * (isHovered ? 1.2 : 1),
            filter: `blur(${particle.size * 0.3}px)`,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            transform: `scale(${1 + Math.sin(time * 2 + particle.id) * 0.2})`,
          }}
        />
      ))}

      {/* Main text container with 3D effects */}
      <div 
        className="relative text-center"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Background glow */}
        <div className="absolute inset-0">
          <div 
            className={`absolute inset-0 blur-3xl transition-all duration-500`}
            style={{
              background: `radial-gradient(circle, 
                rgba(0,255,255,${isHovered ? 0.6 : 0.3}) 0%, 
                rgba(128,0,255,${isHovered ? 0.4 : 0.2}) 40%,
                rgba(255,0,128,${isHovered ? 0.3 : 0.15}) 70%,
                transparent 90%)`,
              transform: 'scale(2)',
            }}
          />
        </div>

        {/* Text with enhanced styling */}
        <div className="relative flex items-center justify-center gap-1 md:gap-2">
          {letters.map((letter, index) => (
            <div 
              key={index}
              className={`relative font-black text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] select-none transition-all duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                color: '#ffffff',
                textShadow: `
                  0 0 20px rgba(0,255,255,0.8),
                  0 0 40px rgba(128,0,255,0.6),
                  0 0 60px rgba(255,0,128,0.4),
                  0 0 80px rgba(0,255,255,0.2)
                `,
                transform: isHovered ? `rotate(${(index % 2 ? 2 : -2)}deg)` : 'rotate(0deg)',
              }}
            >
              {letter}
              
              {/* 3D depth layers */}
              <div 
                className="absolute inset-0 font-black text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] select-none"
                style={{
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  color: 'rgba(100, 150, 200, 0.4)',
                  transform: 'translate(-3px, 3px)',
                  zIndex: -1,
                }}
              >
                {letter}
              </div>
              
              <div 
                className="absolute inset-0 font-black text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] select-none"
                style={{
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  color: 'rgba(50, 100, 150, 0.3)',
                  transform: 'translate(-6px, 6px)',
                  zIndex: -2,
                }}
              >
                {letter}
              </div>

              {/* Animated stroke */}
              <div 
                className="absolute inset-0 font-black text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] select-none"
                style={{
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  WebkitTextStroke: `2px rgba(0,255,255,${0.6 + Math.sin(time * 2 + index) * 0.2})`,
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {letter}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced subtitle */}
        {subtitle && (
          <div 
            className={`mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold tracking-wider transition-all duration-300 ${
              isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-80 transform translate-y-1'
            }`}
            style={{
              background: 'linear-gradient(90deg, #00ffff, #8000ff, #ff0080, #00ffff)',
              backgroundSize: '300% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient-shift 4s ease-in-out infinite',
              textShadow: '0 0 10px rgba(0,255,255,0.3)',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Hover ring effects */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute border border-cyan-400/20 rounded-full animate-ping"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
            }}
          />
          <div
            className="absolute border border-purple-400/15 rounded-full animate-pulse"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '800px',
              height: '800px',
              animationDelay: '0.5s',
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default SimpleEnhanced3DVITSText;