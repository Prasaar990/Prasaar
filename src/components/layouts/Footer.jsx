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
          src="./img/prasaarLogo.webp"
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

            <li>
              <a href="#" className={styles.footerLinks}>
                Customer Care
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Customer Active
              </a>
            </li>
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
              <h1>Company</h1>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                About Us
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Careers
              </a>
            </li>
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
              <h1>Support</h1>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Legal & privacy
              </a>
            </li>
          </motion.ul>
        </div>
        <div>
          <motion.ul
            initial={{ opacity: 0, y: 240 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            viewport={{ once: true }}
          >
            <li>
              <h1>Resources</h1>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Case Studies
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Press Room
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                FAQ
              </a>
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
              <img src="./img/insta.svg" alt="Facebook" className="icon24" />
            </a>
          </span>
          <span>
            <a href="#">
              <img src="./img/linkedin.svg" alt="Facebook" className="icon24" />
            </a>
          </span>
          <span>
            <a href="#">
              <img
                src="./img/messanger.svg"
                alt="Facebook"
                className="icon24"
              />
            </a>
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
