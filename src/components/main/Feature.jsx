import styles from "../../styles/Feature.module.css";

/* eslint-disable */
export default function Feature({ title, list, side = "" }) {
  return (
    <section className={`${styles[side]} ${styles.feature}`}>
      <div className={styles.imgDiv}>
        <img src="./img/1.png" alt="feature 1" className={styles.img} />
      </div>
      <div className={styles.text}>
        <h1>{title}</h1>
        <ul>
          {list.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}
