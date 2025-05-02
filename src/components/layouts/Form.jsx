import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  // Form validation state
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
    message: "",
  });

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission would be handled here
    console.log("Form submitted:", formState);
    // Reset form after submission
    setFormState({
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      company: "",
      message: "",
    });
  };

  return (
    <div className="py-16 md:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-2">
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="px-6 py-8 sm:p-10">
            <div className="space-y-6">
              {/* Email field */}
              <motion.div variants={itemVariants} className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder="Email address"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-1 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-1 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email address
                </label>
              </motion.div>

              {/* First name and Last name (grid) */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <motion.div variants={itemVariants} className="relative">
                  <input
                    type="text"
                    name="firstName"
                    id="first_name"
                    value={formState.firstName}
                    onChange={handleInputChange}
                    className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder="First name"
                    required
                  />
                  <label
                    htmlFor="first_name"
                    className="absolute left-0 -top-1 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-1 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    First name
                  </label>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <input
                    type="text"
                    name="lastName"
                    id="last_name"
                    value={formState.lastName}
                    onChange={handleInputChange}
                    className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder="Last name"
                    required
                  />
                  <label
                    htmlFor="last_name"
                    className="absolute left-0 -top-1 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-1 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Last name
                  </label>
                </motion.div>
              </div>

              {/* Phone field */}
              <motion.div variants={itemVariants} className="relative">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder="Phone number"
                  pattern="[0-9]{10}"
                  required
                />
                <label
                  htmlFor="phone"
                  className="absolute left-0 -top-1 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-1 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Phone number (10 digits)
                </label>
              </motion.div>

              {/* Company field */}
              <motion.div variants={itemVariants} className="relative">
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formState.company}
                  onChange={handleInputChange}
                  className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder="Company"
                  required
                />
                <label
                  htmlFor="company"
                  className="absolute left-0 -top-1 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-1 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Company
                </label>
              </motion.div>

              {/* Message textarea (new field) */}
              <motion.div variants={itemVariants} className="relative mt-8">
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formState.message}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-300 rounded-md bg-transparent p-3 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder="Your message (optional)"
                ></textarea>
              </motion.div>

              {/* Submit button */}
              <motion.div
                variants={itemVariants}
                className="pt-4"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#fe6363] cursor-pointer hover:bg-[#ff5757ec] text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Submit
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
