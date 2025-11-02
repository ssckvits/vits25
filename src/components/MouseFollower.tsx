import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion';

interface MouseFollowerProps {
  effectType?: 'sparkles' | 'lightning' | 'trail' | 'none';
  isActive?: boolean;
}

const MouseFollower: React.FC<MouseFollowerProps> = ({ 
  effectType = 'trail',
  isActive = true 
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const trailRef = useRef<Array<{ x: number; y: number; timestamp: number }>>([]);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      const now = Date.now();
      trailRef.current.push({ x: e.clientX, y: e.clientY, timestamp: now });
      
      // Keep only recent trail points (last 500ms)
      trailRef.current = trailRef.current.filter(point => now - point.timestamp < 500);

      // Generate sparkles on movement
      if (effectType === 'sparkles' && Math.random() > 0.7) {
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 40,
          y: e.clientY + (Math.random() - 0.5) * 40,
          delay: Math.random() * 0.5,
        };
        
        setSparkles(prev => [...prev.slice(-10), newSparkle]);
        
        // Remove sparkle after animation
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 2000);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [effectType, isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Main cursor glow */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-60 mix-blend-screen"
        style={{
          left: mousePos.x - 12,
          top: mousePos.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Trail effect */}
      {effectType === 'trail' && trailRef.current.map((point, index) => {
        const age = Date.now() - point.timestamp;
        const opacity = Math.max(0, 1 - age / 500);
        const size = Math.max(2, 12 - (age / 500) * 10);
        
        return (
          <div
            key={`${point.x}-${point.y}-${index}`}
            className="fixed rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mix-blend-screen"
            style={{
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: size,
              height: size,
              opacity,
              transform: `scale(${opacity})`,
            }}
          />
        );
      })}

      {/* Sparkles effect */}
      {effectType === 'sparkles' && sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="fixed w-2 h-2 bg-yellow-400 rounded-full mix-blend-screen"
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1, 0], 
            rotate: 360,
            y: -20 
          }}
          transition={{ 
            duration: 1.5,
            delay: sparkle.delay,
            ease: "easeOut"
          }}
        >
          {/* Sparkle rays */}
          <div className="absolute inset-0">
            <div className="absolute w-4 h-0.5 bg-yellow-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-0.5 h-4 bg-yellow-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </motion.div>
      ))}

      {/* Lightning effect */}
      {effectType === 'lightning' && (
        <div className="fixed inset-0">
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 bg-gradient-to-b from-blue-400 via-cyan-300 to-transparent opacity-80"
              style={{
                left: mousePos.x + (i - 1) * 20,
                top: mousePos.y,
                height: 100,
                transformOrigin: 'top',
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </div>
      )}

      {/* Outer ring */}
      <motion.div
        className="fixed border-2 border-cyan-400 rounded-full opacity-30 mix-blend-screen"
        style={{
          left: mousePos.x - 20,
          top: mousePos.y - 20,
          width: 40,
          height: 40,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default MouseFollower;