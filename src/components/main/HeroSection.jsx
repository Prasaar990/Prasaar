import { motion } from "framer-motion";
import styles from "../../styles/HeroSection.module.css";
import { useEffect, useState } from "react";
motion;

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = [
    "Healthcare",
    "Hospitality",
    "Beauty & Wellness",
    "Restaurants",
  ];

  useEffect(() => {
    const interval = setInterval(
      () =>
        setWordIndex((wordIndex) => {
          if (4 == wordIndex) return 0;
          return wordIndex + 1;
        }),
      1800
    );

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [wordIndex]);

  return (
    <section className={styles.hero}>
      <div className={styles.heading}>
        <div>
          <h1>Happier </h1>
          <h1>Customers </h1>
          <h1 className="relative">
            For{" "}
            <motion.span
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
            </motion.span>
          </h1>
        </div>
        <p>
          Momos is designed to help{" "}
          <span className="primaryColor">Multi-Location Brands globally</span>{" "}
          drive their entire Customer Lifecycle, get connected with their
          customers and grow their business across every location.
        </p>
        <button className={`${styles.btn} btn`}>Get Started!</button>
      </div>
      <div className={styles.img}></div>
    </section>
  );
}
