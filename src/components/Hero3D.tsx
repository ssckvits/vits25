import React, { useEffect, useState } from 'react';

/**
 * Hero3D
 * A lightweight CSS 3D scene shown only on the user's first visit.
 * It falls back to a dark gradient on subsequent visits to keep performance and
 * avoid distracting returning users.
 */
const STORAGE_KEY = 'vits_hero_shown_v1';

const Hero3D: React.FC = () => {
  const [showScene, setShowScene] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only show the animated scene for first visit
    try {
      const already = localStorage.getItem(STORAGE_KEY);
      if (!already) {
        setShowScene(true);
        // mark shown so next time we fall back
        localStorage.setItem(STORAGE_KEY, '1');
      }
    } catch (e) {
      // If localStorage is unavailable, default to not showing animation
      setShowScene(false);
    }

    // mark mounted for subtle progressive enhancement
    setIsMounted(true);
  }, []);

  // If we chose not to show the scene, render a subtle gradient block used as a modern hero background
  if (!showScene) {
    return (
      <div className="absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background"></div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 hero-3d-wrapper" aria-hidden>
      {/* overlay gradient for contrast with text */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background"></div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* The scene is purely CSS-based and respects prefers-reduced-motion */}
        <div className="scene" data-mounted={isMounted ? 'true' : 'false'}>
          <div className="floating-cubes">
            <div className="cube cube--large">
              <div className="face face--front" />
              <div className="face face--back" />
              <div className="face face--right" />
              <div className="face face--left" />
              <div className="face face--top" />
              <div className="face face--bottom" />
            </div>

            <div className="cube cube--med">
              <div className="face face--front" />
              <div className="face face--back" />
              <div className="face face--right" />
              <div className="face face--left" />
              <div className="face face--top" />
              <div className="face face--bottom" />
            </div>

            <div className="cube cube--small">
              <div className="face face--front" />
              <div className="face face--back" />
              <div className="face face--right" />
              <div className="face face--left" />
              <div className="face face--top" />
              <div className="face face--bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero3D;
