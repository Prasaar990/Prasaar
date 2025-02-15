import styles from "../../styles/Customers.module.css";

export default function Customers() {
  return (
    <div className={styles.marquee}>
      <div className={styles.marqueeInner}>
        <div className={styles.customer}>1</div>
        <div className={styles.customer}>2</div>
        <div className={styles.customer}>3</div>
        <div className={styles.customer}>4</div>
        <div className={styles.customer}>5</div>
        <div className={styles.customer}>6</div>
        <div className={styles.customer}>7</div>

        {/* Duplicate elements for seamless looping */}
        <div className={styles.customer}>1</div>
        <div className={styles.customer}>2</div>
        <div className={styles.customer}>3</div>
        <div className={styles.customer}>4</div>
        <div className={styles.customer}>5</div>
        <div className={styles.customer}>6</div>
        <div className={styles.customer}>7</div>

        <div className={styles.customer}>1</div>
        <div className={styles.customer}>2</div>
        <div className={styles.customer}>3</div>
        <div className={styles.customer}>4</div>
        <div className={styles.customer}>5</div>
        <div className={styles.customer}>6</div>
        <div className={styles.customer}>7</div>
      </div>
    </div>
  );
}
