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

// Image Generation
interface GenerateImageRequest {
  brand_bundle_id: string;
  prompt: string;
  style?: "minimal" | "bold" | "professional" | "creative" | "tech";
  aspect_ratio?: "1:1" | "16:9" | "9:16" | "4:5";
  post_id?: string;
}

interface GenerateImageResponse {
  success: boolean;
  data?: {
    image_url: string;
    prompt: string;
    style: string;
    aspect_ratio: string;
    post_id?: string;
  };
  error?: string;
}

export async function generatePostImage(request: GenerateImageRequest): Promise<GenerateImageResponse> {
  const { data, error } = await supabase.functions.invoke("generate-post-image", {
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

// Manual Post (save to database without AI generation)
export async function saveManualPost(post: {
  brand_bundle_id: string;
  platform: Platform;
  content: string;
  topic?: string;
}): Promise<GeneratePostResponse> {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("generated_posts")
    .insert([
      {
        brand_bundle_id: post.brand_bundle_id,
        platform: post.platform,
        content: post.content,
        topic: post.topic,
        user_id: user.id,
        method: "coop",
        angle: "custom",
      },
    ])
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    data: {
      id: data.id,
      brand_bundle_id: data.brand_bundle_id,
      method: data.method as PostMethod,
      platform: data.platform as Platform,
      content: data.content,
      metadata: {
        topic: data.topic,
        angle: data.angle,
        hashtags: data.hashtags || [],
      },
      created_at: data.created_at,
    },
  };
}