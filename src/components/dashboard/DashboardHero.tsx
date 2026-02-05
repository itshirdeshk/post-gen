import { motion } from "framer-motion";
import { Rocket, Calendar, Image, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeroProps {
  onCreateBrand: () => void;
  hasBrand?: boolean;
}

const actionCards = [
  {
    icon: Rocket,
    title: "Create a Post",
    description: "Generate images, videos, and posts for your product or campaign.",
    buttonText: "Create Post",
    buttonVariant: "hero" as const,
    available: true,
  },
  {
    icon: Calendar,
    title: "Create a Campaign",
    description: "Plan and auto-generate entire marketing campaigns.",
    buttonText: "Coming Soon",
    buttonVariant: "outline" as const,
    available: false,
  },
  {
    icon: Image,
    title: "View Library",
    description: "Browse and manage your previous creations.",
    buttonText: "Go to Library",
    buttonVariant: "outline" as const,
    available: true,
  },
];

export function DashboardHero({ onCreateBrand, hasBrand }: DashboardHeroProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            What do you want to create?
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Let AI handle the content, while you focus on growth.
          </p>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {actionCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {card.description}
                </p>

                {/* Button */}
                <Button
                  variant={card.buttonVariant}
                  className="w-full"
                  onClick={card.available ? onCreateBrand : undefined}
                  disabled={!card.available}
                >
                  {card.buttonText}
                  {card.available && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-12 mt-20 pt-12 border-t border-border/50"
        >
          <StatItem value="500+" label="Brands Analyzed" />
          <StatItem value="50K+" label="Posts Generated" />
          <StatItem value="98%" label="Satisfaction Rate" />
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
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
