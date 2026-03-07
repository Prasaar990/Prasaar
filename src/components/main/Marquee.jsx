import { useState } from "react";
import { motion } from "framer-motion";

export default function Customers() {
  const [isHovered, setIsHovered] = useState(false);

  const logos = [
    { src: "/img/customers/HeadstartX-Logo.jpg", alt: "HeadstartX" },
    { src: "/img/customers/paithani.jpg", alt: "Paithani" },
    { src: "/img/customers/purologo.png", alt: "Puro" },
  ];

  const LogoCard = ({ src, alt }) => (
    <div className="flex-shrink-0 h-16 md:h-20 w-44 md:w-52 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center px-4 hover:shadow-md hover:border-[#c60240]/20 transition-all duration-300 transform hover:scale-105">
      <img
        src={src}
        alt={alt}
        className="max-h-10 max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );

  return (
    <div className="w-full py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50/80">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10 lg:mb-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c60240]/10 text-[#c60240] text-sm font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c60240] animate-pulse" />
            Our Clients
          </div>
          <h2 className="text-xl md:text-3xl font-semibold text-gray-900">
            <span className="text-[#c60240]">Trusted</span>{" "}
            by organizations that grow fast
          </h2>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            className="flex items-center gap-10 md:gap-14 animate-marquee"
            style={{ animationPlayState: isHovered ? "paused" : "running" }}
          >
            {/* First set */}
            {logos.map((logo, i) => (
              <LogoCard key={`first-${i}`} src={logo.src} alt={logo.alt} />
            ))}
            {/* Duplicate for seamless loop */}
            {logos.map((logo, i) => (
              <LogoCard key={`second-${i}`} src={logo.src} alt={logo.alt} />
            ))}
            {/* Triple for wide screens */}
            {logos.map((logo, i) => (
              <LogoCard key={`third-${i}`} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
