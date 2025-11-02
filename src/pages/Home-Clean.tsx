import React, { useState } from 'react';
import { Calendar, Rocket, Image as ImageIcon } from 'lucide-react';
import Footer from '@/components/Footer';
import Dock from '@/components/Dock';
import SimpleVITSText from '@/components/SimpleVITSText';
import MinimalFloatingButton from '@/components/MinimalFloatingButton';

const Home = () => {
  // Interactive features state
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);

  // Handler functions for interactive features
  const handleToggleAnimation = (playing: boolean) => {
    setIsAnimationPlaying(playing);
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Hero Section */}
      <SimpleVITSText
        text="VITS"
        subtitle="ICT Society of St. Sylvester's College"
        showParticles={isAnimationPlaying}
      />

      {/* Dock Navigation */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center z-50 pb-4 pointer-events-none">
        <div className="pointer-events-auto">
          <Dock
            items={[
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
            ]}
            className="bg-background/80 shadow-lg border border-neutral-700 px-4 py-2 rounded-2xl"
            panelHeight={64}
          />
        </div>
      </div>

      {/* Minimal floating controls */}
      <MinimalFloatingButton 
        onToggleAnimation={handleToggleAnimation}
      />

      <Footer />
    </div>
  );
};

export default Home;