import { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // This is the key to making Netlify forms work with React
      // We need to encode the form data correctly for Netlify
      const formData = new FormData(e.target);

      // Add form-name field which Netlify requires
      formData.append("form-name", "contact");

      // Send the form data to Netlify
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      // Handle success
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
      className="bg-green-50 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-sm mb-6"
    >
      <h3 className="text-lg font-medium text-green-800 mb-1">Thank you!</h3>
      <p className="text-green-700">
        Your message has been received. We&apos;ll get back to you soon.
      </p>
    </motion.div>
  );

  // Error message component
  const ErrorMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-sm mb-6"
    >
      <h3 className="text-lg font-medium text-red-800 mb-1">
        Something went wrong
      </h3>
      <p className="text-red-700">
        We couldn&apos;t process your submission. Please try again later.
      </p>
    </motion.div>
  );

  return (
    <div className="py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Form header */}
          <div className="bg-gradient-to-r from-[#fe6363] to-[#ff4545] px-6 py-8 sm:px-10 sm:py-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Contact Us
            </h2>
            <p className="mt-2 text-white text-opacity-90 max-w-2xl">
              Have questions or want to learn more? Fill out the form below and
              our team will get back to you shortly.
            </p>
          </div>

          <div className="px-6 py-10 sm:p-12">
            {formSubmitted && <SuccessMessage />}
            {formError && <ErrorMessage />}

            {!formSubmitted && (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-8"
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
                    className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
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
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <motion.div variants={itemVariants} className="relative">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formState.firstName}
                      onChange={handleInputChange}
                      className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
                      placeholder="First name"
                      required
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-0 -top-1 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-1 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      First name
                    </label>
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formState.lastName}
                      onChange={handleInputChange}
                      className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
                      placeholder="Last name"
                      required
                    />
                    <label
                      htmlFor="lastName"
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
                    className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
                    placeholder="Phone number"
                    required
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 -top-1 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-1 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Phone number
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    Format: 123-456-7890
                  </p>
                </motion.div>

                {/* Company field */}
                <motion.div variants={itemVariants} className="relative">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formState.company}
                    onChange={handleInputChange}
                    className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
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

                {/* Message textarea */}
                <motion.div variants={itemVariants} className="relative mt-10">
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    value={formState.message}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg bg-transparent p-4 text-gray-900 focus:border-[#fe6363] focus:outline-none focus:ring-0 resize-none"
                    placeholder="Your message (optional)"
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Your message (optional)
                  </label>
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
                    className="w-full bg-[#fe6363] cursor-pointer hover:bg-[#ff4545] text-white font-medium py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#fe6363] focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Send Message"
                    )}
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
