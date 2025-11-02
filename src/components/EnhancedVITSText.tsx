import React, { useState, useEffect, useRef } from 'react';

interface EnhancedVITSTextProps {
  text?: string;
  className?: string;
  subtitle?: string;
  showParticles?: boolean;
}

const EnhancedVITSText: React.FC<EnhancedVITSTextProps> = ({
  text = 'VITS',
  className = '',
  subtitle = 'ICT Society of St. Sylvester\'s College',
  showParticles = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Text splitting
  const letters = text.split('');
  const subtitleWords = subtitle.split(' ');

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic background with scroll effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black transition-all duration-1000"
        style={{
          opacity: 0.95 - scrollY * 0.0005,
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />

      {/* Enhanced particles with scroll parallax */}
      {showParticles && isInViewport && (
        <>
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`absolute w-${i % 2 ? '2' : '1'} h-${i % 2 ? '2' : '1'} bg-blue-${400 + (i % 3) * 100}/30 rounded-full animate-pulse`}
              style={{
                left: `${15 + i * 10}%`,
                top: `${20 + i * 8}%`,
                transform: `translateY(${scrollY * (0.1 + i * 0.05)}px)`,
                opacity: hasAnimated ? (0.3 + Math.sin(Date.now() * 0.001 + i) * 0.2) : 0,
                transition: 'opacity 1s ease-out',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Main text with scroll effects */}
      <div 
        className="relative text-center z-10 transition-all duration-700"
        style={{
          transform: `translateY(${scrollY * -0.2}px) scale(${Math.max(0.8, 1 - scrollY * 0.0003)})`,
          opacity: Math.max(0.3, 1 - scrollY * 0.001),
        }}
      >
        {/* Background glow */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 blur-3xl transition-all duration-700"
            style={{
              background: `radial-gradient(circle, 
                rgba(59, 130, 246, ${isHovered ? 0.4 : 0.2}) 0%, 
                rgba(99, 102, 241, ${isHovered ? 0.2 : 0.1}) 40%,
                transparent 70%)`,
              transform: 'scale(1.5)',
            }}
          />
        </div>

        {/* Text with staggered letter animations */}
        <div className="relative flex items-center justify-center gap-2 md:gap-4">
          {letters.map((letter, index) => (
            <div 
              key={index}
              className={`font-bold text-7xl md:text-8xl lg:text-9xl select-none transition-all duration-500`}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                color: '#ffffff',
                textShadow: `
                  0 0 30px rgba(59, 130, 246, 0.6),
                  0 8px 16px rgba(0, 0, 0, 0.4)
                `,
                transform: `
                  scale(${isHovered ? 1.05 : 1}) 
                  translateY(${hasAnimated ? 0 : 50}px)
                  rotateZ(${isHovered ? (index % 2 ? 1 : -1) : 0}deg)
                `,
                opacity: hasAnimated ? 1 : 0,
                animation: hasAnimated ? `letterDrop 0.8s ease-out ${index * 0.1}s forwards` : 'none',
              }}
            >
              {letter}
              
              {/* Depth layer */}
              <div 
                className="absolute inset-0 font-bold text-7xl md:text-8xl lg:text-9xl select-none"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: 'rgba(59, 130, 246, 0.2)',
                  transform: 'translate(-3px, 3px)',
                  zIndex: -1,
                }}
              >
                {letter}
              </div>

              {/* Animated outline */}
              <div 
                className="absolute inset-0 font-bold text-7xl md:text-8xl lg:text-9xl select-none"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  WebkitTextStroke: `2px rgba(59, 130, 246, ${0.3 + Math.sin(Date.now() * 0.002 + index) * 0.2})`,
                  WebkitTextFillColor: 'transparent',
                  opacity: isHovered ? 0.8 : 0.5,
                }}
              >
                {letter}
              </div>
            </div>
          ))}
        </div>

        {/* Subtitle with word animations */}
        {subtitle && (
          <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-2">
            {subtitleWords.map((word, index) => (
              <div
                key={index}
                className="overflow-hidden"
              >
                <div
                  className={`text-lg md:text-xl lg:text-2xl font-normal tracking-wide transition-all duration-300`}
                  style={{
                    color: '#e2e8f0',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    transform: hasAnimated ? 'translateY(0)' : 'translateY(100%)',
                    opacity: isHovered ? 1 : 0.8,
                    animation: hasAnimated ? `slideUp 0.6s ease-out ${0.5 + index * 0.1}s forwards` : 'none',
                  }}
                >
                  {word}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hover effects */}
      {isHovered && isInViewport && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute border border-blue-400/20 rounded-full animate-ping"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              height: '500px',
            }}
          />
          <div
            className="absolute border border-indigo-400/15 rounded-full animate-pulse"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '700px',
              height: '700px',
              animationDelay: '0.5s',
            }}
          />
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes letterDrop {
            from {
              opacity: 0;
              transform: translateY(50px) scale(0.8) rotateZ(10deg);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1) rotateZ(0deg);
            }
          }
          
          @keyframes slideUp {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
        `
      }} />
    </div>
  );
};

export default EnhancedVITSText;