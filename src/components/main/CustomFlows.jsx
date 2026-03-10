import { motion } from "framer-motion";
import { GitBranch, Route, BarChart3 } from "lucide-react";

export default function CustomFlows() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: <GitBranch className="w-7 h-7" />,
      title: "Flow Builder",
      description:
        "Construct multi-step automations for order updates, support tickets, and promotions using pre-approved templates.",
      gradient: "from-purple-50 to-fuchsia-50",
      iconBg: "bg-gradient-to-br from-[#c60240] to-[#a00235]",
      borderHover: "hover:border-[#c60240]/30",
    },
    {
      icon: <Route className="w-7 h-7" />,
      title: "Smart Routing",
      description:
        "Direct requests to the respective team / department based on intent, ensuring 24/7 availability.",
      gradient: "from-sky-50 to-blue-50",
      iconBg: "bg-gradient-to-br from-[#c60240] to-[#a00235]",
      borderHover: "hover:border-[#c60240]/30",
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: "Analytics Dashboard",
      description:
        "Track engagement metrics, such as response rates and resolution times, to continuously optimize flows continuously.",
      gradient: "from-emerald-50 to-teal-50",
      iconBg: "bg-gradient-to-br from-[#c60240] to-[#a00235]",
      borderHover: "hover:border-[#c60240]/30",
    },
  ];

  return (
    <div
      className="w-full py-20 lg:py-28 px-5 sm:px-6 md:px-8 lg:px-12 bg-white"
      id="custom-flows"
    >
      {/* Header section */}
      <div className="text-center mb-14 lg:mb-20 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c60240]/10 text-[#c60240] text-sm font-medium mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c60240] animate-pulse" />
          Seamless Automation
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl md:text-4xl font-semibold leading-tight text-gray-900"
        >
          Build <span className="text-[#c60240]">Custom Flows</span> Effortlessly
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base md:text-lg text-gray-600 mt-5 leading-relaxed"
        >
          Design no-code conversation flows on Prasaar to handle inquiries, onboard users,
          and nurture leads via WhatsApp. Drag-and-drop tools let you create branching
          logic for personalized responses. Automate greetings, FAQs, and follow-ups to
          reduce response times and boost satisfaction.
        </motion.p>
      </div>

      <div className="mb-12 text-center">
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-semibold text-gray-900"
        >
          Key Features for Superior Service
        </motion.h3>
        <motion.div
          className="h-1 w-16 bg-gradient-to-r from-[#c60240] to-[#a00235] mt-4 mx-auto rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
      </div>

      {/* Grid of features */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`relative flex flex-col p-7 sm:p-8 rounded-2xl bg-white border border-gray-100 ${feature.borderHover} shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group overflow-hidden`}
          >
            {/* Subtle gradient background on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
            />

            <div className="relative z-10">
              {/* Icon */}
              <div
                className={`${feature.iconBg} text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h4 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 leading-snug">
                {feature.title}
              </h4>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
