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
        // Store form data in component state instead of localStorage
        const userDetails = {
          fullName: formData.fullName,
          companyEmail: formData.companyEmail,
          companyName: formData.companyName,
          mobile: formData.mobile,
          jobRole: formData.jobRole,
          formType: formData.formType,
          submittedAt: new Date().toISOString(), // Optional: timestamp
        };

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
      className="bg-red-50 border border-red-400 text-red-700 px-[24px] py-[16px] rounded-lg shadow-sm mb-[24px]"
    >
      <h3 className="text-[18px] font-medium text-red-800 mb-[4px]">
        Something went wrong
      </h3>
      <p className="text-red-700 text-[14px]">
        We couldn&apos;t process your submission. Please try again later.
      </p>
    </motion.div>
  );

  return (
    <div
      className="min-h-screen bg-gray-50 px-[16px]"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="max-w-[672px] mx-auto">
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="bg-white shadow-xl overflow-hidden"
          style={{ borderRadius: "16px" }}
        >
          {/* Header with gradient background */}
          <div
            className="bg_primary px-[24px] py-[32px]"
            style={{
              "@media (min-width: 640px)": {
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "48px",
                paddingBottom: "48px",
              },
            }}
          >
            <h1
              className="text-white tracking-tight mb-[8px] font-bold"
              style={{ fontSize: "30px", lineHeight: "36px" }}
            >
              Readiness Score
            </h1>
            <p
              className="text-white text-opacity-90 max-w-[672px]"
              style={{ fontSize: "16px", lineHeight: "24px" }}
            >
              Please fill out your information to get started
            </p>
          </div>

          <div
            className="px-[24px] py-[40px]"
            style={{
              "@media (min-width: 640px)": {
                padding: "48px",
              },
            }}
          >
            {formError && <ErrorMessage />}

            {/* Actual form */}
            <form
              name="readiness-assessment"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-[32px]"
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

              <div
                className="grid grid-cols-1 gap-[32px]"
                style={{
                  "@media (min-width: 640px)": {
                    gridTemplateColumns: "repeat(2, 1fr)",
                  },
                }}
              >
                <motion.div
                  variants={itemVariants}
                  className="relative"
                  style={{
                    "@media (min-width: 640px)": {
                      gridColumn: "span 2",
                    },
                  }}
                >
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="peer w-full border-0 bg-transparent text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
                    style={{
                      borderBottom: "2px solid #d1d5db",
                      paddingTop: "16px",
                      paddingBottom: "8px",
                      paddingLeft: "0",
                      paddingRight: "0",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                    placeholder="Your Name"
                    required
                  />
                  <label
                    htmlFor="fullName"
                    className="absolute left-0 text-gray-600 transition-all peer-placeholder-shown:text-gray-500 peer-focus:text-gray-600"
                    style={{
                      top: "-4px",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
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
                    className="peer w-full border-0 bg-transparent text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
                    style={{
                      borderBottom: "2px solid #d1d5db",
                      paddingTop: "16px",
                      paddingBottom: "8px",
                      paddingLeft: "0",
                      paddingRight: "0",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                    placeholder="Company Email"
                    required
                  />
                  <label
                    htmlFor="companyEmail"
                    className="absolute left-0 text-gray-600 transition-all peer-placeholder-shown:text-gray-500 peer-focus:text-gray-600"
                    style={{
                      top: "-4px",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
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
                    className="peer w-full border-0 bg-transparent text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
                    style={{
                      borderBottom: "2px solid #d1d5db",
                      paddingTop: "16px",
                      paddingBottom: "8px",
                      paddingLeft: "0",
                      paddingRight: "0",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                    placeholder="Company Name"
                    required
                  />
                  <label
                    htmlFor="companyName"
                    className="absolute left-0 text-gray-600 transition-all peer-placeholder-shown:text-gray-500 peer-focus:text-gray-600"
                    style={{
                      top: "-4px",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
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
                    className="peer w-full border-0 bg-transparent text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
                    style={{
                      borderBottom: "2px solid #d1d5db",
                      paddingTop: "16px",
                      paddingBottom: "8px",
                      paddingLeft: "0",
                      paddingRight: "0",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                    placeholder="Mobile"
                    required
                  />
                  <label
                    htmlFor="mobile"
                    className="absolute left-0 text-gray-600 transition-all peer-placeholder-shown:text-gray-500 peer-focus:text-gray-600"
                    style={{
                      top: "-4px",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                  >
                    Mobile *
                  </label>
                  <p
                    className="text-gray-500"
                    style={{
                      marginTop: "4px",
                      fontSize: "12px",
                      lineHeight: "16px",
                    }}
                  >
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
                    className="peer w-full border-0 bg-transparent text-gray-900 placeholder-transparent focus:border-[#fe6363] focus:outline-none focus:ring-0"
                    style={{
                      borderBottom: "2px solid #d1d5db",
                      paddingTop: "16px",
                      paddingBottom: "8px",
                      paddingLeft: "0",
                      paddingRight: "0",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                    placeholder="Job Role"
                    required
                  />
                  <label
                    htmlFor="jobRole"
                    className="absolute left-0 text-gray-600 transition-all peer-placeholder-shown:text-gray-500 peer-focus:text-gray-600"
                    style={{
                      top: "-4px",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                  >
                    Job Role *
                  </label>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="relative"
                  style={{
                    marginTop: "40px",
                    "@media (min-width: 640px)": {
                      gridColumn: "span 2",
                    },
                  }}
                >
                  <label
                    htmlFor="formType"
                    className="block text-gray-600 font-medium"
                    style={{
                      marginBottom: "8px",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                  >
                    Type *
                  </label>
                  <select
                    id="formType"
                    name="formType"
                    value={formData.formType}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-gray-900 focus:border-[#fe6363] focus:outline-none focus:ring-0 rounded-lg"
                    style={{
                      border: "2px solid #d1d5db",
                      padding: "16px",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="voc">Voice of Customer</option>
                    <option value="voe">Voice of Employee</option>
                  </select>
                </motion.div>
              </div>

              <motion.div
                variants={itemVariants}
                className="pt-[16px]"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg_primary cursor-pointer hover:bg-[#ff4545] text-white font-medium shadow-md transition duration-300 ease-in-out transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#fe6363] focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg"
                  style={{
                    padding: "16px 24px",
                    fontSize: "18px",
                    lineHeight: "28px",
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        style={{
                          marginLeft: "-4px",
                          marginRight: "12px",
                          height: "20px",
                          width: "20px",
                        }}
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
