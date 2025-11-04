import React, { useState, useCallback, useEffect } from 'react';

export interface Slide {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
}

interface CarouselProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


export const Carousel: React.FC<CarouselProps> = ({ slides, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSlide, setExpandedSlide] = useState<Slide | null>(null);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (autoPlayInterval && !expandedSlide) {
      const timer = setTimeout(() => {
        goToNext();
      }, autoPlayInterval);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, autoPlayInterval, goToNext, expandedSlide]);

  const handleExpandClick = () => {
    if (slides.length > 0) {
      setExpandedSlide(slides[currentIndex]);
    }
  };

  const handleCloseModal = () => {
    setExpandedSlide(null);
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown as any);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown as any);
    };
  }, []);

  if (!slides || slides.length === 0) {
    return (
        <div className="flex items-center justify-center w-full h-96 bg-gray-200 rounded-lg">
            <p className="text-gray-500">No slides to display.</p>
        </div>
    );
  }

  return (
    <>
      <div className="h-[60vh] w-full max-w-5xl mx-auto relative group rounded-2xl overflow-hidden shadow-2xl">
        <div 
          className="w-full h-full cursor-pointer" 
          onClick={handleExpandClick}
          role="button"
          aria-label={`Expand slide: ${slides[currentIndex]?.title}`}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleExpandClick()}
        >
          <div 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }} 
            className="w-full h-full flex transition-transform ease-in-out duration-700"
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full h-full flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.imageUrl})` }}>
                <div className="w-full h-full bg-black bg-opacity-40 flex items-end p-8 md:p-12">
                  <div className="text-white max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">{slide.title}</h2>
                    <p className="text-md md:text-lg">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Left Arrow */}
        <div 
            className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer hover:bg-black/60 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            role="button"
            aria-label="Previous slide"
        >
            <ChevronLeftIcon className="w-8 h-8" />
        </div>
        {/* Right Arrow */}
        <div 
            className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer hover:bg-black/60 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            role="button"
            aria-label="Next slide"
        >
            <ChevronRightIcon className="w-8 h-8" />
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={(e) => { e.stopPropagation(); goToSlide(slideIndex); }}
              className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
              role="button"
              aria-label={`Go to slide ${slideIndex + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Expanded View Modal */}
      {expandedSlide && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .modal-overlay {
              animation: fadeIn 0.3s ease-out forwards;
            }
            @keyframes scaleUp {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            .modal-content {
              animation: scaleUp 0.3s ease-out forwards;
            }
          `}</style>
          <div 
            className="bg-gray-800 text-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col relative modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCloseModal} 
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-20 bg-gray-900 rounded-full p-1" 
              aria-label="Close"
            >
              <XMarkIcon className="w-7 h-7" />
            </button>
            <div className="overflow-y-auto p-6 md:p-8">
              <img src={expandedSlide.imageUrl} alt={expandedSlide.title} className="w-full h-auto max-h-[60vh] object-contain rounded-lg mb-6" />
              <h2 id="modal-title" className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600">{expandedSlide.title}</h2>
              <p className="text-md md:text-lg text-gray-300">{expandedSlide.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
