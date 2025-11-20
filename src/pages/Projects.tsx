import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Home as HomeIcon, User, Mail, Calendar, Rocket, Image as ImageIcon } from 'lucide-react';
import EnhancedFooter from '@/components/EnhancedFooter';
import Dock from '@/components/Dock';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Projects = () => {
  const projectsSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  const projects = [
    {
      title: '65th Battle of the Babes Live Scoreboard',
      description: 'A real-time web application providing live scores, player stats, and match updates for the prestigious 65th Battle of the Babes cricket match between St. Sylvester\'s College and Vidyartha College.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Google Firebase'],
      image: '../src/assets/Projects/Scoreboard.jpeg',
      team: 'Aashir Ahamed, Navod Niroshana',
      status: 'Live',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'In Development':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Beta Testing':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

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
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-cyan-400/5 blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
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
        {/* Matrix-like code rain effect */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 text-cyan-400/20 text-xs font-mono leading-none animate-pulse" style={{ animationDelay: '0s' }}>
            {'{'}<br/>"innovation": true,<br/>"creativity": ∞,<br/>"impact": "global"<br/>{'}'}
          </div>
          <div className="absolute top-20 right-20 text-blue-400/20 text-xs font-mono leading-none animate-pulse" style={{ animationDelay: '1s' }}>
            function buildFuture() {'{'}<br/>&nbsp;&nbsp;return dreams.map(idea =&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;code(idea))<br/>{'}'}
          </div>
          <div className="absolute bottom-40 left-1/4 text-cyan-300/20 text-xs font-mono leading-none animate-pulse" style={{ animationDelay: '2s' }}>
            const VITS = {'{'}<br/>&nbsp;&nbsp;mission: 'innovate',<br/>&nbsp;&nbsp;status: 'building'<br/>{'}'}
          </div>
        </div>
        
        {/* Tech-focused floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/5 w-4 h-4 border border-cyan-400/40 rotate-45 animate-spin" style={{ animationDelay: '0.5s', animationDuration: '8s' }} />
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 border border-blue-400/40 animate-pulse" />
          <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-cyan-400/60 animate-ping" style={{ animationDelay: '1.5s' }} />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-10">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium mb-8 animate-pulse backdrop-blur-sm">
              🎨 Digital Craftsmen
            </div>
            <h1 className="text-7xl md:text-9xl font-bold text-white mb-8 leading-tight">
              <span className="block">Crafting</span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">Tomorrow</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
              Every algorithm tells a story. Every interface solves a problem. Every project changes the world.
            </p>
            
            {/* Tech stack showcase */}
            <div className="flex justify-center flex-wrap gap-6 mt-12 opacity-70">
              <div className="px-4 py-2 bg-white/5 border border-cyan-400/20 rounded-full text-cyan-400 text-sm font-mono hover:bg-cyan-400/10 transition-all cursor-pointer">
                React
              </div>
              <div className="px-4 py-2 bg-white/5 border border-blue-400/20 rounded-full text-blue-400 text-sm font-mono hover:bg-blue-400/10 transition-all cursor-pointer">
                Node.js
              </div>
              <div className="px-4 py-2 bg-white/5 border border-cyan-400/20 rounded-full text-cyan-400 text-sm font-mono hover:bg-cyan-400/10 transition-all cursor-pointer">
                Python
              </div>
              <div className="px-4 py-2 bg-white/5 border border-blue-400/20 rounded-full text-blue-400 text-sm font-mono hover:bg-blue-400/10 transition-all cursor-pointer">
                AI/ML
              </div>
              <div className="px-4 py-2 bg-white/5 border border-cyan-400/20 rounded-full text-cyan-400 text-sm font-mono hover:bg-cyan-400/10 transition-all cursor-pointer">
                Blockchain
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6 animate-pulse">
              💡 Featured Work
            </div>
            <h2 className="text-5xl font-bold mb-6 text-white">
              Code that <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Matters</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              Each project represents hours of passion, creativity, and problem-solving by our incredible community.
            </p>
          </div>
          
          <div ref={projectsSection.ref} className={`grid md:grid-cols-2 gap-12 transition-all duration-1000 ${projectsSection.isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {projects.map((project, index) => (
              <div key={index} className="group relative">
                {/* Glow effect behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <Card
                  className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden transition-all duration-500 group-hover:border-cyan-400/40 flex flex-col h-full"
                  style={{
                    animation: projectsSection.isVisible ? `fade-in-up 0.6s ease-out ${index * 0.1}s both` : 'none'
                  }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Status badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${getStatusColor(project.status)}`}>
                        {project.status === 'Live' ? '🟢 Live' : project.status === 'In Development' ? '🔄 Building' : project.status}
                      </span>
                    </div>
                    
                    {/* Floating particles */}
                    <div className="absolute top-6 left-6 w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce" style={{ animationDelay: `${index * 0.5}s` }} />
                    <div className="absolute bottom-8 right-8 w-3 h-3 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: `${index * 0.5 + 1}s` }} />
                  </div>

                  <CardHeader className="flex-grow relative">
                    <CardTitle className="text-2xl mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed mb-6 text-gray-300">
                      {project.description}
                    </CardDescription>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-blue-400 mb-3">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-xs rounded-full text-white font-medium hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <p className="text-sm font-medium text-cyan-400 mb-2">Dream Team</p>
                        <p className="text-sm text-gray-300">{project.team}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0 group">
                        <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Live Demo
                      </Button>
                      <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10 hover:border-white/30 group">
                        <Github className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Source
                      </Button>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div className="mt-6 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 rounded-3xl blur-xl opacity-60" />
            
            <Card
              ref={ctaSection.ref}
              className={`relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 text-center p-12 md:p-16 transition-all duration-1000 ${ctaSection.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
              <CardHeader>
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                      <Rocket className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400/60 rounded-full animate-bounce" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
                  </div>
                </div>
                
                <CardTitle className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Ready to Build the <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Future</span>?
                </CardTitle>
                
                <CardDescription className="text-xl max-w-3xl mx-auto mb-8 text-gray-300 leading-relaxed">
                  Your next breakthrough is just one commit away. Join VITS and transform your wildest ideas into reality 
                  with mentorship, resources, and a community that believes in impossible possibilities.
                </CardDescription>
                
                <div className="flex justify-center space-x-4 mb-8">
                  <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
                    💡 Mentorship
                  </div>
                  <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium">
                    🛠️ Resources
                  </div>
                  <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium">
                    🤝 Community
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
};

export default Projects;
