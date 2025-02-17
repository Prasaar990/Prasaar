import { useState } from "react";
import styles from "../../styles/Header.module.css";
import More from "../dropdowns/More";
import { motion } from "framer-motion";

export default function Header() {
  const [dropdownMore, setDropdownMore] = useState(false);
  return (
    <nav className={styles.header}>
      <div>
        <img
          src="./img/prasaarLogo.png"
          alt="website logo"
          className={styles.logo}
        />
      </div>

      <div className={styles.nav}>
        <ul>
          <li>Why Prasaar</li>
          <li>Solutions</li>
          <li>Customers</li>
          <li>Resources</li>
          <li className={styles.dropdownDiv}>
            more
            <motion.button
              type="button"
              className={` ${styles.dropdownBtn}`}
              onClick={() => {
                setDropdownMore((x) => !x);
              }}
            >
              <motion.img
                src="./img/downArrow.svg"
                alt="show more options"
                className={styles.dropdownIcon}
                animate={{ rotate: dropdownMore ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </li>
        </ul>
      </div>

      <div className={styles.authUser}>
        <span>Login</span>
        <span>Get Started</span>
      </div>

      {dropdownMore ? <More /> : ""}
    </nav>
  );
}
