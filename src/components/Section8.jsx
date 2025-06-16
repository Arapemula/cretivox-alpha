import React, { useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../css/Section8.css"; 

gsap.registerPlugin(ScrollTrigger);

const Section8 = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const floatRefs = useRef([]);
  const floatText = [
    "Gue bukan cuma ngoding. Gue berevolusi bareng AI.",
    "Kami kerja bareng, satu irama, satu tujuan.",
    "Hasilnya? Progres gue 2x lebih cepat.",
    "Sementara yang lain masih debat soal AI = skill issue...",
    "Gue udah ada jauh di depan, bareng masa depan itu sendiri.",
  ];

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    let textTriggersSet = false;

    const setupTextScroll = () => {
      if (textTriggersSet) return;
      textTriggersSet = true;

      floatRefs.current.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 40 });

        ScrollTrigger.create({
          trigger: el.parentNode,
          start: "top center",
          end: "bottom center",
          scrub: false,
          onEnter: () => {
            gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
          },
          onLeave: () => {
            gsap.to(el, { opacity: 0, y: -40, duration: 1, ease: "power2.in" });
          },
          onEnterBack: () => {
            gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
          },
          onLeaveBack: () => {
            gsap.to(el, { opacity: 0, y: 40, duration: 1, ease: "power2.in" });
          },
        });
      });
    };

    const onLoadedMetadata = () => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=4000",
        scrub: true,
        pin: true,
        markers: false,
        onUpdate: (self) => {
          const scrollProgress = self.progress;
          video.currentTime = video.duration * scrollProgress;
        },
        onEnter: setupTextScroll,
        onEnterBack: setupTextScroll,
      });
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="panel section-8 gif-container">
      <video
        ref={videoRef}
        src="robot.mp4"
        muted
        playsInline
        className="video-element"
      ></video>

      <div className="float-text-container">
        {floatText.map((text, i) => {
          const isLeft = i % 2 !== 0;
          return (
            <div key={i} className="float-text-section">
              <div
                ref={(el) => (floatRefs.current[i] = el)}
                className={`float-text source-code-green ${
                  isLeft ? "float-text-left" : "float-text-right"
                }`}
              >
                {text}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Section8;
