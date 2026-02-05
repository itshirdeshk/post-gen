 import { supabase } from "@/integrations/supabase/client";
 import type { BrandBundle } from "@/types/brand";
 
 interface AnalyzeBrandResponse {
   success: boolean;
   data?: any;
   error?: string;
 }
 
 export async function analyzeBrand(websiteUrl: string): Promise<AnalyzeBrandResponse> {
   const { data, error } = await supabase.functions.invoke("analyze-brand", {
     body: { website_url: websiteUrl },
   });
 
   if (error) {
     return { success: false, error: error.message };
   }
 
   if (data?.error) {
     return { success: false, error: data.error };
   }
 
   return { success: true, data: data.data };
 }
 
 export async function fetchBrandBundles(): Promise<BrandBundle[]> {
   const { data, error } = await supabase
     .from("brand_bundles")
     .select("*")
     .order("created_at", { ascending: false });
 
   if (error) {
     console.error("Error fetching brand bundles:", error);
     return [];
   }
 
   // Transform database format to app format
   return data.map((bundle) => ({
     id: bundle.id,
     identity: {
       brand_name: bundle.brand_name,
       logo_url: bundle.logo_url,
     },
     brand_dna: {
       mission: bundle.mission,
       vision: bundle.vision,
       values: bundle.brand_values || [],
     },
     offerings: (bundle.offerings as { name: string; description: string }[]) || [],
     voice: {
       tone: bundle.tone,
       style: bundle.style,
     },
     audience: {
       primary: bundle.primary_audience,
       pain_points: bundle.pain_points || [],
     },
     proof: bundle.proof || [],
     cta_library: bundle.cta_library || [],
     keywords: bundle.keywords || [],
     confidence: {
       mission: bundle.confidence_mission,
       voice: bundle.confidence_voice,
       offerings: bundle.confidence_offerings,
     },
     created_at: bundle.created_at,
     website_url: bundle.website_url,
   }));
 }
 
 export async function deleteBrandBundle(id: string): Promise<boolean> {
   const { error } = await supabase.from("brand_bundles").delete().eq("id", id);
   return !error;
 }