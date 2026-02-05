 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { GlassCard } from "@/components/ui/GlassCard";
 import { GradientText } from "@/components/ui/GradientText";
 import { useAuth } from "@/contexts/AuthContext";
 import { useToast } from "@/hooks/use-toast";
 import { FloatingShapes } from "@/components/ui/decorative/FloatingShapes";
 import { HeroGradientMesh } from "@/components/ui/decorative/AbstractPatterns";
 
 interface AuthPageProps {
   onSuccess: () => void;
 }
 
 export function AuthPage({ onSuccess }: AuthPageProps) {
   const [mode, setMode] = useState<"signin" | "signup">("signin");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const { signIn, signUp } = useAuth();
   const { toast } = useToast();
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
 
     try {
       if (mode === "signin") {
         const { error } = await signIn(email, password);
         if (error) {
           toast({
             title: "Sign in failed",
             description: error.message,
             variant: "destructive",
           });
         } else {
           toast({ title: "Welcome back!" });
           onSuccess();
         }
       } else {
         const { error } = await signUp(email, password);
         if (error) {
           toast({
             title: "Sign up failed",
             description: error.message,
             variant: "destructive",
           });
         } else {
           toast({
             title: "Check your email",
             description: "We sent you a confirmation link to verify your account.",
           });
         }
       }
     } finally {
       setLoading(false);
     }
   };
 
   return (
     <section className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
       <HeroGradientMesh />
       <FloatingShapes />
       
       <div className="w-full max-w-md relative z-10">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-8"
         >
           <h1 className="text-3xl md:text-4xl font-bold mb-4">
             {mode === "signin" ? (
               <>Welcome <GradientText>Back</GradientText></>
             ) : (
               <>Get <GradientText>Started</GradientText></>
             )}
           </h1>
           <p className="text-muted-foreground">
             {mode === "signin"
               ? "Sign in to access your brand bundles"
               : "Create an account to start generating on-brand content"}
           </p>
         </motion.div>
 
         <GlassCard>
           <form onSubmit={handleSubmit} className="space-y-4">
             <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
               <Input
                 type="email"
                 placeholder="Email address"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="pl-12 h-12 bg-secondary/50 border-border"
                 required
               />
             </div>
 
             <div className="relative">
               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
               <Input
                 type={showPassword ? "text" : "password"}
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="pl-12 pr-12 h-12 bg-secondary/50 border-border"
                 required
                 minLength={6}
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
               >
                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
               </button>
             </div>
 
             <Button 
               type="submit" 
               variant="hero" 
               size="lg" 
               className="w-full"
               disabled={loading}
             >
               {loading ? (
                 <Loader2 className="w-5 h-5 animate-spin" />
               ) : (
                 <>
                   {mode === "signin" ? "Sign In" : "Create Account"}
                   <ArrowRight className="w-5 h-5" />
                 </>
               )}
             </Button>
           </form>
 
           <div className="mt-6 pt-6 border-t border-border text-center">
             <p className="text-sm text-muted-foreground">
               {mode === "signin" ? (
                 <>
                   Don't have an account?{" "}
                   <button
                     onClick={() => setMode("signup")}
                     className="text-primary hover:underline font-medium"
                   >
                     Sign up
                   </button>
                 </>
               ) : (
                 <>
                   Already have an account?{" "}
                   <button
                     onClick={() => setMode("signin")}
                     className="text-primary hover:underline font-medium"
                   >
                     Sign in
                   </button>
                 </>
               )}
             </p>
           </div>
         </GlassCard>
       </div>
     </section>
   );
 }