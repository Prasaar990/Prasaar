import Form from "../layouts/Form";
import styles from "../../styles/GetStarted.module.css";
import { useEffect } from "react";

export default function GetStarted() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles.div}>
      <div className={styles.heading}>
        <h1>Get Started </h1>
        <h1>with Prasaar</h1>
        <p>
          Share a few details in the form so we can better help you and your
          company
        </p>
      </div>
      <div className={styles.formDiv}>
        <Form />
      </div>
    </div>
  );
}
