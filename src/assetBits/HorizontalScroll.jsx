// src/assetBits/HorizontalScroll.jsx

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import "./HorizontalScroll.css";

gsap.registerPlugin(Observer);

export default function HorizontalScroll({
  height = "200px",
  width = "100%",
  items = [],
  autoplay = true,
  autoplaySpeed = 0.5,
  autoplayDirection = "left",
  pauseOnHover = true,
}) {
  const containerRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0 || !container.children.length) return;

    const children = gsap.utils.toArray(container.children);
    
    if (!isInitialized.current) {
        const clones = children.map(child => child.cloneNode(true));
        clones.forEach(clone => container.appendChild(clone));
        isInitialized.current = true;
    }
    
    const allChildren = gsap.utils.toArray(container.children);
    const firstItem = allChildren[0];
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth;
    const itemStyle = getComputedStyle(firstItem);
    const marginLeft = parseFloat(itemStyle.marginLeft) || 0;
    const totalWidth = (itemWidth + marginLeft) * allChildren.length;
    const wrapX = gsap.utils.wrap(0, totalWidth);

    allChildren.forEach((child, i) => {
      gsap.set(child, {
        x: i * (itemWidth + marginLeft),
        modifiers: {
          x: x => wrapX(parseFloat(x)) + "px"
        }
      });
    });

    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onChange: ({ deltaX, isDragging, event }) => {
        const d = event.type === "wheel" ? -deltaX : deltaX;
        const distance = isDragging ? d * 5 : d * 10;
        gsap.to(allChildren, {
          x: `+=${distance}`,
          ease: "expo.out",
          duration: 0.5,
        });
      }
    });

    let rafId;
    if (autoplay) {
        const directionFactor = autoplayDirection === "left" ? -1 : 1;
        const speedPerFrame = autoplaySpeed * directionFactor;

        const tick = () => {
          gsap.set(allChildren, { x: `+=${speedPerFrame}` });
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        if (pauseOnHover) {
          const stopTicker = () => cancelAnimationFrame(rafId);
          const startTicker = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(tick);
          };

          container.addEventListener("mouseenter", stopTicker);
          container.addEventListener("mouseleave", startTicker);

          return () => {
            observer.kill();
            cancelAnimationFrame(rafId);
            container.removeEventListener("mouseenter", stopTicker);
            container.removeEventListener("mouseleave", startTicker);
          };
        }
    }

    return () => {
      observer.kill();
      cancelAnimationFrame(rafId);
    };
  }, [items, autoplay, autoplaySpeed, autoplayDirection, pauseOnHover, width, height]);

  return (
    <div className="horizontal-scroll-wrapper" style={{ height, width }}>
      <div className="horizontal-scroll-container" ref={containerRef}>
        {items.map((item, i) => (
          <div className="horizontal-scroll-item" key={i}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}