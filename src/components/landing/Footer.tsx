import { Sparkles, Info } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "FAQ", href: "#faq" },
  { label: "Pricing", href: "#pricing" },
];

const platformLogos = [
  { name: "Meta", icon: "∞" },
  { name: "Instagram", icon: "📷" },
  { name: "Facebook", icon: "f" },
  { name: "Google Ads", icon: "▲" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      {/* Platform logos */}
      <div className="container px-4 py-8 border-b border-border/50">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {platformLogos.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <span className="text-xl">{platform.icon}</span>
              <span className="text-sm font-medium">{platform.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Center - email signup */}
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 text-sm rounded-lg bg-secondary border border-border focus:outline-none focus:border-primary w-48"
            />
            <Link
              to="/waitlist"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Right side - help */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Need Help?</span>
              <a href="#" className="hover:text-foreground transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
