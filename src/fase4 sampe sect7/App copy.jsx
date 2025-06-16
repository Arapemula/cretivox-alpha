import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import Section5 from "../components/Section5"; 
import Section6 from "../components/Section6"; 
import Section7 from "../components/Section7"; // Pastikan impor ini ada
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section2TextWrapperRef = useRef(null);
  const section2TailRef = useRef(null);
  const horizontalContainerRef = useRef(null);
  const section5Ref = useRef(null); 
  const section6Ref = useRef(null); 

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- SECTION 1 ke 2 (Tetap Sama) ---
      gsap.timeline({
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "center center",
          end: "+=1400",
          scrub: true,
          pin: true,
          onComplete: () => {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: section2Ref.current },
              ease: "power2.inOut",
            });
          },
        },
      })
      .to("#text1", { opacity: 1, duration: 0.3 })
      .to("#text1", { opacity: 0, duration: 0.3 })
      .to("#text2", { opacity: 1, duration: 0.3 })
      .to("#text2", { opacity: 0, duration: 0.3 })
      .to("#text3", { opacity: 1, duration: 0.3 })
      .to("#arhab-img", { opacity: 1, duration: 0.4 });

      // --- Animasi Teks di dalam Section 2 (Tetap Sama) ---
      const finalX = window.innerWidth / 2 - (section2TailRef.current.offsetLeft + section2TailRef.current.offsetWidth / 2);
      gsap.timeline({
          scrollTrigger: {
              trigger: section2Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
          }
      }).fromTo(section2TextWrapperRef.current, { x: window.innerWidth }, { x: finalX, ease: "none" });


      // --- SECTION 2 ke 3: Pin lalu Auto Scroll ke AWAL SECTION HORIZONTAL ---
      gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "center center",
          end: "+=1000",
          scrub: true,
          pin: true,
          onComplete: () => {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: horizontalContainerRef.current },
              ease: "power2.inOut",
            });
          },
        },
      });
      
      // --- SECTION 3 ke 4: Animasi Scroll Horizontal ---
      gsap.timeline({
        scrollTrigger: {
          trigger: horizontalContainerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + (horizontalContainerRef.current.offsetWidth - window.innerWidth),
        },
      }).to(horizontalContainerRef.current, {
        x: `-${window.innerWidth}px`,
        ease: "none",
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* SECTION 1 */}
      <div ref={section1Ref}>
        <Section1 />
      </div>

      {/* SECTION 2 */}
      <div ref={section2Ref}>
        <Section2
          textWrapperRef={section2TextWrapperRef}
          tailRef={section2TailRef}
        />
      </div>
      
      {/* SECTION 3 & 4 (horizontal) */}
      <div ref={horizontalContainerRef} className="horizontal-wrapper">
        <Section3 />
        <Section4 />
      </div>

      
      <div ref={section5Ref}>
        <Section5 />
      </div>
      <div ref={section6Ref}>
        <Section6 />
      </div>
      
      {/* SECTION 7 YANG BARU DITAMBAHKAN */}
      <Section7 />
        
    </div>
  );
}

export default App;