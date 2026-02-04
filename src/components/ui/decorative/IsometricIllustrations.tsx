import { motion } from "framer-motion";

// Isometric Brand Analysis illustration
export function IsometricBrandAnalysis() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Base platform */}
      <motion.path
        d="M100 160 L20 115 L20 85 L100 130 L180 85 L180 115 Z"
        fill="hsl(var(--secondary))"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      />
      <motion.path
        d="M100 130 L20 85 L100 40 L180 85 Z"
        fill="hsl(var(--card))"
        stroke="hsl(var(--border))"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      
      {/* Globe/World icon */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        <circle cx="100" cy="70" r="25" fill="hsl(var(--primary) / 0.2)" />
        <circle cx="100" cy="70" r="20" fill="hsl(var(--primary))" />
        <ellipse cx="100" cy="70" rx="20" ry="8" fill="none" stroke="hsl(var(--primary-foreground) / 0.5)" strokeWidth="1.5" />
        <path d="M100 50 L100 90" stroke="hsl(var(--primary-foreground) / 0.5)" strokeWidth="1.5" />
        <ellipse cx="100" cy="70" rx="8" ry="20" fill="none" stroke="hsl(var(--primary-foreground) / 0.5)" strokeWidth="1.5" />
      </motion.g>
      
      {/* Floating data points */}
      <motion.circle
        cx="60" cy="55"
        r="4"
        fill="hsl(var(--accent))"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="140" cy="60"
        r="3"
        fill="hsl(var(--primary))"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.circle
        cx="130" cy="45"
        r="5"
        fill="hsl(var(--accent) / 0.7)"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </motion.svg>
  );
}

// Isometric Brand Bundle illustration
export function IsometricBrandBundle() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Stacked layers representing bundle */}
      <motion.g
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Bottom layer */}
        <path
          d="M100 170 L30 130 L100 90 L170 130 Z"
          fill="hsl(var(--secondary))"
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />
        <path
          d="M100 170 L30 130 L30 115 L100 155 L170 115 L170 130 Z"
          fill="hsl(var(--muted))"
        />
      </motion.g>
      
      <motion.g
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Middle layer */}
        <path
          d="M100 140 L40 105 L100 70 L160 105 Z"
          fill="hsl(var(--accent) / 0.3)"
          stroke="hsl(var(--accent) / 0.5)"
          strokeWidth="1"
        />
        <path
          d="M100 140 L40 105 L40 90 L100 125 L160 90 L160 105 Z"
          fill="hsl(var(--accent) / 0.2)"
        />
      </motion.g>
      
      <motion.g
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Top layer with glow */}
        <path
          d="M100 110 L50 80 L100 50 L150 80 Z"
          fill="hsl(var(--primary))"
          stroke="hsl(var(--primary-glow))"
          strokeWidth="1"
        />
        <path
          d="M100 110 L50 80 L50 65 L100 95 L150 65 L150 80 Z"
          fill="hsl(var(--primary) / 0.8)"
        />
      </motion.g>
      
      {/* Sparkle effects */}
      <motion.path
        d="M100 35 L102 42 L110 42 L104 47 L106 55 L100 50 L94 55 L96 47 L90 42 L98 42 Z"
        fill="hsl(var(--primary-foreground))"
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  );
}

