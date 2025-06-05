import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Info() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="w-full py-[128px] px-[32px] lg:px-[80px] mt-[80px] bg-gradient-to-b from-white to-gray-50"
      id="info"
    >
      {/* Header section */}
      <div className="text-center mb-[64px]">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[24px] md:text-[36px] font-medium leading-tight"
        >
          Why
          <span className="primaryColor font-semibold"> Prasaar?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[18px] md:text-[18px] text-gray-700 max-w-[896px] mx-auto mt-[32px] leading-relaxed"
        >
          Prasaar has everything you need for customer engagement and service
          using its WhatsApp automation platform. Know how your customers feel
          about your service with WhatsApp-based CSAT surveys and feedback
          tools. It is easy to track responses, gather insights and analyze
          results using Prasaar. It&apos;s the best way to improve customer
          satisfaction effortlessly.
        </motion.p>
      </div>

      {/* Main content cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] lg:gap-[64px] max-w-[1280px] mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col group p-[24px] rounded-xl bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-[8px] transition-all duration-300"
        >
          <div className="w-[64px] h-[64px] mb-[24px] p-[8px] rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
            <img
              src="./img/connect.svg"
              alt="Connection icon"
              className="w-full h-full"
            />
          </div>
          <h3 className="text-[20px] font-medium mb-[16px] text-gray-800">
            Easiest way to connect with business
          </h3>
          <p className="text-gray-600 leading-relaxed text-[16px]">
            Over two billion people use WhatsApp daily, and 69% think it is the
            easiest way to connect with a business. How? Well, WhatsApp is a
            user-friendly platform with real-time messaging features making it
            an ideal channel for businesses for customer engagement, support,
            and real-time feedback.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col group p-[24px] rounded-xl bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-[8px] transition-all duration-300"
        >
          <div className="w-[64px] h-[64px] mb-[24px] p-[8px] rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
            <img
              src="./img/increase.svg"
              alt="Growth icon"
              className="w-full h-full"
            />
          </div>
          <h3 className="text-[20px] font-medium mb-[16px] text-gray-800">
            Take your business to the next level
          </h3>
          <p className="text-gray-600 leading-relaxed text-[16px]">
            Use WhatsApp to retain customers while improving customer
            satisfaction. Improve your services based on customer feedback. This
            simple approach enhances communication, trust, and user engagement.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col group p-[24px] rounded-xl bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-[8px] transition-all duration-300"
        >
          <div className="w-[64px] h-[64px] mb-[24px] p-[8px] rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
            <img
              src="./img/automation.svg"
              alt="Automation icon"
              className="w-full h-full"
            />
          </div>
          <h3 className="text-[20px] font-medium mb-[16px] text-gray-800">
            Build a trustworthy business and boost revenue with automation
          </h3>
          <p className="text-gray-600 leading-relaxed text-[16px]">
            By combining automation tools and personal interactions on WhatsApp,
            we help you speed up service, strengthen your brand, and attract
            more clients efficiently.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
