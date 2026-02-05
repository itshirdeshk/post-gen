 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
 };
 
 interface GenerateImageRequest {
   brand_bundle_id: string;
   post_id?: string;
   prompt: string;
   style?: string;
   aspect_ratio?: "1:1" | "16:9" | "9:16" | "4:5";
 }
 
 const STYLE_PROMPTS: Record<string, string> = {
   minimal: "Clean, minimalist design with lots of white space, modern typography, subtle gradients",
   bold: "Bold colors, striking contrast, impactful typography, attention-grabbing",
   professional: "Corporate, polished, trustworthy, clean lines, professional photography style",
   creative: "Artistic, unique, creative layouts, vibrant colors, expressive design",
   tech: "Futuristic, tech-inspired, geometric shapes, neon accents, digital aesthetic",
 };
 
 serve(async (req) => {
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const request: GenerateImageRequest = await req.json();
     const { brand_bundle_id, post_id, prompt, style = "professional", aspect_ratio = "1:1" } = request;
 
     if (!brand_bundle_id || !prompt) {
       return new Response(
         JSON.stringify({ error: "Missing required fields: brand_bundle_id, prompt" }),
         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     // Auth check
     const authHeader = req.headers.get("Authorization");
     if (!authHeader?.startsWith("Bearer ")) {
       return new Response(
         JSON.stringify({ error: "Unauthorized" }),
         { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     const supabase = createClient(
       Deno.env.get("SUPABASE_URL")!,
       Deno.env.get("SUPABASE_ANON_KEY")!,
       { global: { headers: { Authorization: authHeader } } }
     );
 
     const token = authHeader.replace("Bearer ", "");
     const { data: claims, error: authError } = await supabase.auth.getClaims(token);
     if (authError || !claims?.claims) {
       return new Response(
         JSON.stringify({ error: "Unauthorized" }),
         { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     const userId = claims.claims.sub;
 
     // Fetch brand bundle for context
     const { data: brandBundle, error: bundleError } = await supabase
       .from("brand_bundles")
       .select("brand_name, tone, style, primary_audience")
       .eq("id", brand_bundle_id)
       .eq("user_id", userId)
       .single();
 
     if (bundleError || !brandBundle) {
       return new Response(
         JSON.stringify({ error: "Brand bundle not found" }),
         { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     console.log("Generating image for brand:", brandBundle.brand_name);
 
     const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
     if (!LOVABLE_API_KEY) {
       throw new Error("LOVABLE_API_KEY is not configured");
     }
 
     const styleDescription = STYLE_PROMPTS[style] || STYLE_PROMPTS.professional;
     
     const imagePrompt = `Create a social media post image for ${brandBundle.brand_name}.
 
 Content/Message: ${prompt}
 
 Style: ${styleDescription}
 Brand Tone: ${brandBundle.tone || "Professional"}
 Target Audience: ${brandBundle.primary_audience || "Business professionals"}
 
 Requirements:
 - Make it visually striking and shareable
 - Use appropriate colors that feel on-brand
 - Include subtle visual elements that reinforce the message
 - Ensure text is readable if any text is included
 - Ultra high resolution, ${aspect_ratio} aspect ratio`;
 
     const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
       method: "POST",
       headers: {
         Authorization: `Bearer ${LOVABLE_API_KEY}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         model: "google/gemini-2.5-flash-image",
         messages: [
           {
             role: "user",
             content: imagePrompt,
           },
         ],
         modalities: ["image", "text"],
       }),
     });
 
     if (!aiResponse.ok) {
       if (aiResponse.status === 429) {
         return new Response(
           JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
           { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
         );
       }
       if (aiResponse.status === 402) {
         return new Response(
           JSON.stringify({ error: "AI credits exhausted. Please add more credits." }),
           { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
         );
       }
       const errorText = await aiResponse.text();
       console.error("AI API error:", aiResponse.status, errorText);
       throw new Error(`Image generation failed: ${aiResponse.status}`);
     }
 
     const aiData = await aiResponse.json();
     const imageUrl = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
 
     if (!imageUrl) {
       throw new Error("No image generated");
     }
 
     console.log("Image generated successfully");
 
     return new Response(
       JSON.stringify({
         success: true,
         data: {
           image_url: imageUrl,
           prompt: prompt,
           style: style,
           aspect_ratio: aspect_ratio,
           post_id: post_id,
         },
       }),
       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   } catch (error) {
     console.error("Error generating image:", error);
     const errorMessage = error instanceof Error ? error.message : "Unknown error";
     return new Response(
       JSON.stringify({ error: errorMessage }),
       { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   }
 });