import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-card border border-border p-12 md:p-16 text-center max-w-4xl mx-auto overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Start for free, no credit card required</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to transform your content strategy?
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Join thousands of marketing teams using PostGen to create on-brand content 10x faster.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg"
                onClick={onGetStarted}
                className="rounded-lg px-8 group"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-lg px-8">
                Schedule a Demo
              </Button>
            </div>
            
            <p className="text-muted-foreground text-sm mt-6">
              ✓ No credit card required · ✓ 50 free posts · ✓ Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
