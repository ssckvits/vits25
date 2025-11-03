import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, Home as HomeIcon, User, Mail, Calendar, Rocket, Image as ImageIcon } from 'lucide-react';
import EnhancedFooter from '@/components/EnhancedFooter';
import Dock from '@/components/Dock';
import event1 from '@/assets/event-1.jpg';
import event2 from '@/assets/event-2.jpg';
import event3 from '@/assets/event-3.jpg';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Events = () => {
  const upcomingSection = useScrollAnimation();
  const pastSection = useScrollAnimation();

  const upcomingEvents = [
    // {
    //   title: 'Annual Hackathon 2025',
    //   date: 'March 15-16, 2025',
    //   time: '9:00 AM - 9:00 AM',
    //   location: 'Main Campus Hall',
    //   description: 'Join us for 48 hours of intense coding, collaboration, and innovation. Build amazing projects and compete for prizes worth $5,000!',
    //   attendees: '150+',
    //   image: event2,
    // },
    // {
    //   title: 'Web Development Bootcamp',
    //   date: 'February 28, 2025',
    //   time: '10:00 AM - 4:00 PM',
    //   location: 'Computer Lab A',
    //   description: 'Learn modern web development with React, Node.js, and cloud deployment. Perfect for beginners and intermediate developers.',
    //   attendees: '75+',
    //   image: event1,
    // },
    // {
    //   title: 'AI & Machine Learning Workshop',
    //   date: 'March 5, 2025',
    //   time: '2:00 PM - 6:00 PM',
    //   location: 'Tech Building, Room 30,
    //   description: 'Dive into the world of AI and ML. Learn fundamental concepts and build your first machine learning model.',
    //   attendees: '60+',
    //   image: event3,
    // },
  ];
  
  const pastEvents = [
    {
      title: 'NEXNOVA` 24',
      date: 'February 07, 2025',
      attendees: '100+',
      image: '../src/assets/events/6.jpg',
    },
    {
      title: "VITS Academy 24'",
      date: 'July 06, 2024',
      attendees: '50+',
      image: '../src/assets/events/1.jpg',
    },
     {
      title: 'Intra School Quiz Competition',
      date: 'April 13, 2024',
      attendees: '50+',
      image: '../src/assets/events/10.jpg',
    },

    {
      title: 'Intra School Quiz Competition',
      date: 'April 13, 2024',
      attendees: '50+',
      image: '../src/assets/events/5.jpg',
    },
        {
      title: 'Intra School Workshop (Phase 2)',
      date: 'April 13, 2024',
      attendees: '50+',
      image: '../src/assets/events/4.jpg',
    },
        {
      title: 'Intra School Workshop (Phase 1)',
      date: 'April 13, 2024',
      attendees: '50+',
      image: '../src/assets/events/3.jpg',
    },
    {
      title: 'AI For All',
      date: 'March 13, 2024',
      attendees: '100+',
      image: '../src/assets/events/7.jpg',
    },
    {
      title: 'NEXNOVA` 23',
      date: 'March 10, 2023',
      attendees: '100+',
      image: '../src/assets/events/9.jpg',
    },
    {
      title: 'Project Cascade',
      date: 'December 22, 2021',
      attendees: '100+',
      image: '../src/assets/events/8.jpg',
    },
  ];

  // Main navigation items
  const dockItems = [
    { icon: <HomeIcon className="h-7 w-7 text-white" />, label: 'Home', onClick: () => window.location.href = '/' },
    { icon: <User className="h-7 w-7 text-white" />, label: 'About', onClick: () => window.location.href = '/about' },
    { icon: <Calendar className="h-7 w-7 text-white" />, label: 'Events', onClick: () => window.location.href = '/events' },
    { icon: <Rocket className="h-7 w-7 text-white" />, label: 'Projects', onClick: () => window.location.href = '/projects' },
    { icon: <ImageIcon className="h-7 w-7 text-white" />, label: 'Gallery', onClick: () => window.location.href = '/gallery' },
    { icon: <Mail className="h-7 w-7 text-white" />, label: 'Contact', onClick: () => window.location.href = '/contact' },
  ];
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Aurora Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      {/* Dock centered at the bottom of the viewing area */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center z-50 pb-4 pointer-events-none">
        <div className="pointer-events-auto">
          <Dock
            items={dockItems}
            className="bg-background/80 shadow-lg border border-neutral-700 px-4 py-2 rounded-2xl"
            panelHeight={64}
          />
        </div>
      </div>
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Additional animated elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/60 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-cyan-400/60 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-300/80 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-8 animate-pulse backdrop-blur-sm">
              ⚡ Events Command Center
            </div>
            <h1 className="text-7xl md:text-9xl font-bold text-white mb-8 leading-tight">
              Where <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">Code</span><br />Meets <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">Community</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
              Every workshop is a breakthrough waiting to happen. Every hackathon is your next level unlock.
            </p>

            {/* Interactive stats */}
            <div className="flex justify-center space-x-12 mt-12 opacity-80">
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">50+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Events Hosted</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">1000+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Participants</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform">∞</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Possibilities</div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div ref={upcomingSection.ref} className={`text-center mb-16 transition-all duration-1000 ${upcomingSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6 animate-pulse">
              🚀 Coming Soon
            </div>
            <h2 className="text-5xl font-bold mb-6 text-white">
              Next-Level <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Experiences</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              Your gateway to cutting-edge tech. Each event is crafted to challenge, inspire, and transform.
            </p>
          </div>

          <div className={`grid md:grid-cols-1 gap-8 transition-all duration-700 ${upcomingSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <div key={index} className="group relative">
                  {/* Glow effect behind card */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <Card
                    className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden transition-all duration-500 group-hover:border-blue-400/40"
                    style={{
                      animation: upcomingSection.isVisible ? `fade-in-up 0.6s ease-out ${index * 0.2}s both` : 'none'
                    }}
                  >
                    <div className="grid md:grid-cols-[300px_1fr] gap-0">
                      <div className="relative h-64 md:h-auto">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-primary text-background px-3 py-1 rounded-full text-sm font-semibold">
                          Upcoming
                        </div>
                      </div>
                      <div>
                        <CardHeader>
                          <CardTitle className="text-2xl mb-4">{event.title}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {event.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center space-x-3 text-muted-foreground">
                              <Calendar className="h-5 w-5 text-primary" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground">
                              <Clock className="h-5 w-5 text-primary" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground">
                              <MapPin className="h-5 w-5 text-primary" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground">
                              <Users className="h-5 w-5 text-primary" />
                              <span>{event.attendees} registered</span>
                            </div>
                          </div>
                          <Button variant="hero">Register Now</Button>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-60" />

                <Card className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
                  <div className="p-12 text-center">
                    <div className="mb-8 flex justify-center">
                      <div className="relative">
                        <Calendar className="h-20 w-20 text-blue-400 opacity-80" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400/60 rounded-full animate-bounce" />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
                      </div>
                    </div>
                    <CardTitle className="text-3xl mb-6 text-white">Something Epic is Coming</CardTitle>
                    <CardDescription className="text-lg leading-relaxed max-w-2xl mx-auto text-gray-300 mb-8">
                      Our team is engineering the next wave of mind-blowing events. Think bigger hackathons,
                      deeper workshops, and experiences that will redefine what's possible.
                    </CardDescription>
                    <div className="flex justify-center space-x-4">
                      <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
                        🔬 Innovation Labs
                      </div>
                      <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium">
                        ⚡ Tech Challenges
                      </div>
                      <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium">
                        🚀 Launch Pads
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 left-40 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-40 right-40 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container-custom relative z-10">
          <div ref={pastSection.ref} className={`text-center mb-16 transition-all duration-1000 ${pastSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium mb-6 animate-pulse">
              📚 Hall of Innovation
            </div>
            <h2 className="text-5xl font-bold mb-6 text-white">
              Legendary <span className="bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">Moments</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              Every workshop, every hackathon, every breakthrough — these are the milestones that shaped our community.
            </p>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${pastSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {pastEvents.map((event, index) => (
              <div key={index} className="group relative">
                {/* Ambient glow */}
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Card
                  className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 overflow-hidden transition-all duration-500"
                  style={{
                    animation: pastSection.isVisible ? `scale-in 0.5s ease-out ${index * 0.1}s both` : 'none'
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Floating badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-xs font-medium">
                        ✨ Completed
                      </div>
                    </div>
                  </div>

                  <CardHeader className="relative">
                    <CardTitle className="text-xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                      {event.title}
                    </CardTitle>

                    <div className="flex items-center justify-between mt-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Calendar className="h-4 w-4 text-blue-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Users className="h-4 w-4 text-cyan-400" />
                        <span>{event.attendees} joined</span>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="mt-6 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
};

export default Events;
