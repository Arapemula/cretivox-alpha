import React from "react";
import { TypeAnimation } from "react-type-animation";
import "../css/Section3.css"; 

const Section3 = () => {
  return (
    <section className="panel section-3 d-flex flex-column align-items-center justify-content-center">
      <h2 className="section3-subtitle">Bisa jadi siapa aja 😋</h2>

      <TypeAnimation
        sequence={[
          "Prompt Engineer",
          1500,
          "Graphic Designer",
          1500,
          "UI/UX Designer",
          1500,
          "Web Developer",
          1500,
          "Student",
          1500,
          "Pacar kamu 😘",
          1500,
        ]}
        wrapper="h1"
        speed={50}
        className="section3-animation"
        repeat={Infinity}
      />
    </section>
  );
};

export default Section3;
