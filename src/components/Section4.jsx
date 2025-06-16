import React from "react";
import HorizontalScroll from "../assetBits/HorizontalScroll";
import "../assetBits/HorizontalScroll.css";
import "../css/Section4.css"; 

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
  const itemsWithFlipCard = songCovers.map((item, index) => ({
    content: (
      <div className="flip-card" key={index}>
        <div className="flip-card-inner">
          <div className="flip-card-front">{item.content}</div>
          <div className="flip-card-back">{item.label}</div>
        </div>
      </div>
    ),
  }));

  return (
    <section className="panel section-4 d-flex flex-column align-items-center justify-content-center">
      <div className="section4-header">
        <h1 className="display-4 fw-bold judulLagu">Lagu favorit?</h1>
        <p className="lead section4-subtext">Hover on cover to flip</p>
      </div>

      <HorizontalScroll items={itemsWithFlipCard} />
    </section>
  );
};

export default Section4;
