import { Home as HomeIcon, User, Mail, Calendar, Rocket, Award, Users, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useRef, useEffect, useCallback } from 'react';
import InteractiveHero from '../components/InteractiveHero';
import EnhancedAboutSection from '../components/EnhancedAboutSection';
import EnhancedFeedSection from '../components/EnhancedFeedSection';
import EnhancedGridSection from '../components/EnhancedGridSection';
import Dock from '../components/Dock';
import EnhancedFooter from '../components/EnhancedFooter';
import ScrollEffects from '../components/ScrollEffects';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import { Carousel } from '../components/Carousel';

import NewsCard from '../components/NewsCard';

import event1 from '@/assets/Events/E1.jpg';
import event2 from '@/assets/Events/E2.jpg';
import event5 from '@/assets/Events/E5.jpg';
import event6 from '@/assets/Events/E6.jpg';
import event8 from '@/assets/Events/E8.jpg';

import G7 from '@/assets/Gallery/G7.jpeg';
import W2 from '@/assets/Wins/W2.webp';
import W3 from '@/assets/Wins/W3.webp';
import G15 from '@/assets/Gallery/G15.jpeg';

import Win1 from '@/assets/Wins/W1.jpeg';

interface Article {
  title: string;
  summary: string;
  source: string;
  url: string;
}

