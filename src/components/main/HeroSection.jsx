import { useEffect, useState } from "react";
import Button from "../layouts/Button"; // Assuming this is your Tailwind Button component
import { FlipWords } from "../ui/flip-words"; // Keeping this component as is

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

  return (
    <section className="w-full h-[600px] pt-[100px] lg:h-full sm:pt-40 px-[32px] lg:px-12 pb-10 flex justify-center">
      {/* Left section */}
      <div className="lg:w-[55%] w-full  flex flex-col gap-[25px]">
        {/* Heading with FlipWords */}
        <div className="flex items-center">
          <div className="text-[30px] sm:text-[36px] lg:text-[54px]  text-neutral-600 dark:text-neutral-400 font-semibold">
            <div>Increase Revenue and</div>
            <FlipWords words={words} /> <br />
          </div>
        </div>

        {/* Subheading */}
        <div className="w-[60%] text-[20px] lg:text-[22px] md:w-[80%] sm:w-[90%]">
          <p className="mt-0 sm:mt-8">{subHeading}</p>
        </div>

        {/* Button */}
        <div className="flex gap-2 lg:flex-row md:flex-col md:gap-8">
          <Button text={"VoiceAgent Demo"} to="https://call.prasaar.co/#demo" />
        </div>
      </div>

      {/* Right section with image */}
      <div className="w-1/4 h-[450px] cursor-pointer hidden md:flex justify-center items-center">
        <img
          src="./img/heroImg.svg"
          alt="hero img"
          className="w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
    </section>
  );
}
