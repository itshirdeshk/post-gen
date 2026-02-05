 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
 };
 
 type Platform = "linkedin" | "twitter" | "instagram" | "facebook";
 type PostMethod = "coop" | "full_ai";
 
 interface GeneratePostRequest {
   brand_bundle_id: string;
   platform: Platform;
   method: PostMethod;
   topic?: string;
   goal?: string;
   cta?: string;
   tone_override?: string;
 }
 
 const PLATFORM_GUIDELINES: Record<Platform, { maxLength: number; style: string }> = {
   linkedin: {
     maxLength: 3000,
     style: "Professional, thought-leadership focused. Use line breaks for readability. Include a hook at the start.",
   },
   twitter: {
     maxLength: 280,
     style: "Concise, punchy, conversational. Use emojis sparingly. Make every word count.",
   },
   instagram: {
     maxLength: 2200,
     style: "Visual storytelling, engaging captions. Use emojis and line breaks. End with a question or CTA.",
   },
   facebook: {
     maxLength: 500,
     style: "Conversational, community-focused. Encourage discussion and engagement.",
   },
 };
 
 serve(async (req) => {
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const request: GeneratePostRequest = await req.json();
     const { brand_bundle_id, platform, method, topic, goal, cta, tone_override } = request;
 
     if (!brand_bundle_id || !platform || !method) {
       return new Response(
         JSON.stringify({ error: "Missing required fields: brand_bundle_id, platform, method" }),
         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     // Validate platform
     if (!["linkedin", "twitter", "instagram", "facebook"].includes(platform)) {
       return new Response(
         JSON.stringify({ error: "Invalid platform" }),
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
 
     // Fetch brand bundle
     const { data: brandBundle, error: bundleError } = await supabase
       .from("brand_bundles")
       .select("*")
       .eq("id", brand_bundle_id)
       .eq("user_id", userId)
       .single();
 
     if (bundleError || !brandBundle) {
       return new Response(
         JSON.stringify({ error: "Brand bundle not found" }),
         { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     console.log("Generating post for brand:", brandBundle.brand_name, "Platform:", platform);
 
     const platformConfig = PLATFORM_GUIDELINES[platform];
 
     // Build the prompt based on method
     const brandContext = `
 Brand: ${brandBundle.brand_name}
 Mission: ${brandBundle.mission}
 Voice Tone: ${tone_override || brandBundle.tone}
 Writing Style: ${brandBundle.style}
 Target Audience: ${brandBundle.primary_audience}
 Pain Points Addressed: ${brandBundle.pain_points?.join(", ") || "N/A"}
 Offerings: ${brandBundle.offerings?.map((o: { name: string }) => o.name).join(", ") || "N/A"}
 Proof Points: ${brandBundle.proof?.join(", ") || "N/A"}
 Keywords/Hashtags: ${brandBundle.keywords?.join(", ") || "N/A"}
 `;
 
     let userPrompt: string;
     
     if (method === "coop") {
       userPrompt = `Generate a ${platform} post for the following brand:
 
 ${brandContext}
 
 Post Requirements:
 - Topic: ${topic || "Choose a relevant topic based on brand offerings"}
 - Goal: ${goal || "Engage audience and build brand awareness"}
 - CTA: ${cta || "Use an appropriate call-to-action from brand library"}
 - Platform Style: ${platformConfig.style}
 - Max Length: ${platformConfig.maxLength} characters
 
 Generate a single, compelling post that sounds authentic to the brand voice.`;
     } else {
       // Full AI mode - autonomous generation
       userPrompt = `You are a social media expert. Generate an engaging ${platform} post for this brand:
 
 ${brandContext}
 
 Platform Guidelines: ${platformConfig.style}
 Max Length: ${platformConfig.maxLength} characters
 
 Autonomously choose:
 1. A compelling topic based on brand offerings and audience pain points
 2. An engaging angle (educational, promotional, social proof, or opinion)
 3. Relevant hashtags from the brand keywords
 4. A natural call-to-action
 
 Generate a single, high-quality post that sounds human and on-brand.`;
     }
 
     const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
     if (!LOVABLE_API_KEY) {
       throw new Error("LOVABLE_API_KEY is not configured");
     }
 
     const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
       method: "POST",
       headers: {
         Authorization: `Bearer ${LOVABLE_API_KEY}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         model: "google/gemini-3-flash-preview",
         messages: [
           {
             role: "system",
             content: `You are an expert social media content creator. Create authentic, engaging posts that match the brand voice perfectly. Never use generic AI-sounding language.`,
           },
           { role: "user", content: userPrompt },
         ],
         tools: [
           {
             type: "function",
             function: {
               name: "create_post",
               description: "Create a social media post with metadata",
               parameters: {
                 type: "object",
                 properties: {
                   content: { type: "string", description: "The full post content" },
                   topic: { type: "string", description: "The main topic of the post" },
                   angle: { type: "string", description: "The content angle (education, promotion, social_proof, opinion)" },
                   hashtags: { type: "array", items: { type: "string" }, description: "Relevant hashtags without #" },
                 },
                 required: ["content", "topic", "angle", "hashtags"],
               },
             },
           },
         ],
         tool_choice: { type: "function", function: { name: "create_post" } },
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
       throw new Error(`AI generation failed: ${aiResponse.status}`);
     }
 
     const aiData = await aiResponse.json();
     const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
 
     if (!toolCall?.function?.arguments) {
       throw new Error("Invalid AI response format");
     }
 
     const postData = JSON.parse(toolCall.function.arguments);
 
     // Save to database
     const { data: savedPost, error: dbError } = await supabase
       .from("generated_posts")
       .insert({
         user_id: userId,
         brand_bundle_id,
         method,
         platform,
         content: postData.content,
         topic: postData.topic,
         angle: postData.angle,
         hashtags: postData.hashtags,
         goal: goal || null,
         cta: cta || null,
       })
       .select()
       .single();
 
     if (dbError) {
       console.error("Database error:", dbError);
       throw new Error(`Failed to save post: ${dbError.message}`);
     }
 
     console.log("Post generated successfully:", savedPost.id);
 
     return new Response(
       JSON.stringify({ success: true, data: savedPost }),
       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   } catch (error) {
     console.error("Error generating post:", error);
     const errorMessage = error instanceof Error ? error.message : "Unknown error";
     return new Response(
       JSON.stringify({ error: errorMessage }),
       { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   }
 });