import { useState } from "react";
import { Linkedin, Mail, Github } from "lucide-react";

interface Member {
  name: string;
  role: string;
  image: string;
  social: {
    linkedin: string;
    email: string;
  };
}

interface LeadershipProps {
  leaders: Member[]; // use Member[] instead of typeof leadership
  animated?: boolean; // if true, show hover animation for first 4
}

export default function Leadership({ leaders, animated = false }: LeadershipProps) {
  const [hoveredLeader, setHoveredLeader] = useState<number | null>(null);

  // If animated, only first 4 leaders get the hover effect
  const animatedLeaders = animated ? leaders.slice(0, 4) : [];
  const regularLeaders = animated ? leaders.slice(4) : leaders;

  return (
    <div className="space-y-10">
      {/* Animated Leaders */}
      {animatedLeaders.length > 0 && (
        <div
          className="hidden md:flex h-[500px] gap-4"
          onMouseLeave={() => setHoveredLeader(null)}
        >
          {animatedLeaders.map((leader, index) => (
            <div
              key={index}
              className="relative rounded-[2rem] overflow-hidden transition-all duration-500 ease-out cursor-pointer"
              style={{
                flex:
                  hoveredLeader === null
                    ? index === 0
                      ? "2"
                      : "1"
                    : hoveredLeader === index
                    ? "2"
                    : "1",
              }}
              onMouseEnter={() => setHoveredLeader(index)}
            >
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-poppins font-bold text-2xl mb-2">{leader.name}</h3>
                <p className="font-inter text-accent mb-4">{leader.role}</p>
                <div className="flex space-x-3">
                  <a
                    href={leader.social.linkedin}
                    className="w-10 h-10 bg-muted/50 backdrop-blur rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${leader.social.email}`}
                    className="w-10 h-10 bg-muted/50 backdrop-blur rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  {/* <a
                    href={leader.social.github}
                    className="w-10 h-10 bg-muted/50 backdrop-blur rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile grid for all animated leaders */}
      {animatedLeaders.length > 0 && (
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
          {animatedLeaders.map((leader, index) => (
            <div key={index} className="relative rounded-2xl overflow-hidden h-[400px]">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-poppins font-bold text-xl mb-2">{leader.name}</h3>
                <p className="font-inter text-accent mb-4">{leader.role}</p>
                <div className="flex space-x-3">
                  <a
                    href={leader.social.linkedin}
                    className="w-10 h-10 bg-muted/50 backdrop-blur rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${leader.social.email}`}
                    className="w-10 h-10 bg-muted/50 backdrop-blur rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  {/* <a
                    href={leader.social.github}
                    className="w-10 h-10 bg-muted/50 backdrop-blur rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Regular Leaders Grid */}
      {regularLeaders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {regularLeaders.map((leader, index) => (
            <div
              key={index}
              className="group relative bg-background border border-border rounded-2xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-poppins font-semibold text-lg text-foreground mb-1">
                  {leader.name}
                </h3>
                <p className="font-inter text-sm text-muted-foreground mb-4">
                  {leader.role}
                </p>
                <div className="flex space-x-3">
                  <a
                    href={leader.social.linkedin}
                    className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${leader.social.email}`}
                    className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  {/* <a
                    href={leader.social.github}
                    className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
