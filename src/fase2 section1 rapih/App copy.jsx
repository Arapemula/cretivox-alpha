import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Tambahkan ini
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); // Tambahkan ScrollToPlugin

function App() {
  const textWrapperRef = useRef(null);
  const horizontalRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline animasi teks di section 1
      gsap
        .timeline({
          scrollTrigger: {
            trigger: textWrapperRef.current,
            start: "center center",
            end: "+=1400", // diperpanjang agar cukup waktu untuk gambar muncul
            scrub: true,
            pin: true,
            anticipatePin: 1,
            markers: true,
          },
          onComplete: () => {
            // Scroll otomatis ke section2 setelah animasi selesai
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: horizontalRef.current, offsetY: 0 },
              ease: "power2.inOut",
            });
          },
        })
        .to("#text1", { opacity: 1, duration: 0.3 })
        .to("#text1", { opacity: 0, duration: 0.3 })
        .to("#text2", { opacity: 1, duration: 0.3 })
        .to("#text2", { opacity: 0, duration: 0.3 })
        .to("#text3", { opacity: 1, duration: 0.3 })
        .to("#arhab-img", { opacity: 1, duration: 0.4 }); // animasi gambar muncul

      // Setelah scroll teks selesai → mulai scroll horizontal
      const panels = gsap.utils.toArray(".panel");
      const totalWidth = window.innerWidth * (panels.length - 1);

      gsap.to(panels, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: "top top",
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          markers: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* WRAPPER TEKS SECTION-1 */}
      <div ref={textWrapperRef}>
        <Section1 />
      </div>
      {/* WRAPPER HORIZONTAL SECTION 2–4 */}
      <div ref={horizontalRef} className="horizontal-wrapper">
        <Section2 />
        <Section3 />
        <Section4 />
      </div>
    </div>
  );
}

export default App;
