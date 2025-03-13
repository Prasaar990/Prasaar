import { motion } from "framer-motion";
import styles from "../../styles/HeroSection.module.css";
import { useEffect, useState } from "react";
import Button from "../layouts/Button";

/* eslint-disable */
export default function HeroSection({ words, title, subHeading }) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setWordIndex((wordIndex) => {
          if (words.length - 1 == wordIndex) return 0;
          return wordIndex + 1;
        }),
      1800
    );

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [wordIndex]);

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.heading}>
          <h1>{title}</h1>
          <h1 className={styles.animatedHeading}>
            <motion.div
              key={wordIndex}
              className={`${styles.animatedWord} primaryColor`}
              initial={{ y: 20, opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              {words[wordIndex]}
            </motion.div>
          </h1>
        </div>
        <div className={styles.subHeading}>
          <p>{subHeading}</p>
        </div>
        <Button
          text={"Get Started"}
          to="https://api.whatsapp.com/send/?phone=919356093930&text&type=phone_number&app_absent=0"
        />
      </div>
      <div className={styles.right}>
        <img
          src="./img/heroImg.svg"
          alt="hero img"
          className={styles.heroImg}
        />
      </div>
    </section>
  );
}
