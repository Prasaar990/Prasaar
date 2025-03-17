// import React from }react};
import styles from "../../styles/Terms.module.css";

const TermsAndConditions = () => {
  return (
    <div className={styles.tnc_div}>
      <div className={styles.tnc_container}>
        <h2 className={styles.tnc_title}>Terms and Conditions</h2>

        <section className={styles.tnc_section}>
          <p>
            By using Prasaar’s website and services, you agree to these terms.
          </p>
        </section>

        <section className={styles.tnc_section}>
          <p>
            Prasaar provides WhatsApp automation, bulk messaging, AI video
            personalization, IVR solutions, feedback collection, and complaint
            management. Services must be used lawfully.
          </p>
        </section>

        <section className={styles.tnc_section}>
          <ul>
            <li>
              Users must provide accurate information and maintain account
              security.
            </li>
            <li>Spam, fraud, or unauthorized access is strictly prohibited.</li>
            <li>All messaging must comply with TRAI and WhatsApp policies.</li>
          </ul>
        </section>

        <section className={styles.tnc_section}>
          <ul>
            <li>DLT registration is required for SMS campaigns.</li>
            <li>
              WhatsApp Business API users must comply with Meta’s policies.
            </li>
            <li>Political campaigns must adhere to election laws.</li>
          </ul>
        </section>

        <section className={styles.tnc_section}>
          <ul>
            <li>
              We implement security measures to protect user data but are not
              responsible for third-party breaches.
            </li>
            <li>Users must not share or misuse unauthorized data.</li>
          </ul>
        </section>

        <section className={styles.tnc_section}>
          <ul>
            <li>Some services require payments as per the chosen plan.</li>
            <li>
              Refunds are only applicable in cases of service failure caused by
              Prasaar.
            </li>
          </ul>
        </section>

        <section className={styles.tnc_section}>
          <p>
            Prasaar is not responsible for indirect damages, service
            interruptions, or losses caused by third-party integrations.
          </p>
        </section>

        <section className={styles.tnc_section}>
          <p>Accounts violating these terms may be suspended or terminated.</p>
        </section>

        <section className={styles.tnc_section}>
          <p>
            Prasaar integrates with third-party platforms but holds no
            responsibility for their reliability or issues.
          </p>
        </section>

        <section className={styles.tnc_section}>
          <p>
            You consent to receive communications from us by way of e-mails,
            phone calls, and SMS’s regarding your transactions on our platform.
            Users must register valid phone numbers and e-mail addresses to
            enable communication. We may also use your e-mail address to send
            updates, newsletters, and changes to our services for a better
            experience.
          </p>
        </section>

        <section className={styles.tnc_section}>
          <p>
            Prasaar reserves the right to update these terms, with major changes
            being notified to users.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
