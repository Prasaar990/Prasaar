import { useEffect } from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
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
    <div className=" min-h-screen py-24 px-4 sm:px-6 lg:px-8 pt-36">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="py-6 px-8" style={{ backgroundColor: "#c60440" }}>
          <h1 className="text-3xl text-white">Contact Us</h1>
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
                Get in Touch
              </h2>
              <p className="text-lg text-gray-700">
                We’d love to hear from you. Reach out to us using any of the
                contact methods below.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#c60440" }}
              >
                Contact Information
              </h2>
              <motion.ul
                variants={listVariants}
                className="space-y-4 list-none pl-0"
              >
                <motion.li
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="h-full w-full bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-sm font-bold">
                        ✉
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:contact@prasaar.co"
                      className="hover:opacity-80 underline"
                      style={{ color: "#c60440" }}
                    >
                      contact@prasaar.co
                    </a>
                  </span>
                </motion.li>

                <motion.li
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="h-full w-full bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-sm font-bold">
                        📍
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    <strong>Address:</strong> Office 615, Fortuna Business
                    Center, Pimple Saudagar, Pune - 411025
                  </span>
                </motion.li>

                <motion.li
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <div className="h-full w-full bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-sm font-bold">
                        📞
                      </span>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    <strong>Phone:</strong>{" "}
                    <a
                      href="tel:+919226333789"
                      className="hover:opacity-80 underline"
                      style={{ color: "#c60440" }}
                    >
                      +91 92263 33789
                    </a>
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-10 pt-6 border-t border-gray-200 text-center"
          >
            <p className="text-sm text-gray-500">Prasaar Technologies.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
