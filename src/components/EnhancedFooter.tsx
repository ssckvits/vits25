import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Crest from '../assets/Crest.png';
import VITSLogo from '../assets/Vitslogo.png';

const EnhancedFooter: React.FC = () => {
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      url: 'https://www.instagram.com/ssckict',
      color: 'hover:text-cyan-400',
      bgColor: 'group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-blue-500'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      url: 'https://web.facebook.com/ssckict',
      color: 'hover:text-blue-400',
      bgColor: 'group-hover:bg-blue-500'
    },
    // {
    //   icon: Linkedin,
    //   label: 'LinkedIn',
    //   url: 'https://linkedin.com/company/vits-ict',
    //   color: 'hover:text-blue-500',
    //   bgColor: 'group-hover:bg-blue-600'
    // },
    // {
    //   icon: Mail,
    //   label: 'Email',
    //   url: 'mailto:contact@vits-ict.com',
    //   color: 'hover:text-cyan-400',
    //   bgColor: 'group-hover:bg-cyan-500'
    // },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative bg-black overflow-hidden mb-10">
      {/* Animated College Skyline */}
      <div className="absolute top-0 left-0 right-0 h-32 opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background buildings */}
          {/* <g className="animate-float-gentle" style={{ animationDelay: '0s' }}>
            <rect x="0" y="60" width="80" height="60" fill="url(#grad1)" />
            <rect x="85" y="45" width="70" height="75" fill="url(#grad1)" />
            <rect x="160" y="55" width="60" height="65" fill="url(#grad1)" />
          </g> */}

          {/* Main college building */}
          {/* <g className="animate-float-gentle" style={{ animationDelay: '1s' }}>
            <rect x="400" y="20" width="120" height="100" fill="url(#grad2)" />
            <rect x="420" y="10" width="80" height="20" fill="url(#grad2)" />
            <circle cx="460" cy="15" r="8" fill="url(#grad3)" /> */}
            {/* Windows */}
            {/* <rect x="415" y="35" width="8" height="12" fill="rgba(59, 130, 246, 0.6)" />
            <rect x="435" y="35" width="8" height="12" fill="rgba(59, 130, 246, 0.4)" />
            <rect x="455" y="35" width="8" height="12" fill="rgba(59, 130, 246, 0.6)" />
            <rect x="475" y="35" width="8" height="12" fill="rgba(59, 130, 246, 0.3)" />
            <rect x="495" y="35" width="8" height="12" fill="rgba(59, 130, 246, 0.5)" /> */}
          {/* </g> */}

          {/* Side buildings */}
          {/* <g className="animate-float-gentle" style={{ animationDelay: '2s' }}>
            <rect x="525" y="40" width="90" height="80" fill="url(#grad1)" />
            <rect x="620" y="50" width="75" height="70" fill="url(#grad1)" />
            <rect x="700" y="35" width="85" height="85" fill="url(#grad2)" />
          </g> */}

          {/* Background hills/trees */}
          {/* <g className="animate-float-gentle" style={{ animationDelay: '3s' }}>
            <ellipse cx="200" cy="110" rx="100" ry="20" fill="rgba(6, 182, 212, 0.1)" />
            <ellipse cx="600" cy="115" rx="150" ry="25" fill="rgba(59, 130, 246, 0.1)" />
            <ellipse cx="1000" cy="108" rx="120" ry="18" fill="rgba(6, 182, 212, 0.1)" />
          </g> */}

          {/* Stars/lights */}
          <g>
            <circle cx="100" cy="25" r="1" fill="white" className="animate-pulse" />
            <circle cx="250" cy="30" r="1.5" fill="rgba(59, 130, 246, 0.8)" className="animate-ping" />
            <circle cx="380" cy="15" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '2s' }} />
            <circle cx="680" cy="20" r="1" fill="rgba(6, 182, 212, 0.8)" className="animate-ping" style={{ animationDelay: '1s' }} />
            <circle cx="900" cy="35" r="1.5" fill="white" className="animate-pulse" style={{ animationDelay: '3s' }} />
          </g>

          {/* Gradients */}
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.3)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
            </linearGradient>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.6)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 pt-20 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                {/* <h3 className="text-4xl font-bold text-white">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    VITS
                  </span>
                </h3> */}

                <Link to="/" className="flex items-center space-x-3 group">
                  <img
                    src={Crest}
                    alt="Vester School Crest"
                    className="h-10 w-auto rounded shadow-sm group-hover:shadow-md transition-shadow"
                    loading="lazy"
                    decoding="async"
                    // onError={(e) => {
                    //   e.currentTarget.src = '/src/assets/fallback.png';
                    //   console.log('Failed to load crest image');
                    // }}
                  />
                  <img
                    src={VITSLogo}
                    alt="VITS logo"
                    className="h-8 w-auto"
                    loading="lazy"
                    decoding="async"
                    // onError={(e) => {
                    //   e.currentTarget.src = '/src/assets/fallback.png';
                    //   console.log('Failed to load logo image');
                    // }}
                  />
                  <span className="sr-only">Vester's ICT Society</span>
                </Link>

                <p className="text-gray-300 text-lg leading-relaxed">
                  The ICT Society of St. Sylvester's College — where future tech leaders are forged.
                  Coding the impossible, one line at a time.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span>St. Sylvester's College, Kandy, Sri Lanka</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-cyan-400" />
                  <span>+94 81 222 3917</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-white" />
                  <span>ssckict@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.path}
                      className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Section */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Connect</h4>
              <p className="text-gray-400 text-sm">
                Join our digital community and stay updated with the latest innovations.
              </p>

              {/* Social Icons */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center transition-all duration-300 transform ${hoveredSocial === index
                        ? 'scale-110 -translate-y-1'
                        : 'scale-100'
                      } ${social.bgColor}`}>
                      <social.icon className={`h-6 w-6 text-gray-400 transition-colors duration-300 ${social.color}`} />
                    </div>

                    {/* Hover label */}
                    {hoveredSocial === index && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded backdrop-blur-sm border border-white/20 whitespace-nowrap animate-fade-in">
                        {social.label}
                      </div>
                    )}

                    {/* Glow effect */}
                    {hoveredSocial === index && (
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-md -z-10" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 VITS - ICT Society of St. Sylvester's College. All rights reserved.
              </div>
              <div className="text-gray-400 text-sm flex items-center space-x-4">
                <span>Made with</span>
                <span className="text-red-400 animate-pulse">❤️</span>
                <span>by the VITS Team</span>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-gray-900/50 to-transparent pointer-events-none" />
    </footer>
  );
};

export default EnhancedFooter;