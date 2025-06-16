import React from "react";
import DecryptedText from "../assetBits/DecryptedText";
import "../css/Section7.css"; 

const Section7 = () => {
  return (
    <section className="panel section-7 d-flex flex-column align-items-center justify-content-center text-center">
      <DecryptedText
        text="RAHASIA NEGARA"
        animateOn="view"
        sequential={true}
        speed={75}
        className="section7-title"
        encryptedClassName="text-secondary"
      />

      <DecryptedText
        text="FAKTA TENTANG KEHEBATAN ORANG INI"
        animateOn="view"
        sequential={true}
        speed={50}
        revealDirection="center"
        className="section7-subtitle"
        encryptedClassName="text-secondary"
      />
    </section>
  );
};

export default Section7;
