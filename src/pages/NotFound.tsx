import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const homeHref = import.meta.env.BASE_URL || '/';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="relative text-center space-y-6 px-6 py-12 rounded-2xl shadow-medium max-w-2xl" style={{background: 'var(--gradient-card)'}}>
        {/* playful header */}
        <div className="flex items-center justify-center space-x-6">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)] shadow-glow transform animate-tilt">
            <svg className="w-14 h-14 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2c1.1 0 2 .9 2 2v2h2c1.1 0 2 .9 2 2v2h-2v6a2 2 0 0 1-2 2h-2v2c0 1.1-.9 2-2 2s-2-.9-2-2v-2H6a2 2 0 0 1-2-2V8H2V6c0-1.1.9-2 2-2h2V2c0-1.1.9-2 2-2s2 .9 2 2v2h2V2z" fill="currentColor" opacity="0.12" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="text-left">
            <h1 className="text-6xl font-extrabold gradient-text tracking-tight">404</h1>
            <p className="text-xl font-semibold text-muted-foreground">Page not found</p>
          </div>
        </div>

        <p className="text-base text-muted-foreground max-w-xl mx-auto">
          The page you tried to reach doesn't exist. You can return to the homepage or browse other sections of the site.
        </p>

        <div className="flex items-center justify-center space-x-4">
          <a href={homeHref}>
            <Button size="lg" className="btn-glow transform hover:-translate-y-1 transition">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </a>
        </div>

        {/* confetti dots */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="confetti top-8 left-6" style={{background: 'rgba(189, 94, 43, 0.12)'}} />
          <div className="confetti top-14 right-12" style={{background: 'rgba(60, 130, 246, 0.10)'}} />
          <div className="confetti bottom-10 left-20" style={{background: 'rgba(52, 211, 153, 0.08)'}} />
          <div className="confetti bottom-6 right-24" style={{background: 'rgba(124, 58, 237, 0.09)'}} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
