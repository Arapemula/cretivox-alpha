import React from "react";
import DecryptedText from "../assetBits/DecryptedText";

const hackerTextStyle = {
  fontFamily: '"Source Code Pro", monospace',
  color: '#39FF14',
  textShadow: `
    0 0 2px #39FF14,
    0 0 5px #39FF14,
    0 0 10px #00FF00,
    0 0 15px #00FF00
  `,
  letterSpacing: '0.05em',
};

const Section7 = () => {
  return (
    <section
      className="panel section-7 d-flex flex-column align-items-center justify-content-center text-center"
      style={{ padding: "2rem" }}
    >
      {/* Judul Utama */}
      <DecryptedText
        text="RAHASIA NEGARA"
        animateOn="view"
        sequential={true}
        speed={75}
        style={{
          ...hackerTextStyle,
          fontSize: '4rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
        encryptedClassName="text-secondary"
      />

      {/* Subjudul */}
      <DecryptedText
        text="FAKTA TENTANG KEHEBATAN ORANG INI"
        animateOn="view"
        sequential={true}
        speed={50}
        revealDirection="center"
        style={{
          ...hackerTextStyle,
          fontSize: '1.75rem',
          marginTop: '1.5rem',
          textTransform: 'uppercase',
        }}
        encryptedClassName="text-secondary"
      />
    </section>
  );
};

export default Section7;
