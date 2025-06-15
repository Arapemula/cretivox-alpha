import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  const section2TextWrapperRef = useRef(null);
  const section2TailRef = useRef(null);

  useLayoutEffect(() => {
    // Tambahkan pengecekan untuk memastikan semua elemen siap
    if (!section1Ref.current || !section2Ref.current || !section3Ref.current || !section4Ref.current || !section2TextWrapperRef.current || !section2TailRef.current) {
      return;
    }
    
    const ctx = gsap.context(() => {
      // --- SECTION 1 ke 2: Nyangkut + Scroll ke Section 2 (Tidak ada perubahan) ---
      gsap.timeline({
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "center center",
          end: "+=1400",
          scrub: true,
          pin: true,
          anticipatePin: 1,
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

      // --- [PERBAIKAN] SECTION 2: Pin + Animasi Teks + Auto Scroll ke Section 3 ---
      const finalX = window.innerWidth / 2 - (section2TailRef.current.offsetLeft + section2TailRef.current.offsetWidth / 2);
      
      const section2Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "center center",
          end: "+=1000", // Teks akan selesai bergerak di akhir pin
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onComplete: () => {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: section3Ref.current },
              ease: "power2.inOut",
            });
          },
        },
      });

      // GABUNGKAN ANIMASI TEKS KE DALAM TIMELINE PIN INI
      section2Timeline.fromTo(
        section2TextWrapperRef.current,
        { x: window.innerWidth }, // Mulai dari luar layar kanan
        { x: finalX, ease: "none" } // Berakhir di tengah layar
      );


      // --- SECTION 3 ke 4: Pin lalu Auto Scroll ke Section 4 (Tidak ada perubahan) ---
      gsap.timeline({
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "center center",
          end: "+=1000",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onComplete: () => {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: section4Ref.current },
              ease: "power2.inOut",
            });
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // JSX Tidak ada perubahan dari sebelumnya
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
      <div ref={section3Ref}>
        <Section3 />
      </div>
      <div ref={section4Ref}>
        <Section4 />
      </div>
    </div>
  );
}

export default App;