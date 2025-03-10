import styles from "../../styles/Features.module.css";
import Feature from "./Feature";

export default function Features() {
  return (
    <div className={styles.features} id="solutions">
      <h1 className={styles.heading}>Solutions</h1>

      <Feature
        title="Real Time Feedback"
        subheading="Conduct opinion-poll Customer Satisfaction(CSAT) surveys, NPS - Net Promoter Score, Employee Tech."
        list={[
          "Collect real-time customer feedback effortlessly via WhatsApp.",
          "Benefit from instant responses and high engagement rates.",
          "Gain valuable insights to enhance services and satisfaction.",
          "Automate feedback collection and analyze responses efficiently.",
          "Seamlessly integrate surveys into your workflow for better decision-making.",
        ]}
        img="./img/service_images/cms.png"
        btnText="Get Started!"
      />
      <Feature
        title="Complaint Management System"
        subheading="Convert complaints into compliments."
        list={[
          "Efficiently track, manage, and resolve customer complaints in real-time.",
          "Enhance service quality and customer satisfaction with seamless issue handling.",
          "Automate ticketing and categorize issues for faster resolution.",
          "Gain valuable insights to optimize operations and improve efficiency.",
        ]}
        img="./img/service_images/ws.png"
        side="rowReverse"
        className="featureSpecial"
        btnText="Get Started!"
      />
    </div>
  );
}
