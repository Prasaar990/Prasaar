import { useState } from "react";
import styles from "../../styles/Header.module.css";
import More from "../dropdowns/More";
import { easeOut, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

export default function Header() {
  const [dropdownMore, setDropdownMore] = useState(false);
  const [dropdownNav, setDropdownNav] = useState(false);
  const isTablet = useMediaQuery({
    query: "(max-width: 900px)",
  });

  return (
    <>
      <motion.nav
        animate={{
          y: dropdownNav ? "0%" : "calc(7.5rem)",
          opacity: dropdownNav ? 0 : 1,
        }}
        className={styles.headerResponsive}
        transition={{ duration: 0.4, ease: easeOut }}
      >
        <ul>
          <li>Why Prasaar</li>
          <li>Solutions</li>
          <li>Customers</li>

          <li className={styles.dropdownDiv}>
            More
            <motion.button
              type="button"
              className={`${styles.dropdownBtn}`}
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
      </motion.nav>

      <nav className={styles.header}>
        <div>
          <img
            src="./img/prasaarLogo.png"
            alt="website logo"
            className={styles.logo}
          />
        </div>

        {isTablet ? (
          <>
            <div>
              <button
                type="button"
                className={`${styles.hamBtn}`}
                onClick={() => setDropdownNav((x) => !x)}
              >
                <img
                  src="./img/ham.svg"
                  alt="ham icon"
                  className={styles.hamIcon}
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.nav}>
              <ul>
                <li>Why Prasaar</li>
                <li>Solutions</li>
                <li>Customers</li>

                <li className={styles.dropdownDiv}>
                  More
                  <motion.button
                    type="button"
                    className={`${styles.dropdownBtn}`}
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
          </>
        )}

        {dropdownMore && !isTablet ? <More /> : ""}
      </nav>
    </>
  );
}
