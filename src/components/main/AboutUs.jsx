import { useEffect } from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
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
        staggerChildren: 0.15,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const facilities = [
    {
      title: "User Lists and Search Facility",
      description:
        "Advanced search algorithms and comprehensive database management enable efficient user discovery and data retrieval, supporting large-scale voter information processing.",
      icon: "🔍",
    },
    {
      title: "User Registration Form",
      description:
        "Streamlined digital registration system with automated validation, secure data capture, and seamless integration with existing voter databases.",
      icon: "📝",
    },
    {
      title: "User Slip Share",
      description:
        "Secure document sharing infrastructure with encryption protocols, version control, and audit trails for voter information and certification slips.",
      icon: "📋",
    },
    {
      title: "Dashboards and Reports",
      description:
        "Real-time analytics platform featuring customizable dashboards, advanced reporting capabilities, and data visualization tools for informed decision-making.",
      icon: "📊",
    },
    {
      title: "Social Media Content",
      description:
        "Integrated content management system for multi-platform social media distribution, engagement tracking, and targeted voter outreach campaigns.",
      icon: "📱",
    },
  ];

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 ">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Header Section */}
          <div className="relative py-12 px-8 bg-gradient-to-r from-red-600 to-red-700">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative">
              <h1 className="text-3xl  text-white mb-2">About Prasaar</h1>
              <p className="text-red-100 text-lg">
                Empowering Democratic Participation Through Technology
              </p>
            </div>
          </div>

          <div className="px-8 sm:px-12 lg:px-16 py-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-12"
            >
              {/* Company Overview */}
              <motion.section variants={itemVariants}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-3xl  text-gray-900 mb-6 flex items-center">
                      <div className="w-1 h-8 bg-red-600 mr-4 rounded-full"></div>
                      Company Overview
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-xl text-gray-700 leading-relaxed mb-6">
                        Prasaar App serves as a comprehensive digital platform
                        designed to revolutionize voter engagement and
                        information accessibility across India. Our mission
                        centers on creating a unified ecosystem where citizens
                        can access essential electoral services through a
                        single, intuitive interface.
                      </p>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Built on cutting-edge technology infrastructure, we
                        bridge the gap between traditional governance and modern
                        digital expectations, ensuring every Indian citizen has
                        equal access to democratic participation tools and
                        resources.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Core Services */}
              <motion.section variants={itemVariants}>
                <h2 className="text-3xl  text-gray-900 mb-8 flex items-center">
                  <div className="w-1 h-8 bg-red-600 mr-4 rounded-full"></div>
                  Core Services & Capabilities
                </h2>
                <motion.div
                  variants={listVariants}
                  className="grid gap-8 lg:grid-cols-2"
                >
                  {facilities.map((facility, index) => (
                    <motion.div
                      key={index}
                      variants={listItemVariants}
                      className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center group-hover:from-red-200 group-hover:to-red-100 transition-colors duration-300">
                            <span className="text-3xl">{facility.icon}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl  text-gray-900 mb-3 group-hover:text-red-700 transition-colors duration-300">
                            {facility.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {facility.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              {/* Key Differentiators */}
              <motion.section variants={itemVariants}>
                <h2 className="text-3xl  text-gray-900 mb-8 flex items-center">
                  <div className="w-1 h-8 bg-red-600 mr-4 rounded-full"></div>
                  Key Differentiators
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Unified Platform",
                      desc: "Single point access to all voter services",
                      icon: "🏛️",
                    },
                    {
                      title: "Enterprise Security",
                      desc: "Bank-grade encryption and data protection",
                      icon: "🔒",
                    },
                    {
                      title: "Scalable Architecture",
                      desc: "Built to handle millions of concurrent users",
                      icon: "⚡",
                    },
                    {
                      title: "24/7 Support",
                      desc: "Round-the-clock technical assistance",
                      icon: "🛠️",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={listItemVariants}
                      className="text-center p-6 bg-white rounded-lg border border-gray-200 hover:border-red-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h4 className=" text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Vision & Impact */}
              <motion.section variants={itemVariants}>
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
                  <h2 className="text-3xl  text-gray-900 mb-6 flex items-center">
                    <div className="w-1 h-8 bg-red-600 mr-4 rounded-full"></div>
                    Vision & Impact
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-red-700 mb-4">
                        Our Vision
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        To establish India as a global leader in digital
                        democracy, where technology seamlessly integrates with
                        civic processes to create transparent, accessible, and
                        efficient electoral systems for all citizens.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-red-700 mb-4">
                        Measurable Impact
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">
                            Enhanced voter accessibility across rural and urban
                            areas
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">
                            Reduced processing time for voter services by 70%
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">
                            Improved data accuracy and security compliance
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="bg-gray-900 px-8 sm:px-12 lg:px-16 py-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-white mb-4 md:mb-0">
                <h3 className="text-lg font-semibold">Prasaar Technologies</h3>
                <p className="text-gray-300 text-sm">
                  Email: contact@prasaar.co
                </p>
                <motion.li
                  variants={listItemVariants}
                  className="flex items-start p-0 m-0"
                >
                  <span className=" text-gray-300 text-sm">
                    <span>Phone:</span>{" "}
                    <a
                      href="tel:+919226333789"
                      className="hover:opacity-80 underline text-sm"
                      style={{ color: "#c60440" }}
                    >
                      +91 92263 33789
                    </a>
                  </span>
                </motion.li>
              </div>
              <div className="text-gray-300 text-sm">
                Proudly Serving Indian Democracy Since 2024
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
