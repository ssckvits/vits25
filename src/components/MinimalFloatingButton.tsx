import React, { useState } from 'react';
import { Settings, Play, Pause } from 'lucide-react';

interface MinimalFloatingButtonProps {
  onToggleAnimation?: (isPlaying: boolean) => void;
}

const MinimalFloatingButton: React.FC<MinimalFloatingButtonProps> = ({
  onToggleAnimation,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);

  const toggleMain = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAnimationToggle = () => {
    const newState = !isAnimationPlaying;
    setIsAnimationPlaying(newState);
    onToggleAnimation?.(newState);
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <div className="relative">
        {/* Simple control panel */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-3 shadow-lg">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-300 font-medium">Controls</span>
              <button
                onClick={handleAnimationToggle}
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
              >
                {isAnimationPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {isAnimationPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>
        )}

        {/* Main settings button */}
        <button
          onClick={toggleMain}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-white/15 shadow-lg transition-all duration-200 flex items-center justify-center group"
        >
          <Settings 
            className="w-5 h-5 transition-transform duration-200" 
            style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
          />
        </button>
      </div>
    </div>
  );
};

export default MinimalFloatingButton;