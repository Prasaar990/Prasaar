import { Link } from "react-router-dom";
import styles from "../../styles/Button.module.css";
import { useRef } from "react";

/*eslint-disable*/
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
    arrow.current.style.transform = "translate(50%, -150%)";
    blackArrow.current.style.transform = "translate(110%, -130%)";
    blackArrow.current.style.opacity = "1";
    arrow.current.style.opacity = "0";
    if (primary === true) elementRef.current.style.color = "black";
    else elementRef.current.style.color = "black";
  };

  const handleMouseLeave = () => {
    arrow.current.style.transform = "translate(-50%, -50%)";
    blackArrow.current.style.transform = "translate(-50%, 10%)";
    blackArrow.current.style.opacity = "0";
    arrow.current.style.opacity = "1";
    if (primary === true) elementRef.current.style.color = "white";
    else elementRef.current.style.color = "black";
  };
  return (
    <Link
      ref={elementRef}
      to={to}
      className={`${styles.btn} font24 btn ${
        primary ? "bg_primary" : "bg_white"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (to.includes("form")) handleFormOpen(true);
        console.log(to.includes("form"));
      }}
    >
      {text}{" "}
      <div className={styles.arrowDiv}>
        <img
          ref={blackArrow}
          src="./img/right-arrow-black.svg"
          alt={text}
          className={styles.blackArrow}
        />
        <img
          ref={arrow}
          src="./img/right-arrow.svg"
          alt={text}
          className={styles.arrow}
        />
      </div>
    </Link>
  );
}
