import { Link } from 'react-router-dom';
import { Code2, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://web.facebook.com/ssckict', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/ssckict', label: 'Instagram' },
    // { icon: Linkedin, href: '', label: 'LinkedIn' },
    // { icon: Github, href: '', label: 'GitHub' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            {/* <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-br from-primary to-cyan-400 rounded-lg shadow-[0_0_16px_hsl(189_94%_43%/0.3)] group-hover:shadow-[0_0_24px_hsl(189_94%_43%/0.5)] transition-all duration-300">
                <Code2 className="h-5 w-5 text-background" />
              </div>
              <span className="text-xl font-bold gradient-text">VITS</span>
            </Link> */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img
              src="/src/assets/crest.png"
              alt="Vester School Crest"
              className="h-10 w-auto rounded shadow-sm group-hover:shadow-md transition-shadow"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = '/src/assets/fallback.png';
                console.log('Failed to load crest image');
              }}
              />
              <img
              src="/src/assets/vitslogo.png"
              alt="VITS logo"
              className="h-8 w-auto"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = '/src/assets/fallback.png';
                console.log('Failed to load logo image');
              }}
              />
              <span className="sr-only">Vester's ICT Society</span>
            </Link>

            <p className="text-sm text-muted-foreground">
              The ICT Society of St.Sylvester's College - Empowering students with technology and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <span>ssckict@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>ICT Society,<br />St.Sylvester's College,<br />Yatinuwara St, Kandy</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Vester's ICT Society. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
