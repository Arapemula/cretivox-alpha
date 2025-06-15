// src/assetBits/HorizontalScroll.jsx

import React, { useRef } from "react";
import { motion } from "framer-motion";

const HorizontalScroll = ({ items, autoplaySpeed = 1, pauseOnHover }) => {
  const containerRef = useRef(null);

  const duration = (items.length * 160) / (autoplaySpeed * 100);

  const marqueeVariants = {
    animate: {
      x: ["0%", "-50%"], // Geser sejauh setengah dari total lebar
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="horizontal-scroll-wrapper" ref={containerRef}>
      <motion.div
        className="horizontal-scroll-container"
        variants={marqueeVariants}
        animate="animate"
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
      >
        {/* Render item dua kali untuk loop yang mulus */}
        {[...items, ...items].map((item, i) => (
          <div key={i} className="horizontal-scroll-item">
            {item.content}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HorizontalScroll;