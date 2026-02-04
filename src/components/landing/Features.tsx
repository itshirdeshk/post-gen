import { motion } from "framer-motion";
import { 
  Zap, 
  Target, 
  BarChart3, 
  Shield, 
  Sparkles, 
  RefreshCcw,
  Palette,
  Globe2,
  Clock
} from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate dozens of on-brand posts in seconds, not hours. Save 80% of your content creation time.",
    color: "primary",
  },
  {
    icon: Target,
    title: "Always On-Brand",
    description: "Every piece of content aligns with your brand voice, values, and messaging guidelines.",
    color: "accent",
  },
  {
    icon: BarChart3,
    title: "Data-Driven",
    description: "AI learns from engagement patterns to optimize your content for maximum reach and impact.",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Your brand data is encrypted and never shared. SOC 2 compliant infrastructure.",
    color: "accent",
  },
  {
    icon: Sparkles,
    title: "AI Co-Pilot Mode",
    description: "Work alongside AI with guided prompts for creative control while maintaining efficiency.",
    color: "primary",
  },
  {
    icon: RefreshCcw,
    title: "Infinite Variations",
    description: "Never run out of ideas. Generate unlimited variations until you find the perfect post.",
    color: "accent",
  },
  {
    icon: Palette,
    title: "Multi-Platform Ready",
    description: "Optimized content for LinkedIn, Twitter, Instagram, Facebook, and more.",
    color: "primary",
  },
  {
    icon: Globe2,
    title: "Multi-Language",
    description: "Generate content in 50+ languages while maintaining your brand's unique voice.",
    color: "accent",
  },
  {
    icon: Clock,
    title: "Content Calendar",
    description: "Plan and schedule your posts ahead with our integrated content calendar.",
    color: "primary",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-secondary/30" id="features">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">Features</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Everything You Need to <GradientText>Scale Content</GradientText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Powerful features designed to help marketing teams create consistent, engaging content at scale.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-4 group-hover:bg-${feature.color}/20 transition-colors`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
