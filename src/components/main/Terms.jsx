import { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, CreditCard, Users, FileCheck, Database, AlertTriangle, Phone, RefreshCw } from "lucide-react";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const Section = ({ icon: Icon, title, children, index }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#c60240]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#c60240]" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="pl-[52px]">{children}</div>
    </motion.div>
  );

  const CheckItem = ({ children }) => (
    <li className="flex items-start gap-3 py-1.5">
      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#c60240]" />
      <span className="text-gray-600 text-sm leading-relaxed">{children}</span>
    </li>
  );

  return (
    <div className="bg-gradient-to-b from-gray-50/80 to-white min-h-screen pt-28 pb-16 px-5 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c60240]/10 text-[#c60240] text-sm font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c60240] animate-pulse" />
            Legal
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
            Terms and <span className="text-[#c60240]">Conditions</span>
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            By using Prasaar&apos;s website and services, you agree to these terms. Please review them carefully.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-0">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-8"
            >
              <Section icon={FileCheck} title="Services" index={0}>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Prasaar provides WhatsApp automation, bulk messaging, AI video personalization, IVR solutions, feedback collection, and complaint management. Services must be used lawfully.
                </p>
              </Section>

              <Section icon={Users} title="Account Responsibilities" index={1}>
                <ul className="space-y-1 list-none">
                  <CheckItem>Users must provide accurate information and maintain account security.</CheckItem>
                  <CheckItem>Spam, fraud, or unauthorized access is strictly prohibited.</CheckItem>
                  <CheckItem>All messaging must comply with TRAI and WhatsApp policies.</CheckItem>
                </ul>
              </Section>

              <Section icon={Shield} title="Compliance Requirements" index={2}>
                <ul className="space-y-1 list-none">
                  <CheckItem>DLT registration is required for SMS campaigns.</CheckItem>
                  <CheckItem>WhatsApp Business API users must comply with Meta&apos;s policies.</CheckItem>
                  <CheckItem>Political campaigns must adhere to election laws.</CheckItem>
                </ul>
              </Section>

              <Section icon={Database} title="Data Security" index={3}>
                <ul className="space-y-1 list-none">
                  <CheckItem>We implement security measures to protect user data but are not responsible for third-party breaches.</CheckItem>
                  <CheckItem>Users must not share or misuse unauthorized data.</CheckItem>
                </ul>
              </Section>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-0">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-8"
            >
              <Section icon={CreditCard} title="Payment and Refunds" index={4}>
                <ul className="space-y-1 list-none">
                  <CheckItem>Some services require payments as per the chosen plan.</CheckItem>
                  <CheckItem>Refunds are only applicable in cases of service failure caused by Prasaar.</CheckItem>
                </ul>
              </Section>

              <Section icon={AlertTriangle} title="Limitation of Liability" index={5}>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Prasaar is not responsible for indirect damages, service interruptions, or losses caused by third-party integrations.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Accounts violating these terms may be suspended or terminated.
                </p>
              </Section>

              <Section icon={RefreshCw} title="Third-Party Integrations" index={6}>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Prasaar integrates with third-party platforms but holds no responsibility for their reliability or issues.
                </p>
              </Section>

              <Section icon={Phone} title="Communication Consent" index={7}>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You consent to receive communications from us by way of e-mails, phone calls, and SMS&apos;s regarding your transactions on our platform. Users must register valid phone numbers and e-mail addresses to enable communication. We may also use your e-mail address to send updates, newsletters, and changes to our services for a better experience.
                </p>
              </Section>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Prasaar reserves the right to update these terms, with major changes being notified to users.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-gray-400">
            Last updated: May 2, 2025 • Prasaar Technologies.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
