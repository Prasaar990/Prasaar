import { useState } from "react";
import styles from "../../styles/Header.module.css";
import { easeOut, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import Solutions from "../dropdowns/Solutions";
import UseCases from "../dropdowns/UseCases";

export default function Header() {
  const [dropdownSolutions, setDropdownSolutions] = useState(false);
  const [dropdownUseCases, setDropdownUseCases] = useState(false);
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
              <a href="#info">Why Prasaar ?</a>
            </li>

            <li>
              <a href="#testimonials">Use Cases</a>
            </li>

            <li className={styles.dropdownDiv}>
              Solutions
              <motion.button
                type="button"
                className={`${styles.dropdownBtn}`}
                onClick={() => {
                  setDropdownSolutions((x) => !x);
                  if (dropdownUseCases) {
                    setDropdownUseCases(false);
                  }
                }}
              >
                <motion.img
                  src="./img/downArrow.svg"
                  alt="show more options"
                  className={styles.dropdownIcon}
                  animate={{ rotate: dropdownSolutions ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </li>
            <li>
              {dropdownSolutions ? (
                <Solutions dropdownSolutions={dropdownSolutions} />
              ) : (
                ""
              )}
            </li>
            <li className={styles.dropdownDiv}>
              UseCases
              <motion.button
                type="button"
                className={`${styles.dropdownBtn}`}
                onClick={() => {
                  setDropdownUseCases((x) => !x);
                  if (dropdownSolutions) {
                    setDropdownSolutions(false);
                  }
                }}
              >
                <motion.img
                  src="./img/downArrow.svg"
                  alt="show more options"
                  className={styles.dropdownIcon}
                  animate={{ rotate: dropdownUseCases ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </li>
            <li>
              {dropdownUseCases ? (
                <UseCases dropdownUseCases={dropdownUseCases} />
              ) : (
                ""
              )}
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
          </ul>
        </motion.nav>
      ) : (
        <></>
      )}

      <header className={styles.header}>
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
                onClick={() => {
                  setDropdownNav((x) => !x);
                }}
              >
                <img
                  src={dropdownNav ? "./img/close.svg" : "./img/ham.svg"}
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
                    Why Prasaar ?
                  </a>
                </li>

                <li href="#" className={`${styles.dropdownDiv}`}>
                  Solutions
                  <motion.button
                    type="button"
                    className={`${styles.dropdownBtn}`}
                    onClick={() => {
                      setDropdownSolutions((x) => !x);
                      if (dropdownUseCases == true) {
                        setDropdownUseCases(false);
                      }
                    }}
                  >
                    <motion.img
                      src="./img/downArrow.svg"
                      alt="show solution"
                      className={styles.dropdownIcon}
                      animate={{ rotate: dropdownSolutions ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </li>
                <li href="#" className={`${styles.dropdownDiv}`}>
                  Use Cases
                  <motion.button
                    type="button"
                    className={`${styles.dropdownBtn}`}
                    onClick={() => {
                      setDropdownUseCases((x) => !x);
                      if (dropdownSolutions) {
                        setDropdownSolutions(false);
                      }
                    }}
                  >
                    <motion.img
                      src="./img/downArrow.svg"
                      alt="show useCases"
                      className={styles.dropdownIcon}
                      animate={{ rotate: dropdownUseCases ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </li>

                <li>
                  <a href="#pricing" className={styles.link}>
                    Pricing
                  </a>
                </li>
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

        {!isTablet ? <Solutions dropdownSolutions={dropdownSolutions} /> : ""}
        {!isTablet ? <UseCases dropdownUseCases={dropdownUseCases} /> : ""}

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
      </header>
    </>
  );
}
