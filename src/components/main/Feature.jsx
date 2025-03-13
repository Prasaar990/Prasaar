import { motion } from "framer-motion";
import styles from "../../styles/Feature.module.css";
import Button from "../layouts/Button";

/* eslint-disable */
export default function Feature({
  title,
  list,
  img,
  children,
  side = "",
  btnText = "Get Started",
}) {
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
            <img src={img} alt="feature" className={styles.img} />
          </motion.div>
          <motion.div
            initial={{ x: "30%", opacity: 0.1 }}
            whileInView={{ x: "0%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={styles.text}
          >
            <div>
              <h1 className="font36">{title}</h1>
              <h1 className={`${styles.subheading}`}>{children}</h1>
            </div>

            <ul>
              {list.map((item) => {
                return (
                  <li key={item}>
                    <img
                      src="./img/right.png"
                      alt="right symbol"
                      className="icon24"
                    />
                    {item}
                  </li>
                );
              })}
            </ul>
            <Button
              text={btnText}
              to="https://api.whatsapp.com/send/?phone=919356093930&text&type=phone_number&app_absent=0"
            />
          </motion.div>
        </section>
      ) : (
        <>
          <section className={`${styles.feature} ${styles.specialFeature}`}>
            <motion.div
              initial={{ x: "-30%", opacity: 0.1 }}
              whileInView={{ x: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={styles.text}
            >
              <div>
                <h1 className="font36">{title}</h1>
                <h1 className={`${styles.subheading} `}>{children}</h1>
              </div>

              <ul>
                {list.map((item) => {
                  return (
                    <li key={item}>
                      <img
                        src="./img/right.png"
                        alt="right symbol"
                        className="icon24"
                      />
                      {item}
                    </li>
                  );
                })}
              </ul>
              <Button
                text={btnText}
                to="https://api.whatsapp.com/send/?phone=919356093930&text&type=phone_number&app_absent=0"
              />
            </motion.div>
            <motion.div
              initial={{ x: "30%", opacity: 0.1 }}
              viewport={{ once: true }}
              whileInView={{ x: "0%", opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={styles.imgDiv}
            >
              <img src={img} alt="feature" className={styles.img} />
            </motion.div>
          </section>
        </>
      )}
    </>
  );
}
