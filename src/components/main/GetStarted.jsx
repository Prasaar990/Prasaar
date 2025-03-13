import Form from "../layouts/Form";
import styles from "../../styles/GetStarted.module.css";

export default function GetStarted() {
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
      <Form />
    </div>
  );
}
