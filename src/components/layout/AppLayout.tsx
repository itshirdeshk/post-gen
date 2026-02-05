import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, LogOut, ChevronRight, Coins, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface AppLayoutProps {
  children: React.ReactNode;
  currentView?: string;
  onNavigate?: (view: string) => void;
  hasBrand?: boolean;
  onSignOut?: () => void;
}

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "generate", label: "Brand Context" },
  { id: "settings", label: "Library" },
];

export function AppLayout({ children, currentView, onNavigate, hasBrand, onSignOut }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onSignOut?.();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Nav */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">P</span>
                </div>
                <span className="font-semibold text-lg text-foreground">PostGen</span>
              </div>

              {/* Desktop Nav Tabs */}
              <div className="hidden md:flex items-center">
                <div className="h-6 w-px bg-border mr-6" />
                <div className="flex items-center gap-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = currentView === item.id;
                    const isDisabled = !hasBrand && item.id === "generate";
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => !isDisabled && onNavigate?.(item.id)}
                        disabled={isDisabled}
                        className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                          isActive 
                            ? "bg-secondary text-foreground" 
                            : isDisabled
                            ? "text-muted-foreground/50 cursor-not-allowed"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Credits */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm">
                <Coins className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">1,000</span>
              </div>
              
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Bell className="w-5 h-5 text-muted-foreground" />
              </Button>
              
              {/* Profile */}
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="w-5 h-5 text-muted-foreground" />
              </Button>

              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="hidden md:flex items-center gap-2 text-muted-foreground"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border bg-card"
          >
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = currentView === item.id;
                const isDisabled = !hasBrand && item.id === "generate";
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (!isDisabled) {
                        onNavigate?.(item.id);
                        setMobileMenuOpen(false);
                      }
                    }}
                    disabled={isDisabled}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : isDisabled
                        ? "text-muted-foreground/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                );
              })}
             
             {user && (
               <button
                 onClick={() => {
                   handleSignOut();
                   setMobileMenuOpen(false);
                 }}
                 className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
               >
                 <div className="flex items-center gap-3">
                   <LogOut className="w-5 h-5" />
                   Sign Out
                 </div>
                 <ChevronRight className="w-4 h-4" />
               </button>
             )}
            </nav>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
