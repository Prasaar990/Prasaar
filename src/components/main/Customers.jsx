import styles from "../../styles/Customers.module.css";
import { motion } from "framer-motion";

export default function Customers() {
  return (
    <div className={styles.marquee}>
      <h1>Trusted by organizations that grow fast</h1>
      <motion.div className={styles.marqueeInner}>
        <motion.div
          initial={{ x: "80vw" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className={styles.customer}
        >
          <img
            src="./img/customers/HeadstartX-Logo.jpg"
            alt="cus1"
            className="image"
          />
        </motion.div>
        <motion.div
          initial={{ x: "80vw" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className={styles.customer}
        >
          <img
            src="./img/customers/paithani.jpg"
            alt="cus1"
            className="image"
          />
        </motion.div>
        <motion.div
          initial={{ x: "80vw" }}
          animate={{ x: "-100vw" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className={styles.customer}
        >
          <img
            src="./img/customers/purologo.png"
            alt="cus1"
            style={{ width: "50%" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
