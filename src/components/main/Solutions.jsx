import { motion } from "framer-motion";
import Solution from "./Solution";

export default function Solutions() {
  return (
    <div
      className="w-full overflow-hidden py-20 lg:py-28 px-5 sm:px-6 md:px-8 lg:px-12"
      id="solutions"
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-6 md:mb-10"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c60240]/10 text-[#c60240] text-sm font-medium mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c60240] animate-pulse" />
          Our Solutions
        </motion.div>

        <motion.h2 className="mx-auto max-w-lg text-center text-3xl sm:text-4xl font-semibold text-gray-900">
          Powerful{" "}
          <span className="text-[#c60240]">Solutions</span>
        </motion.h2>

        <motion.p
          className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Comprehensive tools designed to elevate your customer engagement and service quality
        </motion.p>

        <motion.div
          className="h-1 w-16 bg-gradient-to-r from-[#c60240] to-[#a00235] mt-6 mx-auto rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
      </motion.div>

      <div className="space-y-12 lg:space-y-20 max-w-6xl mx-auto">
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
