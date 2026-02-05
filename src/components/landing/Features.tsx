import { motion } from "framer-motion";
import { Image, Video, MessageSquare, Play } from "lucide-react";

const features = [
  {
    icon: Image,
    title: "Images",
    description: "Generate stunning product images and promotional graphics instantly.",
    preview: "image",
  },
  {
    icon: Video,
    title: "Videos",
    description: "Create engaging video content optimized for social media.",
    preview: "video",
  },
  {
    icon: MessageSquare,
    title: "Auto Posts",
    description: "Schedule and auto-publish posts across all your channels.",
    preview: "post",
  },
];

export function Features() {
  return (
    <section className="py-24" id="features">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-foreground">
            What you can create
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Generate eye-catching visuals and content for any platform, any format.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-2xl bg-card border border-border shadow-sm overflow-hidden hover-lift"
              >
                {/* Preview area */}
                <div className="aspect-[4/3] bg-secondary/50 relative flex items-center justify-center">
                  {feature.preview === "video" ? (
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary ml-1" />
                    </div>
                  ) : feature.preview === "post" ? (
                    <div className="w-full h-full p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted" />
                        <div className="h-3 w-20 bg-muted rounded" />
                      </div>
                      <div className="flex-1 rounded-lg bg-muted/50" />
                      <div className="h-2 w-full bg-muted rounded" />
                      <div className="h-2 w-3/4 bg-muted rounded" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-muted/50 flex items-center justify-center">
                      <Icon className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
