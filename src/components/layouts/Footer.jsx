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
    <footer className="w-full bg-gradient-to-b from-[#333b4f] to-[#596789] text-white text-lg md:text-xl px-6 md:px-12 lg:px-20 pt-16 pb-8 mt-40 rounded-t-2xl shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
      {/* Logo Section */}
      <div
        data-section="logo"
        className={`flex justify-center mb-12 transition-all duration-1000 ${
          isVisible.logo
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-20"
        }`}
      >
        <img
          src="./img/prasaar.webp"
          alt="Company Logo"
          className="w-32 lg:w-44 transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
        {/* Products Section */}
        <div
          data-section="products"
          className={`transition-all duration-1000 delay-100 ${
            isVisible.products
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-16"
          }`}
        >
          <ul className="space-y-4">
            <li>
              <h2 className="text-2xl font-medium mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-16 after:h-[3px] after:bg-gradient-to-r after:from-white after:to-transparent after:rounded-md">
                Products
              </h2>
            </li>
            <li className="hover:translate-x-1 transition-transform duration-300 hover:text-shadow cursor-pointer">
              CSAT Survey
            </li>
            <li className="hover:translate-x-1 transition-transform duration-300 hover:text-shadow cursor-pointer">
              Opinion Survey
            </li>
            <li className="hover:translate-x-1 transition-transform duration-300 hover:text-shadow cursor-pointer">
              Feedback
            </li>
            <li className="hover:translate-x-1 transition-transform duration-300 hover:text-shadow cursor-pointer">
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
              : "opacity-0 transform translate-y-16"
          }`}
        >
          <ul className="space-y-4">
            <li>
              <h2 className="text-2xl font-medium mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-16 after:h-[3px] after:bg-gradient-to-r after:from-white after:to-transparent after:rounded-md">
                Contact
              </h2>
            </li>
            <li className="hover:translate-x-1 transition-transform duration-300 hover:text-shadow cursor-pointer">
              Email: contact@company.co
            </li>
          </ul>
        </div>

        {/* About Us Section */}
        <div
          data-section="about"
          className={`transition-all duration-1000 delay-300 ${
            isVisible.about
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-16"
          }`}
        >
          <ul className="space-y-4">
            <li>
              <h2 className="text-2xl font-medium mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-16 after:h-[3px] after:bg-gradient-to-r after:from-white after:to-transparent after:rounded-md">
                About us
              </h2>
            </li>
            <li>
              We help businesses connect with customers effortlessly through
              WhatsApp, combining automation and real-time interactions to
              enhance engagement, trust, and revenue.
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-12 border-none h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      {/* Social Media Section */}
      <div
        data-section="social"
        className="flex flex-col items-center mt-8 space-y-6"
      >
        <h2
          className={`text-2xl font-medium relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-24 after:h-[3px] after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent after:rounded-md transition-all duration-1000 ${
            isVisible.social
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-8"
          }`}
        >
          Follow us on social media
        </h2>

        <div
          className={`flex items-center gap-8 transition-all duration-1000 ${
            isVisible.social
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
        >
          <span className="transition-transform duration-300 hover:-translate-y-1">
            <a
              href="https://www.instagram.com"
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </span>
          <span className="transition-transform duration-300 hover:-translate-y-1">
            <a
              href="https://www.linkedin.com"
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>
          </span>
        </div>
      </div>

      {/* Legal Links */}
      <div
        data-section="legal"
        className={`flex justify-center mt-10 transition-all duration-1000 delay-500 ${
          isVisible.legal
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-6"
        }`}
      >
        <div className="text-center">
          <Link
            to="/terms"
            className="text-white no-underline text-base mx-6 relative transition-all duration-300 hover:text-shadow after:content-['|'] after:absolute after:right-[-24px] after:text-white/50 last:after:content-none"
          >
            Terms and Conditions
          </Link>

          <span className="block mt-6 text-white/70 text-sm">
            © {new Date().getFullYear()} Prasaar Technology. All rights
            reserved.
          </span>
        </div>
      </div>

      <style jsx>{`
        .text-shadow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </footer>
  );
}