function Home() {

  const achievementsSection = useScrollAnimation();

  const dockItems = [
    { icon: <HomeIcon className="h-7 w-7 text-white" />, label: 'Home', onClick: () => window.location.href = '/' },
    { icon: <User className="h-7 w-7 text-white" />, label: 'About', onClick: () => window.location.href = '/about' },
    { icon: <Calendar className="h-7 w-7 text-white" />, label: 'Events', onClick: () => window.location.href = '/events' },
    { icon: <Rocket className="h-7 w-7 text-white" />, label: 'Projects', onClick: () => window.location.href = '/projects' },
    { icon: <ImageIcon className="h-7 w-7 text-white" />, label: 'Gallery', onClick: () => window.location.href = '/gallery' },
    { icon: <Mail className="h-7 w-7 text-white" />, label: 'Contact', onClick: () => window.location.href = '/contact' },
  ];

  const impacts = [
    {
      icon: Award,
      title: 'ICT Society',
      place: Win1,
      description: 'Recognized as the leading society at SSCK'
    },
    {
      icon: Users,
      title: '500+ Members',
      place: event1,
      description: 'Growing community of tech enthusiasts and innovators'
    },
    {
      icon: Award,
      title: '50+ Events',
      place: event6,
      description: 'Technical workshops, hackathons, and competitions'
    },
    {
      icon: Award,
      title: '100+ Projects',
      place: event8,
      description: 'Innovative student projects across various domains'
    },
  ];

  const slides = [
    {
      id: 4,
      imageUrl: G7,
      title: 'Codejam 2025s',
      description: 'Conducted by Computer Science faculty of University of Moratuwa. Held on April 26th at the university premises, the event showcased innovation, skill, and teamwork. Congratulations to Ranuja Gunawardhane, Thumira Munasinghe, Maleesha Miyuranga, and Gayansha Rathnayake on this remarkable achievement!'
    },
    {
      id: 1,
      imageUrl: W2,
      title: 'NEXORA’25',
      description:
      "Our talented students shined at NEXORA’25, the inter-school ICT competition by Trinity College. 💻✨ 🏆 Champions in Web Designing & Video Editing 🥈 1st Runner Up in Logo Designing🥉 2nd Runner Up in Logo Designing. Congratulations to all the winners – your hard work and creativity truly paid off!"
    },
    {
      id: 2,
      imageUrl: W3,
      title: 'E-VICTS ’25',
      description: "Congratulations to our outstanding Sylvestrians! 🎉 We’re proud to celebrate the winners of E- VICTS ’25, the inter - school ICT competition organized by the ICT Society of Viharamahadevi Girls’ College. 💻✨ 🥇 Poster(Grade 10–11) – Yonal Gamage – Champion🥇 Logo Designing(Grade 10–11) – M.S.M.Mahdi – Champion🥈 Presentation – Maleesha Sandun & Gayansha Thameera – 1st Runner Up🥉 Poster(Grade 12–13) – Maleesha Sandun – 2nd Runner Up. Your hard work, creativity, and passion for ICT shine bright! 💪💡"
    },
    {
      id: 3,
      imageUrl: G15,
      title: 'CYBERNETICS’25',
      description: 'Ashir Ahamed from St. Sylvester’s College, Kandy earned the 1st Runner Up title in the Web Development category in CYBERNETICS`25 Inter-School Competition Series, delivering standout skill and creativity.'
    },
  ];

  const sampleArticles: Article[] = [
    {
      title: 'Gemini 2.5 Pro: A Leap in Multimodal AI',
      summary: 'Google\'s latest model, Gemini 2.5 Pro, showcases groundbreaking capabilities in understanding and processing text, images, and audio simultaneously. This new architecture promises to revolutionize AI applications, from creative content generation to complex data analysis, setting a new benchmark for the industry.',
      source: 'AI Today',
      url: '#',
    },
    {
      title: 'The Rise of Quantum Computing in 2024',
      summary: 'Quantum computers are moving from theoretical concepts to practical tools. Major tech companies are racing to to achieve quantum supremacy, with recent breakthroughs indicating that we are on the cusp of solving problems previously thought unsolvable, impacting fields like medicine, finance, and cryptography.',
      source: 'Tech Chronicle',
      url: '#',
    },
    {
      title: 'Sustainable Tech: Innovations for a Greener Planet',
      summary: 'From biodegradable electronics to AI-optimized energy grids, the tech industry is increasingly focusing on sustainability. This article explores the latest innovations designed to reduce the environmental impact of technology, highlighting companies that are leading the charge towards a more eco-friendly future.',
      source: 'Eco Innovations',
      url: '#',
    },
  ];

  const [articles] = useState<Article[]>(sampleArticles);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    hasDragged: false,
  });
  const autoScrollIntervalRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleCollapse = () => {
    setExpandedIndex(null);
  };

  const findCardIndex = (target: EventTarget | null): number | null => {
    let element = target as HTMLElement | null;
    while (element && element !== scrollContainerRef.current) {
      if (element.dataset.index) {
        return parseInt(element.dataset.index, 10);
      }
      element = element.parentElement;
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    dragState.current.isDragging = true;
    dragState.current.startX = e.pageX - scrollContainerRef.current.offsetLeft;
    dragState.current.scrollLeft = scrollContainerRef.current.scrollLeft;
    dragState.current.hasDragged = false;
    scrollContainerRef.current.classList.add('cursor-grabbing');
    scrollContainerRef.current.classList.remove('cursor-grab');
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging) return;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove('cursor-grabbing');
      scrollContainerRef.current.classList.add('cursor-grab');
    }

    const wasClick = !dragState.current.hasDragged;
    dragState.current.isDragging = false;

    if (wasClick) {
      const cardIndex = findCardIndex(e.target);
      if (cardIndex !== null) {
        handleToggleExpand(cardIndex);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - dragState.current.startX;

    if (Math.abs(walk) > 5) { // Threshold to register as a drag
      dragState.current.hasDragged = true;
    }

    scrollContainerRef.current.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const stopAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    stopAutoScroll();
    autoScrollIntervalRef.current = window.setInterval(() => {
      if (!isHoveringRef.current && !dragState.current.isDragging && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        // The content is duplicated, so we check against half the scroll width.
        const originalContentWidth = container.scrollWidth / 2;

        if (container.scrollLeft >= originalContentWidth) {
          // When we scroll past the original content, reset to the beginning smoothly
          container.scrollLeft -= originalContentWidth;
        } else {
          container.scrollLeft += 0.5; // Scroll speed
        }
      }
    }, 25);
  }, [stopAutoScroll]);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [articles, startAutoScroll, stopAutoScroll]);

  const handleMouseEnter = () => { isHoveringRef.current = true; };
  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    if (dragState.current.isDragging) {
      dragState.current.isDragging = false;
      if (scrollContainerRef.current) {
        scrollContainerRef.current.classList.remove('cursor-grabbing');
        scrollContainerRef.current.classList.add('cursor-grab');
      }
    }
  };

  const historySection = useScrollAnimation();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ScrollEffects />
      <InteractiveHero />

      {/* Rotating Text */}
      {/* <div className="flex justify-center">
        <div className="min-w-[300px] h-24 flex items-center mt-10 mb-16">
          <h2 className="text-3xl font-bold">Creative</h2>
          <div className="w-3"></div>
          <RotatingText
            texts={["Coding", "Innovation", "Solutions", "Learning", "Design"]}
            mainClassName="px-4 sm:px-4 md:px-6 bg-cyan-300 text-black overflow-hidden py-1 sm:py-2 md:py-3 justify-center rounded-lg font-bold text-3xl"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1 sm:pb-2 md:pb-2"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
      </div> */}

      <EnhancedAboutSection />
      {/* <EnhancedFeedSection /> */}

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="container-custom">
          <div ref={achievementsSection.ref} className={`text-center mb-12 transition-all duration-700 ${achievementsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4">
              Achievements
            </div>
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Highlights of our journey and accomplishments.
            </p>
          </div>

          <div className={`grid md:grid-cols-4 gap-6 transition-all duration-700 ${achievementsSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {impacts.map((achievement, index) => (
              <Card
                key={index}
                className="bg-card border-border card-hover text-center"
                style={{
                  animation: achievementsSection.isVisible ? `scale-in 0.5s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                <CardHeader>
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center mb-4">
                    <achievement.icon className="h-8 w-8 text-background" />
                  </div>
                  <CardTitle className="text-2xl gradient-text">{achievement.title}</CardTitle>
                  <div className="w-40 md:w-56 mx-auto rounded-2xl mb-4 overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
                    <img
                      src={achievement.place}
                      alt={achievement.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <CardDescription className="text-base mt-2">{achievement.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-20">
            <Carousel slides={slides} />
          </div>

        </div>
      </section>

      {/* Principal */}
      {/* <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="container-custom">
          <div ref={historySection.ref} className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${historySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
                The Messege
              </div>
              <h2 className="text-4xl font-bold">
                The Messege from the <span className="gradient-text">Principal</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  "I am proud to lead an institution that fosters innovation and technical excellence.
                  Our ICT Society exemplifies the spirit of learning, collaboration, and technological
                  advancement that we aim to instill in every student. Through various initiatives, workshops,
                  and projects, our students are not just learning technology – they're shaping the future of it.
                  The achievements of our ICT Society demonstrate that with dedication and the right guidance, our
                  students can compete and excel at any level."
                </p>
                <p>
                  - Mr. R. A. A. R. Ranasinghe,<br /> Principal of St. Sylvester's College
                </p>
              </div>
            </div>
            <div>
              <img
              src="../src/assets/principal.jpeg"
              alt="Principal of St. Sylvester's College"
              className="rounded-2xl shadow-2xl w-3/4 h-auto"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* News */}
      {/* <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <h2 className="text-4xl text-center font-bold mb-4">News</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">
          Stay updated with the latest news.
        </p>

        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto no-scrollbar cursor-grab"
          // style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          aria-roledescription="carousel"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
        >
          <div className="flex py-4 space-x-6">
            {articles.map((article, index) => (
              <NewsCard
                key={`a-${index}`}
                article={article}
                isExpanded={expandedIndex === index}
                data-index={index}
                onMouseLeave={handleCollapse}
              />
            ))} */}
      {/* Duplicate for seamless scroll */}
      {/* {articles.map((article, index) => {
              const uniqueIndex = index + articles.length;
              return (
                <NewsCard 
                  key={`b-${uniqueIndex}`} 
                  article={article} 
                  isExpanded={expandedIndex === uniqueIndex}
                  data-index={uniqueIndex}
                  onMouseLeave={handleCollapse}
                  aria-hidden="true"
                />
              );
            })}
          </div>
        </div>
      </section> */}

      <EnhancedGridSection />
      <div className="fixed bottom-0 left-0 w-full flex justify-center z-50 pb-4 pointer-events-none">
        <div className="pointer-events-auto">
          <Dock
            items={dockItems}
            className="bg-background/80 shadow-lg border border-neutral-700 px-4 py-2 rounded-2xl"
            panelHeight={64}
          />
        </div>
      </div>
      <EnhancedFooter />
    </div>
  );
}

export default Home;
