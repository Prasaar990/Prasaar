import styles from "../../styles/Features.module.css";
import Feature from "./Feature";

export default function Features() {
  return (
    <div className={styles.features} id="solutions">
      <h1 className={styles.heading}>Solutions</h1>
      <Feature
        title={"Prasaar WebPortal"}
        list={[
          "Streamlines backend operations for efficient election management.",
          "Enables administrators to manage voter data and generate reports.",
          "Facilitates real-time monitoring and seamless coordination.",
          "Features an intuitive interface with powerful functionalities.",
          "Enhances efficiency and transparency in the electoral process.",
        ]}
        img="./img/service_images/pwp.png"
      />
      <Feature
        title={"WhatsApp Surveys"}
        list={[
          "Collect real-time customer feedback effortlessly via WhatsApp.",
          "Benefit from instant responses and high engagement rates.",
          "Gain valuable insights to enhance services and satisfaction.",
          "Automate feedback collection and analyze responses efficiently.",
          "Seamlessly integrate surveys into your workflow for better decision-making.",
        ]}
        img="./img/service_images/cms.jpeg"
        side={"rowReverse"}
        className="featureSpecial"
      />
      <Feature
        title={"Complaint Management System"}
        list={[
          "Efficiently track, manage, and resolve customer complaints in real-time.",
          "Enhance service quality and customer satisfaction with seamless issue handling.",
          "Automate ticketing and categorize issues for faster resolution.",
          "Gain valuable insights to optimize operations and improve efficiency.",
        ]}
        img="./img/service_images/ws.jpeg"
      />
    </div>
  );
}
