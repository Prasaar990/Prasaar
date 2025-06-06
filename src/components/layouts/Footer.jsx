import { LinkedinIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  // Intersection Observer for animations
  const [isVisible, setIsVisible] = useState({
    logo: false,
    products: false,
    contact: false,
    about: false,
    social: false,
    legal: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <footer className="w-full bg-gradient-to-b from-[#333b4f] to-[#596789] text-white text-[18px] md:text-[20px] lg:px-[50px] md:px-[32px] sm:px-[24px] px-[20px] pt-[64px] pb-[32px] mt-[160px] rounded-t-[16px] shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
      {/* Logo Section */}
      <div
        data-section="logo"
        className={`flex justify-center mb-[48px] transition-all duration-1000 ${
          isVisible.logo
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-[80px]"
        }`}
      >
        <img
          src="./img/prasaar.webp"
          alt="Company Logo"
          className="w-[128px] lg:w-[176px] transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[48px] md:gap-[64px]">
        {/* Products Section */}
        <div
          data-section="products"
          className={`transition-all duration-1000 delay-100 ${
            isVisible.products
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-[64px]"
          }`}
        >
          <ul className="space-y-[16px]">
            <li>
              <h2 className="text-[20px] font-medium mb-[24px] relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-[64px] after:h-[3px] after:bg-gradient-to-r after:from-white after:to-transparent after:rounded-[4px]">
                Products
              </h2>
            </li>
            <li className="hover:translate-x-[4px] text-[18px] transition-transform duration-300 hover:text-shadow cursor-pointer">
              CSAT Survey
            </li>
            <li className="hover:translate-x-[4px] text-[18px] transition-transform duration-300 hover:text-shadow cursor-pointer">
              Opinion Survey
            </li>
            <li className="hover:translate-x-[4px] text-[18px] transition-transform duration-300 hover:text-shadow cursor-pointer">
              Feedback
            </li>
            <li className="hover:translate-x-[4px] text-[18px] transition-transform duration-300 hover:text-shadow cursor-pointer">
              Complaint Management
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div
          data-section="contact"
          className={`transition-all duration-1000 delay-200 ${
            isVisible.contact
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-[64px]"
          }`}
        >
          <ul className="space-y-[16px]">
            <li>
              <h2 className="text-[20px] font-medium mb-[24px] relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-[64px] after:h-[3px] after:bg-gradient-to-r after:from-white after:to-transparent after:rounded-[4px]">
                Contact
              </h2>
            </li>
            <li className="hover:translate-x-[4px] text-[18px] transition-transform duration-300 hover:text-shadow cursor-pointer">
              Email: ashok@prasaar.co
            </li>
          </ul>
        </div>

        {/* About Us Section */}
        <div
          data-section="about"
          className={`transition-all duration-1000 delay-300 ${
            isVisible.about
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-[64px]"
          }`}
        >
          <ul className="space-y-[16px]">
            <li>
              <h2 className="text-[20px] font-medium mb-[24px] relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-[64px] after:h-[3px] after:bg-gradient-to-r after:from-white after:to-transparent after:rounded-[4px]">
                About us
              </h2>
            </li>
            <li className="text-[18px]">
              We help businesses connect with customers effortlessly through
              WhatsApp, combining automation and real-time interactions to
              enhance engagement, trust, and revenue.
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-[48px] border-none h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      {/* Social Media Section */}
      <div
        data-section="social"
        className="flex flex-col items-center mt-[32px] space-y-[24px]"
      >
        <h2
          className={`text-[20px] font-medium relative pb-[16px] after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-[96px] after:h-[3px] after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent after:rounded-[4px] transition-all duration-1000 ${
            isVisible.social
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-[32px]"
          }`}
        >
          Follow us on social media
        </h2>

        <div
          className={`flex items-center gap-[32px] transition-all duration-1000 ${
            isVisible.social
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-[32px]"
          }`}
        >
          <span className="transition-transform duration-300 hover:-translate-y-[4px]">
            <a
              href="https://www.instagram.com"
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                className="w-[36px] h-[36px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </span>
          <span className="transition-transform duration-300 hover:-translate-y-[4px]">
            <a
              href="https://www.linkedin.com"
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-full h-full" />
            </a>
          </span>
        </div>
      </div>

      {/* Legal Links */}
      <div
        data-section="legal"
        className={`flex justify-center mt-[40px] transition-all duration-1000 delay-500 ${
          isVisible.legal
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-[24px]"
        }`}
      >
        <div className="text-center">
          <Link
            to="/terms"
            className="text-white no-underline text-[16px] mx-[24px] relative transition-all duration-300 hover:text-shadow after:content-['|'] after:absolute after:right-[-24px] after:text-white/50 last:after:content-none"
          >
            Terms and Conditions
          </Link>

          <span className="block mt-[24px] text-white/70 text-[14px]">
            © {new Date().getFullYear()} Prasaar Technology. All rights
            reserved.
          </span>
        </div>
      </div>

      <style>{`
        .text-shadow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </footer>
  );
}
