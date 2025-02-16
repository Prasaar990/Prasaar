import styles from "../../styles/Info.module.css";
import { motion } from "framer-motion";

export default function Info() {
  return (
    <div className={styles.info}>
      <header className={styles.mainHeading}>
        {/* eslint-disable  */}
        <h1>
          Momos'<span className={styles.special}>All-in-One</span>
        </h1>
        <h1>Engagement Platform</h1>
      </header>
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          viewport={{ once: true }}
        >
          <img src="./img/right.png" alt="logo" className={styles.infoIcon} />
          <h3>Rock Your Customer Experience and Teamwork</h3>
          <p>
            Collect, Consolidate, and Measure all of your Customer Feedback with
            Momos, across all of your locations. More feedback, more insights,
            better businesses. Momos helps brands better understand their
            customers and keep them coming back. Say hello to happier customers
            and a more efficient Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Obcaecati, repudiandae. team with Momos.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 180 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          viewport={{ once: true }}
        >
          <img src="./img/right.png" alt="logo" className={styles.infoIcon} />
          <h3>Rock Your Customer Experience and Teamwork</h3>
          <p>
            Collect, Consolidate, and Measure all of your Customer Feedback with
            Momos, across all of your locations. More feedback, more insights,
            better businesses.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 210 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          viewport={{ once: true }}
        >
          <img src="./img/right.png" alt="logo" className={styles.infoIcon} />
          <h3>Rock Your Customer Experience and Teamwork</h3>
          <p>
            Collect, Consolidate, and Measure all of your Customer Feedback with
            Momos, across all of your locations. More feedback, more insights,
            better businesses. Momos helps brands better understand their
            customers and keep them coming back. Say hello to happier customers
            and a more efficient team with Momos.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 240 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          viewport={{ once: true }}
        >
          <img src="./img/right.png" alt="logo" className={styles.infoIcon} />
          <h3>Rock Your Customer Experience and Teamwork</h3>
          <p>
            Collect, Consolidate, and Measure all of your Customer Feedback with
            Momos, across all of your locations. More feedback, more insights,
            better businesses. Momos helps brands better understand their
            customers and keep them coming back. Say hello to happier customers
            and a more efficient Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Similique temporibus quod omnis dicta blanditiis,
            est nulla laborum sed voluptas, veritatis impedit. Maxime, itaque
            magnam dolore numquam dignissimos iste repudiandae officiis?team
            with Momos.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
