import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HorizontalScroll.css";

// Registrasi plugin
gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const sections = gsap.utils.toArray(".panel");
    const totalScrollWidth = window.innerWidth * 2 + window.innerWidth * 2;

    let ctx = gsap.context(() => {
      gsap.to(sections, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: {
            // Add more snap points for smoother transitions
            snapTo: [
              0, // Start
              0.15, // Early section 1
              0.25, // Mid section 1
              0.33, // Section 1 to 2 transition
              0.45, // Early section 2
              0.5, // Mid section 2
              0.55, // Late section 2
              0.66, // Section 2 to 3 transition
              0.75, // Mid section 3
              0.85, // Section 3 to 4 transition
              0.92, // Late section 4
              1, // End
            ],
            duration: 0.1,
            ease: "power1.inOut", // Smoother easing function
          },
          end: () => `+=${totalScrollWidth}`,
        },
      });
    }, containerRef);

    return () => ctx.revert(); // cleanup saat unmount
  }, []);

  return (
    <div ref={containerRef} className="horizontal-container">
      <section className="panel section-1 container-fluid d-flex align-items-center justify-content-center">
        <h1 className="display-1 text-white fw-bold">Section 1</h1>
      </section>
      <section className="panel section-2 container-fluid d-flex align-items-center justify-content-center">
        <h1 className="display-1 text-white fw-bold">Section 2</h1>
      </section>
      <section className="panel section-3 container-fluid d-flex align-items-center justify-content-center">
        <h1 className="display-1 text-white fw-bold">Section 3</h1>
      </section>
      <section className="panel section-4 container-fluid d-flex align-items-center justify-content-center">
        <h1 className="display-1 text-white fw-bold">Section 4</h1>
      </section>
    </div>
  );
};

export default HorizontalScroll;
