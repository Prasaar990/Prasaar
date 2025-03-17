import { useEffect, useState } from "react";
import styles from "../../styles/Header.module.css";
import { easeOut, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Button from "../layouts/Button";

import Solutions from "../dropdowns/Solutions";
import UseCases from "../dropdowns/UseCases";

export default function Header() {
  const [dropdownSolutions, setDropdownSolutions] = useState(false);
  const [dropdownUseCases, setDropdownUseCases] = useState(false);
  const [dropdownNav, setDropdownNav] = useState(false);
  const [isFormOpen, setFormOpen] = useState(document.URL.includes("form"));
  const isTablet = useMediaQuery({
    query: "(max-width: 900px)",
  });
  const [isHovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);

  let lastScrollY = window.scrollY;
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false); // Hide when scrolling down
        setDropdownSolutions(false);
        setDropdownUseCases(false);
        setDropdownNav(false);
      } else {
        setVisible(true); // Show when scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      <motion.header
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={styles.header}
      >
        <Link
          to="/"
          style={{ cursor: "pointer" }}
          onClick={() => setFormOpen(false)}
        >
          <img
            src="./img/prasaarLogo.png"
            alt="website logo"
            className={styles.logo}
          />
        </Link>

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
              {!isFormOpen ? (
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
              ) : (
                ""
              )}
            </div>

            <div className={styles.authUser}>
              <Button
                text={"Get Started"}
                to="/form"
                handleFormOpen={setFormOpen}
              />
            </div>
          </>
        )}

        {!isTablet ? (
          <Solutions
            dropdownSolutions={dropdownSolutions}
            isTablet={isTablet}
          />
        ) : (
          ""
        )}
        {!isTablet ? (
          <UseCases dropdownUseCases={dropdownUseCases} isTablet={isTablet} />
        ) : (
          ""
        )}
      </motion.header>
      <Link
        to="/form"
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
    </>
  );
}
