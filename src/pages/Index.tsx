import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LandingPage } from "@/pages/LandingPage";
import { AuthPage } from "@/pages/AuthPage";
import { AppLayout } from "@/components/layout/AppLayout";
import { BrandCreator } from "@/components/brand/BrandCreator";
import { BrandOverview } from "@/components/brand/BrandOverview";
import { PostGenerator } from "@/components/post/PostGenerator";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Rocket, Calendar, Image } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchBrandBundles } from "@/lib/api/brand";
import type { BrandBundle } from "@/types/brand";

type View = "landing" | "auth" | "dashboard" | "create-brand" | "generate" | "settings";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("landing");
  const [brands, setBrands] = useState<BrandBundle[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<BrandBundle | null>(null);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const { user, loading: authLoading } = useAuth();

  // Load brands when user is authenticated
  useEffect(() => {
    if (user) {
      loadBrands();
    } else {
      setBrands([]);
      setSelectedBrand(null);
    }
  }, [user]);

  const loadBrands = async () => {
    setLoadingBrands(true);
    try {
      const fetchedBrands = await fetchBrandBundles();
      setBrands(fetchedBrands);
      if (fetchedBrands.length > 0) {
        setSelectedBrand(fetchedBrands[0]);
      }
    } finally {
      setLoadingBrands(false);
    }
  };

  const handleBrandComplete = async () => {
    await loadBrands();
    setCurrentView("dashboard");
  };

  const handleAuthSuccess = () => {
    setCurrentView("dashboard");
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as View);
  };

  const handleGetStarted = () => {
    if (user) {
      setCurrentView("create-brand");
    } else {
      setCurrentView("auth");
    }
  };

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show landing page when not authenticated and on landing view
  if (currentView === "landing" && !user) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Show auth page
  if (currentView === "auth" && !user) {
    return <AuthPage onSuccess={handleAuthSuccess} />;
  }

  // Redirect to dashboard if user is authenticated and on landing/auth
  if (user && (currentView === "landing" || currentView === "auth")) {
    setCurrentView("dashboard");
  }

  const actionCards = [
    {
      icon: Rocket,
      title: "Create an Ad",
      description: "Generate images, videos, and posts for your product or campaign.",
      buttonText: "Create Ad",
      isPrimary: true,
      action: () => setCurrentView("generate"),
      available: brands.length > 0,
    },
    {
      icon: Calendar,
      title: "Create a Campaign",
      description: "Plan and auto-generate entire marketing campaigns.",
      buttonText: "Coming Soon",
      isPrimary: false,
      action: undefined,
      available: false,
    },
    {
      icon: Image,
      title: "View Library",
      description: "Browse and manage your previous creations.",
      buttonText: "Go to Library",
      isPrimary: false,
      action: () => setCurrentView("create-brand"),
      available: true,
    },
  ];

  return (
    <AppLayout 
      currentView={currentView} 
      onNavigate={handleNavigate}
      hasBrand={brands.length > 0}
      onSignOut={() => {
        setBrands([]);
        setSelectedBrand(null);
        setCurrentView("landing");
      }}
    >
      <AnimatePresence mode="wait">
        {currentView === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-16"
          >
            <div className="container mx-auto px-4">
              {loadingBrands ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  {/* Main heading */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-14"
                  >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                      What do you want to create?
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      Let AI handle the content, while you focus on growth.
                    </p>
                  </motion.div>

                  {/* Action Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
                  >
                    {actionCards.map((card, index) => {
                      const Icon = card.icon;
                      return (
                        <motion.div
                          key={card.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.1 }}
                          className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover-lift"
                        >
                          {/* Icon */}
                          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                            <Icon className="w-7 h-7 text-primary" />
                          </div>

                          {/* Content */}
                          <h3 className="text-xl font-semibold mb-2 text-foreground">{card.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            {card.description}
                          </p>

                          {/* Button */}
                          <Button
                            variant={card.isPrimary ? "default" : "outline"}
                            className="w-full rounded-xl"
                            onClick={card.action}
                            disabled={!card.available}
                          >
                            {card.buttonText}
                            {card.available && <ArrowRight className="w-4 h-4 ml-2" />}
                          </Button>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {/* Brand Overview */}
                  {selectedBrand && (
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-xl font-semibold mb-4 text-foreground">Your Brand Bundle</h2>
                      <BrandOverview brand={selectedBrand} />
                    </div>
                  )}
                </>
              )}
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
              onBack={() => setCurrentView(brands.length > 0 ? "dashboard" : "landing")}
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
            <PostGenerator 
              brand={selectedBrand}
              onBack={() => setCurrentView("dashboard")} 
            />
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
            
            <div className="p-8 rounded-2xl bg-card border border-border max-w-2xl">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Settings</h2>
              <p className="text-muted-foreground">
                Settings panel coming soon. Here you'll be able to manage your account, 
                API connections, and brand preferences.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
};

export default Index;
