import styles from "../../styles/Main.module.css";
import HeroSection from "./HeroSection";
import Customers from "./Customers";
import Info from "./Info";
import Features from "./Features";
// import Testimonials from "./Testimonials";
import Testimonials2 from "./Testimonials2";
import Button from "../layouts/Button";

export default function main() {
  return (
    <div className={styles.main}>
      <HeroSection
        words={[
          "Customer Experience",
          "Customer Service",
          "Employee Experience",
        ]}
        subHeading="Prasaar Whatsapp Automation Platform helps you grow customer
            engagement, drive revenue, and increase customer satisfaction🙂."
        title={"Transfrom Your"}
      />
      <Customers />
      <Info />
      <Features />
      {/* <Testimonials id="testimonials" /> */}
      <Testimonials2 id="testimonials" />
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
