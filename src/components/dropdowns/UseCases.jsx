// import React from "react";
import { motion } from "framer-motion";
import styles from "./../../styles/UseCases.module.css";

/* eslint-disable */
export default function UseCases({ dropdownUseCases }) {
  return (
    <motion.div
      animate={{
        opacity: dropdownUseCases ? 1 : 0,
        y: dropdownUseCases ? 0 : -500,
      }}
      transition={{ duration: 0.4 }}
      className={styles.dropdownMore}
    >
      <div className={styles.megaMenu}>
        <h3 className={styles.heading}>UseCases</h3>
        <p className={styles.description}>
          We provide the most complete solutions for multi-location brands.
        </p>
        <div className={styles.grid}>
          <div className={styles.menuItem}>
            <h4>Reputation Management</h4>
            <p>Get better reviews and listings with AI.</p>
          </div>
          <div className={styles.menuItem}>
            <h4>Customer Service</h4>
            <p>Automate customer service and recover unhappy customers.</p>
          </div>
          <div className={styles.menuItem}>
            <h4>Customer Experience</h4>
            <p>Discover customer insights with AI.</p>
          </div>
          <div className={styles.menuItem}>
            <h4>Customer Marketing</h4>
            <p>Drive retention with personalized marketing automation.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
