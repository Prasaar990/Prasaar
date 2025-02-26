import { useState } from "react";
import styles from "../../styles/Header.module.css";
import { easeOut, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

// import More from "../dropdowns/More";

export default function Header() {
  // const [dropdownMore, setDropdownMore] = useState(false);
  const [dropdownNav, setDropdownNav] = useState(false);
  const isTablet = useMediaQuery({
    query: "(max-width: 900px)",
  });
  const [isHovered, setHovered] = useState(false);

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
            <li>
              <a href="#info">Why Prasaar</a>
            </li>
            <li>
              <a href="#solutions">Solutions</a>
            </li>
            <li>
              <a href="#testimonials">Our Services</a>
            </li>

            {/* <li className={styles.dropdownDiv}>
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
            </li> */}
          </ul>
        </motion.nav>
      ) : (
        <></>
      )}

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
                <li>
                  <a href="#info" className={styles.link}>
                    Why Prasaar
                  </a>
                </li>
                <li>
                  <a href="#solutions" className={styles.link}>
                    Solutions
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className={styles.link}>
                    Our Services
                  </a>
                </li>

                {/* <li className={styles.dropdownDiv}>
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
                </li> */}
              </ul>
            </div>

            <div className={styles.authUser}>
              <Link
                to="https://api.whatsapp.com/send/?phone=919356093930&text&type=phone_number&app_absent=0"
                target="_blank"
                className={`${styles.getStarted} ${styles.link}`}
              >
                Get Started
                <img
                  src="./img/getStarted.svg"
                  alt="get started svg"
                  className="icon24"
                />
              </Link>
            </div>
          </>
        )}

        {/* {dropdownMore && !isTablet ? <More /> : ""} */}

        <Link
          to="https://api.whatsapp.com/send/?phone=919356093930&text&type=phone_number&app_absent=0"
          target="_blank"
          className={`${styles.whatsapp} `}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src="./img/whatsapp.svg"
            alt="whatsapp"
            style={{ zIndex: "1" }}
            className={`${styles.whatsappImg}`}
          />
        </Link>
        <div
          className={`${styles.secreteMessage} ${
            isHovered ? "showMessage" : "hide"
          } `}
        >
          Whatsapp
        </div>
      </nav>
    </>
  );
}
