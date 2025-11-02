import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Users, Lightbulb, ArrowRight } from 'lucide-react';

interface AnimatedCounterProps {
  target: number;
  suffix: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, suffix, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * target));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return (
    <div
      ref={elementRef}
      className={`text-3xl font-bold bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent transition-all duration-1000 ${
        isVisible ? 'animate-count-up' : 'opacity-0'
      }`}
    >
      {count}{suffix}
    </div>
  );
};

const EnhancedAboutSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      icon: Code,
      title: 'Skill Development',
      description: 'Master cutting-edge technologies through hands-on workshops and coding bootcamps',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a tribe of passionate innovators building the future together',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      iconBg: 'bg-cyan-500/10',
      iconColor: 'text-cyan-400',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Transform wild ideas into reality with mentorship, resources, and pure determination',
      gradient: 'from-white/10 to-blue-500/20',
      iconBg: 'bg-white/10',
      iconColor: 'text-white',
    },
  ];

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null;
      
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, index * 200);
          }
        },
        { threshold: 0.3 }
      );
    });

    cardRefs.current.forEach((card, index) => {
      if (card && observers[index]) {
        observers[index]?.observe(card);
      }
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden */}
      {/* Background Effects */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div> */}

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium animate-neon-pulse">
                Who We Are
              </div>
              <h2 className="text-5xl font-bold text-white leading-tight">
                The ICT Society of{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  St. Sylvester's College
                </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                Coders with caffeine. Innovators in uniform.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                At VITS, we don't just learn technology — we live it, breathe it, and reshape it. 
                We're the squad of teenage tech rebels building the future in a school lab, 
                turning impossible ideas into digital reality.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 glass-blur">
                <AnimatedCounter target={500} suffix="+" />
                <div className="text-sm text-gray-400 mt-2 font-medium">Active Members</div>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 glass-blur">
                <AnimatedCounter target={100} suffix="+" />
                <div className="text-sm text-gray-400 mt-2 font-medium">Events Hosted</div>
              </div>
            </div>

            <Link to="/about" className="inline-block">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg font-semibold spring-transition group">
                Discover Our Story
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={el => cardRefs.current[index] = el}
                className={`transform transition-all duration-800 ${
                  visibleCards.includes(index)
                    ? index % 2 === 0 
                      ? 'animate-card-flip-left opacity-100' 
                      : 'animate-card-flip-right opacity-100'
                    : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                <Card className={` bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden`}>
                  {/* Neon accent edge */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-lg border border-blue-400/50 animate-neon-pulse" />
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${feature.iconBg} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl text-white font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                          {feature.title}
                        </CardTitle>
                        <p className="text-gray-300 text-base leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-900 pointer-events-none" />
    </section>
  );
};

export default EnhancedAboutSection;