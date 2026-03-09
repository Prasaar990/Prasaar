import HeroSection from "./HeroSection";
import Customers from "./Marquee";
import Info from "./Info";
import Solutions from "./Solutions";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Main() {
  const whatsappLink =
    "https://api.whatsapp.com/send/?phone=919226333789&text=Hello%20Team%2C%20I%20would%20like%20to%20get%20more%20details%20about%20the%20app.%20Please%20share%20information%20on%20features%2C%20demo%2C%20and%20pricing.&type=phone_number&app_absent=0";

  return (
    <div className="w-full">
      <HeroSection
        words={["Employee Trust"]}
        subHeading="Prasaar is a unified platform for customers and employees that boosts performance, builds reputation, and drives long-term success."
      />

      <Customers />

      <Info />

      <Solutions />

      {/* CTA Section */}
      <section className="relative overflow-hidden my-16 lg:my-24 mx-4 sm:mx-6 lg:mx-12 rounded-2xl sm:rounded-3xl">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2e] via-[#2a3041] to-[#1a1f2e]" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#c60240]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#c60240]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-4">
              Collect Feedback{" "}
              <span className="text-[#c60240]">Faster</span> Than Ever
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">
              Start gathering real-time customer insights and transform your service quality today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-shrink-0">
            <Link
              to="/form"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#c60240] to-[#a00235] text-white px-7 py-3.5 rounded-xl text-base font-semibold hover:shadow-lg hover:shadow-[#c60240]/25 hover:scale-105 transition-all duration-300"
            >
              Start Today
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-7 py-3.5 rounded-xl text-base font-medium border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <HeroSection
        words={[
          "Customer Service",
          "Customer Experience",
          "Employee Experience",
          "Customer Retention",
        ]}
        subheading=""
        title={"How Prasaar is helping drive better"}
      />
    </div>
  );
}


