import styles from "../../styles/HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heading}>
        <div>
          <h1>Happier </h1>
          <h1>Customers </h1>
          <h1>
            For <span className={styles.special}> Healthcare</span>
          </h1>
        </div>
        <p>
          Momos is designed to help{" "}
          <span className={styles.special}>Multi-Location Brands globally</span>{" "}
          drive their entire Customer Lifecycle, get connected with their
          customers and grow their business across every location.
        </p>
        <button className={`${styles.btn} btn`}>Get Started!</button>
      </div>
      <div className={styles.img}></div>
    </section>
  );
}
