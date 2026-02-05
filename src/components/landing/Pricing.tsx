import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out PostGen",
    features: [
      "1 Brand Bundle",
      "50 posts per month",
      "Basic AI generation",
      "3 platforms",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For growing marketing teams",
    features: [
      "5 Brand Bundles",
      "Unlimited posts",
      "Co-Op + Full AI modes",
      "All platforms",
      "Priority support",
      "Content calendar",
      "Analytics dashboard",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited Brand Bundles",
      "Unlimited posts",
      "Custom AI training",
      "API access",
      "Dedicated success manager",
      "SSO & advanced security",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="py-24 bg-secondary/30" id="pricing">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Start free, upgrade when you're ready. No hidden fees.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl bg-card border shadow-sm p-8 ${
                plan.popular ? 'border-primary shadow-lg scale-105 z-10' : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full rounded-lg ${plan.popular ? '' : ''}`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
