import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../css/Section6.css";

const Section6 = () => {
  const textRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    textRefs.forEach((ref) => {
      gsap.to(ref.current, {
        xPercent: -50,
        repeat: -1,
        ease: "linear",
        duration: 30,
      });
    });
  }, []);

  const marqueeText = "BERBAHAYA ANDA SUDAH TERLALU BAWAH • ".repeat(10);

  return (
    <section className="panel section-6">
      <div className="lakban-container">
        {textRefs.map((ref, i) => (
          <div key={i} className={`lakban${i + 1}`}>
            <div className="text-scroll" ref={ref}>
              {marqueeText}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section6;
