import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/ui/GradientText";
import { FloatingShapes } from "@/components/ui/decorative/FloatingShapes";
import { HeroGradientMesh, GlowingOrbs } from "@/components/ui/decorative/AbstractPatterns";
import { 
  IsometricBrandAnalysis, 
  IsometricBrandBundle, 
  IsometricContentGen,
  IsometricHeroScene 
} from "@/components/ui/decorative/IsometricIllustrations";

interface DashboardHeroProps {
  onCreateBrand: () => void;
  hasBrand?: boolean;
}

export function DashboardHero({ onCreateBrand, hasBrand }: DashboardHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered background effects */}
      <HeroGradientMesh />
      <FloatingShapes />
      <GlowingOrbs />
      
      <div className="container relative z-10 px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
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
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10"
            >
              One-time brand analysis. Unlimited on-brand posts. 
              Let AI understand your brand DNA and generate social content that truly resonates.
            </motion.p>
            
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
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
              <Button variant="glass" size="lg" className="gap-2">
                <Play className="w-4 h-4" />
                See How It Works
              </Button>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
            >
              <StatItem value="500+" label="Brands Analyzed" />
              <StatItem value="50K+" label="Posts Generated" />
              <StatItem value="98%" label="Satisfaction Rate" />
            </motion.div>
          </motion.div>
          
          {/* Right side - Isometric Hero Scene */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <IsometricHeroScene />
              
              {/* Decorative floating elements around the scene */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-full h-full rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                <span className="text-sm text-accent font-medium">AI Powered ✨</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Feature cards with isometric icons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto"
        >
          <FeatureCard
            illustration={<IsometricBrandAnalysis />}
            title="Website → Brand DNA"
            description="Paste your URL. Our AI extracts your brand's mission, voice, and values automatically."
          />
          <FeatureCard
            illustration={<IsometricBrandBundle />}
            title="Brand Bundle"
            description="A structured, reusable representation of your brand that powers all content generation."
          />
          <FeatureCard
            illustration={<IsometricContentGen />}
            title="Infinite Posts"
            description="Generate platform-specific content that stays true to your brand voice."
          />
        </motion.div>
      </div>
    </section>
  );
}

interface StatItemProps {
  value: string;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center lg:text-left">
      <div className="text-2xl md:text-3xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

interface FeatureCardProps {
  illustration: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ illustration, title, description }: FeatureCardProps) {
  return (
    <GlassCard className="text-center group cursor-default overflow-hidden">
      <div className="w-full h-40 mb-4 -mt-2">
        {illustration}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </GlassCard>
  );
}
