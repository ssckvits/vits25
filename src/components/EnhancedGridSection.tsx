import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Rocket, Image as ImageIcon } from 'lucide-react';

interface QuickLinkData {
  icon: React.ElementType;
  title: string;
  description: string;
  path: string;
  color: string;
}

const EnhancedGridSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [isRevealing, setIsRevealing] = useState<number | null>(null);

  const quickLinks: QuickLinkData[] = [
    {
      icon: Calendar,
      title: 'Events',
      description: 'Workshops, hackathons, and tech talks that push boundaries',
      path: '/events',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Rocket,
      title: 'Projects',
      description: 'Student innovations and developments that change the world',
      path: '/projects',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: ImageIcon,
      title: 'Gallery',
      description: 'Moments captured from our incredible tech journey',
      path: '/gallery',
      color: 'from-white to-cyan-400',
    },
  ];

  const handleCardClick = (e: React.MouseEvent, index: number, path: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setClickPosition({ x, y });
    setIsRevealing(index);

    // Navigate after animation
    setTimeout(() => {
      window.location.href = path;
    }, 600);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Ambient gradient glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating geometric elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-2 h-2 bg-blue-400 animate-ping" />
          <div className="absolute bottom-20 left-10 w-1 h-1 bg-cyan-400 animate-pulse" />
          <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-white animate-bounce" />
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-white">
            Explore <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">The Grid</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light">
            Navigate through our digital universe. Every click opens new possibilities.
          </p>
        </div>

        {/* 3D Grid */}
        <div 
          className="grid md:grid-cols-3 gap-8 perspective-1000"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(e) => handleCardClick(e, index, link.path)}
            >
              {/* Ambient gradient glow behind card */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-5 blur-xl rounded-2xl transition-all duration-500 ${
                  hoveredIndex === index ? 'scale-110 opacity-1' : 'scale-100'
                }`}
              />

              {/* 3D Holographic Cube */}
              <div 
                className={`relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 h-80 flex flex-col items-center justify-center text-center transition-all duration-700 transform-gpu ${
                  hoveredIndex === index
                    ? 'rotate-y-12 scale-105 border-white/30'
                    : 'rotate-y-0 scale-100'
                } ${
                  index === 1 ? 'rotate-y-6' : index === 2 ? 'rotate-y--6' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `
                    ${hoveredIndex === index ? 'rotateY(12deg) scale(1.05)' : 'rotateY(0deg) scale(1)'}
                    ${index === 1 ? 'rotateY(6deg)' : index === 2 ? 'rotateY(-6deg)' : ''}
                  `,
                }}
              >
                {/* Holographic overlay */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 holographic-bg" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center space-y-6">
                  {/* Icon */}
                  <div 
                    className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center transition-all duration-500 ${
                      hoveredIndex === index ? 'scale-110' : ''
                    }`}
                    style={{
                      boxShadow: hoveredIndex === index 
                        ? `0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)` 
                        : '0 0 0px transparent'
                    }}
                  >
                    <link.icon className="h-10 w-10 text-white drop-shadow-lg" />
                    
                    {/* Simple border on hover */}
                    <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${
                      hoveredIndex === index 
                        ? 'border-blue-400/60' 
                        : 'border-transparent'
                    }`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-3xl font-bold transition-all duration-300 ${
                    hoveredIndex === index
                      ? 'text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text scale-110'
                      : 'text-white'
                  }`}>
                    {link.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-gray-300 text-base leading-relaxed transition-all duration-300 ${
                    hoveredIndex === index ? 'text-gray-200' : ''
                  }`}>
                    {link.description}
                  </p>

                  {/* Explore indicator */}
                  <div className={`flex items-center space-x-2 text-blue-400 font-medium transition-all duration-300 ${
                    hoveredIndex === index
                      ? 'opacity-100 translate-x-2'
                      : 'opacity-70'
                  }`}>
                    <span>Explore</span>
                    <div className="w-1 h-1 bg-blue-400 rounded-full" />
                    <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                    <div className="w-1 h-1 bg-blue-400 rounded-full" />
                  </div>
                </div>

                {/* 3D depth edges */}
                <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl transform translate-x-1 translate-y-1" />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl transform translate-x-2 translate-y-2" />
                </div>

                {/* Radial reveal effect */}
                {/* {isRevealing === index && (
                  <div 
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{
                      background: `radial-gradient(circle at ${clickPosition.x}% ${clickPosition.y}%, 
                        rgba(59, 130, 246, 0.8) 0%, 
                        rgba(6, 182, 212, 0.6) 30%, 
                        transparent 70%
                      )`,
                      animation: 'radial-reveal 0.6s ease-out forwards'
                    }}
                  />
                )} */}

                {/* Glow effect on hover */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 rounded-2xl border border-blue-400/50 animate-neon-pulse pointer-events-none" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      <style >{`
        @keyframes radial-reveal {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        
        .rotate-y-6 {
          transform: rotateY(6deg);
        }
        
        .rotate-y--6 {
          transform: rotateY(-6deg);
        }
      `}</style>
    </section>
  );
};

export default EnhancedGridSection;