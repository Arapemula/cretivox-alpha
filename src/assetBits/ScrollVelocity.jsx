// src/assetBits/ScrollVelocity.jsx

import React from "react";
import { motion } from "framer-motion";

const ScrollVelocity = ({ texts, velocity, className }) => {
  const speed = Math.abs(velocity) || 50; // default speed
  const direction = velocity > 0 ? -1 : 1; // -1 for left, 1 for right

  const marqueeVariants = {
    animate: {
      x: [0, -100 * direction],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 200 / speed, // duration based on speed
          ease: "linear",
        },
      },
    },
  };

  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", width: "100%" }}>
      <motion.div
        style={{ display: "inline-block", whiteSpace: "nowrap" }}
        variants={marqueeVariants}
        animate="animate"
      >
        {/* Render teks beberapa kali untuk loop yang mulus */}
        {[...Array(5)].map((_, i) => (
          <span key={i} className={className}>
            {texts.map((text, j) => React.cloneElement(text, { key: j }))}
            &nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollVelocity;