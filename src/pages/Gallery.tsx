import { useState } from 'react';
import { X, Home as HomeIcon, User, Mail, Calendar, Rocket, Image as ImageIcon } from 'lucide-react';
import EnhancedFooter from '@/components/EnhancedFooter';
import Dock from '@/components/Dock';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const gallerySection = useScrollAnimation();

  const photos = [
    { src: "src/assets/Gallery/G1.jpeg", title: "NETVORA '25", category: 'Events' },
    { src: "src/assets/Gallery/G2.jpeg", title: "NEXNOVA '25", category: 'Events' },
    { src: "src/assets/Gallery/G3.jpeg", title: "NEXNOVA '24", category: 'Events' },
    { src: "src/assets/Gallery/G4.jpeg", title: "NEXORA '25", category: 'Acheivments' },
    //{ src: "src/assets/Gallery/G9.jpeg", title: 'Sample', category: 'Events' },
    { src: "src/assets/Gallery/G5.jpeg", title: 'CODEDJAM 2025', category: 'Acheivments' },
    { src: "src/assets/Gallery/G6.jpeg", title: "SYNC '25", category: 'Events' },
    { src: "src/assets/Gallery/G7.jpeg", title: 'CODEDJAM 2025', category: 'Acheivments' },
    { src: "src/assets/Gallery/G8.jpeg", title: 'CODEDJAM 2025', category: 'Acheivments' },
    { src: "src/assets/Gallery/G10.jpeg", title: '65TH BATTLE OF THE BABES', category: 'Events' },
    { src: "src/assets/Gallery/G11.jpeg", title: '65TH BATTLE OF THE BABES', category: 'Events' },
    { src: "src/assets/Gallery/G12.jpeg", title: '#', category: 'Events' },
    { src: "src/assets/Gallery/G13.jpeg", title: 'PRIZE GIVING 2025', category: 'Events' },
    { src: "src/assets/Gallery/G14.jpeg", title: 'UOP SCHOOL WEB DEVELOPMENT WORKSHOP', category: 'Events' },
    { src: "src/assets/Gallery/G15.jpeg", title: "CYBERNETICS '25", category: 'Events' },

  ];

  // Main navigation items
  const dockItems = [
    { icon: <HomeIcon className="h-7 w-7 text-white" />, label: 'Home', onClick: () => window.location.href = '/' },
    { icon: <User className="h-7 w-7 text-white" />, label: 'About', onClick: () => window.location.href = '/about' },
    { icon: <Calendar className="h-7 w-7 text-white" />, label: 'Events', onClick: () => window.location.href = '/events' },
    { icon: <Rocket className="h-7 w-7 text-white" />, label: 'Projects', onClick: () => window.location.href = '/projects' },
    { icon: <ImageIcon className="h-7 w-7 text-white" />, label: 'Gallery', onClick: () => window.location.href = '/gallery' },
    { icon: <Mail className="h-7 w-7 text-white" />, label: 'Contact', onClick: () => window.location.href = '/contact' },
  ];
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Noise overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\' fill=\'none\'><filter id=\'a\' x=\'0\' y=\'0\' width=\'200%\' height=\'200%\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/></filter><rect width=\'200\' height=\'200\' fill=\'black\'/><rect width=\'200\' height=\'200\' filter=\'url(%23a)\' opacity=\'0.35\'/></svg>")',
          opacity: 0.25,
          mixBlendMode: 'screen',
        }}
      />
        {/* Dock centered at the bottom of the viewing area */}
        <div className="fixed bottom-0 left-0 w-full flex justify-center z-50 pb-4 pointer-events-none">
          <div className="pointer-events-auto">
            <Dock
              items={dockItems}
              className="bg-background/80 shadow-lg border border-neutral-700 px-4 py-2 rounded-2xl"
              panelHeight={64}
            />
          </div>
        </div>
        {/* Enhanced Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
          {/* Photo-frame inspired background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-16 h-16 border-2 border-cyan-400/30 rotate-12 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-blue-400/30 -rotate-12 animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-cyan-300/30 rotate-45 animate-pulse" style={{ animationDelay: '2.5s' }} />
          </div>
          
          {/* Floating photo elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
            <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-cyan-400/20 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
          </div>
          
          <div className="container-custom relative z-10">
            <div className="text-center max-w-5xl mx-auto space-y-8">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium mb-8 animate-pulse backdrop-blur-sm">
                📸 Visual Chronicles
              </div>
              <h1 className="text-7xl md:text-9xl font-bold text-white mb-8 leading-tight">
                <span className="block">Captured</span>
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">Moments</span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
                Every photo tells our story. Every moment captures our journey. Every memory shapes our future.
              </p>
              
              {/* Photo count stats */}
              <div className="flex justify-center space-x-12 mt-12 opacity-80">
                <div className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">500+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Memories</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">50+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Events</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">∞</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Stories</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-12 border-2 border-cyan-400/40 rounded-full flex justify-center">
                <div className="w-2 h-4 bg-cyan-400/60 rounded-full mt-2 animate-pulse" />
              </div>
              <span className="text-sm font-medium">Browse gallery</span>
            </div>
          </div> */}
        </section>

        {/* Photo Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div ref={gallerySection.ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-all duration-700 ${gallerySection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {photos.map((photo, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(photo.src)}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                  style={{
                    animation: gallerySection.isVisible ? `scale-in 0.5s ease-out ${index * 0.05}s both` : 'none'
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-sm font-semibold text-foreground">{photo.title}</p>
                      <p className="text-xs text-primary">{photo.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-card hover:bg-secondary transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        <EnhancedFooter />
      </div>
      );
};

      export default Gallery;
