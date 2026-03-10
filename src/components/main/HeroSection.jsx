import { useEffect, useState } from "react";
import Button from "../layouts/Button";
import ImageCarousel from "../layouts/ImageCarousel";
import PropTypes from "prop-types";

export default function HeroSection({ words, subHeading, title }) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setWordIndex((wordIndex) => {
          if (words.length - 1 == wordIndex) return 0;
          return wordIndex + 1;
        }),
      1800
    );

    return () => clearInterval(interval);
  }, [wordIndex, words]);

  const images = [

    {
      src: "./img/hero_section/whatsapp1.webp",
      alt: "Hero Image 2",
    },
    {
      src: "./img/hero_section/whatsapp2.webp",
      alt: "Hero Image 3",
    },
    {
      src: "./img/hero_section/whatsapp3.webp",
      alt: "Hero Image 4",
    },
    {
      src: "./img/hero_section/whatsapp4.webp",
      alt: "Hero Image 5",
    },
  ];

  return (
    <section className="w-full pt-24 sm:pt-32 lg:pt-36 pb-12 lg:pb-20 px-5 sm:px-6 md:px-8 lg:px-12 flex justify-center items-center flex-col-reverse sm:flex-row gap-8 sm:gap-6 md:gap-12 lg:gap-8 max-w-7xl mx-auto">
      {/* Left section */}
      <div className="lg:w-[60%] sm:w-[60%] flex flex-col gap-5 sm:gap-6 text-center sm:text-left">
        {/* Heading */}
        <div className="flex items-center justify-center sm:justify-start min-h-[80px] lg:min-h-[150px]">
          <div className="text-3xl sm:text-4xl lg:text-[40px] leading-tight font-semibold text-gray-900">
            {title ? (
              <div>{title}</div>
            ) : (
              <>
                <div>WhatsApp Automation for</div>
                <div className="text-[#c60240]">Customer Engagement and Service.</div>
              </>
            )}
          </div>
        </div>

        {/* Subheading */}
        {subHeading && (
          <div className="w-full md:w-[85%]">
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              {subHeading}
            </p>
          </div>
        )}

        {/* Button */}
        <div className="flex gap-3 lg:flex-row md:flex-col md:gap-6 justify-center sm:justify-start mt-2">
          <Button text={"Get Started"} to="/form" />
        </div>
      </div>

      {/* Right section with image */}
      <div className="md:w-[35%] sm:w-[40%] w-full sm:h-[400px] h-[280px] lg:h-[450px] cursor-pointer flex justify-center items-center">
        <ImageCarousel images={images} interval={3000} />
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  subHeading: PropTypes.string,
};
