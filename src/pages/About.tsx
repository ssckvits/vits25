import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Award, Users, Home as HomeIcon, User, Mail, Calendar, Rocket, Image as ImageIcon } from 'lucide-react';
import EnhancedFooter from '@/components/EnhancedFooter';
import Dock from '@/components/Dock';
import aboutTeam from '@/assets/St.Sylvester.jpg';
import avatar from '@/assets/Avatar.gif';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Leadership from '@/components/Leadership';

const About = () => {
  const missionVision = useScrollAnimation();
  const historySection = useScrollAnimation();


  const leadership = [
    {
      name: 'Maleesha Sandun',
      role: 'President',
      image: '../src/assets/Committee/Maleesha.png',
      social: { linkedin: 'https://www.linkedin.com/in/maleesha-miyuranga-b2856538b', email: 'hgmsmiyuranga@gmail.com' },
    },
    {
      name: 'Gayansha Thameera',
      role: 'Secretary',
      image: '../src/assets/Committee/Gayansha.jpg',
      social: { linkedin: 'https://lk.linkedin.com/in/gayansha-rathnayake-527182252', email: 'gayansha.t.r@gmail.com' },
    },
    {
      name: 'Aashir Ahmed',
      role: 'Treasurer',
      image: avatar,
      social: { linkedin: '', email: '' },
    },
    {
      name: 'Navod Niroshana',
      role: 'Media Coordinator',
      image: avatar,
      social: { linkedin: 'https://lk.linkedin.com/in/navodn', email: 'navodnirooshana@gmail.com' },
    },
    {
      name: 'Januda Hettiarachchi',
      role: 'Vice President',
      image: avatar,
      social: { linkedin: '', email: '' },
    },
    {
      name: 'S. Sharveshar',
      role: 'Assistant Secretary',
      image: avatar,
      social: { linkedin: '', email: '' },
    },
    {
      name: 'Suranjeewa Perera',
      role: 'Chief Organizer',
      image: avatar,
      social: { linkedin: '', email: '' },
    },
    {
      name: 'Kavinda Dahanayake',
      role: 'Committee Leader',
      image: avatar,
      social: { linkedin: '', email: '' },
    },
  ];


  const mainLeaders = leadership.slice(0, 4); // first 4
  // otherLeaders should contain the remaining leaders after the main ones
  const otherLeaders = leadership.slice(4);

  // Separate committee members list (keeps data separate from executives)
  const committeeMembers = [
    {
      name: 'Supun Wasalage',
      image: avatar,
    },
    {
      name: 'Pasindu Herath',
      image: avatar,
    },
    {
      name: 'Himaru Thanthirige',
      image: avatar,
    },
    {
      name: 'Ashen Zavier',
      image: avatar,
    },
    {
      name: 'Pramod Udagamagedara',
      image: avatar,
    },
    {
      name: 'Thejan Nawinna',
      image: avatar,
    },
    {
      name: 'AD',
      image: avatar,
    },
  ];


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
      {/* Noise overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\' fill=\'none\'><filter id=\'a\' x=\'0\' y=\'0\' width=\'200%\' height=\'200%\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/></filter><rect width=\'200\' height=\'200\' fill=\'black\'/><rect width=\'200\' height=\'200\' filter=\'url(%23a)\' opacity=\'0.35\'/></svg>")',
          opacity: 0.25,
          mixBlendMode: 'screen',
        }}
      />

      {/* Dock */}
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
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-cyan-400/5 blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-cyan-400/60 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-blue-300/60 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }} />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300/80 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6 animate-pulse">
              🚀 About VITS
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
              The <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Minds</span> Behind Innovation
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              We're not just a tech society — we're dreamers, builders, and innovators shaping tomorrow's digital landscape.
            </p>
            <div className="flex justify-center space-x-8 opacity-60 mt-12">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>

      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="container-custom relative z-10">
          {/* Section Header */}
          {/* <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6 animate-pulse">
              Our Foundation
            </div>
            <h2 className="text-5xl font-bold mb-6 text-white">
              Driving <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Innovation</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              Our mission and vision shape everything we do — from coding workshops to hackathons,
              we're building the future one line of code at a time.
            </p>
          </div> */}

          <div ref={missionVision.ref} className={`grid lg:grid-cols-2 gap-12 transition-all duration-1000 ${missionVision.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>

            {/* Mission Card */}
            <div className="group relative">
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 h-full transition-all duration-500 group-hover:border-blue-400/40">
                {/* Animated icon container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  {/* Floating particles around icon */}
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
                </div>

                <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500">
                  Our Mission
                </h3>

                {/* Mission points */}
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <p>Promote technological excellence through continuous learning and collaboration</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <p>Provide practical exposure to cutting-edge technologies and industry standards</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <p>Organize educational programs, competitions, and innovation challenges</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <p>Inspire responsible ICT use for school and society advancement</p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="mt-8 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative">
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 h-full transition-all duration-500 group-hover:border-cyan-400/40">
                {/* Animated icon container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  {/* Floating particles around icon */}
                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-cyan-400/60 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
                </div>

                <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-500">
                  Our Vision
                </h3>

                {/* Vision statement with emphasis */}
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p className="text-lg font-medium text-gray-200">
                    To be a <span className="text-cyan-400 font-semibold">leading student organization</span> that nurtures:
                  </p>

                  <div className="grid grid-cols-1 gap-3 ml-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="font-medium">Innovation & Creative Problem-Solving</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="font-medium">Digital Literacy & Technical Excellence</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="font-medium">Ethical Leadership & Social Impact</span>
                    </div>
                  </div>

                  <p className="text-gray-300 pt-4 border-t border-white/10">
                    Empowering <span className="text-blue-400 font-semibold">Sylvestrians</span> to excel in the ever-evolving digital landscape.
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="mt-8 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              </div>
            </div>

          </div>

          {/* Bottom decorative elements */}
          <div className="mt-16 flex justify-center space-x-8 opacity-40">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <div ref={historySection.ref} className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${historySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <img
                src={aboutTeam}
                alt="VITS Team"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
                Our Story
              </div>
              <h2 className="text-4xl font-bold">
                A Journey of <span className="gradient-text">Innovation</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The ICT Society of St. Sylvester’s College
                  was established with the aim of fostering
                  technological awareness and excellence among students.
                  In keeping with the proud traditions of our institution,
                  the Society has grown from modest beginnings into an active
                  body that promotes innovation, discipline, and teamwork in the
                  field of Information and Communication Technology.
                </p>
                <p>
                  Guided by the
                  college motto “Fortiter in re”. We remain committed
                  to equipping Sylvestrians with the knowledge and skills required
                  to thrive in the digital era.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Leadership Team Section */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The Executives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated team that drives VITS forward
            </p>
          </div>

          {/* Leadership Component */}
          <Leadership leaders={leadership} animated />

          {/* Committee Members Section */}
          <div className="py-2 mb-0 mt-4">
            <div className="bg-card/50 rounded-3xl p-6 border border-white/6 shadow-sm">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2">Committee Members</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {committeeMembers.map((member, index) => (
                  <Card
                    key={index}
                    className="bg-card border-border text-center rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 min-h-[220px] flex flex-col items-center"
                  >
                    <CardHeader className="flex flex-col items-center gap-4 py-4">
                      <div className="w-28 h-28 rounded-full overflow-hidden p-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 ring-1 ring-white/5">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <CardTitle className="text-lg mt-1 font-semibold">{member.name}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      

      <div className="section-padding bg-card/30"></div>

      <EnhancedFooter />
    </div>
  );
};

export default About;
