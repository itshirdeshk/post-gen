import { motion } from "framer-motion";

export function HeroGradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary gradient blob */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px]"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              hsl(var(--primary) / 0.08) 0%, 
              hsl(var(--primary) / 0.04) 30%,
              transparent 70%
            )
          `,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Accent gradient blob */}
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px]"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              hsl(var(--accent) / 0.06) 0%, 
              hsl(var(--accent) / 0.02) 40%,
              transparent 70%
            )
          `,
        }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export function CircuitPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 400 400">
      <defs>
        <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Horizontal lines */}
          <line x1="0" y1="25" x2="40" y2="25" stroke="currentColor" strokeWidth="1" />
          <line x1="60" y1="25" x2="100" y2="25" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="75" x2="30" y2="75" stroke="currentColor" strokeWidth="1" />
          <line x1="70" y1="75" x2="100" y2="75" stroke="currentColor" strokeWidth="1" />
          
          {/* Vertical lines */}
          <line x1="50" y1="0" x2="50" y2="20" stroke="currentColor" strokeWidth="1" />
          <line x1="50" y1="30" x2="50" y2="70" stroke="currentColor" strokeWidth="1" />
          <line x1="50" y1="80" x2="50" y2="100" stroke="currentColor" strokeWidth="1" />
          
          {/* Nodes */}
          <circle cx="50" cy="25" r="3" fill="currentColor" />
          <circle cx="50" cy="75" r="3" fill="currentColor" />
          <circle cx="25" cy="50" r="2" fill="currentColor" />
          <circle cx="75" cy="50" r="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );
}

export function GlowingOrbs() {
  const orbs = [
    { x: "15%", y: "20%", size: 120, color: "primary", delay: 0 },
    { x: "85%", y: "30%", size: 80, color: "accent", delay: 1 },
    { x: "70%", y: "70%", size: 100, color: "primary", delay: 2 },
    { x: "25%", y: "80%", size: 60, color: "accent", delay: 0.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, hsl(var(--${orb.color}) / 0.15) 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
