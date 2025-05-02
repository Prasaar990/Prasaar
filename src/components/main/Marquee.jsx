import { useState, useEffect } from "react";

export default function Customers() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full py-24 overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
          <span className=" bg-clip-text  text-[#fe6363]">
            Trusted by organizations
          </span>{" "}
          that grow fast
        </h1>

        <div
          className="relative mt-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex items-center space-x-16 md:space-x-24 animate-marquee"
            style={{ animationPlayState: isHovered ? "paused" : "running" }}
          >
            {/* First set of logos */}
            <div className="flex-shrink-0 h-16 md:h-20 w-48 rounded-lg bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-full  rounded flex items-center justify-center">
                <img
                  src="/img/customers/HeadstartX-Logo.jpg"
                  alt="HeadstartX"
                  className="max-h-10 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className="flex-shrink-0 h-16 md:h-20 w-48 rounded-lg bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-full  rounded flex items-center justify-center">
                <img
                  src="/img/customers/paithani.jpg"
                  alt="Paithani"
                  className="max-h-10 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className="flex-shrink-0 h-16 md:h-20 w-48 rounded-lg bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-full  rounded flex items-center justify-center">
                <img
                  src="/img/customers/purologo.png"
                  alt="Puro"
                  className="max-h-10 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Duplicate the logos for seamless looping */}
            <div className="flex-shrink-0 h-16 md:h-20 w-48 rounded-lg bg-white shadow-md flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-full  rounded flex items-center justify-center">
                <img
                  src="/img/customers/HeadstartX-Logo.jpg"
                  alt="HeadstartX"
                  className="max-h-10 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className="flex-shrink-0 h-16 md:h-20 w-48 rounded-lg bg-white shadow-md flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-full  rounded flex items-center justify-center">
                <img
                  src="/img/customers/paithani.jpg"
                  alt="Paithani"
                  className="max-h-10 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className="flex-shrink-0 h-16 md:h-20 w-48 rounded-lg bg-white shadow-md flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-full  rounded flex items-center justify-center">
                <img
                  src="/img/customers/purologo.png"
                  alt="Puro"
                  className="max-h-10 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
