import { motion } from "framer-motion";
import { 
  Sparkles, 
  Zap, 
  Globe, 
  ArrowRight,
  Layers,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/ui/GradientText";

interface DashboardHeroProps {
  onCreateBrand: () => void;
  hasBrand?: boolean;
}

export function DashboardHero({ onCreateBrand, hasBrand }: DashboardHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10 px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Content Generation</span>
          </motion.div>
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Transform Your Brand Into
            <br />
            <GradientText className="glow-text">Endless Content</GradientText>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            One-time brand analysis. Unlimited on-brand posts. 
            Let AI understand your brand DNA and generate social content that truly resonates.
          </motion.p>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onCreateBrand}
              className="group"
            >
              {hasBrand ? "Generate Posts" : "Analyze Your Brand"}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="glass" size="lg">
              See How It Works
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto"
        >
          <FeatureCard
            icon={Globe}
            title="Website → Brand DNA"
            description="Paste your URL. Our AI extracts your brand's mission, voice, and values automatically."
          />
          <FeatureCard
            icon={Layers}
            title="Brand Bundle"
            description="A structured, reusable representation of your brand that powers all content generation."
          />
          <FeatureCard
            icon={MessageSquare}
            title="Infinite Posts"
            description="Generate platform-specific content that stays true to your brand voice."
          />
        </motion.div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <GlassCard className="text-center group cursor-default">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </GlassCard>
  );
}
