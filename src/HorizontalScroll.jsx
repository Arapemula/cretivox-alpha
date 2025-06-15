import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HorizontalScroll.css";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const wrapperRef = useRef(null);
  const horizontalRef = useRef(null);

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // Pin dan animasi teks di section-1
    gsap.timeline({
      scrollTrigger: {
        trigger: ".text-scroll-wrapper",
        start: "top top",
        end: "+=1000", // panjang scroll teks
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    })
    .to("#text1", { opacity: 1, duration: 0.3 })
    .to("#text1", { opacity: 0, duration: 0.3 })
    .to("#text2", { opacity: 1, duration: 0.3 })
    .to("#text2", { opacity: 0, duration: 0.3 })
    .to("#text3", { opacity: 1, duration: 0.3 });

    // Setelah scroll teks selesai → mulai scroll horizontal
    const sections = gsap.utils.toArray(".panel");
    const totalWidth = window.innerWidth * (sections.length - 1);

    gsap.to(sections, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: horizontalRef.current,
        start: "top top", // dimulai setelah teks scroll selesai
        end: `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
      },
    });
  }, wrapperRef);

  return () => ctx.revert();
}, []);


  return (
  <div ref={wrapperRef}>
    {/* WRAPPER TEKS SECTION-1 */}
    <div className="text-scroll-wrapper">
      <section className="section-1 d-flex align-items-center justify-content-center">
        <div className="changing-text-container text-white fw-bold display-1">
          <span className="text-slide" id="text1">hallo</span>
          <span className="text-slide" id="text2">nama gw</span>
          <span className="text-slide" id="text3">naufal arhab</span>
        </div>
      </section>
    </div>

    {/* WRAPPER HORIZONTAL SECTION 2–4 */}
    <div ref={horizontalRef} className="horizontal-container">
      <section className="panel section-2 d-flex align-items-center justify-content-center">
        <h1 className="display-1 text-white fw-bold">Section 2</h1>
      </section>
      <section className="panel section-3 d-flex align-items-center justify-content-center">
        <h1 className="display-1 text-white fw-bold">Section 3</h1>
      </section>
      <section className="panel section-4 d-flex align-items-center justify-content-center">
        <h1 className="display-1 text-white fw-bold">Section 4</h1>
      </section>
    </div>
  </div>
);

};

export default HorizontalScroll;
