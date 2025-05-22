import React, { useEffect } from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="bg_primary py-6 px-8">
          <h1 className="text-3xl font-bold text-white">
            Terms and Conditions
          </h1>
        </div>

        <motion.div
          className="p-6 sm:p-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="prose prose-lg max-w-none"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-8 text-gray-700">
              <p className="text-lg">
                By using Prasaar&apos;s website and services, you agree to these
                terms.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8 text-gray-700">
              <p className="text-lg">
                Prasaar provides WhatsApp automation, bulk messaging, AI video
                personalization, IVR solutions, feedback collection, and
                complaint management. Services must be used lawfully.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-xl font-semibold primaryColor mb-4">
                Account Responsibilities
              </h2>
              <motion.ul
                variants={listVariants}
                className="space-y-3 list-none pl-0"
              >
                <motion.li
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="h-full w-full bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-sm font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    Users must provide accurate information and maintain account
                    security.
                  </span>
                </motion.li>
                <motion.li
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="h-full w-full bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-sm font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    Spam, fraud, or unauthorized access is strictly prohibited.
                  </span>
                </motion.li>
                <motion.li
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="h-full w-full bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-sm font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    All messaging must comply with TRAI and WhatsApp policies.
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-xl font-semibold primaryColor mb-4">
                Compliance Requirements
              </h2>
              <motion.ul
                variants={listVariants}
                className="space-y-3 list-none pl-0"
              >
                <motion.li
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="h-full w-full bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-sm font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    DLT registration is required for SMS campaigns.
                  </span>
                </motion.li>
                <motion.li
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="h-full w-full bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-sm font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    WhatsApp Business API users must comply with Meta's
                    policies.
                  </span>
                </motion.li>
                <motion.li
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="h-full w-full bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-sm font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    Political campaigns must adhere to election laws.
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-xl font-semibold primaryColor mb-4">
                Data Security
              </h2>
              <motion.ul
                variants={listVariants}
                className="space-y-3 list-none pl-0"
              >
                <motion.li
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="h-full w-full bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-sm font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    We implement security measures to protect user data but are
                    not responsible for third-party breaches.
                  </span>
                </motion.li>
                <motion.li
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="h-full w-full bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-sm font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    Users must not share or misuse unauthorized data.
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-xl font-semibold primaryColor mb-4">
                Payment and Refunds
              </h2>
              <motion.ul
                variants={listVariants}
                className="space-y-3 list-none pl-0"
              >
                <motion.li
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="h-full w-full bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-sm font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    Some services require payments as per the chosen plan.
                  </span>
                </motion.li>
                <motion.li
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="h-full w-full bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-sm font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    Refunds are only applicable in cases of service failure
                    caused by Prasaar.
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8 text-gray-700">
              <p className="text-lg">
                Prasaar is not responsible for indirect damages, service
                interruptions, or losses caused by third-party integrations.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8 text-gray-700">
              <p className="text-lg">
                Accounts violating these terms may be suspended or terminated.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8 text-gray-700">
              <p className="text-lg">
                Prasaar integrates with third-party platforms but holds no
                responsibility for their reliability or issues.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8 text-gray-700">
              <p className="text-lg">
                You consent to receive communications from us by way of e-mails,
                phone calls, and SMS's regarding your transactions on our
                platform. Users must register valid phone numbers and e-mail
                addresses to enable communication. We may also use your e-mail
                address to send updates, newsletters, and changes to our
                services for a better experience.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8 text-gray-700">
              <p className="text-lg">
                Prasaar reserves the right to update these terms, with major
                changes being notified to users.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-10 pt-6 border-t border-gray-200 text-center"
          >
            <p className="text-sm text-gray-500">
              Last updated: May 2, 2025 • Prasaar Technologies.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsAndConditions;
