import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../layouts/Button";
import PropTypes from "prop-types";
import { Check, X } from "lucide-react";

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
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const contentLeft = (
    <motion.div
      initial={{ x: "-8%", opacity: 0 }}
      whileInView={{ x: "0%", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full lg:w-2/5 my-auto flex items-center justify-center"
    >
      <div className="relative group cursor-pointer" onClick={() => setIsFullscreen(true)}>
        <div className="absolute -inset-2 bg-gradient-to-br from-[#c60240]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        <img
          src={img}
          alt="feature"
          className="relative w-full max-w-md rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl">
          <span className="text-white text-sm font-medium px-4 py-2 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
            Click to view
          </span>
        </div>
      </div>
    </motion.div>
  );

  const contentRight = (
    <motion.div
      initial={{ x: "8%", opacity: 0 }}
      whileInView={{ x: "0%", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full lg:w-1/2 flex gap-5 flex-col items-start"
    >
      <div className="space-y-3">
        <h2 className="font-semibold text-2xl md:text-3xl text-gray-900">
          {title}
        </h2>
        <div className="text-gray-600 text-base md:text-lg leading-relaxed">
          {children}
        </div>
      </div>

      <motion.ul
        className="list-none space-y-3.5 my-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {list.map((item, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="flex items-start gap-3 text-sm md:text-base"
          >
            <div className="bg-gradient-to-br from-[#c60240] to-[#a00235] rounded-full p-1 mt-0.5 flex-shrink-0 shadow-sm">
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </div>
            <span className="text-gray-700 leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </motion.ul>

      {/* <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Button
          text={btnText}
          to="https://api.whatsapp.com/send/?phone=919226333789&text&type=phone_number&app_absent=0"
        />
      </motion.div> */}
    </motion.div>
  );

  return (
    <>
      <section className="w-full py-8">
        <div
          className={`flex flex-col ${side === "rowReverse" ? "lg:flex-row-reverse" : "lg:flex-row"
            } gap-8 lg:gap-16 xl:gap-20 items-center`}
        >
          {contentLeft}
          {contentRight}
        </div>
      </section>

      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsFullscreen(false)}
            onKeyDown={(e) => e.key === "Escape" && setIsFullscreen(false)}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
          >
            <motion.button
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/25 rounded-full p-2.5 transition-colors duration-200 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              aria-label="Close fullscreen image"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.img
              src={img}
              alt={title}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
