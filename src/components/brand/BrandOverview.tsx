import { motion } from "framer-motion";
import { 
  Target, 
  Megaphone, 
  Heart, 
  Users, 
  Quote, 
  Hash,
  Edit3
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/ui/GradientText";
import { Badge } from "@/components/ui/badge";
import type { BrandBundle } from "@/types/brand";

interface BrandOverviewProps {
  brand: BrandBundle;
}

export function BrandOverview({ brand }: BrandOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div className="flex items-center gap-4">
          {brand.identity.logo_url ? (
            <img 
              src={brand.identity.logo_url} 
              alt={brand.identity.brand_name}
              className="w-16 h-16 rounded-xl object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">
                {brand.identity.brand_name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold">
              <GradientText>{brand.identity.brand_name}</GradientText>
            </h2>
            {brand.website_url && (
              <p className="text-sm text-muted-foreground">{brand.website_url}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Brand DNA Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Mission */}
        {brand.brand_dna.mission && (
          <BrandSection
            icon={Target}
            title="Mission"
            confidence={brand.confidence.mission}
          >
            <p className="text-foreground">{brand.brand_dna.mission}</p>
          </BrandSection>
        )}

        {/* Vision */}
        {brand.brand_dna.vision && (
          <BrandSection icon={Megaphone} title="Vision">
            <p className="text-foreground">{brand.brand_dna.vision}</p>
          </BrandSection>
        )}

        {/* Values */}
        {brand.brand_dna.values && brand.brand_dna.values.length > 0 && (
          <BrandSection icon={Heart} title="Values">
            <div className="flex flex-wrap gap-2">
              {brand.brand_dna.values.map((value, i) => (
                <Badge key={i} variant="secondary">{value}</Badge>
              ))}
            </div>
          </BrandSection>
        )}

        {/* Voice */}
        {(brand.voice.tone || brand.voice.style) && (
          <BrandSection 
            icon={Edit3} 
            title="Voice"
            confidence={brand.confidence.voice}
          >
            <div className="space-y-2">
              {brand.voice.tone && (
                <p><span className="text-muted-foreground">Tone:</span> {brand.voice.tone}</p>
              )}
              {brand.voice.style && (
                <p><span className="text-muted-foreground">Style:</span> {brand.voice.style}</p>
              )}
            </div>
          </BrandSection>
        )}

        {/* Audience */}
        {brand.audience.primary && (
          <BrandSection icon={Users} title="Target Audience">
            <p className="text-foreground mb-2">{brand.audience.primary}</p>
            {brand.audience.pain_points && brand.audience.pain_points.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-muted-foreground mb-2">Pain Points:</p>
                <ul className="text-sm space-y-1">
                  {brand.audience.pain_points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </BrandSection>
        )}

        {/* Social Proof */}
        {brand.proof.length > 0 && (
          <BrandSection icon={Quote} title="Social Proof">
            <ul className="space-y-2">
              {brand.proof.slice(0, 3).map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground italic">
                  "{item}"
                </li>
              ))}
            </ul>
          </BrandSection>
        )}

        {/* Keywords */}
        {brand.keywords.length > 0 && (
          <BrandSection icon={Hash} title="Keywords & Hashtags" className="md:col-span-2">
            <div className="flex flex-wrap gap-2">
              {brand.keywords.map((keyword, i) => (
                <Badge key={i} variant="outline" className="text-primary border-primary/30">
                  #{keyword}
                </Badge>
              ))}
            </div>
          </BrandSection>
        )}
      </div>
    </div>
  );
}

interface BrandSectionProps {
  icon: React.ElementType;
  title: string;
  confidence?: number;
  children: React.ReactNode;
  className?: string;
}

function BrandSection({ icon: Icon, title, confidence, children, className }: BrandSectionProps) {
  return (
    <GlassCard className={className}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">{title}</h3>
        </div>
        {confidence !== undefined && (
          <ConfidenceBadge value={confidence} />
        )}
      </div>
      {children}
    </GlassCard>
  );
}

function ConfidenceBadge({ value }: { value: number }) {
  const percentage = Math.round(value * 100);
  const color = percentage >= 80 ? "text-success" : percentage >= 50 ? "text-warning" : "text-destructive";
  
  return (
    <span className={`text-xs font-medium ${color}`}>
      {percentage}% confident
    </span>
  );
}
