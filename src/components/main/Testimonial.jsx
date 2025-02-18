// import React from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Testimonial.module.css";

/* eslint-disable */
export default function Testimonial({ x, p }) {
  return (
    <motion.section
      animate={{ x: `${x}%` }}
      transition={{ duration: 0.8 }}
      className={styles.sectionTestimonial}
    >
      <div className={styles.testimonial}>
        <header>
          <div>
            <img src="./img/testimonial.webp" alt="testimonial" />
          </div>
          <div className={styles.userInfo}>
            <h2>Poke Theory</h2>
            <p>{p}</p>
          </div>
        </header>
        <main>
          In the 6 months that we have been on Momos, the product has grown
          exponentially, with feedback taken into consideration and implemented
          swiftly where appropriate.{" "}
        </main>
      </div>
    </motion.section>
  );
}
