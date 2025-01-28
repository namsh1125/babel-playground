import React from "react";
import { motion } from "framer-motion";

const ArrowAnimation = () => (
  <div className="flex items-center justify-center w-20">
    <svg width="100" height="40" viewBox="0 0 100 40">
      <motion.path
        d="M0,20 H80 M70,10 L80,20 L70,30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-indigo-500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
      />
    </svg>
  </div>
);

export default ArrowAnimation;
