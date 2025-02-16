import styles from "../../styles/Customers.module.css";
import { motion } from "framer-motion";

export default function Customers() {
  // const item = { hidden: { opacity: 0 } };
  return (
    <div className={styles.marquee}>
      <div className={styles.marqueeInner}>
        <motion.div
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className={styles.customer}
        >
          1
        </motion.div>
        <motion.div className={styles.customer}>2</motion.div>
        <motion.div className={styles.customer}>3</motion.div>
        <motion.div className={styles.customer}>4</motion.div>
        <motion.div className={styles.customer}>5</motion.div>
        <motion.div className={styles.customer}>6</motion.div>
        <motion.div className={styles.customer}>7</motion.div>
      </div>
    </div>
  );
}
