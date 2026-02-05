-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create brand_bundles table
CREATE TABLE public.brand_bundles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  website_url TEXT,
  brand_name TEXT NOT NULL,
  logo_url TEXT,
  -- Brand DNA (stored as JSONB for flexibility)
  mission TEXT,
  vision TEXT,
  brand_values TEXT[],
  -- Voice
  tone TEXT,
  style TEXT,
  -- Offerings (array of objects)
  offerings JSONB DEFAULT '[]'::jsonb,
  -- Audience
  primary_audience TEXT,
  pain_points TEXT[],
  -- Additional fields
  proof TEXT[],
  cta_library TEXT[],
  keywords TEXT[],
  -- Confidence scores
  confidence_mission NUMERIC(3,2) DEFAULT 0,
  confidence_voice NUMERIC(3,2) DEFAULT 0,
  confidence_offerings NUMERIC(3,2) DEFAULT 0,
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create enum for post generation method
CREATE TYPE public.post_method AS ENUM ('coop', 'full_ai');

-- Create enum for platforms
CREATE TYPE public.platform AS ENUM ('linkedin', 'twitter', 'instagram', 'facebook');

-- Create generated_posts table
CREATE TABLE public.generated_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_bundle_id UUID NOT NULL REFERENCES public.brand_bundles(id) ON DELETE CASCADE,
  method post_method NOT NULL,
  platform platform NOT NULL,
  content TEXT NOT NULL,
  -- Metadata
  topic TEXT,
  angle TEXT,
  hashtags TEXT[],
  goal TEXT,
  cta TEXT,
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for brand_bundles
CREATE POLICY "Users can view their own brand bundles" 
  ON public.brand_bundles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own brand bundles" 
  ON public.brand_bundles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own brand bundles" 
  ON public.brand_bundles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own brand bundles" 
  ON public.brand_bundles FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for generated_posts
CREATE POLICY "Users can view their own posts" 
  ON public.generated_posts FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own posts" 
  ON public.generated_posts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" 
  ON public.generated_posts FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" 
  ON public.generated_posts FOR DELETE 
  USING (auth.uid() = user_id);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_brand_bundles_updated_at
  BEFORE UPDATE ON public.brand_bundles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for auto-creating profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();