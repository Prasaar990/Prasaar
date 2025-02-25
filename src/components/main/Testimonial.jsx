// import React from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Testimonial.module.css";

/* eslint-disable */
export default function Testimonial({ x, heading, text }) {
  return (
    <motion.section
      animate={{ x: `${x}%` }}
      transition={{ duration: 0.5 }}
      className={styles.sectionTestimonial}
    >
      <div className={styles.testimonial}>
        <header>
          <div>
            <img src="./img/favicons/192.png" alt="testimonial" />
          </div>
          <div className={styles.userInfo}>
            <h2>{heading}</h2>
          </div>
        </header>
        <main>{text}</main>
      </div>
    </motion.section>
  );
}
