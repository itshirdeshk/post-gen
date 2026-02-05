import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does PostGen analyze my brand?",
    answer: "PostGen uses advanced AI to crawl your website, extracting key information about your mission, values, tone of voice, target audience, and unique selling points. This creates a comprehensive 'Brand Bundle' that powers all content generation.",
  },
  {
    question: "Will the content sound robotic or generic?",
    answer: "Not at all! Our AI is specifically trained to capture and replicate your unique brand voice. The content is designed to be indistinguishable from human-written posts, maintaining your brand's personality and style.",
  },
  {
    question: "What's the difference between Co-Op and Full AI modes?",
    answer: "Co-Op mode lets you guide the AI with specific inputs about topic, angle, and CTA - perfect when you have a specific message in mind. Full AI mode autonomously generates content based on your brand bundle, ideal for scaling content production.",
  },
  {
    question: "Can I edit the generated content?",
    answer: "Absolutely! All generated content is fully editable. You can tweak, refine, or completely rewrite any post before publishing. Think of PostGen as your starting point, not the final word.",
  },
  {
    question: "Which social platforms are supported?",
    answer: "PostGen supports all major platforms including LinkedIn, Twitter/X, Instagram, Facebook, TikTok, and Pinterest. Each post is optimized for the specific platform's best practices and format requirements.",
  },
  {
    question: "Is my brand data secure?",
    answer: "Yes, security is our top priority. All data is encrypted at rest and in transit. We're SOC 2 compliant and never share or use your brand data to train models for other users.",
  },
];

export function FAQ() {
  return (
    <section className="py-24" id="faq">
      <div className="container px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-foreground">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground">
            Got questions? We've got answers.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl bg-card border border-border px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 text-foreground">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
