 import { supabase } from "@/integrations/supabase/client";
 import type { Platform, PostMethod, GeneratedPost } from "@/types/brand";
 
 interface GeneratePostRequest {
   brand_bundle_id: string;
   platform: Platform;
   method: PostMethod;
   topic?: string;
   goal?: string;
   cta?: string;
   tone_override?: string;
 }
 
 interface GeneratePostResponse {
   success: boolean;
   data?: GeneratedPost;
   error?: string;
 }
 
 export async function generatePost(request: GeneratePostRequest): Promise<GeneratePostResponse> {
   const { data, error } = await supabase.functions.invoke("generate-post", {
     body: request,
   });
 
   if (error) {
     return { success: false, error: error.message };
   }
 
   if (data?.error) {
     return { success: false, error: data.error };
   }
 
   return { success: true, data: data.data };
 }
 
 export async function fetchGeneratedPosts(brandBundleId?: string): Promise<GeneratedPost[]> {
   let query = supabase
     .from("generated_posts")
     .select("*")
     .order("created_at", { ascending: false });
 
   if (brandBundleId) {
     query = query.eq("brand_bundle_id", brandBundleId);
   }
 
   const { data, error } = await query;
 
   if (error) {
     console.error("Error fetching posts:", error);
     return [];
   }
 
   return data.map((post) => ({
     id: post.id,
     brand_bundle_id: post.brand_bundle_id,
     method: post.method as PostMethod,
     platform: post.platform as Platform,
     content: post.content,
     metadata: {
       topic: post.topic,
       angle: post.angle,
       hashtags: post.hashtags || [],
     },
     created_at: post.created_at,
   }));
 }
 
 export async function deletePost(id: string): Promise<boolean> {
   const { error } = await supabase.from("generated_posts").delete().eq("id", id);
   return !error;
 }