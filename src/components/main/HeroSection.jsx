import { useEffect, useState } from "react";
import Button from "../layouts/Button"; // Assuming this is your Tailwind Button component
import { FlipWords } from "../ui/flip-words"; // Keeping this component as is
import ImageCarousel from "../layouts/ImageCarousel";
import PropTypes from "prop-types";

export default function HeroSection({ words, title, subHeading }) {
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

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [wordIndex, words]);

  const images = [
    {
      src: "./img/heroImg.svg",
      alt: "Hero Image 1",
    },
    {
      src: "./img/automation.svg",
      alt: "Hero Image 2",
    },
    {
      src: "./img/ce.svg",
      alt: "Hero Image 3",
    },
    {
      src: "./img/survey.svg",
      alt: "Hero Image 4",
    },
  ];

  return (
    <section className="w-full pt-[80px] mb-[100px] lg:h-full sm:pt-40 lg:px-[50px] md:px-[32px] sm:px-[24px] px-[20px] flex justify-center items-center flex-col-reverse sm:flex-row sm:gap-0 md:gap-[50px]">
      {/* Left section */}
      <div className="lg:w-[65%] sm:w-[67%] flex flex-col gap-[20px] sm:gap-5 text-center sm:text-left">
        {/* Heading with FlipWords */}
        <div className="flex items-center lg:h-[250px] md:h-[100px] h-[100px]">
          <div className="text-[28px] sm:text-[36px] lg:text-[58px]  text-neutral-600 dark:text-neutral-400 font-semibold">
            <div>Increase Revenue and</div>
            <FlipWords words={words} /> <br />
          </div>
        </div>

        {/* Subheading */}
        <div className="w-[100%]  text-[18px] lg:text-[22px] md:w-[80%] sm:w-[90%]">
          <p className="mt-0 sm:mt-8">{subHeading}</p>
        </div>

        {/* Button */}
        <div className="flex gap-2 lg:flex-row md:flex-col md:gap-8 justify-center sm:justify-start">
          <Button text={"VoiceAgent Demo"} to="https://call.prasaar.co/#demo" />
        </div>
      </div>

      {/* Right section with image */}
      <div className="md:w-1/4 w-full sm:h-[450px] h-[300px] cursor-pointer md:flex justify-center items-center">
        <ImageCarousel images={images} interval={3600} />
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  subHeading: PropTypes.string,
};
