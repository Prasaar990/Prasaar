import styles from "../../styles/Main.module.css";
import HeroSection from "./HeroSection";
import Customers from "./Customers";
import Info from "./Info";
import Features from "./Features";
import Button from "../layouts/Button";

export default function main() {
  return (
    <div className={styles.main}>
      <HeroSection
        words={[
          "Customer Satisfaction",
          "Customer Experience",
          "Customer Service",
        ]}
        subHeading="Prasaar is your Customer Platform to activate, retain, and grow the customer base organically.🙂."
        title={"Increase Revenue and"}
      />
      <Customers />
      <Info />
      <Features />
      {/* <Testimonials id="testimonials" /> */}
      {/* <Testimonials2 id="testimonials" /> */}
      <section className={styles.getStarted}>
        Collect Feedback Faster...
        <Button text="Start Today" />
      </section>
      <HeroSection
        words={[
          "Customer Service",
          "Customer Experience",
          "Employee Experience",
          "Customer Retention",
        ]}
        subheading=""
        title={"How Prasaar is helping drive better"}
      />
    </div>
  );
}
