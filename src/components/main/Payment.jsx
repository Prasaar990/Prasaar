import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RazorpayButton from "../layouts/RazorpayButton";

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    corporation: "",
    candidateName: "",
    ward: "",
    mobile: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.corporation.trim()) {
      newErrors.corporation = "Corporation is required";
    }

    if (!formData.candidateName.trim()) {
      newErrors.candidateName = "Candidate name is required";
    }

    if (!formData.ward.trim()) {
      newErrors.ward = "Ward is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbyaUOUwkmTXS43f9m1OHhkWttHKvgElwXZjeFGxWyaxbwl3Lf5tPGUWEyyCBKbUC_YPsw/exec";

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      setShowPayment(true);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("There was an error saving your information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      corporation: "",
      candidateName: "",
      ward: "",
      mobile: "",
    });
    setShowPayment(false);
    setShowSuccessModal(false);
    setErrors({});
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="relative py-12 px-8 bg-gradient-to-r from-red-600 to-red-700">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative text-center">
              <h1 className="text-3xl text-white mb-2">Payment Registration</h1>
              <p className="text-red-100 text-lg">
                Complete your registration to proceed with payment
              </p>
            </div>
          </div>

          <div className="px-8 sm:px-12 lg:px-16 py-12">
            <AnimatePresence mode="wait">
              {!showPayment ? (
                <motion.div
                  key="form"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="corporation"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Corporation <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="corporation"
                        name="corporation"
                        value={formData.corporation}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.corporation
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                        placeholder="Enter corporation name"
                      />
                      {errors.corporation && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.corporation}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="candidateName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Candidate Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="candidateName"
                        name="candidateName"
                        value={formData.candidateName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.candidateName
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                        placeholder="Enter candidate name"
                      />
                      {errors.candidateName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.candidateName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="ward"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Ward <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="ward"
                        name="ward"
                        value={formData.ward}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.ward ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                        placeholder="Enter ward number or name"
                      />
                      {errors.ward && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.ward}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Mobile Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        maxLength="10"
                        className={`w-full px-4 py-3 border ${
                          errors.mobile ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                        placeholder="Enter 10-digit mobile number"
                      />
                      {errors.mobile && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    <motion.button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-3"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Proceed to Payment"
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Registration Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <div className="p-4 bg-white rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">
                          Corporation
                        </p>
                        <p className="font-medium text-gray-900">
                          {formData.corporation}
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">
                          Candidate Name
                        </p>
                        <p className="font-medium text-gray-900">
                          {formData.candidateName}
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Ward</p>
                        <p className="font-medium text-gray-900">
                          {formData.ward}
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Mobile</p>
                        <p className="font-medium text-gray-900">
                          {formData.mobile}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border border-red-100 mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      Complete Your Payment
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Click the button below to proceed with secure payment
                    </p>
                    <div className="flex justify-center">
                      <RazorpayButton
                        formData={formData}
                        onSuccess={() => setShowSuccessModal(true)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-red-600 hover:text-red-700 font-medium underline"
                  >
                    ← Edit Registration Details
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowSuccessModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your registration has been completed successfully. You will
                    receive a confirmation on your mobile number.
                  </p>
                  <button
                    onClick={() => {
                      setShowSuccessModal(false);
                      handleReset();
                    }}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PaymentPage;
