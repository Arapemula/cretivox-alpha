import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import Section6 from "./components/Section6";
import Section7 from "./components/Section7";
import Section8 from "./components/Section8";
import Section9 from "./components/Section9";

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
  const section89WrapperRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi untuk Section 1-2
      gsap
        .timeline({
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

      // Animasi untuk Teks di Section 2
      const finalX =
        window.innerWidth / 2 -
        (section2TailRef.current.offsetLeft +
          section2TailRef.current.offsetWidth / 2);
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
        .fromTo(
          section2TextWrapperRef.current,
          { x: window.innerWidth },
          { x: finalX, ease: "none" }
        );

      // Transisi dari Section 2 ke 3
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

      // Animasi Horizontal untuk Section 3-4
      gsap
        .timeline({
          scrollTrigger: {
            trigger: horizontalContainerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () =>
              "+=" +
              (horizontalContainerRef.current.offsetWidth - window.innerWidth),
          },
        })
        .to(horizontalContainerRef.current, {
          x: `-${window.innerWidth}px`,
          ease: "none",
        });

      // Master Timeline untuk Section 8 dan 9
      // Durasi animasi internal Section 8 adalah 4000px
      const section8Duration = 4000;
      // Durasi untuk slide ke Section 9, kita beri 2000px
      const slideDuration = 1000;
      // Total durasi pin adalah penjumlahan keduanya
      const totalPinDuration = section8Duration + slideDuration;

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section89WrapperRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${totalPinDuration}`,
        },
      });

      // Tahap 1: Jeda selama 4000px untuk memberi ruang pada animasi internal Section 8.
      masterTimeline.to(
        {},
        {
          duration: section8Duration,
        }
      );

      // Tahap 2: Animasi slide ke Section 9 setelah jeda selesai.
      masterTimeline.to(section89WrapperRef.current, {
        x: `-${window.innerWidth}px`,
        ease: "none",
        duration: 100,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Section 1 */}
      <div ref={section1Ref}>
        <Section1 />
      </div>

      {/* Section 2 */}
      <div ref={section2Ref}>
        <Section2
          textWrapperRef={section2TextWrapperRef}
          tailRef={section2TailRef}
        />
      </div>

      {/* Section 3 & 4 (horizontal) */}
      <div ref={horizontalContainerRef} className="horizontal-wrapper">
        <Section3 />
        <Section4 />
      </div>

      {/* Section 5 & 6 */}
      <div ref={section5Ref}>
        <Section5 />
      </div>
      <div ref={section6Ref}>
        <Section6 />
      </div>

      {/* Section 7 */}
      <Section7 />

      {/* Wrapper untuk Section 8 & 9 */}
      <div
        ref={section89WrapperRef}
        className="horizontal-wrapper"
        style={{ backgroundColor: "#000000" }} // Mencegah flash putih
      >
        {/* Wrapper tambahan untuk mengangkat lapisan Section8 */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Section8 />
        </div>

        <Section9 />
      </div>
    </div>
  );
}

export default App;
