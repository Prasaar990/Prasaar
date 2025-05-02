import styles from "../../styles/Footer.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
        viewport={{ once: true }}
        className={styles.logoContainer}
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
            <li>CSAT Survey</li>
            <li>Opinion Survey</li>
            <li>Feedback</li>
            <li>Complaint Management</li>
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
            {/* <li>
              Address: 310, Fortuna Business Center, Pimple Saudagar, Pune
              -411027, India
            </li> */}
            {/* <li>Eitot Technologies Private Limited.</li> */}
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

      <hr className={styles.divider} />

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
            <a
              href="https://www.instagram.com/prasaar_technologies?igsh=MTV1MWhveGpuZ2RqNQ=="
              className={styles.footerLinks}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src="./img/insta.svg" alt="Instagram" className="icon36" />
            </a>
          </span>
          <span>
            <a
              href="https://www.linkedin.com/company/prasaar-technologies/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img src="./img/linkedin.svg" alt="LinkedIn" className="icon36" />
            </a>
          </span>
        </motion.div>
      </div>

      <div className={styles.legalLinks}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/terms" className={styles.termsLink}>
            Terms and Conditions
          </Link>
          {/* <Link href="/privacy-policy" className={styles.termsLink}>
            Privacy Policy
          </Link> */}
        </motion.div>
      </div>
    </footer>
  );
}
