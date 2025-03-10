import styles from "../../styles/Customers.module.css";
import { motion } from "framer-motion";

export default function Customers() {
  return (
    <div className={styles.marquee}>
      <h1>Trusted By</h1>
      <motion.div className={styles.marqueeInner}>
        <motion.div
          initial={{ x: "80vw" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className={styles.customer}
        >
          <img src="./img/sample.png" alt="cus1" className="image" />
        </motion.div>
        <motion.div
          initial={{ x: "80vw" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className={styles.customer}
        >
          <img src="./img/sample.png" alt="cus1" className="image" />
        </motion.div>
        <motion.div
          initial={{ x: "80vw" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className={styles.customer}
        >
          <img src="./img/sample.png" alt="cus1" className="image" />
        </motion.div>
        <motion.div
          initial={{ x: "80vw" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className={styles.customer}
        >
          <img src="./img/sample.png" alt="cus1" className="image" />
        </motion.div>
        <motion.div
          initial={{ x: "80vw" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className={styles.customer}
        >
          <img src="./img/sample.png" alt="cus1" className="image" />
        </motion.div>
      </motion.div>
    </div>
  );
}
