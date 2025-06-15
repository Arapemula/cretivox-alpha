// src/components/Section4.jsx

import React from "react";
import HorizontalScroll from "../assetBits/HorizontalScroll";
import "../assetBits/HorizontalScroll.css";

const songCovers = [
  {
    content: <img src="/covers/song1.jpeg" alt="Song 1" />,
    label: "everything u are",
  },
  {
    content: <img src="/covers/song2.jpeg" alt="Song 2" />,
    label: "about you",
  },
  { content: <img src="/covers/song3.jpeg" alt="Song 3" />, label: "evakuasi" },
  {
    content: <img src="/covers/song4.jpeg" alt="Song 4" />,
    label: "last night on earth",
  },
  {
    content: <img src="/covers/song5.jpeg" alt="Song 5" />,
    label: "lagipula hidup akan berakhir",
  },
];

const Section4 = () => {
  // Buat item dengan struktur JSX flip-card yang baru
  const itemsWithFlipCard = songCovers.map((item, index) => ({
    content: (
      <div className="flip-card" key={index}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            {/* Sisi depan berisi gambar */}
            {item.content}
          </div>
          <div className="flip-card-back">
            {/* Sisi belakang berisi label */}
            {item.label}
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <section className="panel section-4 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Favorite Songs</h1>
        <p className="lead" style={{ color: "#F8B55F" }}>
          Hover on cover to flip
        </p>
      </div>

      {/* Teruskan item dengan struktur baru ke komponen anak */}
      <HorizontalScroll items={itemsWithFlipCard} />
    </section>
  );
};

export default Section4;