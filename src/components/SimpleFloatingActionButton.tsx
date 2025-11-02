import React, { useState } from 'react';
import { Plus, Sparkles, Zap, Play, Pause } from 'lucide-react';

interface SimpleFloatingActionButtonProps {
  onToggleAnimation?: (isPlaying: boolean) => void;
  onTriggerEffect?: (effect: string) => void;
}

const SimpleFloatingActionButton: React.FC<SimpleFloatingActionButtonProps> = ({
  onToggleAnimation,
  onTriggerEffect,
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
    setIsExpanded(false);
  };

  const handleEffect = (effect: string) => {
    onTriggerEffect?.(effect);
    setIsExpanded(false);
  };

  const actionItems = [
    {
      icon: isAnimationPlaying ? Pause : Play,
      label: isAnimationPlaying ? 'Pause' : 'Play',
      color: 'from-blue-500 to-cyan-500',
      action: handleAnimationToggle,
    },
    {
      icon: Sparkles,
      label: 'Sparkles',
      color: 'from-purple-500 to-pink-500',
      action: () => handleEffect('sparkles'),
    },
    {
      icon: Zap,
      label: 'Lightning',
      color: 'from-yellow-500 to-orange-500',
      action: () => handleEffect('lightning'),
    },
  ];

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <div className="relative">
        {/* Action Items */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-3">
            {actionItems.map((item, index) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center group relative`}
                style={{
                  opacity: 0,
                  transform: 'scale(0) translateX(20px)',
                  animation: `fadeInScale 0.3s ease-out ${index * 0.1}s forwards`,
                }}
              >
                <item.icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className="absolute right-14 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={toggleMain}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-xl flex items-center justify-center relative overflow-hidden hover:scale-105 transition-all duration-200"
          style={{
            transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          {/* Animated background */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-opacity duration-300"
            style={{
              opacity: isExpanded ? 1 : 0,
            }}
          />
          
          {/* Ripple effect */}
          <div
            className="absolute inset-0 bg-white rounded-full animate-ping"
            style={{
              opacity: 0.1,
              animationDuration: '3s',
            }}
          />
          
          <Plus className="w-6 h-6 relative z-10" />
        </button>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0) translateX(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateX(0px);
            }
          }
        `
      }} />
    </div>
  );
};

export default SimpleFloatingActionButton;