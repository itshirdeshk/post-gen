import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Marketing",
    company: "TechFlow",
    image: null,
    content: "PostGen has transformed how we approach social media. We went from spending 20 hours a week on content to just 3 hours. The AI truly understands our brand voice.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Founder & CEO",
    company: "GrowthLabs",
    image: null,
    content: "The brand analysis feature is incredible. It captured nuances about our company that even we hadn't articulated. Every post feels authentically us.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Content Director",
    company: "ScaleUp Media",
    image: null,
    content: "We manage content for 15+ brands. PostGen's ability to maintain distinct voices for each client has been a game-changer for our agency.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Marketing Manager",
    company: "Innovate Inc",
    image: null,
    content: "I was skeptical about AI content, but PostGen proved me wrong. The co-op mode gives me creative control while the AI handles the heavy lifting.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Social Media Lead",
    company: "BrandForce",
    image: null,
    content: "The ROI is insane. We've seen a 3x increase in engagement since switching to PostGen. Our audience can't tell the difference between AI and human-written posts.",
    rating: 5,
  },
  {
    name: "Alex Rivera",
    role: "VP of Growth",
    company: "NextLevel",
    image: null,
    content: "PostGen has become essential to our content strategy. The multi-platform optimization alone saves us hours of reformatting work.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24" id="testimonials">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Loved by <GradientText>Marketing Teams</GradientText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See what industry leaders are saying about transforming their content creation with PostGen.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-6 relative group"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-foreground/80 mb-6 leading-relaxed">"{testimonial.content}"</p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-muted-foreground text-xs">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
