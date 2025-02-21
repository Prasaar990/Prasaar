import { useState } from "react";
import styles from "../../styles/Header.module.css";
import More from "../dropdowns/More";
import { easeOut, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
// import { Link } from "react-router-dom";

export default function Header() {
  const [dropdownMore, setDropdownMore] = useState(false);
  const [dropdownNav, setDropdownNav] = useState(false);
  const isTablet = useMediaQuery({
    query: "(max-width: 900px)",
  });

  return (
    <>
      {isTablet ? (
        <motion.nav
          animate={{
            y: dropdownNav ? "0%" : "-100%",
            opacity: dropdownNav ? 1 : 0,
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
      ) : (
        <></>
      )}

      <nav className={styles.header}>
        <div>
          <img
            src="./img/prasaarLogo.webp"
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
                <li>
                  {/* <Link to="/">Why Prasaar</Link> */}
                  Why Prasaar
                </li>
                <li>
                  {/* <Link to="/">Solutions</Link> */}
                  Solutions
                </li>
                <li>
                  {/* <Link to="/">Customers</Link> */}
                  Customers
                </li>

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
              <button>Login</button>
              <button className={styles.getStarted}>
                Get Started
                <img
                  src="./img/getStarted.svg"
                  alt="get started svg"
                  className="icon24"
                />
              </button>
            </div>
          </>
        )}

        {dropdownMore && !isTablet ? <More /> : ""}
      </nav>
    </>
  );
}
