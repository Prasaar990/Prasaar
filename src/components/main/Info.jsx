import styles from "../../styles/Info.module.css";
import { motion } from "framer-motion";

export default function Info() {
  return (
    <div className={styles.info} id="info">
      <header className={`${styles.mainHeading}`}>
        <h1>
          {" "}
          Why
          <span className="primaryColor"> Prasaar ?</span>
        </h1>
      </header>

      <p className={styles.subHeading}>
        Prasaar has everything you need for customer engagement and service
        using its WhatsApp automation platform. Know how your customers feel
        about your service with WhatsApp-based CSAT surveys and feedback tools.
        It is easy to track responses, gather insights and analyze results using
        Prasaar. It&apos;s the best way to improve customer satisfaction
        effortlessly.
      </p>
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          viewport={{ once: true }}
        >
          <img src="./img/connect.svg" alt="logo" className={styles.infoIcon} />
          <h3>Easiest way to connect with business</h3>
          <p>
            Over two billion people use WhatsApp daily, and 69% think it is the
            easiest way to connect with a business. How? Well, WhatsApp is a
            user-friendly platform with real-time messaging features making it
            an ideal channel for businesses for customer engagement, support,
            and real-time feedback.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 180 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src="./img/increase.svg"
            alt="logo"
            className={styles.infoIcon}
          />
          <h3>Take your business to the next level</h3>
          <p>
            Use WhatsApp to retain customers while improving customer
            satisfaction. Improve your services based on customer feedback. This
            simple approach enhances communication, trust, and user engagement.
          </p>
        </motion.div>
        {/* <motion.div
          initial={{ opacity: 0, y: 210 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          viewport={{ once: true }}
        >
          <img src="./img/survey.svg" alt="logo" className={styles.infoIcon} />
          <h3>WhatsApp Surveys That Improve Your User Engagement</h3>
          <p>
            Know how your customers liked your service with WhatsApp-based CSAT
            surveys. Improve your services based on their feedback. This simple
            approach enhances communication, trust, and user engagement
          </p>
        </motion.div> */}
        <motion.div
          initial={{ opacity: 0, y: 240 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src="./img/automation.svg"
            alt="logo"
            className={styles.infoIcon}
          />
          <h3>
            Build a trustworthy business and boost revenue with automation
          </h3>
          <p>
            By combining automation tools and personal interactions on WhatsApp,
            we help you speed up service, strengthen your brand, and attract
            more clients efficiently
          </p>
        </motion.div>
      </main>
    </div>
  );
}
