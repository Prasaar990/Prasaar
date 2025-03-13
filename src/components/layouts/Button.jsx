import { Link } from "react-router-dom";
import styles from "../../styles/Button.module.css";
import { useRef } from "react";

/*eslint-disable*/
export default function Button({ text }) {
  const elementRef = useRef(null);
  const arrow = useRef(null);
  const blackArrow = useRef(null);

  const handleMouseEnter = () => {
    arrow.current.style.transform = "translate(50%, -150%)";
    blackArrow.current.style.transform = "translate(110%, -130%)";
    blackArrow.current.style.opacity = "1";
    arrow.current.style.opacity = "0";
    elementRef.current.style.color = "black";
  };

  const handleMouseLeave = () => {
    arrow.current.style.transform = "translate(-50%, -50%)";
    blackArrow.current.style.transform = "translate(-50%, 10%)";
    blackArrow.current.style.opacity = "0";
    arrow.current.style.opacity = "1";
    elementRef.current.style.color = "white";
  };
  return (
    <Link
      ref={elementRef}
      to="https://api.whatsapp.com/send/?phone=919356093930&text&type=phone_number&app_absent=0"
      target="_blank"
      className={`${styles.btn} font24 btn`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}{" "}
      <div className={styles.arrowDiv}>
        <img
          ref={blackArrow}
          src="./img/right-arrow-black.svg"
          alt="get Started"
          className={styles.blackArrow}
        />
        <img
          ref={arrow}
          src="./img/right-arrow.svg"
          alt="get Started"
          className={styles.arrow}
        />
      </div>
    </Link>
  );
}
