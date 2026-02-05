import { motion } from "framer-motion";
import { Pencil, Sparkles, Rocket } from "lucide-react";

const steps = [
  {
    icon: Pencil,
    number: "01",
    title: "Describe What You Need",
    description: "Tell us about your product and choose your platform and style preferences.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "AI Generates Content",
    description: "Our AI creates high-quality images, videos, and captions tailored for your brand.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Publish or Schedule",
    description: "Easily publish to social media or schedule posts for the best times.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-secondary/30" id="how-it-works">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-foreground">
            Three simple steps to amazing content
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Let AI handle the content creation while you focus on growing your business.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 rounded-2xl bg-card border border-border shadow-sm hover-lift"
              >
                {/* Step number */}
                <div className="absolute top-6 right-6 text-4xl font-bold text-muted-foreground/20">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
