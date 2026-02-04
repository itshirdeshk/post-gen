import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/GradientText";

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-20 h-20 border border-primary/20 rounded-full" />
          <div className="absolute bottom-4 right-4 w-32 h-32 border border-accent/20 rounded-full" />
          
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Start for free, no credit card required</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your
            <br />
            <GradientText>Content Strategy?</GradientText>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join thousands of marketing teams using PostGen to create on-brand content 10x faster.
            Start your free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="hero" 
              size="xl"
              onClick={onGetStarted}
              className="group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="glass" size="lg">
              Schedule a Demo
            </Button>
          </div>
          
          <p className="text-muted-foreground text-sm mt-6">
            ✓ No credit card required &nbsp; ✓ 50 free posts &nbsp; ✓ Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
