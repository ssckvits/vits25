import React, { useState, useEffect, useRef } from 'react';

interface FunctionalVITSTextProps {
  text?: string;
  className?: string;
  subtitle?: string;
  showParticles?: boolean;
}

// Custom easing functions
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
const easeOutElastic = (t: number) => {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

const FunctionalVITSText: React.FC<FunctionalVITSTextProps> = ({
  text = 'VITS',
  className = '',
  subtitle = 'ICT Society of St. Sylvester\'s College',
  showParticles = true,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [letterAnimations, setLetterAnimations] = useState<number[]>([]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Viewport detection using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Trigger staggered letter animations
          const delays = text.split('').map((_, i) => i * 0.1);
          setLetterAnimations(delays);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% visible
        rootMargin: '-50px 0px', // Add some margin
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [text, hasAnimated]);

  // Sticky position effect based on scroll
  const getStickyTransform = () => {
    const progress = Math.min(scrollY / 500, 1);
    const easedProgress = easeInOutQuart(progress);
    return {
      transform: `translateY(${easedProgress * -20}px) scale(${1 - easedProgress * 0.1})`,
      opacity: 1 - easedProgress * 0.3,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Text splitting for individual letter animations
  const letters = text.split('');
  const subtitleWords = subtitle.split(' ');

  // Calculate parallax effect for particles
  const getParallaxOffset = (depth: number) => ({
    x: scrollY * depth * 0.5,
    y: scrollY * depth * 0.3,
  });

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden flex items-center justify-center ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={getStickyTransform()}
    >
      {/* Dynamic background with scroll parallax */}
      <div 
        className="absolute inset-0 opacity-10 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 10}% ${50 + mousePos.y * 10}%, 
            rgba(59, 130, 246, 0.2) 0%, 
            transparent 70%)`,
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />

      {/* Enhanced floating elements with parallax */}
      {showParticles && isInViewport && (
        <>
          {Array.from({ length: 6 }, (_, i) => {
            const parallax = getParallaxOffset(0.1 + i * 0.05);
            return (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-blue-${400 + i * 50}/20 rounded-full`}
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  transform: `translate(${mousePos.x * (5 + i * 2)}px, ${mousePos.y * (3 + i)}px) translate(${parallax.x}px, ${parallax.y}px)`,
                  transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                  opacity: isInViewport ? 1 : 0,
                  animationDelay: `${i * 0.2}s`,
                  animation: hasAnimated ? 'fadeInFloat 1s ease-out forwards' : 'none',
                }}
              />
            );
          })}
        </>
      )}

      {/* Main text container with enhanced 3D effects */}
      <div 
        className="relative text-center transition-all duration-700 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 3}deg) rotateX(${-mousePos.y * 2}deg) translateY(${scrollY * -0.1}px)`,
        }}
      >
        {/* Multi-layered background glow */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 blur-3xl transition-all duration-700"
            style={{
              background: `radial-gradient(circle, 
                rgba(59, 130, 246, ${isHovered ? 0.12 : isInViewport ? 0.08 : 0.04}) 0%, 
                rgba(99, 102, 241, ${isHovered ? 0.08 : isInViewport ? 0.05 : 0.02}) 40%,
                transparent 70%)`,
              transform: 'scale(1.8)',
            }}
          />
        </div>

        {/* Text with splitting and staggered animations */}
        <div className="relative flex items-center justify-center gap-2 md:gap-4">
          {letters.map((letter, index) => {
            const animationDelay = letterAnimations[index] || 0;
            const scrollProgress = Math.min(Math.max((scrollY - 100) / 300, 0), 1);
            const letterEasing = easeOutElastic(Math.max(0, 1 - scrollProgress));
            
            return (
              <div 
                key={index}
                className={`relative font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl select-none transition-all duration-500`}
                style={{
                  fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
                  color: '#ffffff',
                  textShadow: `
                    0 0 30px rgba(59, 130, 246, ${0.4 + Math.sin(Date.now() * 0.001 + index) * 0.1}),
                    0 8px 16px rgba(0, 0, 0, 0.3),
                    0 2px 4px rgba(0, 0, 0, 0.2)
                  `,
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
                  transform: `
                    scale(${isHovered ? 1.05 : 1}) 
                    translateY(${hasAnimated ? 0 : 50}px) 
                    rotateZ(${isHovered ? (index % 2 ? 1 : -1) : 0}deg)
                    translateY(${letterEasing * 10}px)
                  `,
                  opacity: hasAnimated ? 1 : 0,
                  animation: hasAnimated ? `letterSlide 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${animationDelay}s forwards` : 'none',
                }}
              >
                {letter}
                
                {/* Enhanced depth layers */}
                <div 
                  className="absolute inset-0 font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl select-none"
                  style={{
                    fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
                    color: 'rgba(148, 163, 184, 0.2)',
                    transform: 'translate(-3px, 3px)',
                    zIndex: -1,
                  }}
                >
                  {letter}
                </div>
                
                <div 
                  className="absolute inset-0 font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl select-none"
                  style={{
                    fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
                    color: 'rgba(100, 116, 139, 0.15)',
                    transform: 'translate(-6px, 6px)',
                    zIndex: -2,
                  }}
                >
                  {letter}
                </div>

                {/* Dynamic outline with scroll effect */}
                <div 
                  className="absolute inset-0 font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl select-none"
                  style={{
                    fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
                    WebkitTextStroke: `2px rgba(59, 130, 246, ${0.1 + scrollProgress * 0.2})`,
                    WebkitTextFillColor: 'transparent',
                    opacity: isHovered ? 0.8 : 0.5,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {letter}
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtitle with word splitting and staggered entry */}
        {subtitle && (
          <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-2">
            {subtitleWords.map((word, index) => (
              <div
                key={index}
                className="overflow-hidden"
                style={{
                  animation: hasAnimated ? `slideUp 0.6s ease-out ${0.5 + index * 0.1}s forwards` : 'none',
                }}
              >
                <div
                  className={`text-lg md:text-xl lg:text-2xl font-normal tracking-wide transition-all duration-300`}
                  style={{
                    color: '#e2e8f0',
                    fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    transform: hasAnimated ? 'translateY(0)' : 'translateY(100%)',
                    opacity: isHovered ? 1 : 0.8,
                  }}
                >
                  {word}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced hover indicator with scroll interaction */}
      {isHovered && isInViewport && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute border border-blue-400/15 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${400 + scrollY * 0.2}px`,
              height: `${400 + scrollY * 0.2}px`,
              animation: 'expandPulse 3s ease-in-out infinite',
            }}
          />
          <div
            className="absolute border border-indigo-400/10 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${600 + scrollY * 0.3}px`,
              height: `${600 + scrollY * 0.3}px`,
              animation: 'expandPulse 3s ease-in-out infinite 1s',
            }}
          />
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes letterSlide {
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
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes fadeInFloat {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes expandPulse {
            0%, 100% { 
              opacity: 0.15; 
              transform: translate(-50%, -50%) scale(1); 
            }
            50% { 
              opacity: 0.05; 
              transform: translate(-50%, -50%) scale(1.1); 
            }
          }
        `
      }} />
    </div>
  );
};

export default FunctionalVITSText;