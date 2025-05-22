import { motion } from "framer-motion";
import Solution from "./Solution";

export default function Solutions() {
  return (
    <div
      className="w-full overflow-hidden mt-40 lg:mt-80 px-6 sm:px-12 md:px-24 lg:px-32"
      id="solutions"
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-16 md:mb-24"
      >
        <motion.h1 className="mx-auto max-w-md text-center text-3xl sm:text-4xl lg:text-5xl primaryColor font-medium">
          Solutions
        </motion.h1>
        <motion.div
          className="h-1 w-24 bg-black mt-3 mx-auto rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      </motion.div>

      <div className="space-y-24 md:space-y-32 lg:space-y-40">
        <Solution
          title="Real Time Feedback"
          list={[
            "Collect real-time customer feedback effortlessly via WhatsApp.",
            "Benefit from instant responses and high engagement rates.",
            "Gain valuable insights to enhance services and satisfaction.",
            "Automate feedback collection and analyze responses efficiently.",
            "Seamlessly integrate surveys into your workflow for better decision-making.",
          ]}
          img="./img/service_images/cms.png"
          btnText="Get Started"
        >
          <p>
            Conduct Opinion-Poll, Customer Satisfaction (CSAT) surveys, NPS -
            Net Promoter Score, Employee Feedback.
          </p>
        </Solution>

        <Solution
          title="Complaint Management System"
          list={[
            "Efficiently track, manage, and resolve customer complaints in real-time.",
            "Enhance service quality and customer satisfaction with seamless issue handling.",
            "Automate ticketing and categorize issues for faster resolution.",
            "Gain valuable insights to optimize operations and improve efficiency.",
          ]}
          img="./img/service_images/ws.png"
          side="rowReverse"
          btnText="Get Started"
        >
          <p>
            Convert <em>complaints</em> into <em>compliments</em>
          </p>
        </Solution>
      </div>
    </div>
  );
}
