import React from "react";

const Section2 = ({ textWrapperRef, tailRef }) => {
  return (
    <section
      className="panel section-2 d-flex align-items-center justify-content-start px-5"
      style={{
        overflow: "hidden",
      }}
    >
      <div
        ref={textWrapperRef}
        className="scroll-text-wrapper"
        style={{
          whiteSpace: "nowrap",
        }}
      >
        <h1
          className="scroll-text fw-bold"
          style={{
            fontSize: "8vw",
            margin: 0,
          }}
        >
          emang nya naufal arhab itu <span ref={tailRef}>siapa sih ?</span>
        </h1>
      </div>
    </section>
  );
};

export default Section2;