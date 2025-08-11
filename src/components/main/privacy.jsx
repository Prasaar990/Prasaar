import { useEffect } from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="py-6 px-8" style={{ backgroundColor: "#c60440" }}>
          <h1 className="text-3xl  text-white">Privacy Policy</h1>
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
            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#c60440" }}
              >
                Introduction
              </h2>
              <p className="text-lg text-gray-700">
                Prasaar.co (&quot;us&quot;, &quot;we&quot; or &quot;our&quot;)
                built the Prasaar App (&quot;the Service&quot;) as a user
                management app. This policy explains how we collect, use, and
                protect your information.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-xl font-semibold text- mb-4">Definitions</h2>
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
                    <strong>We, Us, Our:</strong> Refers to Prasaar App.
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
                    <strong>You, Your, Yourself:</strong> Refers to users of the
                    app.
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
                    <strong>Platform:</strong> The services provided by Prasaar
                    App.
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#c60440" }}
              >
                Information Collection and Use
              </h2>
              <p className="text-lg text-gray-700">
                We collect information you provide, such as your name, email
                address, phone number, OTP, comments, and any other information
                you provide. This information is used to enhance your experience
                and provide the Service.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#c60440" }}
              >
                Log Data
              </h2>
              <p className="text-lg text-gray-700">
                When you use the platform, our servers automatically record log
                data, including your IP address, browser type, device
                information, and usage data. This information helps us improve
                the Service and understand user behavior.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#c60440" }}
              >
                Cookies
              </h2>
              <p className="text-lg text-gray-700">
                Cookies are small files stored on your device that help us
                enhance your experience. We use both session and persistent
                cookies to track your activity on our platform. You can choose
                to accept or refuse cookies.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#c60440" }}
              >
                Third-Party Services
              </h2>
              <p className="text-lg text-gray-700">
                We may employ third-party companies and individuals to
                facilitate our Service, provide the Service on our behalf,
                perform Service-related tasks, or assist us in analyzing how our
                Service is used. These third parties have access to your
                Personal Information only to perform these tasks and are
                obligated not to disclose or use it for any other purpose.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#c60440" }}
              >
                Security
              </h2>
              <p className="text-lg text-gray-700">
                We value your trust in providing us your Personal Information
                and use commercially acceptable means to protect it. However, no
                method of transmission over the internet or electronic storage
                is 100% secure, and we cannot guarantee absolute security.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#c60440" }}
              >
                Links to Other Sites
              </h2>
              <p className="text-lg text-gray-700">
                Our Service may contain links to other sites not operated by us.
                If you click on a third-party link, you will be directed to that
                site. We strongly advise you to review the Privacy Policy of
                these websites. We have no control over and assume no
                responsibility for the content, privacy policies, or practices
                of any third-party sites or services.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#c60440" }}
              >
                Children&apos;s Privacy
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
                    These Services do not address anyone under the age of 13.
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
                    We do not knowingly collect personally identifiable
                    information from children under 13.
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
                    If we discover that a child under 13 has provided us with
                    personal information, we will delete it immediately.
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#c60440" }}
              >
                Changes to This Policy
              </h2>
              <p className="text-lg text-gray-700">
                We may update our Privacy Policy periodically. Changes will be
                posted on this page and are effective when posted.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#c60440" }}
              >
                Contact Us
              </h2>
              <p className="text-lg text-gray-700">
                If you have any questions or suggestions about our Privacy
                Policy, do not hesitate to contact us at{" "}
                <a
                  href="mailto:contact@prasaar.co"
                  className="hover:opacity-80 underline"
                  style={{ color: "#c60440" }}
                >
                  contact@prasaar.co
                </a>
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#c60440" }}
              >
                Governing Law
              </h2>
              <p className="text-lg text-gray-700">
                This Policy shall be governed by and construed in accordance
                with the laws of India. The courts at Pune, India shall have
                exclusive jurisdiction in relation to any disputes arising out
                of or in connection with this Policy.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#c60440" }}
              >
                Intellectual Property
              </h2>
              <p className="text-lg text-gray-700">
                The logo and name of the platform are registered under the
                Trademark Act, 1999, and have proprietary rights under the
                Copyright Act, 1957. Any infringement may result in legal
                action.
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

export default PrivacyPolicy;
