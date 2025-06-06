import { motion } from "framer-motion";
import Button from "../layouts/Button";
import PropTypes from "prop-types";

Solution.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  side: PropTypes.string,
  btnText: PropTypes.string,
};

export default function Solution({
  title,
  list,
  img,
  children,
  side = "",
  btnText = "Get Started",
}) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const contentLeft = (
    <motion.div
      initial={{ x: "-10%", opacity: 0 }}
      whileInView={{ x: "0%", opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full lg:w-2/5 my-auto flex items-center justify-center"
    >
      <img
        src={img}
        alt="feature"
        className="w-full max-w-[448px] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-90 hover:opacity-100"
      />
    </motion.div>
  );

  const contentRight = (
    <motion.div
      initial={{ x: "10%", opacity: 0 }}
      whileInView={{ x: "0%", opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full lg:w-1/2 flex gap-[24px] flex-col items-start"
    >
      <div className="space-y-[12px]">
        <h2 className="font-semibold text-[24px] md:text-[30px] text-gray-800">
          {title}
        </h2>
        <div className="text-gray-600 text-[18px] md:text-[20px]">
          {children}
        </div>
      </div>

      <motion.ul
        className="list-none space-y-[16px] my-[24px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {list.map((item, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="flex items-start gap-[12px] text-[16px] md:text-[18px]"
          >
            <div className="bg_primary rounded-full p-[4px] mt-[4px] flex-shrink-0 shadow-md">
              <svg
                className="w-[16px] h-[16px] text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <span className="text-gray-700">{item}</span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button
          text={btnText}
          to="https://api.whatsapp.com/send/?phone=919226333789&text&type=phone_number&app_absent=0"
        />
      </motion.div>
    </motion.div>
  );

  return (
    <section className="w-full py-[32px]">
      {side !== "rowReverse" ? (
        <div className="flex flex-col lg:flex-row gap-[32px] lg:gap-[64px] xl:gap-[96px] items-center">
          {contentLeft}
          {contentRight}
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row-reverse gap-[32px] lg:gap-[64px] xl:gap-[96px] items-center">
          {contentLeft}
          {contentRight}
        </div>
      )}
    </section>
  );
}
