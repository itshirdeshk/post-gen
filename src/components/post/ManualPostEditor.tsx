 import { useState } from "react";
 import { motion } from "framer-motion";
 import {
   Type,
   Image as ImageIcon,
   Palette,
   Save,
   Loader2,
   Linkedin,
   Twitter,
   Instagram,
   Facebook,
   Sparkles,
   Download,
 } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { GlassCard } from "@/components/ui/GlassCard";
 import { Textarea } from "@/components/ui/textarea";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { useToast } from "@/hooks/use-toast";
 import { saveManualPost, generatePostImage } from "@/lib/api/posts";
 import type { Platform, BrandBundle } from "@/types/brand";
 
 interface ManualPostEditorProps {
   brand: BrandBundle | null;
   onSave?: () => void;
 }
 
 const PLATFORMS: { id: Platform; name: string; icon: React.ElementType; maxLength: number }[] = [
   { id: "linkedin", name: "LinkedIn", icon: Linkedin, maxLength: 3000 },
   { id: "twitter", name: "Twitter/X", icon: Twitter, maxLength: 280 },
   { id: "instagram", name: "Instagram", icon: Instagram, maxLength: 2200 },
   { id: "facebook", name: "Facebook", icon: Facebook, maxLength: 500 },
 ];
 
 const IMAGE_STYLES = [
   { id: "professional", name: "Professional" },
   { id: "minimal", name: "Minimal" },
   { id: "bold", name: "Bold" },
   { id: "creative", name: "Creative" },
   { id: "tech", name: "Tech" },
 ];
 
 const ASPECT_RATIOS = [
   { id: "1:1", name: "Square (1:1)" },
   { id: "16:9", name: "Landscape (16:9)" },
   { id: "9:16", name: "Portrait (9:16)" },
   { id: "4:5", name: "Instagram (4:5)" },
 ];
 
 export function ManualPostEditor({ brand, onSave }: ManualPostEditorProps) {
   const [content, setContent] = useState("");
   const [topic, setTopic] = useState("");
   const [platform, setPlatform] = useState<Platform>("linkedin");
   const [imagePrompt, setImagePrompt] = useState("");
   const [imageStyle, setImageStyle] = useState("professional");
   const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "9:16" | "4:5">("1:1");
   const [generatedImage, setGeneratedImage] = useState<string | null>(null);
   const [isSaving, setIsSaving] = useState(false);
   const [isGeneratingImage, setIsGeneratingImage] = useState(false);
   const { toast } = useToast();
 
   const currentPlatform = PLATFORMS.find((p) => p.id === platform);
   const charCount = content.length;
   const maxLength = currentPlatform?.maxLength || 3000;
   const isOverLimit = charCount > maxLength;
 
   const handleGenerateImage = async () => {
     if (!brand) {
       toast({
         title: "No brand selected",
         description: "Please create a brand bundle first.",
         variant: "destructive",
       });
       return;
     }
 
     if (!imagePrompt.trim()) {
       toast({
         title: "Image prompt required",
         description: "Please describe the image you want to generate.",
         variant: "destructive",
       });
       return;
     }
 
     setIsGeneratingImage(true);
 
     try {
       const response = await generatePostImage({
         brand_bundle_id: brand.id,
         prompt: imagePrompt,
         style: imageStyle as "minimal" | "bold" | "professional" | "creative" | "tech",
         aspect_ratio: aspectRatio,
       });
 
       if (response.success && response.data) {
         setGeneratedImage(response.data.image_url);
         toast({ title: "Image generated!" });
       } else {
         toast({
           title: "Image generation failed",
           description: response.error || "Please try again.",
           variant: "destructive",
         });
       }
     } catch (error) {
       console.error("Error generating image:", error);
       toast({
         title: "Error",
         description: "Failed to generate image.",
         variant: "destructive",
       });
     } finally {
       setIsGeneratingImage(false);
     }
   };
 
   const handleSave = async () => {
     if (!brand) {
       toast({
         title: "No brand selected",
         description: "Please create a brand bundle first.",
         variant: "destructive",
       });
       return;
     }
 
     if (!content.trim()) {
       toast({
         title: "Content required",
         description: "Please write some content for your post.",
         variant: "destructive",
       });
       return;
     }
 
     if (isOverLimit) {
       toast({
         title: "Content too long",
         description: `Your post exceeds the ${maxLength} character limit for ${currentPlatform?.name}.`,
         variant: "destructive",
       });
       return;
     }
 
     setIsSaving(true);
 
     try {
       const response = await saveManualPost({
         brand_bundle_id: brand.id,
         platform,
         content,
         topic: topic || undefined,
       });
 
       if (response.success) {
         toast({ title: "Post saved!" });
         setContent("");
         setTopic("");
         setGeneratedImage(null);
         setImagePrompt("");
         onSave?.();
       } else {
         toast({
           title: "Save failed",
           description: response.error || "Please try again.",
           variant: "destructive",
         });
       }
     } catch (error) {
       console.error("Error saving post:", error);
       toast({
         title: "Error",
         description: "Failed to save post.",
         variant: "destructive",
       });
     } finally {
       setIsSaving(false);
     }
   };
 
   const handleDownloadImage = () => {
     if (!generatedImage) return;
     
     const link = document.createElement("a");
     link.href = generatedImage;
     link.download = `post-image-${Date.now()}.png`;
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
   };
 
   return (
     <div className="space-y-6">
       {/* Platform Selection */}
       <GlassCard>
         <Label className="mb-3 block">Select Platform</Label>
         <div className="grid grid-cols-4 gap-2">
           {PLATFORMS.map((p) => {
             const Icon = p.icon;
             const isSelected = platform === p.id;
             return (
               <button
                 key={p.id}
                 onClick={() => setPlatform(p.id)}
                 className={`
                   flex flex-col items-center gap-2 p-4 rounded-xl transition-all
                   ${isSelected
                     ? "bg-primary/20 border-2 border-primary"
                     : "bg-secondary/50 border-2 border-transparent hover:border-primary/30"}
                 `}
               >
                 <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                 <span className={`text-xs ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                   {p.name}
                 </span>
               </button>
             );
           })}
         </div>
       </GlassCard>
 
       {/* Content Editor */}
       <GlassCard>
         <div className="flex items-center gap-2 mb-4">
           <Type className="w-5 h-5 text-primary" />
           <Label>Post Content</Label>
         </div>
 
         <div className="space-y-4">
           <Input
             placeholder="Topic or title (optional)"
             value={topic}
             onChange={(e) => setTopic(e.target.value)}
             className="bg-secondary/50"
           />
 
           <div className="relative">
             <Textarea
               placeholder="Write your post content here..."
               value={content}
               onChange={(e) => setContent(e.target.value)}
               className="bg-secondary/50 min-h-[200px] resize-none"
             />
             <div
               className={`absolute bottom-3 right-3 text-xs ${
                 isOverLimit ? "text-destructive" : "text-muted-foreground"
               }`}
             >
               {charCount}/{maxLength}
             </div>
           </div>
         </div>
       </GlassCard>
 
       {/* Image Generator */}
       <GlassCard>
         <div className="flex items-center gap-2 mb-4">
           <ImageIcon className="w-5 h-5 text-primary" />
           <Label>Generate Image</Label>
         </div>
 
         <div className="space-y-4">
           <Textarea
             placeholder="Describe the image you want to generate... (e.g., 'A modern office with people collaborating on a project')"
             value={imagePrompt}
             onChange={(e) => setImagePrompt(e.target.value)}
             className="bg-secondary/50 min-h-[100px]"
           />
 
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label className="flex items-center gap-2">
                 <Palette className="w-4 h-4" />
                 Style
               </Label>
               <Select value={imageStyle} onValueChange={setImageStyle}>
                 <SelectTrigger className="bg-secondary/50">
                   <SelectValue />
                 </SelectTrigger>
                 <SelectContent>
                   {IMAGE_STYLES.map((style) => (
                     <SelectItem key={style.id} value={style.id}>
                       {style.name}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
 
             <div className="space-y-2">
               <Label>Aspect Ratio</Label>
               <Select
                 value={aspectRatio}
                 onValueChange={(v) => setAspectRatio(v as "1:1" | "16:9" | "9:16" | "4:5")}
               >
                 <SelectTrigger className="bg-secondary/50">
                   <SelectValue />
                 </SelectTrigger>
                 <SelectContent>
                   {ASPECT_RATIOS.map((ratio) => (
                     <SelectItem key={ratio.id} value={ratio.id}>
                       {ratio.name}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
           </div>
 
           <Button
             variant="outline"
             onClick={handleGenerateImage}
             disabled={isGeneratingImage || !imagePrompt.trim()}
             className="w-full"
           >
             {isGeneratingImage ? (
               <>
                 <Loader2 className="w-4 h-4 animate-spin" />
                 Generating Image...
               </>
             ) : (
               <>
                 <Sparkles className="w-4 h-4" />
                 Generate Image
               </>
             )}
           </Button>
 
           {generatedImage && (
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="relative rounded-xl overflow-hidden border border-border"
             >
               <img
                 src={generatedImage}
                 alt="Generated post image"
                 className="w-full h-auto"
               />
               <div className="absolute bottom-3 right-3">
                 <Button size="sm" variant="secondary" onClick={handleDownloadImage}>
                   <Download className="w-4 h-4 mr-1" />
                   Download
                 </Button>
               </div>
             </motion.div>
           )}
         </div>
       </GlassCard>
 
       {/* Save Button */}
       <Button
         variant="hero"
         size="lg"
         onClick={handleSave}
         disabled={isSaving || !content.trim() || isOverLimit}
         className="w-full"
       >
         {isSaving ? (
           <>
             <Loader2 className="w-5 h-5 animate-spin" />
             Saving...
           </>
         ) : (
           <>
             <Save className="w-5 h-5" />
             Save Post
           </>
         )}
       </Button>
     </div>
   );
 }