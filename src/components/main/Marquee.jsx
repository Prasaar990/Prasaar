import { useState } from "react";

export default function Customers() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full py-[96px] overflow-hidden bg-gradient-to-r from-gray-50  to-gray-100">
      <div className="container mx-auto px-[16px]">
        <h1 className="text-[16px] md:text-[28px] font-medium text-center mb-[64px] text-gray-800">
          <span className=" bg-clip-text primaryColor">
            Trusted by organizations
          </span>{" "}
          that grow fast
        </h1>

        <div
          className="relative mt-[40px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex items-center space-x-[64px] md:space-x-[96px] animate-marquee"
            style={{ animationPlayState: isHovered ? "paused" : "running" }}
          >
            {/* First set of logos */}
            <div className="flex-shrink-0 h-[64px] md:h-[80px] w-[192px] rounded-lg bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-full  rounded flex items-center justify-center">
                <img
                  src="/img/customers/HeadstartX-Logo.jpg"
                  alt="HeadstartX"
                  className="max-h-[40px] opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className="flex-shrink-0 h-[64px] md:h-[80px] w-[192px] rounded-lg bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-full  rounded flex items-center justify-center">
                <img
                  src="/img/customers/paithani.jpg"
                  alt="Paithani"
                  className="max-h-[40px] opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className="flex-shrink-0 h-[64px] md:h-[80px] w-[192px] rounded-lg bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-full  rounded flex items-center justify-center">
                <img
                  src="/img/customers/purologo.png"
                  alt="Puro"
                  className="max-h-[40px] opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Duplicate the logos for seamless looping */}
            <div className="flex-shrink-0 h-[64px] md:h-[80px] w-[192px] rounded-lg bg-white shadow-md flex items-center justify-center p-[16px] hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-full  rounded flex items-center justify-center">
                <img
                  src="/img/customers/HeadstartX-Logo.jpg"
                  alt="HeadstartX"
                  className="max-h-[40px] opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className="flex-shrink-0 h-[64px] md:h-[80px] w-[192px] rounded-lg bg-white shadow-md flex items-center justify-center p-[16px] hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-full  rounded flex items-center justify-center">
                <img
                  src="/img/customers/paithani.jpg"
                  alt="Paithani"
                  className="max-h-[40px] opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className="flex-shrink-0 h-[64px] md:h-[80px] w-[192px] rounded-lg bg-white shadow-md flex items-center justify-center p-[16px] hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-full  rounded flex items-center justify-center">
                <img
                  src="/img/customers/purologo.png"
                  alt="Puro"
                  className="max-h-[40px] opacity-90 hover:opacity-100 transition-opacity"
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
