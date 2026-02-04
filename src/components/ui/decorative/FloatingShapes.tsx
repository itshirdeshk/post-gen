import { motion } from "framer-motion";

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-20 left-[10%] w-72 h-72 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-40 right-[15%] w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent) / 0.12) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, 30, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Floating geometric shapes */}
      <motion.svg
        className="absolute top-32 right-[20%] w-16 h-16 text-primary/20"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="currentColor" />
      </motion.svg>

      <motion.svg
        className="absolute top-[60%] left-[8%] w-12 h-12 text-accent/25"
        viewBox="0 0 100 100"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <rect x="20" y="20" width="60" height="60" fill="currentColor" rx="8" />
      </motion.svg>

      <motion.svg
        className="absolute top-[40%] right-[5%] w-20 h-20 text-primary/15"
        viewBox="0 0 100 100"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="25" fill="currentColor" />
      </motion.svg>

      {/* Grid pattern overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Dotted accent lines */}
      <motion.svg
        className="absolute top-[25%] left-[25%] w-32 h-32 text-muted-foreground/10"
        viewBox="0 0 100 100"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <path
          d="M10 50 Q 50 10 90 50 Q 50 90 10 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </motion.svg>
    </div>
  );
}
