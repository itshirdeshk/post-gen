 import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LandingPage } from "@/pages/LandingPage";
 import { AuthPage } from "@/pages/AuthPage";
import { AppLayout } from "@/components/layout/AppLayout";
import { BrandCreator } from "@/components/brand/BrandCreator";
import { BrandOverview } from "@/components/brand/BrandOverview";
import { PostGenerator } from "@/components/post/PostGenerator";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
 import { Wand2, ArrowRight, Loader2 } from "lucide-react";
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
       <div className="min-h-screen flex items-center justify-center">
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
            className="container mx-auto px-4 py-8"
          >
             {loadingBrands ? (
               <div className="flex items-center justify-center py-20">
                 <Loader2 className="w-8 h-8 animate-spin text-primary" />
               </div>
             ) : brands.length === 0 ? (
               <div className="text-center py-20">
                 <h2 className="text-2xl font-bold mb-4">Welcome to PostGen AI!</h2>
                 <p className="text-muted-foreground mb-6">
                   Create your first Brand Bundle to start generating on-brand content.
                 </p>
                 <Button variant="hero" onClick={() => setCurrentView("create-brand")}>
                   Create Brand Bundle
                   <ArrowRight className="w-5 h-5" />
                 </Button>
               </div>
             ) : (
               <>
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
                       <h3 className="font-semibold">Add New Brand</h3>
                       <p className="text-sm text-muted-foreground">Analyze another website</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Brand Overview */}
               <div>
                 <h2 className="text-xl font-semibold mb-4">Your Brand Bundle</h2>
                 {selectedBrand && <BrandOverview brand={selectedBrand} />}
               </div>
               </>
             )}
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
