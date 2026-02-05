 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
 };
 
 interface BrandBundle {
   brand_name: string;
   mission: string;
   vision: string;
   brand_values: string[];
   tone: string;
   style: string;
   offerings: { name: string; description: string }[];
   primary_audience: string;
   pain_points: string[];
   proof: string[];
   cta_library: string[];
   keywords: string[];
   confidence_mission: number;
   confidence_voice: number;
   confidence_offerings: number;
 }
 
 serve(async (req) => {
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const { website_url } = await req.json();
 
     if (!website_url) {
       return new Response(
         JSON.stringify({ error: "Website URL is required" }),
         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     // Validate and format URL
     let formattedUrl = website_url.trim();
     if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
       formattedUrl = `https://${formattedUrl}`;
     }
 
     // Get auth header for user verification
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
 
     console.log("Analyzing brand for URL:", formattedUrl);
 
    // Fetch website content using Firecrawl for better scraping
     let websiteContent = "";
    let brandingData: Record<string, unknown> | null = null;
    
    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
    
     try {
      if (FIRECRAWL_API_KEY) {
        console.log("Using Firecrawl for enhanced scraping");
        
        const firecrawlResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${FIRECRAWL_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: formattedUrl,
            formats: ["markdown", "branding"],
            onlyMainContent: false,
            waitFor: 3000,
          }),
        });
        
        if (firecrawlResponse.ok) {
          const firecrawlData = await firecrawlResponse.json();
          websiteContent = firecrawlData.data?.markdown || firecrawlData.markdown || "";
          brandingData = firecrawlData.data?.branding || firecrawlData.branding || null;
          console.log("Firecrawl scrape successful, content length:", websiteContent.length);
        } else {
          console.log("Firecrawl failed, falling back to basic fetch:", firecrawlResponse.status);
        }
      }
      
      // Fallback to basic fetch if Firecrawl unavailable or failed
      if (!websiteContent) {
        console.log("Using basic fetch for scraping");
        const response = await fetch(formattedUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; BrandAnalyzer/1.0)",
          },
        });
        if (response.ok) {
          const html = await response.text();
          websiteContent = html
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 20000);
        }
       }
     } catch (fetchError) {
      console.log("Scraping error, proceeding with URL analysis:", fetchError);
     }
 
     // Use Lovable AI to analyze brand
     const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
     if (!LOVABLE_API_KEY) {
       throw new Error("LOVABLE_API_KEY is not configured");
     }
 
     const systemPrompt = `You are a brand strategist expert. Analyze the provided website content and extract comprehensive brand information. Be thorough and creative in inferring brand attributes even from limited information.
 
 Return a structured analysis following this exact JSON schema. All fields are required.`;
 
     const userPrompt = `Analyze this website and extract brand information:
 
 URL: ${formattedUrl}
 
 Website Content:
${websiteContent.slice(0, 25000) || "Could not fetch website content. Please infer brand attributes from the URL and domain name."}

${brandingData ? `
Brand Visual Identity Data:
- Logo: ${(brandingData as Record<string, unknown>).logo || "Not found"}
- Colors: ${JSON.stringify((brandingData as Record<string, unknown>).colors || {})}
- Fonts: ${JSON.stringify((brandingData as Record<string, unknown>).fonts || [])}
` : ""}
 
 Extract and return the brand bundle.`;
 
     const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
       method: "POST",
       headers: {
         Authorization: `Bearer ${LOVABLE_API_KEY}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         model: "google/gemini-3-flash-preview",
         messages: [
           { role: "system", content: systemPrompt },
           { role: "user", content: userPrompt },
         ],
         tools: [
           {
             type: "function",
             function: {
               name: "create_brand_bundle",
               description: "Create a comprehensive brand bundle from website analysis",
               parameters: {
                 type: "object",
                 properties: {
                   brand_name: { type: "string", description: "The brand/company name" },
                   mission: { type: "string", description: "Brand mission statement (1-2 sentences)" },
                   vision: { type: "string", description: "Brand vision statement (1-2 sentences)" },
                   brand_values: { type: "array", items: { type: "string" }, description: "3-5 core brand values" },
                   tone: { type: "string", description: "Brand voice tone (e.g., professional, friendly, authoritative)" },
                   style: { type: "string", description: "Writing style description" },
                   offerings: {
                     type: "array",
                     items: {
                       type: "object",
                       properties: {
                         name: { type: "string" },
                         description: { type: "string" },
                       },
                       required: ["name", "description"],
                     },
                     description: "Products or services offered",
                   },
                   primary_audience: { type: "string", description: "Primary target audience" },
                   pain_points: { type: "array", items: { type: "string" }, description: "3-5 customer pain points addressed" },
                   proof: { type: "array", items: { type: "string" }, description: "Social proof points (stats, testimonials, achievements)" },
                   cta_library: { type: "array", items: { type: "string" }, description: "5 call-to-action phrases" },
                   keywords: { type: "array", items: { type: "string" }, description: "5-10 relevant hashtags/keywords without #" },
                   confidence_mission: { type: "number", description: "Confidence score for mission extraction (0-1)" },
                   confidence_voice: { type: "number", description: "Confidence score for voice extraction (0-1)" },
                   confidence_offerings: { type: "number", description: "Confidence score for offerings extraction (0-1)" },
                 },
                 required: [
                   "brand_name", "mission", "vision", "brand_values", "tone", "style",
                   "offerings", "primary_audience", "pain_points", "proof", "cta_library",
                   "keywords", "confidence_mission", "confidence_voice", "confidence_offerings"
                 ],
               },
             },
           },
         ],
         tool_choice: { type: "function", function: { name: "create_brand_bundle" } },
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
       throw new Error(`AI analysis failed: ${aiResponse.status}`);
     }
 
     const aiData = await aiResponse.json();
     const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
     
     if (!toolCall?.function?.arguments) {
       throw new Error("Invalid AI response format");
     }
 
     const brandBundle: BrandBundle = JSON.parse(toolCall.function.arguments);
 
     // Save to database
     const { data: savedBundle, error: dbError } = await supabase
       .from("brand_bundles")
       .insert({
         user_id: userId,
         website_url: formattedUrl,
         brand_name: brandBundle.brand_name,
         mission: brandBundle.mission,
         vision: brandBundle.vision,
         brand_values: brandBundle.brand_values,
         tone: brandBundle.tone,
         style: brandBundle.style,
         offerings: brandBundle.offerings,
         primary_audience: brandBundle.primary_audience,
         pain_points: brandBundle.pain_points,
         proof: brandBundle.proof,
         cta_library: brandBundle.cta_library,
         keywords: brandBundle.keywords,
         confidence_mission: brandBundle.confidence_mission,
         confidence_voice: brandBundle.confidence_voice,
         confidence_offerings: brandBundle.confidence_offerings,
       })
       .select()
       .single();
 
     if (dbError) {
       console.error("Database error:", dbError);
       throw new Error(`Failed to save brand bundle: ${dbError.message}`);
     }
 
     console.log("Brand bundle created successfully:", savedBundle.id);
 
     return new Response(
       JSON.stringify({ success: true, data: savedBundle }),
       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   } catch (error) {
     console.error("Error analyzing brand:", error);
     const errorMessage = error instanceof Error ? error.message : "Unknown error";
     return new Response(
       JSON.stringify({ error: errorMessage }),
       { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   }
 });