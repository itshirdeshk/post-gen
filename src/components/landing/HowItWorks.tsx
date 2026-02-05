import { motion } from "framer-motion";
import { Pencil, Sparkles, Rocket } from "lucide-react";

const steps = [
  {
    icon: Pencil,
    title: "Describe What You Need",
    description: "Describe your product, and select your target platform and style.",
  },
  {
    icon: Sparkles,
    title: "AI Generates Engaging Content",
    description: "Our AI creates high-quality images, videos and captions tailored for your business.",
  },
  {
    icon: Rocket,
    title: "Publish or Schedule",
    description: "Easily publish to social media or schedule to auto-post at the best times.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-secondary/20" id="how-it-works">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Let AI handle the content, while you focus on growth.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 rounded-xl bg-card border border-border text-center"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
