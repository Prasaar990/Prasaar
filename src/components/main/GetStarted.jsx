import Form from "../layouts/Form";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function GetStarted() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-5 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50/80 to-white flex flex-col justify-center">
      <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        
        {/* Left Side: Text */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Get Started <br className="hidden md:block"/>
            with <span className="text-[#c60240]">Prasaar</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-sm mx-auto md:mx-0">
            Share a few details in the form so we can better help you and your company.
          </p>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end"
        >
          <Form />
        </motion.div>

      </div>
    </div>
  );
}
