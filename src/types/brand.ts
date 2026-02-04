// Brand Bundle Types - Core domain model

export interface BrandIdentity {
  brand_name: string;
  logo_url?: string | null;
}

export interface BrandDNA {
  mission?: string;
  vision?: string;
  values?: string[];
}

export interface Offering {
  name: string;
  description: string;
}

export interface BrandVoice {
  tone?: string;
  style?: string;
}

export interface BrandAudience {
  primary?: string;
  pain_points?: string[];
}

export interface BrandConfidence {
  mission?: number;
  voice?: number;
  offerings?: number;
}

export interface BrandBundle {
  id: string;
  identity: BrandIdentity;
  brand_dna: BrandDNA;
  offerings: Offering[];
  voice: BrandVoice;
  audience: BrandAudience;
  proof: string[];
  cta_library: string[];
  keywords: string[];
  confidence: BrandConfidence;
  created_at?: string;
  website_url?: string;
}

// Post Generation Types
export type Platform = 'linkedin' | 'twitter' | 'instagram' | 'facebook';
export type PostMethod = 'coop' | 'full_ai';

export interface PostContext {
  platform: Platform;
  goal?: string;
  topic?: string;
  cta?: string;
  tone_override?: string;
}

export interface GeneratedPost {
  id: string;
  brand_bundle_id: string;
  method: PostMethod;
  platform: Platform;
  content: string;
  metadata?: {
    topic?: string;
    angle?: string;
    hashtags?: string[];
  };
  created_at?: string;
}

// UI State Types
export type GenerationStep = 'idle' | 'scraping' | 'analyzing' | 'generating' | 'complete' | 'error';

export interface ScrapingProgress {
  step: GenerationStep;
  message: string;
  progress: number;
}
