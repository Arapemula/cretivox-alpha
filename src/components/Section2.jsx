import React from "react";
import "../css/Section2.css"; 

const Section2 = ({ textWrapperRef, tailRef }) => {
  return (
    <section className="panel section-2 d-flex align-items-center justify-content-start px-5">
      <div ref={textWrapperRef} className="scroll-text-wrapper">
        <h1 className="scroll-text fw-bold">
          <span className="font-varela">emang nya naufal arhab itu </span>
          <span ref={tailRef} className="font-caprasimo highlight-text">
            siapa sih ?
          </span>
        </h1>
      </div>
    </section>
  );
};

export default Section2;
