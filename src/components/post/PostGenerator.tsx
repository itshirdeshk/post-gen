import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wand2, 
  Users, 
  Lightbulb,
  ArrowRight,
  Loader2,
  Linkedin,
  Twitter,
  Instagram,
   Facebook,
   Copy,
   Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/ui/GradientText";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
 import { useToast } from "@/hooks/use-toast";
 import { generatePost } from "@/lib/api/posts";
import type { Platform, PostContext, GeneratedPost } from "@/types/brand";
 import type { BrandBundle } from "@/types/brand";

interface PostGeneratorProps {
  onBack: () => void;
   brand: BrandBundle | null;
}

const PLATFORMS: { id: Platform; name: string; icon: React.ElementType }[] = [
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "twitter", name: "Twitter/X", icon: Twitter },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "facebook", name: "Facebook", icon: Facebook },
];

const GOALS = [
  "Drive engagement",
  "Generate leads",
  "Build brand awareness",
  "Share expertise",
  "Announce product/feature",
  "Share company culture",
];

const TONES = [
  "Professional",
  "Casual & Friendly",
  "Witty & Humorous",
  "Inspirational",
  "Authoritative",
  "Conversational",
];

 export function PostGenerator({ onBack, brand }: PostGeneratorProps) {
  const [mode, setMode] = useState<"coop" | "full_ai">("coop");
  const [context, setContext] = useState<Partial<PostContext>>({
    platform: "linkedin",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
   const [copiedId, setCopiedId] = useState<string | null>(null);
   const { toast } = useToast();

  const handleGenerate = async () => {
     if (!brand) {
       toast({
         title: "No brand selected",
         description: "Please create a brand bundle first.",
         variant: "destructive",
       });
       return;
     }
 
    setIsGenerating(true);
    setPosts([]);
    setSelectedPost(null);

     try {
       // Generate 3 posts
       const generatedPosts: GeneratedPost[] = [];
       
       for (let i = 0; i < 3; i++) {
         const response = await generatePost({
           brand_bundle_id: brand.id,
           platform: context.platform || "linkedin",
           method: mode,
           topic: context.topic,
           goal: context.goal,
           cta: context.cta,
           tone_override: context.tone_override,
         });

         if (response.success && response.data) {
           generatedPosts.push(response.data);
         } else if (response.error) {
           toast({
             title: "Generation failed",
             description: response.error,
             variant: "destructive",
           });
           break;
         }
       }
 
       setPosts(generatedPosts);
       
       if (generatedPosts.length > 0) {
         toast({
           title: "Posts generated!",
           description: `${generatedPosts.length} post${generatedPosts.length > 1 ? 's' : ''} created successfully.`,
         });
       }
     } catch (error) {
       console.error("Error generating posts:", error);
       toast({
         title: "Generation failed",
         description: "An unexpected error occurred.",
         variant: "destructive",
       });
     } finally {
       setIsGenerating(false);
     }
  };
 
   const handleCopy = async (content: string, postId: string) => {
     await navigator.clipboard.writeText(content);
     setCopiedId(postId);
     toast({ title: "Copied to clipboard!" });
     setTimeout(() => setCopiedId(null), 2000);
   };

  const handlePlatformChange = (platform: Platform) => {
    setContext((prev) => ({ ...prev, platform }));
  };

  return (
    <section className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 text-muted-foreground"
          >
            ← Back to Dashboard
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Generate <GradientText>On-Brand Posts</GradientText>
          </h1>
          <p className="text-muted-foreground">
            Choose your mode and let AI create content that sounds like you
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Controls */}
          <div className="space-y-6">
            {/* Mode Selection */}
            <GlassCard>
              <Tabs value={mode} onValueChange={(v) => setMode(v as "coop" | "full_ai")}>
                <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
                  <TabsTrigger value="coop" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    Co-Op Mode
                  </TabsTrigger>
                  <TabsTrigger value="full_ai" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Full AI
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="coop" className="mt-6 space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Answer a few questions to guide the AI. You're in control of the direction.
                  </p>

                  {/* Platform */}
                  <div className="space-y-3">
                    <Label>Platform</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {PLATFORMS.map((platform) => {
                        const Icon = platform.icon;
                        const isSelected = context.platform === platform.id;
                        return (
                          <button
                            key={platform.id}
                            onClick={() => handlePlatformChange(platform.id)}
                            className={`
                              flex flex-col items-center gap-2 p-4 rounded-xl transition-all
                              ${isSelected 
                                ? "bg-primary/20 border-2 border-primary" 
                                : "bg-secondary/50 border-2 border-transparent hover:border-primary/30"}
                            `}
                          >
                            <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={`text-xs ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                              {platform.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Goal */}
                  <div className="space-y-3">
                    <Label>Post Goal</Label>
                    <Select 
                      value={context.goal} 
                      onValueChange={(v) => setContext((prev) => ({ ...prev, goal: v }))}
                    >
                      <SelectTrigger className="bg-secondary/50">
                        <SelectValue placeholder="What do you want to achieve?" />
                      </SelectTrigger>
                      <SelectContent>
                        {GOALS.map((goal) => (
                          <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Topic */}
                  <div className="space-y-3">
                    <Label>Topic or Theme (optional)</Label>
                    <Textarea
                      placeholder="e.g., Our new AI feature, industry trends, customer success story..."
                      className="bg-secondary/50 min-h-[80px]"
                      value={context.topic || ""}
                      onChange={(e) => setContext((prev) => ({ ...prev, topic: e.target.value }))}
                    />
                  </div>

                  {/* Tone Override */}
                  <div className="space-y-3">
                    <Label>Tone Override (optional)</Label>
                    <Select 
                      value={context.tone_override} 
                      onValueChange={(v) => setContext((prev) => ({ ...prev, tone_override: v }))}
                    >
                      <SelectTrigger className="bg-secondary/50">
                        <SelectValue placeholder="Use brand default" />
                      </SelectTrigger>
                      <SelectContent>
                        {TONES.map((tone) => (
                          <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="full_ai" className="mt-6 space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Fully Autonomous</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        AI will decide the best topic, angle, and CTA based on your brand DNA. 
                        Great for when you want fresh ideas without any input.
                      </p>
                    </div>
                  </div>

                  {/* Platform */}
                  <div className="space-y-3">
                    <Label>Platform</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {PLATFORMS.map((platform) => {
                        const Icon = platform.icon;
                        const isSelected = context.platform === platform.id;
                        return (
                          <button
                            key={platform.id}
                            onClick={() => handlePlatformChange(platform.id)}
                            className={`
                              flex flex-col items-center gap-2 p-4 rounded-xl transition-all
                              ${isSelected 
                                ? "bg-primary/20 border-2 border-primary" 
                                : "bg-secondary/50 border-2 border-transparent hover:border-primary/30"}
                            `}
                          >
                            <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={`text-xs ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                              {platform.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Generate Button */}
              <Button 
                variant="hero" 
                size="lg" 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full mt-6"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate 3 Posts
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </GlassCard>
          </div>

          {/* Right: Results */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Generated Posts</h3>
            
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-card p-6 animate-pulse">
                      <div className="h-4 bg-secondary rounded w-3/4 mb-3" />
                      <div className="h-4 bg-secondary rounded w-full mb-2" />
                      <div className="h-4 bg-secondary rounded w-5/6 mb-2" />
                      <div className="h-4 bg-secondary rounded w-2/3" />
                    </div>
                  ))}
                </motion.div>
              ) : posts.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GlassCard
                        hover
                        className={`cursor-pointer transition-all ${
                          selectedPost === post.id 
                            ? "border-primary ring-2 ring-primary/20" 
                            : ""
                        }`}
                        onClick={() => setSelectedPost(post.id)}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
                            Option {index + 1}
                          </span>
                          {post.metadata?.topic && (
                            <span className="text-xs text-muted-foreground">
                              {post.metadata.topic}
                            </span>
                          )}
                        </div>
                        <p className="text-foreground whitespace-pre-line text-sm leading-relaxed">
                          {post.content}
                        </p>
                        
                        {selectedPost === post.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4 pt-4 border-t border-border flex gap-2"
                          >
                           <Button 
                             variant="hero" 
                             size="sm"
                             onClick={(e) => {
                               e.stopPropagation();
                               handleCopy(post.content, post.id);
                             }}
                           >
                             {copiedId === post.id ? (
                               <>
                                 <Check className="w-4 h-4" />
                                 Copied!
                               </>
                             ) : (
                               <>
                                 <Copy className="w-4 h-4" />
                                 Copy to Clipboard
                               </>
                             )}
                           </Button>
                          </motion.div>
                        )}
                      </GlassCard>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-12 text-center"
                >
                  <Wand2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Configure your preferences and click generate to create posts
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
