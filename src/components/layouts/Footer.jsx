import styles from "../../styles/Footer.module.css";
import { motion } from "framer-motion";

export default function footer() {
  return (
    <footer className={styles.footer}>
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
        viewport={{ once: true }}
      >
        <img
          src="./img/prasaar.webp"
          alt="Prasaar Logo"
          className={styles.logo}
        />
      </motion.div>
      <div className={styles.footerContent}>
        <div>
          <motion.ul
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            viewport={{ once: true }}
          >
            <li>
              <h1>Products</h1>
            </li>
            <li>PRSAAR APP</li>
            <li>PRSAAR Web Portal</li>
            <li>Voter Search Web Link</li>
            <li>WhatsApp API & Automation</li>
            <li>Complaint Management System</li>
          </motion.ul>
        </div>
        <div>
          <motion.ul
            initial={{ opacity: 0, y: 180 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            viewport={{ once: true }}
          >
            <li>
              <h1>Contact</h1>
            </li>
            <li>Email: ashok@prasaar.co</li>
            <li>
              Address: 310, Fortuna Business Center, Pimple Saudagar,
              Pune -411027
            </li>
            <li></li>
          </motion.ul>
        </div>
        <div>
          <motion.ul
            initial={{ opacity: 0, y: 210 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            viewport={{ once: true }}
          >
            <li>
              <h1>About us</h1>
            </li>
            <li>
              We help businesses connect with customers effortlessly through
              WhatsApp, combining automation and real-time interactions to
              enhance engagement, trust, and revenue.
            </li>
          </motion.ul>
        </div>
      </div>

      <hr />

      <div className={styles.followUs}>
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          viewport={{ once: true }}
        >
          Follow us on social media
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          viewport={{ once: true }}
          className={styles.footerIcons}
        >
          <span>
            <a href="#" className={styles.footerLinks}>
              <img src="./img/facebook.svg" alt="Facebook" className="icon24" />
            </a>
          </span>
          <span>
            <a href="#" className={styles.footerLinks}>
              <img src="./img/insta.svg" alt="Instagram" className="icon24" />
            </a>
          </span>
          <span>
            <a href="#">
              <img src="./img/linkedin.svg" alt="linkedin" className="icon24" />
            </a>
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