// Isometric Content Generation illustration
export function IsometricContentGen() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Chat bubbles / posts */}
      <motion.g
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <rect x="30" y="60" width="60" height="40" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
        <rect x="38" y="70" width="35" height="4" rx="2" fill="hsl(var(--muted-foreground) / 0.5)" />
        <rect x="38" y="80" width="44" height="4" rx="2" fill="hsl(var(--muted-foreground) / 0.3)" />
        <rect x="38" y="90" width="25" height="4" rx="2" fill="hsl(var(--muted-foreground) / 0.3)" />
      </motion.g>
      
      <motion.g
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <rect x="110" y="45" width="60" height="45" rx="8" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary) / 0.5)" />
        <rect x="118" y="55" width="40" height="4" rx="2" fill="hsl(var(--primary) / 0.6)" />
        <rect x="118" y="65" width="44" height="4" rx="2" fill="hsl(var(--primary) / 0.4)" />
        <rect x="118" y="75" width="30" height="4" rx="2" fill="hsl(var(--primary) / 0.4)" />
      </motion.g>
      
      <motion.g
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <rect x="55" y="115" width="70" height="50" rx="8" fill="hsl(var(--accent) / 0.2)" stroke="hsl(var(--accent) / 0.5)" />
        <rect x="63" y="125" width="50" height="4" rx="2" fill="hsl(var(--accent) / 0.6)" />
        <rect x="63" y="135" width="54" height="4" rx="2" fill="hsl(var(--accent) / 0.4)" />
        <rect x="63" y="145" width="40" height="4" rx="2" fill="hsl(var(--accent) / 0.4)" />
        <rect x="63" y="155" width="30" height="4" rx="2" fill="hsl(var(--accent) / 0.4)" />
      </motion.g>
      
      {/* Connection lines */}
      <motion.path
        d="M90 80 Q 100 70 110 67"
        stroke="hsl(var(--primary) / 0.4)"
        strokeWidth="2"
        strokeDasharray="4 4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      <motion.path
        d="M90 100 Q 95 110 90 115"
        stroke="hsl(var(--accent) / 0.4)"
        strokeWidth="2"
        strokeDasharray="4 4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      
      {/* AI sparkle */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
      >
        <circle cx="100" cy="100" r="8" fill="hsl(var(--primary))" />
        <motion.circle
          cx="100" cy="100" r="12"
          fill="none"
          stroke="hsl(var(--primary) / 0.5)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
      </motion.g>
    </motion.svg>
  );
}

// Hero isometric scene
export function IsometricHeroScene() {
  return (
    <motion.svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main isometric platform */}
      <motion.path
        d="M200 280 L40 180 L200 80 L360 180 Z"
        fill="hsl(var(--secondary))"
        stroke="hsl(var(--border))"
        strokeWidth="1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      />
      
      {/* Platform depth */}
      <motion.path
        d="M200 280 L40 180 L40 200 L200 300 L360 200 L360 180 Z"
        fill="hsl(var(--muted))"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      
      {/* Central tower/pillar */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        <path
          d="M200 180 L160 155 L200 130 L240 155 Z"
          fill="hsl(var(--primary))"
        />
        <path
          d="M200 180 L160 155 L160 100 L200 125 L240 100 L240 155 Z"
          fill="hsl(var(--primary) / 0.8)"
        />
        <path
          d="M200 125 L160 100 L200 75 L240 100 Z"
          fill="hsl(var(--primary-glow))"
        />
        
        {/* Glow effect */}
        <ellipse
          cx="200" cy="180"
          rx="50" ry="20"
          fill="hsl(var(--primary) / 0.2)"
          filter="blur(10px)"
        />
      </motion.g>
      
      {/* Floating cubes */}
      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M100 150 L80 138 L100 126 L120 138 Z" fill="hsl(var(--accent))" />
        <path d="M100 150 L80 138 L80 118 L100 130 L120 118 L120 138 Z" fill="hsl(var(--accent) / 0.7)" />
        <path d="M100 130 L80 118 L100 106 L120 118 Z" fill="hsl(var(--accent) / 0.9)" />
      </motion.g>
      
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <path d="M300 140 L285 131 L300 122 L315 131 Z" fill="hsl(var(--primary) / 0.6)" />
        <path d="M300 140 L285 131 L285 116 L300 125 L315 116 L315 131 Z" fill="hsl(var(--primary) / 0.4)" />
        <path d="M300 125 L285 116 L300 107 L315 116 Z" fill="hsl(var(--primary) / 0.5)" />
      </motion.g>
      
      {/* Data streams */}
      <motion.g>
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            r="3"
            fill="hsl(var(--primary))"
            initial={{ cx: 80, cy: 200, opacity: 0 }}
            animate={{
              cx: [80, 140, 200],
              cy: [200, 180, 160],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.g>
      
      <motion.g>
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            r="3"
            fill="hsl(var(--accent))"
            initial={{ cx: 320, cy: 200, opacity: 0 }}
            animate={{
              cx: [320, 260, 200],
              cy: [200, 180, 160],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6 + 0.3,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.g>
    </motion.svg>
  );
}
