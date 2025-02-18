import styles from "../../styles/Customers.module.css";
import { motion } from "framer-motion";

export default function Customers() {
  return (
    <div className={styles.marquee}>
      <motion.div className={styles.marqueeInner}>
        <motion.div
          initial={{ x: "80vw" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className={styles.customer}
        >
          <img src="./img/cus1.webp" alt="cus1" className="image" />
        </motion.div>
        <motion.div
          initial={{ x: "80vw" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className={styles.customer}
        >
          <img src="./img/testimonial.webp" alt="cus1" className="image" />
        </motion.div>
        <motion.div
          initial={{ x: "80vw" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className={styles.customer}
        >
          <img src="./img/cus3.webp" alt="cus1" className="image" />
        </motion.div>
        <motion.div
          initial={{ x: "80vw" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className={styles.customer}
        >
          <img src="./img/cus2.webp" alt="cus1" className="image" />
        </motion.div>
        <motion.div
          initial={{ x: "80vw" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className={styles.customer}
        >
          <img src="./img/cus3.webp" alt="cus1" className="image" />
        </motion.div>
      </motion.div>
    </div>
  );
}
