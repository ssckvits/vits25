import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Facebook, Instagram, MessageCircle, Home as HomeIcon, User, Mail, Calendar, Rocket, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EnhancedFooter from '@/components/EnhancedFooter';
import Dock from '@/components/Dock';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Contact = () => {
  const { toast } = useToast();
  const contactSection = useScrollAnimation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    // Try to POST to a serverless/api endpoint that should send the email.
    // If no backend exists, fall back to opening the user's mail client via mailto:
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // If the endpoint exists but returned an error, throw to trigger fallback
        throw new Error('Failed to send message');
      }

      toast({
        title: 'Message sent',
        description: 'Thank you for reaching out. We\'ll get back to you soon.',
      });

      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      // fallback: open mail client
      const subject = encodeURIComponent(`Contact from ${formData.name}`);
      const body = encodeURIComponent(`${formData.message}\n\n--\n${formData.name}\n${formData.email}`);
      const mailto = `mailto:ssckict@gmail.com?subject=${subject}&body=${body}`;
      // open user's mail client
      window.location.href = mailto;

      toast({
        title: 'Unable to send automatically',
        description: 'Opened your mail client so you can send the message manually.',
      });

      // Do not clear the form so user can retry if needed
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'ssckict@gmail.com',
      link: 'mailto:ssckict@gmail.com',
    },
    {
      icon: Phone,
      title: 'President - Maleesha',
      content: '+94 76 988 6323',
      link: 'tel:+94769886323',
    },
    {
      icon: Phone,
      title: 'Secretary - Gayansha',
      content: '+94 76 255 6159',
      link: 'tel:+94762556159',
    },
    {
      icon: Phone,
      title: 'Media Coordinator - Navod',
      content: '+94 75 086 1917',
      link: 'tel:+94750861917',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: "ICT Society, St.Sylvester's College, Yatinuwara St, Kandy",
      link: 'https://share.google/QbSxj8RAmo2fkbYBk',
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://web.facebook.com/ssckict', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Instagram, href: 'https://www.instagram.com/ssckict', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: MessageCircle, href: 'https://whatsapp.com/channel/0029VafD2jtJP20wQwyCkz0t', label: 'WhatsApp', color: 'hover:text-green-500' },

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
        {/* Communication-inspired background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-6 h-6 border-2 border-cyan-400/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-30 right-30 w-8 h-8 border border-blue-400/40 rounded animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/3 right-1/4 w-4 h-4 border border-cyan-300/40 rotate-45 animate-pulse" style={{ animationDelay: '2.5s' }} />
        </div>

        {/* Message bubbles animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-12 h-8 bg-cyan-400/10 rounded-2xl animate-bounce" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 right-1/3 w-10 h-6 bg-blue-400/10 rounded-2xl animate-bounce" style={{ animationDelay: '2s' }} />
          <div className="absolute top-2/3 left-2/3 w-8 h-5 bg-cyan-300/10 rounded-2xl animate-bounce" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium mb-8 animate-pulse backdrop-blur-sm">
              💬 Connect with VITS
            </div>
            <h1 className="text-7xl md:text-9xl font-bold text-white mb-8 leading-tight">
              <span className="block">Let's</span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">Connect</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
              Your ideas matter. Your questions inspire us. Your journey starts with a simple message.
            </p>

            {/* Contact method icons */}
            <div className="flex justify-center space-x-12 mt-12 opacity-70">
              <div className="text-center group cursor-pointer" onClick={() => window.location.href = 'mailto:ssckict@gmail.com'}>
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center group-hover:bg-cyan-400/20 transition-all">
                  <Mail className="h-8 w-8 text-cyan-400" />
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Email</div>
              </div>
              <div className="text-center group cursor-pointer" onClick={() => window.location.href = 'tel:+94769886323'}>
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-400/10 border border-blue-400/30 flex items-center justify-center group-hover:bg-blue-400/20 transition-all">
                  <Phone className="h-8 w-8 text-blue-400" />
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Call</div>
              </div>
              <div className="text-center group cursor-pointer" onClick={() => window.location.href = 'https://share.google/QbSxj8RAmo2fkbYBk'}>
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center group-hover:bg-cyan-400/20 transition-all">
                  <MapPin className="h-8 w-8 text-cyan-400" />
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Visit</div>
              </div>
            </div>
          </div>
        </div>
        
      </section >

  {/* Contact Section */ }
  < section className = "section-padding" >
    <div className="container-custom">
      <div
        ref={contactSection.ref}
        className={`grid md:grid-cols-2 gap-12 items-start transition-all duration-700 ${contactSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        {/* Left column: contact info */}
        <div className="space-y-6 flex flex-col">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
              <CardDescription>Reach out to us through any of these channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="block flex items-start space-x-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{info.title}</p>
                    <p className="text-sm text-muted-foreground mt-1 break-words">{info.content}</p>
                  </div>
                </a>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl">Follow Us</CardTitle>
              <CardDescription>Stay connected on social media</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-cyan-400/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">Office Hours</CardTitle>
              <CardDescription>Visit us during these times</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Week Days</span>
                <span className="font-medium">7:30 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weekends</span>
                <span className="font-medium">Reach us out on Email or WhatsApp</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column: form + map (aligned to top) */}
        <div className="space-y-6 flex flex-col">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="bg-background border-border w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="bg-background border-border w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    className="bg-background border-border w-full"
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl">Our Location</CardTitle>
              <CardDescription>Find us on the map</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-56 rounded-md overflow-hidden bg-zinc-900">
                <iframe
                  title="VITS location"
                  src="https://www.google.com/maps?q=St.Sylvester's+College+Kandy&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
      </section >

  <EnhancedFooter />
    </div >
  );
};

export default Contact;
