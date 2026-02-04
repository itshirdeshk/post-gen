import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LandingPage } from "@/pages/LandingPage";
import { AppLayout } from "@/components/layout/AppLayout";
import { BrandCreator } from "@/components/brand/BrandCreator";
import { BrandOverview } from "@/components/brand/BrandOverview";
import { PostGenerator } from "@/components/post/PostGenerator";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Wand2, ArrowRight } from "lucide-react";
import type { BrandBundle } from "@/types/brand";

// Demo brand data
const DEMO_BRAND: BrandBundle = {
  id: "demo-brand",
  identity: {
    brand_name: "PostGen AI",
    logo_url: null,
  },
  brand_dna: {
    mission: "Empower businesses to create authentic, on-brand content at scale without sacrificing quality or voice.",
    vision: "A world where every brand can communicate consistently and effectively across all channels.",
    values: ["Authenticity", "Efficiency", "Innovation", "Quality"],
  },
  offerings: [
    { name: "Brand Bundle Creation", description: "AI-powered brand analysis from your website" },
    { name: "Co-Op Post Generation", description: "Guided AI content creation with your input" },
    { name: "Full AI Generation", description: "Autonomous content creation based on brand DNA" },
  ],
  voice: {
    tone: "Professional yet approachable, confident without being arrogant",
    style: "Clear, concise, and action-oriented with occasional wit",
  },
  audience: {
    primary: "Marketing managers and content creators at B2B companies",
    pain_points: [
      "Struggling to maintain consistent brand voice across channels",
      "Spending too much time creating social content",
      "Generic AI content that doesn't sound on-brand",
    ],
  },
  proof: [
    "Reduced content creation time by 80%",
    "Increased engagement rates by 3x",
    "Trusted by 500+ marketing teams",
  ],
  cta_library: [
    "Start generating content today",
    "Analyze your brand for free",
    "See the difference AI can make",
  ],
  keywords: ["ContentMarketing", "AIForBusiness", "BrandStrategy", "SocialMedia", "MarketingAutomation"],
  confidence: {
    mission: 0.92,
    voice: 0.87,
    offerings: 0.95,
  },
  website_url: "https://postgen.ai",
};

type View = "landing" | "dashboard" | "create-brand" | "generate" | "settings";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("landing");
  const [brand, setBrand] = useState<BrandBundle | null>(null);

  const handleBrandComplete = () => {
    setBrand(DEMO_BRAND);
    setCurrentView("dashboard");
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as View);
  };

  const handleGetStarted = () => {
    setCurrentView("create-brand");
  };

  // Show landing page when no brand and on landing view
  if (currentView === "landing" && !brand) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <AppLayout 
      currentView={currentView} 
      onNavigate={handleNavigate}
      hasBrand={!!brand}
    >
      <AnimatePresence mode="wait">
        {currentView === "dashboard" && brand && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8"
          >
            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <GlassCard 
                  className="cursor-pointer group"
                  onClick={() => setCurrentView("generate")}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Wand2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Generate Posts</h3>
                      <p className="text-sm text-muted-foreground">Create new on-brand content</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </GlassCard>

                <GlassCard className="cursor-pointer group" onClick={() => setCurrentView("create-brand")}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Re-analyze Brand</h3>
                      <p className="text-sm text-muted-foreground">Update your brand bundle</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Brand Overview */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Brand Bundle</h2>
              <BrandOverview brand={brand} />
            </div>
          </motion.div>
        )}

        {currentView === "create-brand" && (
          <motion.div
            key="create-brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BrandCreator 
              onComplete={handleBrandComplete}
              onBack={() => setCurrentView(brand ? "dashboard" : "landing")}
            />
          </motion.div>
        )}

        {currentView === "generate" && (
          <motion.div
            key="generate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PostGenerator onBack={() => setCurrentView("dashboard")} />
          </motion.div>
        )}

        {currentView === "settings" && (
          <motion.div
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8"
          >
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView("dashboard")}
              className="mb-6 text-muted-foreground"
            >
              ← Back to Dashboard
            </Button>
            
            <GlassCard className="max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <p className="text-muted-foreground">
                Settings panel coming soon. Here you'll be able to manage your account, 
                API connections, and brand preferences.
              </p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
};

export default Index;
