import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Section9.css"; 


const Section9 = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [showPhotobooth, setShowPhotobooth] = useState(false);

  useEffect(() => {
    if (showPhotobooth) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      }).catch(err => console.error("Error accessing camera: ", err));
    } else if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  }, [showPhotobooth]);

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    setPhotos([dataUrl, ...photos]);

    gsap.fromTo(
      ".photo-stack .polaroid:first-child",
      { y: -100, opacity: 0, rotate: gsap.utils.random(-20, 20) },
      { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    );
  };

  const handleButtonClick = () => {
    const isOpening = !showPhotobooth;
    setShowPhotobooth(isOpening);
    if (isOpening) {
      audioRef.current.currentTime = 10;
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <section className="panel section-9 d-flex flex-column align-items-center justify-content-center">
      <audio ref={audioRef} src="/final.mp3" loop />
      <div className="container py-5 text-center">
        <h1 className="font-caprasimo mb-4">Selamat kamu berhasil mencapai akhir</h1>

        <div className="mb-4">
          <button className="btn glow-button" onClick={handleButtonClick}>
            {showPhotobooth ? "Close Photobooth" : "Make me happy!"}
          </button>
        </div>

        {showPhotobooth && (
          <>
            <div className="d-flex justify-content-center mb-5">
              <div className="d-flex align-items-center gap-4">
                <div className="video-frame">
                  <video ref={videoRef} autoPlay playsInline muted className="rounded shadow" />
                  <img src="/frame.png" alt="frame" className="frame-overlay" />
                  <canvas ref={canvasRef} width="400" height="300" style={{ display: "none" }} />
                </div>
                <button onClick={takePhoto} className="btn btn-light">Take Photo</button>
              </div>
            </div>

            <div className="photo-stack d-flex flex-wrap justify-content-center gap-4">
              {photos.map((src, idx) => (
                <div
                  key={idx}
                  className="polaroid shadow"
                  style={{ transform: `rotate(${gsap.utils.random(-8, 8)}deg)` }}
                >
                  <img src={src} alt={`photobooth-capture-${idx}`} className="polaroid-image" />
                  <div className="polaroid-label">📸 Japrut Photobooth</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Section9;
