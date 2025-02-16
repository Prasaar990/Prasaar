// import React from "react";
import styles from "../../styles/Testimonials.module.css";
import Testimonial from "./Testimonial";

export default function Testimonials() {
  return (
    <div className={styles.testimonials}>
      <Testimonial />
      <Testimonial />
      <Testimonial />
      <Testimonial />
    </div>
  );
}
