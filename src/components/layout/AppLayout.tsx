 import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Menu, 
  X, 
  Sparkles,
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/GradientText";
 import { useAuth } from "@/contexts/AuthContext";

interface AppLayoutProps {
  children: React.ReactNode;
  currentView?: string;
  onNavigate?: (view: string) => void;
  hasBrand?: boolean;
   onSignOut?: () => void;
}

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "generate", label: "Generate Posts", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

 export function AppLayout({ children, currentView, onNavigate, hasBrand, onSignOut }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const { signOut, user } = useAuth();
 
   const handleSignOut = async () => {
     await signOut();
     onSignOut?.();
   };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg hidden sm:block">
                <GradientText>PostGen</GradientText>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                const isDisabled = !hasBrand && item.id === "generate";
                
                return (
                  <button
                    key={item.id}
                    onClick={() => !isDisabled && onNavigate?.(item.id)}
                    disabled={isDisabled}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${isActive 
                        ? "bg-primary/10 text-primary" 
                        : isDisabled
                        ? "text-muted-foreground/50 cursor-not-allowed"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"}
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
             
             {user && (
               <button
                 onClick={handleSignOut}
                 className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all ml-2"
               >
                 <LogOut className="w-4 h-4" />
                 Sign Out
               </button>
             )}
            </nav>

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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border"
          >
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
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
                    className={`
                      flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all
                      ${isActive 
                        ? "bg-primary/10 text-primary" 
                        : isDisabled
                        ? "text-muted-foreground/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </div>
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
                 className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
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
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 PostGen. AI-powered content that sounds like you.</p>
        </div>
      </footer>
    </div>
  );
}
