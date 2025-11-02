import React, { useState } from 'react';
import { motion } from 'motion';
import { Plus, Sparkles, Zap, Play, Pause } from 'lucide-react';

interface FloatingActionButtonProps {
  onToggleAnimation?: (isPlaying: boolean) => void;
  onTriggerEffect?: (effect: string) => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
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
              <motion.button
                  key={item.label}
                  initial={{ opacity: 0, scale: 0, x: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  exit={{ opacity: 0, scale: 0, x: 20 }}
                  onClick={item.action}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center group relative`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-5 h-5" />
                  
                  {/* Tooltip */}
                  <div className="absolute right-14 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                  </div>
                </motion.button>
              ))}
            </div>
        )}

        {/* Main FAB */}
        <motion.button
          onClick={toggleMain}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-xl flex items-center justify-center relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: isExpanded ? 45 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
            animate={{
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-white rounded-full"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{
              scale: [0, 2],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
          
          <Plus className="w-6 h-6 relative z-10" />
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingActionButton;