import styles from "../../styles/Main.module.css";
import HeroSection from "./HeroSection";
// import Customers from "./Customers";
import Info from "./Info";
import Features from "./Features";
import Testimonials from "./Testimonials";

export default function main() {
  return (
    <div className={styles.main}>
      <HeroSection />
      {/* <Customers /> */}
      <Info />
      <Features />
      <Testimonials id="testimonials" />
    </div>
  );
}
