import React from "react";

const Section1 = () => {
  return (
    <section className="panel section-1 d-flex align-items-center justify-content-center">
      <div
        className="changing-text-container fw-bold display-1"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80vw",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div>
          <span className="text-slide" id="text1">
            Hallo kamu 🙌
          </span>
          <span className="text-slide" id="text2">
            Kenalin gw
          </span>
          <span className="text-slide" id="text3">
            Naufal Arhab
          </span>
        </div>
        <img
          id="arhab-img"
          src="/arhab.png"
          alt="arhab"
          style={{
            width: 400,
            height: 420,
            opacity: 0,
            transition: "opacity 0.4s",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      </div>
    </section>
  );
};

export default Section1;
