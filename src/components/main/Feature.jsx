import { motion } from "framer-motion";
import styles from "../../styles/Feature.module.css";

/* eslint-disable */
export default function Feature({ title, list, side = "" }) {
  return (
    <>
      {side !== "rowReverse" ? (
        <section className={`${styles.feature}`}>
          <motion.div
            initial={{ x: "-30%", opacity: 0.1 }}
            whileInView={{ x: "0%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={styles.imgDiv}
          >
            <img src="./img/1.png" alt="feature 1" className={styles.img} />
          </motion.div>
          <motion.div
            initial={{ x: "30%", opacity: 0.1 }}
            whileInView={{ x: "0%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={styles.text}
          >
            <h1>{title}</h1>
            <ul>
              {list.map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
          </motion.div>
        </section>
      ) : (
        <>
          <section className={`${styles.feature}`}>
            <motion.div
              initial={{ x: "-30%", opacity: 0.1 }}
              whileInView={{ x: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={styles.text}
            >
              <h1>{title}</h1>
              <ul>
                {list.map((item) => {
                  return <li key={item}>{item}</li>;
                })}
              </ul>
            </motion.div>
            <motion.div
              initial={{ x: "30%", opacity: 0.1 }}
              viewport={{ once: true }}
              whileInView={{ x: "0%", opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={styles.imgDiv}
            >
              <img src="./img/1.png" alt="feature 1" className={styles.img} />
            </motion.div>
          </section>
        </>
      )}
    </>
  );
}
