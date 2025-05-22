import { motion } from "framer-motion";
import Button from "../layouts/Button";

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
        className="w-full max-w-md rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-90 hover:opacity-100"
      />
    </motion.div>
  );

  const contentRight = (
    <motion.div
      initial={{ x: "10%", opacity: 0 }}
      whileInView={{ x: "0%", opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full lg:w-1/2 flex gap-6 flex-col items-start"
    >
      <div className="space-y-3">
        <h2 className="font-semibold text-2xl md:text-3xl text-gray-800">
          {title}
        </h2>
        <div className="text-gray-600 text-lg md:text-xl">{children}</div>
      </div>

      <motion.ul
        className="list-none space-y-4 my-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {list.map((item, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="flex items-start gap-3 text-base md:text-lg"
          >
            <div className="bg_primary rounded-full p-1 mt-1 flex-shrink-0 shadow-md">
              <svg
                className="w-4 h-4 text-white"
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
          to="https://api.whatsapp.com/send/?phone=919356093930&text&type=phone_number&app_absent=0"
        />
      </motion.div>
    </motion.div>
  );

  return (
    <section className="w-full py-8">
      {side !== "rowReverse" ? (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-24 items-center">
          {contentLeft}
          {contentRight}
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 xl:gap-24 items-center">
          {contentLeft}
          {contentRight}
        </div>
      )}
    </section>
  );
}
