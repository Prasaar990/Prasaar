import { useEffect, useState } from "react";
import styles from "../../styles/Testimonials2.module.css";
import Card from "../layouts/Card";

export default function Testimonials2() {
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTransform((prevTransform) => {
        const newTransform = prevTransform - 100;
        // Reset to 0 if it goes below -800
        if (newTransform <= -800) {
          return 0;
        }
        return newTransform;
      });
    }, 3000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={styles.testimonialsList}>
        <Card
          x={transform + 0}
          heading="Bulk SMS with Sender ID"
          text="Reach a wide audience with personalized bulk SMS messages using custom sender IDs, ideal for political campaigns."
        />
        <Card
          x={transform + 100}
          heading="Personalized AI Video"
          text="Create personalized AI-driven videos to engage and connect with your voters like never before. A perfect solution for campaigns."
        />
        <Card
          x={transform + 200}
          heading="Voice Call/IVR"
          text="Engage voters with automated voice calls and Interactive Voice Response (IVR) systems for seamless communication."
        />
        <Card
          x={transform + 300}
          heading="WhatsApp Marketing"
          text="Run targeted WhatsApp campaigns and reach your voters on the world’s most popular messaging platform."
        />
        <Card
          x={transform + 400}
          heading="Unverified WhatsApp Business API"
          text="Get access to the WhatsApp Business API for your campaign, even without the verified business account."
        />
        <Card
          x={transform + 500}
          heading="WhatsApp Business API Broadcasting"
          text="Reach your voters through large-scale broadcast messaging, delivering important updates in real-time."
        />
        <Card
          x={transform + 600}
          heading="Auto SMS and WhatsApp APP"
          text="This innovative service automates communication for election campaigns using our Auto SMS and WhatsApp App."
        />
        <Card
          x={transform + 700}
          heading="Offline Voter Search APP"
          text="Our Offline Voter Search App allows you to quickly search voter information without needing internet connectivity."
        />
        <Card
          x={transform + 800}
          heading="DLT Sender ID Registration"
          text="DLT is a mandatory process for businesses and organizations in India to ensure SMS transparency and reduce spam."
        />
        <Card
          x={transform + 900}
          heading="Bulk SMS without Sender ID"
          text="Bulk SMS Without Sender ID allows businesses to send SMS messages without displaying a unique sender name."
        />
      </div>
      <div className={styles.testimonialsBtns}>
        <button
          className={`btn `}
          onClick={() => {
            if (transform !== 0) setTransform((transform) => transform + 100);
            else setTransform(-800);
          }}
        >
          &larr;
        </button>
        <button
          className={`btn `}
          onClick={() => {
            if (transform !== -800)
              setTransform((transform) => transform - 100);
            else setTransform(0);
          }}
        >
          &rarr;
        </button>
      </div>
    </section>
  );
}
