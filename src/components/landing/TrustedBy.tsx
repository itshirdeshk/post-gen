import { motion } from "framer-motion";

const companies = [
  "TechCorp",
  "StartupAI",
  "GrowthLabs",
  "BrandHQ",
  "ScaleUp",
  "ContentPro",
];

export function TrustedBy() {
  return (
    <section className="py-16 border-t border-border/50">
      <div className="container px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          TRUSTED BY INNOVATIVE TEAMS WORLDWIDE
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          {companies.map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-xl md:text-2xl font-bold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors cursor-default"
            >
              {company}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
