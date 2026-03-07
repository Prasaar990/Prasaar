import { motion } from "framer-motion";
import { MessageCircle, TrendingUp, Bot } from "lucide-react";

export default function Info() {
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

  const cards = [
    {
      icon: <MessageCircle className="w-7 h-7" />,
      title: "Easiest way to connect with business",
      description:
        "Over two billion people use WhatsApp daily, and 69% think it is the easiest way to connect with a business. WhatsApp is a user-friendly platform with real-time messaging features making it an ideal channel for customer engagement, support, and real-time feedback.",
      gradient: "from-rose-50 to-pink-50",
      iconBg: "bg-gradient-to-br from-[#c60240] to-[#a00235]",
      borderHover: "hover:border-[#c60240]/30",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Take your business to the next level",
      description:
        "Use WhatsApp to retain customers while improving customer satisfaction. Improve your services based on customer feedback. This simple approach enhances communication, trust, and user engagement.",
      gradient: "from-blue-50 to-indigo-50",
      iconBg: "bg-gradient-to-br from-[#c60240] to-[#a00235]",
      borderHover: "hover:border-[#c60240]/30",
    },
    {
      icon: <Bot className="w-7 h-7" />,
      title: "Build trust and boost revenue with automation",
      description:
        "By combining automation tools and personal interactions on WhatsApp, we help you speed up service, strengthen your brand, and attract more clients efficiently.",
      gradient: "from-amber-50 to-orange-50",
      iconBg: "bg-gradient-to-br from-[#c60240] to-[#a00235]",
      borderHover: "hover:border-[#c60240]/30",
    },
  ];

  return (
    <div
      className="w-full py-20 lg:py-28 px-5 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-b from-gray-50/80 to-white"
      id="info"
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
          Why Choose Prasaar
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl md:text-4xl font-semibold leading-tight text-gray-900"
        >
          Why{" "}
          <span className="text-[#c60240]">Prasaar?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base md:text-lg text-gray-600 mt-5 leading-relaxed"
        >
          Prasaar has everything you need for customer engagement and service
          using its WhatsApp automation platform. Know how your customers feel
          about your service with WhatsApp-based CSAT surveys and feedback
          tools. Track responses, gather insights and analyze results
          effortlessly.
        </motion.p>
      </div>

      {/* Cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`relative flex flex-col p-7 sm:p-8 rounded-2xl bg-white border border-gray-100 ${card.borderHover} shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group overflow-hidden`}
          >
            {/* Subtle gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

            <div className="relative z-10">
              {/* Icon */}
              <div
                className={`${card.iconBg} text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 leading-snug">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
