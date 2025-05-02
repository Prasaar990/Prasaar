import HeroSection from "./HeroSection";
import Customers from "./Marquee";
import Info from "./Info";
import Solutions from "./Solutions";
import Button from "../layouts/Button";

export default function Main() {
  return (
    <div className="w-full">
      <HeroSection
        words={[
          "Customer Satisfaction",
          "Customer Experience",
          "Customer Service",
        ]}
        subHeading="Prasaar is your Customer Platform to activate, retain, and grow the customer base organically🙂."
        title={"Increase Revenue and"}
      />

      <Customers />

      <Info />

      <Solutions />

      {/* <Testimonials id="testimonials" /> */}

      <section className="mt-40 text-4xl md:text-3xl py-20 px-12 md:px-24 lg:px-32 flex justify-around items-center text-white bg-gradient-to-b from-[#333b4f] to-[#596789] md:flex-row sm:flex-col sm:gap-8">
        Collect Feedback Faster...
        <Button text="Start Today" to="/form" />
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
