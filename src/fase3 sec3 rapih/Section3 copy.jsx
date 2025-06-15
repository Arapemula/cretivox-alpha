import React from "react";
import { TypeAnimation } from "react-type-animation";

const Section3 = () => {
  return (
    <section
      className="panel section-3 d-flex flex-column align-items-center justify-content-center"
      style={{ color: "#ffffff" }}
    >
      <h2 style={{ fontWeight: 300, fontSize: "2.5rem" }}>
        Bisa jadi siapa aja 😋
      </h2>
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
        ]}
        wrapper="h1"
        speed={50}
        style={{ fontSize: "5rem", fontWeight: "bold" }}
        repeat={Infinity}
      />
    </section>
  );
};

export default Section3;
