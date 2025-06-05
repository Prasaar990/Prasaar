import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Button from "./Button";
import Solutions from "../dropdowns/SolutionsDropdown";
import UseCases from "../dropdowns/UseCasesDropdown";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [dropdownSolutions, setDropdownSolutions] = useState(false);
  const [dropdownUseCases, setDropdownUseCases] = useState(false);
  const [dropdownNav, setDropdownNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // New state for scroll detection
  const location = useLocation();

  // Check if current page is home page
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  const isTablet = useMediaQuery({
    query: "(max-width: 900px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 640px)",
  });
  const [isHovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isRippling, setRippling] = useState(false);
  let lastScrollY = window.scrollY;

  const handleClick = () => {
    setRippling(true);
  };

  // Reset ripple effect after animation completes
  useEffect(() => {
    if (isRippling) {
      const timer = setTimeout(() => {
        setRippling(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isRippling]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set isScrolled based on scroll position
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY) {
        setVisible(false); // Hide when scrolling down
        setDropdownSolutions(false);
        setDropdownUseCases(false);
        setDropdownNav(false);
      } else {
        setVisible(true); // Show when scrolling up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when location changes
  useEffect(() => {
    setDropdownSolutions(false);
    setDropdownUseCases(false);
    setDropdownNav(false);
  }, [location.pathname]);

  return (
    <>
      {isTablet ? (
        <motion.nav
          animate={{
            y: dropdownNav ? "0%" : "-100%",
            opacity: dropdownNav ? 1 : 0,
          }}
          className="fixed w-screen h-full px-[32px] sm:px-[32px] md:px-[64px] pt-[80px] sm:pt-[128px] md:pt-[160px] pb-[32px] sm:pb-[48px] md:pb-[64px] bg-white z-50 shadow-lg flex flex-col text-[18px] sm:text-[20px] md:text-[24px] text-gray-800"
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <ul className="list-none ">
            {/* Only show navigation items on home page */}
            {isHomePage && (
              <>
                <li className="mt-[32px] sm:mt-[24px] md:mt-[32px]">
                  <a href="#info" className="no-underline text-gray-800">
                    Why Prasaar ?
                  </a>
                </li>

                <li className="mt-[32px] sm:mt-[24px] md:mt-[32px] flex flex-row items-center">
                  Solutions
                  <motion.button
                    type="button"
                    className="bg-transparent border-none cursor-pointer h-[20px] sm:h-[24px]"
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
                      className="h-[20px] w-[20px] lg:h-[24px] lg:w-[24px]"
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
              </>
            )}

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
        className={`fixed w-screen sm:py-10 h-[64px] sm:h-[68px] lg:h-[68px] text-[14px] sm:text-[16px] lg:text-[18px] flex justify-between items-center px-[32px] sm:px-[32px] lg:px-[48px] z-50 text-gray-800 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <Link to="/" className="cursor-pointer">
          <img
            src="./img/prasaarLogo.png"
            alt="website logo"
            className="w-[135px] h-[40px] sm:w-[150px] sm:h-[40px] lg:w-[160px] lg:h-[45px]"
          />
        </Link>

        {isTablet ? (
          <>
            <div>
              <button
                type="button"
                className="bg-transparent w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] md:w-[56px] md:h-[56px] border-none cursor-pointer"
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
              {/* Only show navigation items on home page */}
              {isHomePage && (
                <ul className="list-none flex gap-[24px] lg:gap-[48px]">
                  <li>
                    <a
                      href="#info"
                      className="text-gray-800 no-underline transition-all duration-300 border-b-2 border-white hover:border-gray-800"
                    >
                      Why Prasaar ?
                    </a>
                  </li>

                  <li className="flex flex-row items-center justify-center ">
                    Solutions
                    <motion.button
                      type="button"
                      className="bg-transparent border-none cursor-pointer h-[20px] lg:h-[24px]"
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
                        className="h-[20px] w-[20px] lg:h-[24px] lg:w-[24px]"
                        animate={{ rotate: dropdownSolutions ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </li>
                </ul>
              )}
            </div>

            <div className="flex items-center gap-[16px] lg:gap-[32px]">
              <Button
                text={"VoiceAgent Demo"}
                to="https://call.prasaar.co/#demo"
                handleFormOpen={() => {}} // Remove setFormOpen since we're not using it anymore
              />
            </div>
          </>
        )}

        {/* Only show dropdowns on home page and not on tablet */}
        {!isTablet && isHomePage ? (
          <Solutions
            dropdownSolutions={dropdownSolutions}
            isTablet={isTablet}
          />
        ) : (
          ""
        )}
        {!isTablet && isHomePage ? (
          <UseCases dropdownUseCases={dropdownUseCases} isTablet={isTablet} />
        ) : (
          ""
        )}
      </motion.header>

      <div className="relative">
        {/* WhatsApp Button */}
        <a
          href="https://api.whatsapp.com/send/?phone=919226333789&text&type=phone_number&app_absent=0"
          className={`fixed z-20 bg-green-500 hover:bg-transparent flex justify-center items-center rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl
            ${
              isMobile
                ? "right-[16px] bottom-[16px] w-[40px] h-[40px]"
                : "right-[24px] bottom-[24px] w-[48px] h-[48px] sm:right-[32px] sm:bottom-[32px] lg:right-[48px] lg:bottom-[48px]"
            }`}
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleClick}
        >
          {/* WhatsApp icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-3/4 h-3/4 fill-white"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>

          {/* Ripple effect */}
          {isRippling && (
            <span
              className="absolute rounded-full bg-white opacity-70 animate-ping"
              style={{
                width: "100%",
                height: "100%",
                animation: "ping 1s cubic-bezier(0, 0, 0.2, 1)",
              }}
            />
          )}
        </a>

        {/* Pulse animation behind button */}
        <span
          className={`fixed bg-green-500 rounded-full opacity-30 animate-pulse
          ${
            isMobile
              ? "right-[16px] bottom-[16px] w-[40px] h-[40px]"
              : "right-[24px] bottom-[24px] w-[48px] h-[48px] sm:right-[32px] sm:bottom-[32px] lg:right-[48px] lg:bottom-[48px]"
          }`}
        />

        {/* Tooltip - Only show on larger screens */}
        {!isMobile && (
          <div
            className={`fixed z-10 text-gray-800 font-medium border border-gray-300 px-[12px]  sm:px-[16px] sm:py-[8px] lg:px-[24px] lg:py-[12px] rounded-lg bg-white shadow-md
              text-[12px] sm:text-[14px] lg:text-[16px]
              bottom-[24px] right-[64px] sm:bottom-[32px] sm:right-[80px] lg:bottom-[48px] lg:right-[128px]`}
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateX(0)" : "translateX(10px)",
              transition: "all 0.4s ease",
              pointerEvents: isHovered ? "auto" : "none",
            }}
          >
            Chat on WhatsApp
            {/* Tooltip arrow */}
            <div className="absolute top-1/2 -right-[8px] transform -translate-y-1/2 rotate-45 w-[12px] h-[12px] sm:w-[16px] sm:h-[16px] bg-white border-r border-t border-gray-300" />
          </div>
        )}
      </div>
    </>
  );
}
