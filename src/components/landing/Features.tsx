import { motion } from "framer-motion";
import { Image, Video, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Image,
    title: "Images",
    description: "Generate stunning product images and promotional graphics.",
  },
  {
    icon: Video,
    title: "Videos",
    description: "Create engaging video content for social media platforms.",
  },
  {
    icon: MessageSquare,
    title: "Auto Posts",
    description: "Schedule and publish posts automatically to all your channels.",
  },
];

export function Features() {
  return (
    <section className="py-20" id="features">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What you can create
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Generate eye-catching <span className="font-semibold text-foreground">visuals and content</span> for any platform.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                {/* Header with icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                
                {/* Placeholder preview area */}
                <div className="aspect-video rounded-lg bg-secondary/50 border border-border mb-4 flex items-center justify-center">
                  <Icon className="w-12 h-12 text-muted-foreground/30" />
                </div>
                
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
