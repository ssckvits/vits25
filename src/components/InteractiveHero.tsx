import React, { useState, useEffect } from 'react';
import vitsVideo from '../assets/Vits Logo 2(2).webm';

interface InteractiveHeroProps {
  text?: string;
  className?: string;
  showParticles?: boolean;
}

const InteractiveHero: React.FC<InteractiveHeroProps> = ({
  text = 'VITS',
  className = '',
  showParticles = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTagline, setCurrentTagline] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [letterAnimations, setLetterAnimations] = useState([0, 0, 0, 0]);

  const taglines = [
    "Where Coders Evolve. Where Ideas Ignite.",
    "Build. Break. Innovate.",
    "Code the impossible.",
    "Powered by imagination."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = ((e.clientX - rect.left - centerX) / centerX) * 15;
    const y = ((e.clientY - rect.top - centerY) / centerY) * 15;
    setMousePosition({ x, y });
  };

  const handleTextClick = () => {
    setIsClicked(true);
    // Trigger letter animations
    const newAnimations = [0, 0, 0, 0];
    ['V', 'I', 'T', 'S'].forEach((_, index) => {
      setTimeout(() => {
        setLetterAnimations(prev => {
          const updated = [...prev];
          updated[index] = Date.now();
          return updated;
        });
      }, index * 150);
    });

    setTimeout(() => setIsClicked(false), 2000);
  };

  const getLetterStyle = (index: number) => {
    const animationTime = letterAnimations[index];
    const isAnimating = animationTime > 0 && Date.now() - animationTime < 1500;

    return {
      transform: `
        rotateX(${mousePosition.y * 0.8}deg) 
        rotateY(${mousePosition.x * 0.8}deg)
        ${isAnimating ? 'rotateZ(360deg) scale(1.2)' : ''}
        translateZ(${isHovered ? '50px' : '0px'})
      `,
      transition: isAnimating ? 'transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'transform 0.3s ease-out',
      textShadow: `
        0 0 ${isAnimating ? '60px' : '40px'} rgba(59, 130, 246, ${isAnimating ? '1' : '0.8'}),
        0 0 ${isAnimating ? '120px' : '80px'} rgba(6, 182, 212, ${isAnimating ? '0.8' : '0.4'}),
        0 ${isAnimating ? '20px' : '8px'} ${isAnimating ? '60px' : '32px'} rgba(0, 0, 0, 0.6)
      `,
    };
  };

  return (
    <div
      className={`relative w-full h-screen overflow-hidden flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
      >
        <source src={vitsVideo} type="video/webm" />
      </video>

      {/* Floating Particles */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Binary streams */}
          <div className="absolute top-10 left-10 text-blue-400/20 text-xs animate-float-up">
            01010110 01001001 01010100 01010011
          </div>
          <div className="absolute top-32 right-16 text-cyan-400/30 text-xs animate-float-up" style={{ animationDelay: '2s' }}>
            01010011 01010011 01000011 01001011
          </div>

          {/* Geometric nodes */}
          <div className="absolute top-1/4 left-1/5 w-4 h-4 border border-blue-400/30 rotate-45 animate-spin-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-6 h-6 border border-cyan-400/40 animate-pulse" />
          <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-white/20 animate-ping" />

          {/* Light rays */}
          <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-blue-400/40 to-transparent animate-fade-pulse" />
          <div className="absolute top-1/4 right-0 h-px w-32 bg-gradient-to-l from-cyan-400/40 to-transparent animate-fade-pulse" style={{ animationDelay: '1s' }} />

          {/* Fog particles */}
          <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-blue-400/5 blur-xl animate-float-gentle" />
          <div className="absolute top-1/3 right-20 w-40 h-40 rounded-full bg-cyan-400/5 blur-xl animate-float-gentle" style={{ animationDelay: '3s' }} />
        </div>
      )}

      {/* Main Content */}
      <div className="relative text-center z-10">
        {/* Interactive 3D Text */}
        <div
          className="relative perspective-1000 cursor-pointer"
          onClick={handleTextClick}
        >
          <div
            className={`font-bold text-8xl md:text-9xl select-none transition-all duration-500 flex justify-center ${isHovered ? 'scale-105' : 'scale-100'
              }`}
            style={{
              fontFamily: "'mechfire', system-ui, sans-serif",
              transformStyle: 'preserve-3d',
            }}
          >
            {text.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{
                  color: '#ffffff',
                  transformStyle: 'preserve-3d',
                  ...getLetterStyle(index),
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* 3D Letter Shadows */}
          <div
            className="absolute inset-0 font-bold text-8xl md:text-9xl select-none pointer-events-none flex justify-center"
            style={{
              fontFamily: "'mechfire', system-ui, sans-serif",
              transformStyle: 'preserve-3d',
            }}
          >
            {text.split('').map((letter, index) => (
              <span
                key={`shadow1-${index}`}
                className="inline-block"
                style={{
                  color: 'rgba(59, 130, 246, 0.3)',
                  transform: `
                    translate(-8px, 8px) 
                    rotateX(${mousePosition.y * 0.6}deg) 
                    rotateY(${mousePosition.x * 0.6}deg)
                    translateZ(-20px)
                  `,
                  transformStyle: 'preserve-3d',
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          <div
            className="absolute inset-0 font-bold text-8xl md:text-9xl select-none pointer-events-none flex justify-center"
            style={{
              fontFamily: "'mechfire', system-ui, sans-serif",
              transformStyle: 'preserve-3d',
            }}
          >
            {text.split('').map((letter, index) => (
              <span
                key={`shadow2-${index}`}
                className="inline-block"
                style={{
                  color: 'rgba(6, 182, 212, 0.2)',
                  transform: `
                    translate(-16px, 16px) 
                    rotateX(${mousePosition.y * 0.4}deg) 
                    rotateY(${mousePosition.x * 0.4}deg)
                    translateZ(-40px)
                  `,
                  transformStyle: 'preserve-3d',
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Wireframe Effect */}
          {/* {isClicked && (
            <div 
              className="absolute inset-0 font-bold text-8xl md:text-9xl select-none pointer-events-none flex justify-center"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                WebkitTextStroke: '2px rgba(59, 130, 246, 0.8)',
                color: 'transparent',
                animation: 'wireframe-pulse 2s ease-out',
                transform: `
                  rotateX(${mousePosition.y * 0.8}deg) 
                  rotateY(${mousePosition.x * 0.8}deg)
                  translateZ(60px)
                `,
              }}
            >
              {text.split('').map((letter, index) => (
                <span key={`wireframe-${index}`} className="inline-block">
                  {letter}
                </span>
              ))}
            </div>
          )} */}
        </div>

        {/* Subtext under main VITS text */}
        <div className="mt-4 flex items-center justify-center" aria-hidden={false}>
          <p
            className="text-sm md:text-lg text-blue-200/90 font-medium tracking-wide select-none"
            style={{ fontFamily: "'JetBrains Mono', monospace", textShadow: '0 0 12px rgba(59,130,246,0.18)' }}
            aria-label="ICT Society of St. Sylvester's College"
          >
            ICT Society of St. Sylvester's College
          </p>
        </div>

        {/* Rotating Taglines */}
        <div className="mt-8 h-16 flex items-center justify-center">
          <div className="relative overflow-hidden">
            {taglines.map((tagline, index) => (
              <p
                key={index}
                className={`absolute inset-0 text-xl md:text-2xl font-medium tracking-wide transition-all duration-1000 ${index === currentTagline
                  ? 'opacity-100 transform translate-y-0'
                  : 'opacity-0 transform translate-y-full'
                  }`}
                style={{
                  color: '#e2e8f0',
                  fontFamily: "'JetBrains Mono', monospace",
                  textShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                  left: '50%',
                  transform: `translateX(-50%) ${index === currentTagline ? 'translateY(0)' : 'translateY(100%)'}`,
                  whiteSpace: 'nowrap',
                }}
              >
                {tagline}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive glow rings */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* <div
            className="absolute border border-blue-400/30 rounded-full animate-ping"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
            }}
          /> */}
          <div
            className="absolute border border-cyan-400/20 rounded-full animate-ping"
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

    </div>
  );
};

export default InteractiveHero;