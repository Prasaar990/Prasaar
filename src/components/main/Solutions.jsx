import { motion } from "framer-motion";
import Solution from "./Solution";

export default function Solutions() {
  return (
    <div
      className="w-full overflow-hidden mt-[100px] lg:mt-[200px] px-[24px] sm:px-[48px] md:px-[96px] lg:px-[128px]"
      id="solutions"
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-[20px] md:mb-[20px]"
      >
        <motion.h1 className="mx-auto max-w-[448px] text-center text-[30px] sm:text-[36px] lg:text-[48px] primaryColor font-medium">
          Solutions
        </motion.h1>
        <motion.div
          className="h-[4px] w-[96px] bg-black mt-[12px] mx-auto rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      </motion.div>

      <div className="space-y-[40px] lg:space-y-[80px]">
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
