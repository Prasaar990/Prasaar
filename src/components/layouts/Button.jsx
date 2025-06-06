import { useRef } from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import proptypes from "prop-types";

Button.propTypes = {
  text: proptypes.string.isRequired,
  to: proptypes.string,
  handleFormOpen: proptypes.func,
  primary: proptypes.bool,
};

export default function Button({
  text,
  to = "/form",
  handleFormOpen,
  primary = true,
}) {
  const elementRef = useRef(null);
  const arrow = useRef(null);
  const blackArrow = useRef(null);

  const handleMouseEnter = () => {
    if (arrow.current && blackArrow.current && elementRef.current) {
      arrow.current.style.transform = "translate(150%, -150%)";
      blackArrow.current.style.transform = "translate(120%, -125%)";
      blackArrow.current.style.opacity = "1";
      arrow.current.style.opacity = "0";
      elementRef.current.style.color = "black";
    }
  };

  const handleMouseLeave = () => {
    if (arrow.current && blackArrow.current && elementRef.current) {
      arrow.current.style.transform = "translate(0, 0)";
      blackArrow.current.style.transform = "translate(-50%, 10%)";
      blackArrow.current.style.opacity = "0";
      arrow.current.style.opacity = "1";
      elementRef.current.style.color = primary ? "white" : "black";
    }
  };

  const handleClick = () => {
    if (to.includes("form") && handleFormOpen) {
      handleFormOpen(true);
    }
  };

  // Using a regular anchor tag instead of React Router's Link
  return (
    <Link
      ref={elementRef}
      to={to}
      // target={`${to !== "/form" ? "_blank" : ""}`}
      target={`${to !== "/form" ? "" : ""}`}
      rel="noopener noreferrer"
      className={`py-[6px]  px-[20px] rounded-full text-[20px] flex items-center justify-center transition-all duration-300 z-10 relative   ${
        primary ? "bg_primary text-white" : "bg-white text-black"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {text}{" "}
      <div className="bg-white rounded-full p-4 ml-4 flex justify-center items-center relative z-10">
        <img
          ref={blackArrow}
          src="./img/right-arrow-black.svg"
          alt={text}
          className="absolute w-5 h-5 -left-1/2 top-full opacity-0 transition-all duration-300"
        />
        <img
          ref={arrow}
          src="./img/right-arrow.svg"
          alt={text}
          className="absolute w-5 h-5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        />
      </div>
    </Link>
  );
}
