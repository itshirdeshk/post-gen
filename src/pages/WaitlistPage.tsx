import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Mail, Rocket, Calendar, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Rocket,
    title: "Brand Analysis",
    description: "AI learns your unique voice and style from your website.",
  },
  {
    icon: Zap,
    title: "Multi-Platform",
    description: "Generate posts for LinkedIn, Twitter, Instagram & more.",
  },
  {
    icon: Calendar,
    title: "Image Generation",
    description: "Create stunning visuals tailored to your brand.",
  },
];

export function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("waitlist")
        .insert({ email: email.toLowerCase().trim() });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already on the list!",
            description: "This email is already registered for early access.",
          });
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
        toast({
          title: "You're on the list! 🎉",
          description: "We'll notify you when we launch.",
        });
      }
    } catch (error) {
      console.error("Waitlist error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col dark">
      {/* Header Navigation */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="font-semibold text-lg text-foreground">PostGen</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="text-foreground font-medium border-b-2 border-primary pb-0.5">
              Waitlist
            </span>
          </nav>

          <Button variant="outline" size="sm" asChild className="rounded-lg">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-4xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
              What do you want to{" "}
              <span className="gradient-text">create?</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Join our waitlist to be first in line when we launch.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-3 gap-4 mb-12"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover-lift"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4">
                    <span className="inline-flex items-center text-xs font-medium text-muted-foreground px-3 py-1.5 rounded-full bg-secondary border border-border">
                      Coming Soon
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Signup Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-md mx-auto"
          >
            <div className="p-8 rounded-2xl bg-card border border-border">
              {isSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">You're on the list!</h3>
                  <p className="text-muted-foreground">
                    We'll send you an email when PostGen AI is ready for you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-2 text-foreground">Get Early Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Be the first to know when we launch
                    </p>
                  </div>
                  
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-12 bg-input border-border rounded-xl focus:border-primary focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-xl h-12"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Joining..."
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    No spam, ever. We'll only email you when we launch.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 px-4">
        <div className="container mx-auto flex items-center justify-center text-sm text-muted-foreground">
          <span>© 2025 PostGen AI</span>
        </div>
      </footer>
    </div>
  );
}
