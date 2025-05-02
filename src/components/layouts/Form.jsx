import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  // Form states
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

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
    setIsSubmitting(true);

    // For Netlify forms to work, the form must be submitted with a normal browser form submission
    // The code below ensures that we show a success message after submitting
    try {
      setFormSubmitted(true);
      setFormState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success message component
  const SuccessMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
    >
      <p className="text-center">
        Thanks for contacting us! We'll get back to you soon.
      </p>
    </motion.div>
  );

  // Error message component
  const ErrorMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
    >
      <p className="text-center">
        Something went wrong. Please try again later.
      </p>
    </motion.div>
  );

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
            {formSubmitted && <SuccessMessage />}
            {formError && <ErrorMessage />}

            {!formSubmitted && (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Netlify required hidden fields */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <input name="bot-field" />
                </div>

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
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#fe6363] cursor-pointer hover:bg-[#ff5757ec] text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </motion.div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
