import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function InitialForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    companyEmail: "",
    companyName: "",
    mobile: "",
    jobRole: "",
    formType: "", // voc or voe
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(false);

    try {
      // Create FormData from form element for proper Netlify submission
      const formDataForSubmission = new FormData(e.target);

      // Add the form-name field that Netlify requires
      formDataForSubmission.append("form-name", "readiness-assessment");

      // Netlify form submission
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formDataForSubmission).toString(),
      });

      if (response.ok) {
        // Store form data to localStorage after successful submission
        const userDetails = {
          fullName: formData.fullName,
          companyEmail: formData.companyEmail,
          companyName: formData.companyName,
          mobile: formData.mobile,
          jobRole: formData.jobRole,
          formType: formData.formType,
          submittedAt: new Date().toISOString(), // Optional: timestamp
        };

        localStorage.setItem(
          "userAssessmentDetails",
          JSON.stringify(userDetails)
        );

        // Navigate based on form type selection
        if (formData.formType === "voc") {
          navigate("/voc");
        } else if (formData.formType === "voe") {
          navigate("/voe");
        }
      } else {
        setFormError(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-[#fe6363] to-[#ff4545] px-6 py-8 sm:px-10 sm:py-12">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Readiness Assessment
            </h1>
            <p className="text-white text-opacity-90 max-w-2xl">
              Please fill out your information to get started with your
              assessment
            </p>
          </div>

          <div className="px-6 py-10 sm:p-12">
            {formError && <ErrorMessage />}

            {/* Actual form */}
            <form
              name="readiness-assessment"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Netlify required hidden fields */}
              <input
                type="hidden"
                name="form-name"
                value="readiness-assessment"
              />
              <div hidden>
                <input name="bot-field" />
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <motion.div
                  variants={itemVariants}
                  className="sm:col-span-2 relative"
                >
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
                    placeholder="Your Name"
                    required
                  />
                  <label
                    htmlFor="fullName"
                    className="absolute left-0 -top-1 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-1 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Your Name *
                  </label>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <input
                    type="email"
                    id="companyEmail"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
                    placeholder="Company Email"
                    required
                  />
                  <label
                    htmlFor="companyEmail"
                    className="absolute left-0 -top-1 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-1 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Company Email *
                  </label>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
                    placeholder="Company Name"
                    required
                  />
                  <label
                    htmlFor="companyName"
                    className="absolute left-0 -top-1 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-1 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Company Name *
                  </label>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
                    placeholder="Mobile"
                    required
                  />
                  <label
                    htmlFor="mobile"
                    className="absolute left-0 -top-1 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-1 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Mobile *
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    Format: 123-456-7890
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <input
                    type="text"
                    id="jobRole"
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleInputChange}
                    className="peer w-full border-0 border-b-2 border-gray-300 bg-transparent pt-4 pb-2 px-0 text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
                    placeholder="Job Role"
                    required
                  />
                  <label
                    htmlFor="jobRole"
                    className="absolute left-0 -top-1 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-1 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Job Role *
                  </label>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="sm:col-span-2 relative mt-10"
                >
                  <label
                    htmlFor="formType"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Assessment Type *
                  </label>
                  <select
                    id="formType"
                    name="formType"
                    value={formData.formType}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg bg-transparent p-4 text-gray-900 focus:border-[#fe6363] focus:outline-none focus:ring-0"
                    required
                  >
                    <option value="">Select Assessment Type</option>
                    <option value="voc">Voice of Customer</option>
                    <option value="voe">Voice of Employee</option>
                  </select>
                </motion.div>
              </div>

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
                    "Start Assessment"
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
