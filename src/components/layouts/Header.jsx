import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Button from "./Button";
import Solutions from "../dropdowns/SolutionsDropdown";
import UseCases from "../dropdowns/UseCasesDropdown";
import { Link } from "react-router-dom";

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
    window.addEventListener("popstate", () => {
      if (document.URL.includes("form")) setFormOpen(true);
      else setFormOpen(false);
      console.log("hash changed");
    });

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
          className="fixed w-screen px-16 pt-40 pb-16 bg-white z-50 shadow-lg flex flex-col text-2xl text-gray-800"
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <ul className="list-none">
            <li className="mt-8">
              <a href="#info" className="no-underline text-gray-800">
                Why Prasaar ?
              </a>
            </li>

            <li className="mt-8">
              <a href="#testimonials" className="no-underline text-gray-800">
                Use Cases
              </a>
            </li>

            <li className="mt-8 flex flex-row items-center gap-2">
              Solutions
              <motion.button
                type="button"
                className="bg-transparent border-none cursor-pointer h-6"
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
                  className="h-6 w-6"
                  animate={{ rotate: dropdownSolutions ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </li>
            <li>
              {dropdownSolutions ? (
                <Solutions
                  dropdownSolutions={dropdownSolutions}
                  isTablet={true}
                />
              ) : (
                ""
              )}
            </li>
            <li className="mt-8 flex flex-row items-center gap-2">
              UseCases
              <motion.button
                type="button"
                className="bg-transparent border-none cursor-pointer h-6"
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
                  className="h-6 w-6"
                  animate={{ rotate: dropdownUseCases ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </li>
            <li>
              {dropdownUseCases ? (
                <UseCases dropdownUseCases={dropdownUseCases} isTablet={true} />
              ) : (
                ""
              )}
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
        className="fixed w-screen h-18 text-lg flex justify-between items-center px-12 z-50 bg-white shadow-lg text-gray-800"
      >
        <Link to="/" className="cursor-pointer">
          <img
            src="./img/prasaarLogo.png"
            alt="website logo"
            className="w-40"
          />
        </Link>

        {isTablet ? (
          <>
            <div>
              <button
                type="button"
                className="bg-transparent w-14 h-14 border-none cursor-pointer"
                onClick={() => {
                  setDropdownNav((x) => !x);
                }}
              >
                <img
                  src={dropdownNav ? "./img/close.svg" : "./img/ham.svg"}
                  alt="ham icon"
                  className="w-full h-full"
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="z-40">
              {!isFormOpen ? (
                <ul className="list-none flex gap-12">
                  <li>
                    <a
                      href="#info"
                      className="text-gray-800 no-underline transition-all duration-300 border-b-2 border-white hover:border-gray-800"
                    >
                      Why Prasaar ?
                    </a>
                  </li>

                  <li className="flex flex-row items-center justify-center gap-2">
                    Solutions
                    <motion.button
                      type="button"
                      className="bg-transparent border-none cursor-pointer h-6"
                      onClick={() => {
                        setDropdownSolutions((x) => !x);
                        if (dropdownUseCases) {
                          setDropdownUseCases(false);
                        }
                      }}
                    >
                      <motion.img
                        src="./img/downArrow.svg"
                        alt="show solution"
                        className="h-6 w-6"
                        animate={{ rotate: dropdownSolutions ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>

            <div className="flex items-center gap-8">
              <Button
                text={"VoiceAgent Demo"}
                to="https://call.prasaar.co/#demo"
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

      <a
        href="https://api.whatsapp.com/send/?phone=919356093930&text&type=phone_number&app_absent=0"
        className="fixed right-12 bottom-12 w-14 h-14 bg-green-400 flex justify-center items-center rounded-full cursor-pointer transition-all duration-500 hover:shadow-lg z-10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="./img/whatsapp.svg"
          alt="whatsapp"
          style={{ zIndex: "1" }}
          className="w-3/5 h-3/5"
        />
      </a>

      <div
        className={`fixed bottom-12 right-40 text-gray-800 text-lg border border-black py-4 px-8 rounded-xl bg-white ${
          isHovered ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        Whatsapp
      </div>
    </>
  );
}
