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
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);
  const section7Ref = useRef(null);
  const section89WrapperRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
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
        .to("#text1", { opacity: 1, duration: 0.5 })
        .to("#text1", { opacity: 0, duration: 0.5 })
        .to("#text2", { opacity: 1, duration: 0.5 })
        .to("#text2", { opacity: 0, duration: 0.5 })
        .to("#text3", { opacity: 1, duration: 0.5 })
        .to("#arhab-img", { opacity: 1, duration: 0.4 });

      
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
            onUpdate: (self) => {
              if (self.progress === 1) {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: section5Ref.current },
                  ease: "power2.inOut",
                });
              }
            },
          },
        })
        .to(horizontalContainerRef.current, {
          x: `-${window.innerWidth}px`,
          ease: "none",
        });

      
      gsap.timeline({
        scrollTrigger: {
          trigger: section7Ref.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: true,
          onLeave: () => {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: section89WrapperRef.current },
              ease: "power2.inOut",
            });
          },
        },
      });

      
      const section8Duration = 4000;
      const slideDuration = 1000;
      const totalPinDuration = 4000;

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section89WrapperRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${totalPinDuration}`,
        },
      });

      masterTimeline.to({}, { duration: section8Duration });

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
      <div ref={section1Ref}>
        <Section1 />
      </div>

      <div ref={section2Ref}>
        <Section2
          textWrapperRef={section2TextWrapperRef}
          tailRef={section2TailRef}
        />
      </div>

      <div ref={horizontalContainerRef} className="horizontal-wrapper">
        <div ref={section3Ref}>
          <Section3 />
        </div>
        <div ref={section4Ref}>
          <Section4 />
        </div>
      </div>

      <div ref={section5Ref}>
        <Section5 />
      </div>

      <div ref={section6Ref}>
        <Section6 />
      </div>

      <div ref={section7Ref}>
        <Section7 />
      </div>

      <div
        ref={section89WrapperRef}
        className="horizontal-wrapper"
        style={{ backgroundColor: "#000000" }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <Section8 />
        </div>
        <Section9 />
      </div>
    </div>
  );
}

export default App;
