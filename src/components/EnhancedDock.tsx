import React, { useState } from 'react';
import { Calendar, Rocket, Image as ImageIcon, Settings, Moon, Sun } from 'lucide-react';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  special?: boolean;
}

interface EnhancedDockProps {
  items?: DockItem[];
  className?: string;
}

const EnhancedDock: React.FC<EnhancedDockProps> = ({ items, className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const defaultItems: DockItem[] = [
    {
      icon: <Calendar className="h-7 w-7 text-white" />,
      label: 'Events',
      onClick: () => window.location.href = '/events',
    },
    {
      icon: <Rocket className="h-7 w-7 text-white" />,
      label: 'Projects',
      onClick: () => window.location.href = '/projects',
    },
    {
      icon: <ImageIcon className="h-7 w-7 text-white" />,
      label: 'Gallery',
      onClick: () => window.location.href = '/gallery',
    },
    {
      icon: isDarkMode ? <Moon className="h-6 w-6 text-blue-400" /> : <Sun className="h-6 w-6 text-yellow-400" />,
      label: 'Toggle Theme',
      onClick: () => setIsDarkMode(!isDarkMode),
      special: true,
    },
  ];

  const dockItems = items || defaultItems;

  const handleItemClick = (item: DockItem, index: number) => {
    setClickedIndex(index);
    
    // Create ripple effect
    setTimeout(() => {
      setClickedIndex(null);
    }, 600);
    
    // Execute click handler
    item.onClick();
  };

  return (
    <div className={`fixed bottom-0 left-0 w-full flex justify-center z-50 pb-6 pointer-events-none ${className}`}>
      <div className="pointer-events-auto">
        {/* Floating Glass Panel */}
        <div className="relative">
          {/* Background glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-xl rounded-3xl opacity-60" />
          
          {/* Main dock container */}
          <div className="relative glass-blur rounded-2xl px-6 py-4 border border-white/20 shadow-2xl">
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-blue-500/5 opacity-50" />
            
            <div className="relative flex items-center space-x-6">
              {dockItems.map((item, index) => (
                <div key={index} className="relative">
                  {/* Hover preview label */}
                  {hoveredIndex === index && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg backdrop-blur-sm border border-white/20 whitespace-nowrap animate-fade-in">
                      {item.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
                    </div>
                  )}

                  {/* Dock item button */}
                  <button
                    className={`relative w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 transform group ${
                      hoveredIndex === index
                        ? 'scale-125 -translate-y-2'
                        : 'scale-100 translate-y-0'
                    } ${
                      item.special
                        ? 'bg-gradient-to-br from-white/20 to-white/10'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleItemClick(item, index)}
                  >
                    {/* Background effects */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl" />
                      <div className="absolute inset-0 border border-white/30 rounded-xl animate-neon-pulse" />
                    </div>

                    {/* Icon container */}
                    <div className={`relative z-10 transition-all duration-300 ${
                      hoveredIndex === index ? 'scale-110' : 'scale-100'
                    }`}>
                      {item.icon}
                    </div>

                    {/* Ripple effect */}
                    {clickedIndex === index && (
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-blue-400/30 rounded-xl animate-ripple" />
                      </div>
                    )}

                    {/* Glow effect on hover */}
                    {hoveredIndex === index && (
                      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-md" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Ambient light bar at bottom */}
            <div className="absolute -bottom-1 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
          </div>
        </div>

        {/* Reflection effect */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full h-8 opacity-20 pointer-events-none">
          <div className="glass-blur rounded-2xl px-6 py-4 border border-white/10 transform scale-y-[-1] blur-sm opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default EnhancedDock;