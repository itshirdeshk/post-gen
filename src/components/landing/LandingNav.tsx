import { Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useState } from "react";

interface LandingNavProps {
  onGetStarted: () => void;
}

const navLinks = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Brand Context", href: "#how-it-works" },
  { label: "Library", href: "#features" },
];

export function LandingNav({ onGetStarted }: LandingNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">PostGen</span>
            </a>
            
            {/* Desktop navigation tabs */}
            <div className="hidden md:flex items-center">
              <div className="h-8 w-px bg-border mr-6" />
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                      link.active 
                        ? "text-foreground border-b-2 border-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <div className="hidden md:flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
              >
                Sign In
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                asChild
              >
                <Link to="/waitlist">Join Waitlist</Link>
              </Button>
              <Button 
                variant="hero" 
                size="sm"
                onClick={onGetStarted}
              >
                Get Started
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    link.active 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border/50">
                <Button variant="ghost" size="sm">Sign In</Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/waitlist">Join Waitlist</Link>
                </Button>
                <Button variant="hero" size="sm" onClick={onGetStarted}>Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
