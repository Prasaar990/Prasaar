import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Route, BarChart3, ChevronRight } from "lucide-react";

export default function CustomFlows() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Flow Builder",
      description:
        "Construct multi-step automations for order updates, support tickets, and promotions using pre-approved templates.",
      image: "./img/complaint_flow.jpeg",
      iconBg: "bg-fuchsia-100/80 text-fuchsia-600",
      activeBg: "bg-gradient-to-r from-fuchsia-50 to-white",
      activeBorder: "border-fuchsia-200",
    },
    {
      icon: <Route className="w-6 h-6" />,
      title: "Smart Routing",
      description:
        "Direct requests to the respective team / department based on intent, ensuring 24/7 availability.",
      image: "./img/complaint.jpeg",
      iconBg: "bg-blue-100/80 text-blue-600",
      activeBg: "bg-gradient-to-r from-blue-50 to-white",
      activeBorder: "border-blue-200",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description:
        "Track engagement metrics, such as response rates and resolution times, to continuously optimize flows continuously.",
      image: "./img/complaint.jpeg",
      iconBg: "bg-emerald-100/80 text-emerald-600",
      activeBg: "bg-gradient-to-r from-emerald-50 to-white",
      activeBorder: "border-emerald-200",
    },
  ];

  return (
    <div
      className="w-full py-20 lg:py-28 px-5 sm:px-6 md:px-8 lg:px-12 bg-gray-50/50"
      id="custom-flows"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
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
            className="text-3xl md:text-4xl font-semibold leading-tight text-gray-900"
          >
            Build <span className="text-[#c60240]">Custom Flows</span> Effortlessly
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base md:text-lg text-gray-600 mt-6 leading-relaxed"
          >
            Design no-code conversation flows on Prasaar to handle inquiries, onboard users,
            and nurture leads via WhatsApp. Drag-and-drop tools let you create branching
            logic for personalized responses. Automate greetings, FAQs, and follow-ups to
            reduce response times and boost satisfaction.
          </motion.p>
        </div>

        {/* Interactive Side-by-Side Section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left Side: Features List */}
          <div className="w-full lg:w-5/12 space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 pl-2">
              Key Features for Superior Service
            </h3>
            {features.map((feature, index) => {
              const isActive = activeFeature === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => setActiveFeature(index)}
                  className={`relative p-6 rounded-2xl cursor-pointer border-2 transition-all duration-300 ${isActive
                    ? `${feature.activeBorder} ${feature.activeBg} shadow-md`
                    : "border-transparent bg-transparent hover:bg-white hover:shadow-sm"
                    }`}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${isActive
                        ? "bg-[#c60240] text-white shadow-lg shadow-[#c60240]/25"
                        : feature.iconBg
                        }`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`text-xl font-semibold mb-2 transition-colors duration-300 ${isActive ? "text-[#c60240]" : "text-gray-900"
                          }`}
                      >
                        {feature.title}
                      </h4>
                      <p
                        className={`text-base leading-relaxed transition-colors duration-300 ${isActive ? "text-gray-900" : "text-gray-500"
                          }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 mt-1 transition-all duration-300 ${isActive
                        ? "opacity-100 text-[#c60240] translate-x-0"
                        : "opacity-0 -translate-x-4"
                        }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side: Image Display Container */}
          <div className="w-full lg:w-7/12 relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c60240]/5 to-transparent rounded-3xl transform rotate-2 scale-105" />
            <div className="absolute inset-0 bg-white border border-gray-100 shadow-2xl rounded-3xl" />

            <div className="relative pt-[62.5%] overflow-hidden rounded-3xl bg-gray-50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 p-4 sm:p-6"
                >
                  <div className="w-full h-full relative rounded-xl overflow-hidden border border-gray-200 shadow-inner bg-white">
                    <img
                      src={features[activeFeature].image}
                      alt={features[activeFeature].title}
                      className="w-full h-full object-cover sm:object-contain object-top"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Simple Browser Chrome / Mockup Header */}
            <div className="absolute top-0 left-0 right-0 h-10 sm:h-12 border-b border-gray-100 flex items-center px-4 sm:px-6 z-10 rounded-t-3xl backdrop-blur-sm bg-white/60">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
              </div>
              <div className="mx-auto flex-1 flex justify-center mt-1">
                <div className="h-4 sm:h-5 w-32 sm:w-48 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-gray-400 font-medium">app.prasaar.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
