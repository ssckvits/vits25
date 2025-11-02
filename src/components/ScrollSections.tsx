import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Code, Users, Lightbulb, Calendar, Rocket, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className || ''}`}
    >
      {children}
    </section>
  );
};

const ScrollSections: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);

      // Determine active section
      const sections = document.querySelectorAll('section[data-section]');
      const scrollPosition = scrolled + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const rect = element.getBoundingClientRect();
        const top = rect.top + scrolled;
        const bottom = top + rect.height;

        if (scrollPosition >= top && scrollPosition <= bottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Code,
      title: 'Scroll Tracking',
      description: 'Dynamic elements that respond to scroll position with smooth easing curves',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Viewport Detection',
      description: 'Intersection Observer API triggers animations when elements enter view',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Lightbulb,
      title: 'Text Splitting',
      description: 'Individual letter and word animations with staggered timing effects',
      color: 'from-orange-500 to-yellow-500',
    },
  ];

  const quickLinks = [
    {
      icon: Calendar,
      title: 'Events',
      description: 'Workshops, hackathons, and tech talks',
      path: '/events',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Rocket,
      title: 'Projects',
      description: 'Student innovations and developments',
      path: '/projects',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: ImageIcon,
      title: 'Gallery',
      description: 'Moments from our tech journey',
      path: '/gallery',
      color: 'from-orange-500 to-yellow-500',
    },
  ];

  return (
    <div className="relative">
      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Section Navigation */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              activeSection === index
                ? 'bg-blue-500 border-blue-500 scale-125'
                : 'bg-transparent border-white/30 hover:border-white/60'
            }`}
            onClick={() => {
              const section = document.querySelector(`section[data-section="${index}"]`);
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/60" />
      </div>

      {/* About Section with Parallax */}
      <ScrollSection className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <section data-section="1" className="container-custom py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
                About VITS
              </div>
              <h2 className="text-5xl font-bold leading-tight">
                Building Tomorrow's{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Tech Leaders
                </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                The ICT Society of St. Sylvester's College empowers students to explore,
                innovate, and excel in the digital world through cutting-edge technology
                and collaborative learning.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    50+
                  </div>
                  <div className="text-sm text-gray-400 mt-2">Active Members</div>
                </div>
                <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    100+
                  </div>
                  <div className="text-sm text-gray-400 mt-2">Events Hosted</div>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105"
                  style={{
                    transform: `translateY(${index * 20}px)`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                        <CardDescription className="mt-2 text-gray-300">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* Features Showcase */}
      <ScrollSection className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <section data-section="2" className="container-custom py-20">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6">
              Latest Updates
            </div>
            <h2 className="text-5xl font-bold mb-6">What's Happening</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay updated with our latest events, workshops, and society announcements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Annual Hackathon 2025',
                date: 'March 15, 2025',
                description: 'Join us for 48 hours of coding, innovation, and prizes worth $5,000!',
              },
              {
                title: 'Web Development Workshop',
                date: 'February 28, 2025',
                description: 'Learn React and build your first web application with industry experts.',
              },
              {
                title: 'AI & ML Seminar Series',
                date: 'Ongoing',
                description: 'Weekly sessions exploring artificial intelligence and machine learning fundamentals.',
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 group"
              >
                <CardHeader>
                  <div className="text-sm text-blue-400 font-medium mb-2">{item.date}</div>
                  <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 mt-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </ScrollSection>

      {/* Quick Links with Sticky Positioning */}
      <ScrollSection className="bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900">
        <section data-section="3" className="container-custom py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Explore VITS</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our events, projects, and community highlights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {quickLinks.map((link, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 group cursor-pointer h-full"
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <link.icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-blue-400 transition-colors">
                    {link.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 mt-2">
                    {link.description}
                  </CardDescription>
                  <div className="flex items-center justify-center text-blue-400 font-medium mt-6 group-hover:translate-x-2 transition-transform duration-300">
                    Explore <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </ScrollSection>
    </div>
  );
};

export default ScrollSections;