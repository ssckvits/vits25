import { Home as HomeIcon, User, Mail, Calendar, Rocket, Award, Users, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InteractiveHero from '../components/InteractiveHero';
import EnhancedAboutSection from '../components/EnhancedAboutSection';
import EnhancedFeedSection from '../components/EnhancedFeedSection';
import EnhancedGridSection from '../components/EnhancedGridSection';
import Dock from '../components/Dock';
import EnhancedFooter from '../components/EnhancedFooter';
import ScrollEffects from '../components/ScrollEffects';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';


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

  const achievements = [
    { 
      icon: Award, 
      title: 'ICT Society', 
      place: "../src/assets/wins/1.jpeg", 
      description: 'Recognized as the leading ICT society at SSCK' 
    },
    { 
      icon: Users, 
      title: '500+ Members', 
      place: "../src/assets/events/1.jpg", 
      description: 'Growing community of tech enthusiasts and innovators' 
    },
    { 
      icon: Award, 
      title: '50+ Events', 
      place: "../src/assets/events/6.jpg", 
      description: 'Technical workshops, hackathons, and competitions' 
    },
    { 
      icon: Award, 
      title: '100+ Projects', 
      place: "../src/assets/events/8.jpg", 
      description: 'Innovative student projects across various domains' 
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ScrollEffects />
      <InteractiveHero />
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
              Highlights of our journey and accomplishments
            </p>
          </div>

          <div className={`grid md:grid-cols-4 gap-6 transition-all duration-700 ${achievementsSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {achievements.map((achievement, index) => (
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
        </div>
      </section>

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
