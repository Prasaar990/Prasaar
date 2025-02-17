import { motion } from "framer-motion";
import styles from "../../styles/HeroSection.module.css";
import { useEffect, useState } from "react";
motion;

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = [
    "Personalized Messaging",
    "24/7 Customer Support",
    "Efficient Marketing Campaigns",
    "Reminders and Follow-Ups",
    "Interactive Engagement",
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
          <h1>Customer </h1>
          <h1>Engagement </h1>
          <h1 className={styles.animatedHeading}>
            with{" "}
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
        <p>
          Prasaar automation helps you build stronger relationships with
          customers through WhatsApp in a simple and effective way. In return,
          it boosts sales and revenue and encourages long-term loyalty. Would
        </p>
        <p>you like to learn more about how it can work for your business?</p>
        <button className={`${styles.btn} btn`}>Get Started!</button>
      </div>
      <div className={styles.img}></div>
    </section>
  );
}
