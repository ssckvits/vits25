import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
  angle: number;
  rotSpeed: number;
}

interface Enhanced3DVITSTextProps {
  text?: string;
  className?: string;
  subtitle?: string;
  showParticles?: boolean;
}

const Enhanced3DVITSText: React.FC<Enhanced3DVITSTextProps> = ({
  text = 'VITS',
  className = '',
  subtitle = 'ICT Society of St. Sylvester\'s College',
  showParticles = true,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Generate dynamic particles
  useEffect(() => {
    if (showParticles) {
      const colors = ['#00ffff', '#0080ff', '#8000ff', '#ff0080', '#ff8000', '#80ff00'];
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 100,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.8 + 0.2,
        angle: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2,
      }));
      setParticles(newParticles);
    }
  }, [showParticles]);

  // Animation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.016); // ~60fps
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Initial entrance animation
  useEffect(() => {
    controls.start({
      scale: [0, 1.2, 1],
      rotateY: [180, -10, 0],
      rotateX: [90, -5, 0],
      transition: { duration: 2, ease: "easeOut", times: [0, 0.6, 1] }
    });
  }, [controls]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleHover = () => {
    setIsHovered(true);
    controls.start({
      scale: 1.1,
      rotateY: mousePos.x * 5,
      rotateX: -mousePos.y * 5,
      transition: { duration: 0.3 }
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.start({
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    });
  };

  const letters = text.split('');

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden flex items-center justify-center ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
    >
      {/* Dynamic background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, 
            rgba(0,255,255,0.3) 0%, 
            rgba(128,0,255,0.2) 30%, 
            rgba(255,0,128,0.1) 60%, 
            transparent 100%)`,
          transition: 'all 0.3s ease',
        }}
      />

      {/* Animated particles */}
      {showParticles && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x + Math.sin(time * particle.speed + particle.angle) * 20}%`,
            top: `${particle.y + Math.cos(time * particle.speed * 0.7 + particle.angle) * 15}%`,
            opacity: particle.opacity * (isHovered ? 1.5 : 1),
            filter: `blur(${particle.size * 0.2}px)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transform: `rotate(${time * particle.rotSpeed * 60}deg) scale(${1 + Math.sin(time * 2 + particle.id) * 0.3})`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: 2 + particle.speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.id * 0.1,
          }}
        />
      ))}

      {/* Main text container with enhanced 3D effects */}
      <motion.div 
        className="relative text-center perspective-1000"
        animate={controls}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Multiple background glows for depth */}
        <div className="absolute inset-0">
          <div 
            className={`absolute inset-0 blur-3xl transition-all duration-500`}
            style={{
              background: `radial-gradient(circle, 
                rgba(0,255,255,${isHovered ? 0.8 : 0.4}) 0%, 
                rgba(128,0,255,${isHovered ? 0.6 : 0.3}) 30%,
                rgba(255,0,128,${isHovered ? 0.4 : 0.2}) 60%,
                transparent 80%)`,
              transform: 'scale(2)',
            }}
          />
          <div 
            className="absolute inset-0 blur-xl"
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,${isHovered ? 0.3 : 0.1}) 0%, transparent 70%)`,
              transform: 'scale(1.5)',
            }}
          />
        </div>

        {/* Enhanced text with multiple layers */}
        <div className="relative flex items-center justify-center gap-2">
          {letters.map((letter, index) => (
            <motion.div 
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 100, rotateX: 90 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                rotateY: isHovered ? (index % 2 ? 5 : -5) : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.8,
                ease: "easeOut",
              }}
              whileHover={{ 
                scale: 1.2, 
                rotateZ: (index % 2 ? 5 : -5),
                transition: { duration: 0.3 }
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Main letter with gradient */}
              <div 
                className="relative font-black text-8xl md:text-9xl lg:text-[12rem] select-none"
                style={{
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  background: `linear-gradient(45deg, 
                    #00ffff ${time * 50 % 100}%, 
                    #8000ff ${(time * 50 + 25) % 100}%, 
                    #ff0080 ${(time * 50 + 50) % 100}%, 
                    #00ffff ${(time * 50 + 75) % 100}%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: `
                    0 0 20px rgba(0,255,255,0.5),
                    0 0 40px rgba(128,0,255,0.3),
                    0 0 60px rgba(255,0,128,0.2)
                  `,
                }}
              >
                {letter}
              </div>

              {/* 3D depth layers */}
              {Array.from({ length: 8 }, (_, layerIndex) => (
                <div 
                  key={layerIndex}
                  className="absolute inset-0 font-black text-8xl md:text-9xl lg:text-[12rem] select-none"
                  style={{
                    fontFamily: "'Impact', 'Arial Black', sans-serif",
                    color: `rgba(${layerIndex * 20}, ${100 + layerIndex * 15}, ${200 + layerIndex * 5}, ${0.6 - layerIndex * 0.07})`,
                    transform: `translateZ(-${layerIndex * 4}px) translateX(-${layerIndex * 2}px) translateY(${layerIndex * 2}px)`,
                    zIndex: -layerIndex,
                  }}
                >
                  {letter}
                </div>
              ))}

              {/* Animated outline */}
              <div 
                className="absolute inset-0 font-black text-8xl md:text-9xl lg:text-[12rem] select-none"
                style={{
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  WebkitTextStroke: `2px rgba(0,255,255,${0.5 + Math.sin(time * 3 + index) * 0.3})`,
                  WebkitTextFillColor: 'transparent',
                  transform: 'translateZ(1px)',
                }}
              >
                {letter}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced subtitle with typewriter effect */}
        {subtitle && (
          <motion.div 
            className="mt-8 text-center overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              className="text-lg md:text-2xl lg:text-3xl font-semibold tracking-wider"
              style={{
                background: `linear-gradient(90deg, 
                  #00ffff, #8000ff, #ff0080, #00ffff)`,
                backgroundSize: '300% 100%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-shift 3s ease-in-out infinite',
                textShadow: '0 0 10px rgba(0,255,255,0.3)',
              }}
            >
              {subtitle}
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Pulsing rings effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-cyan-400/30 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ 
                width: [0, 800, 1200], 
                height: [0, 800, 1200], 
                opacity: [0.8, 0.4, 0] 
              }}
              transition={{ 
                duration: 2, 
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeOut" 
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Enhanced3DVITSText;