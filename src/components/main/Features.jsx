import styles from "../../styles/Features.module.css";
import Feature from "./Feature";

export default function Features() {
  return (
    <div className={styles.features}>
      <Feature
        title={"Unified Platform"}
        list={[
          "An integrated center for all your customer needs.",
          "Our Unified Platform consolidates all your customer channels, feedback, and sales into one user-friendly interface.",
          "This seamless access allows for swift interactions and effective management, contributing to better customer engagement and retention.",
          "Keep track, communicate and engage — all from one place.",
        ]}
      />
      <Feature
        title={"Automation - powered by AI"}
        list={[
          "Improve your workflow with our AI-powered automation.",
          "From providing quick, personalized responses to identifying and addressing negative feedback, our AI automation makes your customer service easier and more efficient.",
          "Say goodbye to manual oversight and hello to automatic, immediate, and thoughtful interactions for all your customers",
        ]}
        side={"rowReverse"}
        className="featureSpecial"
      />
      <Feature
        title={"Customer Analytics & Insights"}
        list={[
          "Stay informed and always a step ahead.",
          "Get an in-depth understanding of your customer base at every location with actionable insights, their behavior, and location leaderboards.",
          "Make data-driven decisions, understand what works and what doesn't, and measure success with our comprehensive analytics.",
          "Utilize these insights to refine and retarget your business strategies, bringing back customers and success for your business.",
        ]}
      />
    </div>
  );
}
