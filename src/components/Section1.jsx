import React from "react";
import "../css/Section1.css";

const Section1 = () => {
  return (
    <section className="panel section-1 d-flex align-items-center justify-content-center">
      <div className="changing-text-container">
        <div className="text-wrapper">
          <span className="text-slide visible" id="text1">
            Hallo Cretivox 🙌
          </span>
          <span className="text-slide" id="text2">
            Kenalan yuk sama
          </span>
          <span className="text-slide" id="text3">
            Naufal Arhab
          </span>
        </div>
        <img
          id="arhab-img"
          src="/arhab.png"
          alt="arhab"
          className="arhab-image"
        />
      </div>
    </section>
  );
};

export default Section1;
