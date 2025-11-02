import React, { useState, useEffect, useRef } from 'react';

interface AnnouncementData {
  id: number;
  title: string;
  date: string;
  description: string;
  coverImage?: string;
  category: string;
  featured?: boolean;
}

const EnhancedFeedSection: React.FC = () => {
  const [focusedCard, setFocusedCard] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const announcements: AnnouncementData[] = [
    {
      id: 1,
      title: 'Annual Hackathon 2025',
      date: 'March 15, 2025',
      description: '48 hours of pure coding chaos. Innovation meets adrenaline. Prizes worth $5,000 await the brave.',
      category: 'Competition',
      featured: true,
      coverImage: '/api/placeholder/400/240'
    },
    {
      id: 2,
      title: 'Web Development Bootcamp',
      date: 'February 28, 2025',
      description: 'From zero to hero in React. Build your first web app with industry legends.',
      category: 'Workshop',
      coverImage: '/api/placeholder/400/240'
    },
    {
      id: 3,
      title: 'AI & ML Deep Dive',
      date: 'Ongoing Series',
      description: 'Unlock the secrets of artificial intelligence. Weekly sessions that bend reality.',
      category: 'Series',
      coverImage: '/api/placeholder/400/240'
    },
    {
      id: 4,
      title: 'Robotics Championship',
      date: 'April 10, 2025',
      description: 'Metal meets mind. Build, program, compete. The ultimate test of engineering prowess.',
      category: 'Competition',
      coverImage: '/api/placeholder/400/240'
    },
    {
      id: 5,
      title: 'Cybersecurity Workshop',
      date: 'March 5, 2025',
      description: 'Learn to protect and penetrate. Ethical hacking workshop with certified experts.',
      category: 'Workshop',
      coverImage: '/api/placeholder/400/240'
    }
  ];

  // No auto-scrolling

  useEffect(() => {
    if (!carouselRef.current) return;
    
    const handleScroll = () => {
      if (!carouselRef.current) return;
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = 380; // Card width + margin
      const centeredCard = Math.round(scrollLeft / cardWidth);
      setFocusedCard(centeredCard);
    };

    carouselRef.current.addEventListener('scroll', handleScroll);
    return () => carouselRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'competition':
        return 'from-blue-500 to-cyan-500';
      case 'workshop':
        return 'from-cyan-500 to-blue-500';
      case 'series':
        return 'from-white to-blue-400';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-500/3 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-cyan-500/3 blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Geometric background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 animate-ping" />
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-400 animate-pulse" />
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white animate-bounce" />
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4 animate-neon-pulse">
            The Feed
          </div>
          <h2 className="text-5xl font-bold mb-4 text-white">
            What's <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Happening</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Live updates from the digital frontier. Real events. Real impact. Real innovation.
          </p>
        </div>

        {/* Horizontal Scrolling Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-6"
            style={{
              scrollBehavior: 'smooth',
            }}
          >
            {announcements.map((announcement, index) => {
              const isFocused = index === focusedCard;
              const isAdjacent = Math.abs(index - focusedCard) === 1;

              return (
                <div
                  key={announcement.id}
                  className={`flex-shrink-0 w-80 transition-all duration-700 transform ${
                    isFocused
                      ? 'scale-105 z-20'
                      : isAdjacent
                      ? 'scale-100 z-10'
                      : 'scale-95 z-0'
                  }`}
                  style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-500 ${
                      isFocused
                        ? 'border-blue-400/50 shadow-2xl shadow-blue-500/20'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                    style={{
                      transform: isFocused ? 'rotateY(0deg)' : 'rotateY(5deg)',
                    }}
                  >
                    {/* Featured badge */}
                    {announcement.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white text-xs font-bold animate-pulse">
                          FEATURED
                        </div>
                      </div>
                    )}

                    {/* Cover Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30"
                        style={{
                          backgroundImage: announcement.coverImage ? `url(${announcement.coverImage})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Category chip */}
                      <div className="absolute top-4 left-4">
                        <div className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(announcement.category)} rounded-full text-white text-xs font-semibold`}>
                          {announcement.category}
                        </div>
                      </div>

                      {/* Date chip */}
                      <div className="absolute bottom-4 left-4">
                        <div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
                          {announcement.date}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${
                        isFocused
                          ? 'text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text'
                          : 'text-white'
                      }`}>
                        {announcement.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {announcement.description}
                      </p>
                    </div>

                    {/* Glow effect on focus */}
                    {isFocused && (
                      <div className="absolute inset-0 rounded-2xl border border-blue-400/30 animate-neon-pulse pointer-events-none" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setFocusedCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === focusedCard
                    ? 'bg-blue-400 scale-150'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
    </section>
  );
};

export default EnhancedFeedSection;