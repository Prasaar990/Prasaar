// import React from "react";
import { motion } from "framer-motion";
import styles from "./../../styles/Solutions.module.css";

/* eslint-disable */
export default function Solutions({ dropdownSolutions, isTablet = true }) {
  return (
    <>
      {!isTablet ? (
        <motion.div
          animate={{
            opacity: dropdownSolutions ? 1 : 0,
            y: dropdownSolutions ? 0 : -500,
          }}
          transition={{ duration: 0.4 }}
          className={styles.dropdownMore}
        >
          <div className={styles.megaMenu}>
            <h3 className={styles.heading}>Solutions</h3>
            <p className={styles.description}>
              Our customer engagement solutions helps brands grow more
              organically.
            </p>
            <div className={styles.grid}>
              <div className={styles.menuItem}>
                <h4>QR Codes</h4>
                <p>
                  Create dynamic QR codes for your business to get seamlessly
                  connected with customers.
                </p>
              </div>
              <div className={styles.menuItem}>
                <h4>CSAT - Customer Satisfaction</h4>
                <p>
                  Understand how customer is satisfied with your product or
                  service with CSAT survey.
                </p>
              </div>
              <div className={styles.menuItem}>
                <h4>NPS - Net Promoter Score</h4>
                <p>
                  NPS shows probability of a customer recommending your product
                  / service to others.
                </p>
              </div>
              <div className={styles.menuItem}>
                <h4>Grievance Redressal</h4>
                <p>
                  Turn complaints into compliments with an easy-to-use Grievance
                  Redressal / Complaint Management System.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.dropdownContent}
        >
          <ul className={styles.menuList}>
            <li>📃 Reputation Management</li>
            <li>📃 Customer Service</li>
            <li>📃 Customer Experience</li>
            <li>📃 Customer Marketing</li>
          </ul>
        </motion.div>
      )}
    </>
  );
}
