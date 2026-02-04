import { motion } from "framer-motion";
import { Globe, Cpu, Wand2, Share2 } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";

const steps = [
  {
    icon: Globe,
    step: "01",
    title: "Enter Your Website",
    description: "Simply paste your website URL and let our AI crawl and analyze your digital presence.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analyzes Your Brand",
    description: "Our intelligent system extracts your mission, values, tone, and unique selling points.",
  },
  {
    icon: Wand2,
    step: "03",
    title: "Generate Content",
    description: "Choose guided or fully autonomous AI to create on-brand social media posts.",
  },
  {
    icon: Share2,
    step: "04",
    title: "Publish Everywhere",
    description: "Copy, schedule, or directly publish your content across all major platforms.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden" id="how-it-works">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            From Website to Content in <GradientText>4 Simple Steps</GradientText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our streamlined process makes it easy to transform your brand presence into engaging social content.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-border to-transparent" />
              )}
              
              <div className="glass-card p-6 h-full hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-4xl font-bold text-muted-foreground/20">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
