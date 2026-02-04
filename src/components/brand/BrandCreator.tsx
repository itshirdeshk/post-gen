import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ArrowRight, Loader2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/ui/GradientText";
import type { ScrapingProgress, GenerationStep } from "@/types/brand";

interface BrandCreatorProps {
  onComplete: () => void;
  onBack: () => void;
}

const STEPS = [
  { step: "scraping" as GenerationStep, label: "Scanning website", duration: 2000 },
  { step: "analyzing" as GenerationStep, label: "Extracting brand DNA", duration: 3000 },
  { step: "generating" as GenerationStep, label: "Building Brand Bundle", duration: 2000 },
];

export function BrandCreator({ onComplete, onBack }: BrandCreatorProps) {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState<ScrapingProgress>({
    step: "idle",
    message: "",
    progress: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const isValidUrl = (urlString: string) => {
    try {
      const urlToTest = urlString.startsWith("http") ? urlString : `https://${urlString}`;
      new URL(urlToTest);
      return true;
    } catch {
      return false;
    }
  };

  const handleAnalyze = async () => {
    if (!isValidUrl(url)) {
      setError("Please enter a valid website URL");
      return;
    }

    setError(null);
    
    // Simulate the brand extraction process
    // In production, this would call the backend APIs
    for (let i = 0; i < STEPS.length; i++) {
      const currentStep = STEPS[i];
      setProgress({
        step: currentStep.step,
        message: currentStep.label,
        progress: ((i + 1) / STEPS.length) * 100,
      });
      await new Promise((resolve) => setTimeout(resolve, currentStep.duration));
    }

    setProgress({
      step: "complete",
      message: "Brand Bundle created!",
      progress: 100,
    });

    // Brief delay before transitioning
    setTimeout(onComplete, 1000);
  };

  const isProcessing = ["scraping", "analyzing", "generating"].includes(progress.step);
  const isComplete = progress.step === "complete";

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6 text-muted-foreground"
          >
            ← Back to Dashboard
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Create Your <GradientText>Brand Bundle</GradientText>
          </h1>
          <p className="text-muted-foreground">
            Enter your website URL and let AI extract your brand's DNA
          </p>
        </motion.div>

        <GlassCard glow={isProcessing} className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isProcessing && !isComplete ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="url"
                      placeholder="https://yourcompany.com"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        setError(null);
                      }}
                      className="pl-12 h-14 text-lg bg-secondary/50 border-border focus:border-primary"
                    />
                  </div>
                  
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-destructive text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}
                  
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={handleAnalyze}
                    disabled={!url.trim()}
                    className="w-full"
                  >
                    Analyze Brand
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    We'll scan your website to extract brand voice, mission, offerings, and more.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="progress"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-8"
              >
                {/* Progress steps */}
                <div className="space-y-6">
                  {STEPS.map((step, index) => {
                    const stepIndex = STEPS.findIndex(s => s.step === progress.step);
                    const isActive = step.step === progress.step;
                    const isDone = index < stepIndex || isComplete;
                    
                    return (
                      <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                          ${isDone ? "bg-success text-success-foreground" : 
                            isActive ? "bg-primary text-primary-foreground pulse-glow" : 
                            "bg-secondary text-muted-foreground"}
                        `}>
                          {isDone ? (
                            <Check className="w-5 h-5" />
                          ) : isActive ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <span className="text-sm">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${isActive || isDone ? "text-foreground" : "text-muted-foreground"}`}>
                            {step.label}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Progress bar */}
                <div className="mt-8">
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-primary-glow"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    {progress.message}
                  </p>
                </div>

                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 text-center"
                  >
                    <div className="inline-flex items-center gap-2 text-success">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Brand Bundle Ready!</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </section>
  );
}
