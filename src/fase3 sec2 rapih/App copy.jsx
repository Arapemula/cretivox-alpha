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

// Daftarkan plugin GSAP yang akan digunakan
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  // Refs untuk menandai elemen-elemen penting di DOM
  const textWrapperRef = useRef(null);
  const horizontalRef = useRef(null);
  const section2TextWrapperRef = useRef(null);
  const section2TailRef = useRef(null);
  const section4Ref = useRef(null);

  useLayoutEffect(() => {
    // GSAP Context untuk cleanup yang aman
    const ctx = gsap.context(() => {

      // --- TIMELINE UNTUK SECTION 1 (ANIMASI TEKS & PIN) ---
      gsap.timeline({
        scrollTrigger: {
          trigger: textWrapperRef.current,
          start: "center center",
          end: "+=1400",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          markers: false, // Ubah ke true untuk debug
        },
        // Callback saat timeline ini selesai, scroll otomatis ke section horizontal
        onComplete: () => {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: horizontalRef.current, offsetY: 0 },
            ease: "power2.inOut",
          });
        },
      })
      .to("#text1", { opacity: 1, duration: 0.3 }).to("#text1", { opacity: 0, duration: 0.3 })
      .to("#text2", { opacity: 1, duration: 0.3 }).to("#text2", { opacity: 0, duration: 0.3 })
      .to("#text3", { opacity: 1, duration: 0.3 }).to("#arhab-img", { opacity: 1, duration: 0.4 });

      
      const horizontalWrapper = horizontalRef.current;
      const textWrapper = section2TextWrapperRef.current;
      const tailElement = section2TailRef.current;
      
      // Pastikan semua elemen yang dibutuhkan sudah ada sebelum membuat animasi
      if (!tailElement || !textWrapper || !horizontalWrapper) return;

      // --- TIMELINE UNTUK SCROLL HORIZONTAL (SECTION 2 KE 3) ---
      const horizontalTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: horizontalWrapper,
          pin: true,
          scrub: 1,
          start: "top top",
          // Akhir scroll dihitung dinamis berdasarkan lebar wrapper
          end: () => "+=" + (horizontalWrapper.offsetWidth - window.innerWidth),
          markers: false, // Ubah ke true untuk debug
          // Callback saat scroll horizontal selesai, scroll otomatis ke section 4
          onComplete: () => {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: section4Ref.current, offsetY: 0 },
              ease: "power2.inOut",
            });
          },
        },
      });

      // Animasi 1: Teks di Section 2 bergerak masuk
      const finalX = (window.innerWidth / 2) - (tailElement.offsetLeft + tailElement.offsetWidth / 2);
      horizontalTimeline.fromTo(textWrapper,
        { x: window.innerWidth },
        {
          x: finalX,
          ease: "none",
        }
      );

      // Animasi 2: Wrapper bergeser untuk menampilkan Section 3
      horizontalTimeline.to(horizontalWrapper, {
        x: "-100vw",
        ease: "none",
      }, ">"); // ">" berarti animasi ini mulai setelah animasi sebelumnya selesai

    });

    // Fungsi cleanup saat komponen unmount
    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* SECTION 1 */}
      <div ref={textWrapperRef}>
        <Section1 />
      </div>

      {/* WRAPPER UNTUK KONTEN HORIZONTAL */}
      <div ref={horizontalRef} className="horizontal-wrapper">
        <Section2
          textWrapperRef={section2TextWrapperRef}
          tailRef={section2TailRef}
        />
        <Section3 />
      </div>

      {/* SECTION 4 (DI LUAR WRAPPER HORIZONTAL) */}
      <div ref={section4Ref}>
        <Section4 />
      </div>
    </div>
  );
}

export default App;