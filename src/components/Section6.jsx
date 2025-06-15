// src/components/Section5.jsx

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "bootstrap/dist/css/bootstrap.min.css";
// Impor CSS baru untuk komponen ini
import "../css/containerkeenam.css";

const Section5 = () => {
  // --- Logika dari Lakbanbawah ---
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);

  useEffect(() => {
    // Fungsi animasi marquee ini akan berjalan mandiri
    const animateText = (element) => {
      gsap.to(element, {
        xPercent: -50,
        repeat: -1,
        ease: "linear",
        duration: 30,
      });
    };

    animateText(text1Ref.current);
    animateText(text2Ref.current);
    animateText(text3Ref.current);
    animateText(text4Ref.current);
  }, []);

  const marqueeText = "BERBAHAYA ANDA SUDAH TERLALU BAWAH • ".repeat(10);

  // --- Render ---
  return (
    // Kita tetap menggunakan <section> sebagai wadah utama agar dikenali App.jsx
    <section className="panel section-6">
      {/* JSX dari Lakbanbawah ditempatkan di sini */}
      <div className="lakban-container">
        <div className="lakban1">
          <div className="text-scroll" ref={text1Ref}>
            {marqueeText}
          </div>
        </div>
        <div className="lakban2">
          <div className="text-scroll" ref={text2Ref}>
            {marqueeText}
          </div>
        </div>
        <div className="lakban3">
          <div className="text-scroll" ref={text3Ref}>
            {marqueeText}
          </div>
        </div>
        <div className="lakban4">
          <div className="text-scroll" ref={text4Ref}>
            {marqueeText}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5;