import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeroProps {
  onCreateBrand: () => void;
  hasBrand?: boolean;
}

export function DashboardHero({ onCreateBrand }: DashboardHeroProps) {
  return (
    <section className="py-20 md:py-28 landing-bg">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
              Create ads, content, and campaigns with AI —{" "}
              <span className="gradient-text">end to end.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Generate stunning visuals, compelling copy, and ready-to-publish content 
              for all your marketing channels in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={onCreateBrand}
                className="rounded-lg text-base px-8 py-6 group"
              >
                Get Started — It's Free
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-lg text-base px-8 py-6"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Right - App Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
              {/* Mock App Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-secondary rounded-md text-xs text-muted-foreground">
                    postgen.app
                  </div>
                </div>
              </div>
              
              {/* Mock App Content */}
              <div className="p-6 space-y-4">
                <div className="text-center mb-6">
                  <h3 className="font-semibold text-foreground">What do you want to create?</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mb-2">
                      <div className="w-4 h-4 bg-primary rounded" />
                    </div>
                    <div className="text-sm font-medium text-foreground">Create an Ad</div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center mb-2">
                      <div className="w-4 h-4 bg-accent rounded" />
                    </div>
                    <div className="text-sm font-medium text-foreground">Create Post</div>
                  </div>
                </div>
                <div className="h-24 rounded-xl bg-secondary/30 border border-border" />
              </div>
            </div>
            
            {/* Floating decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
