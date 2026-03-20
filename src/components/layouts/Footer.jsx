import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Linkedin,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState({
    logo: false,
    products: false,
    contact: false,
    about: false,
    social: false,
    legal: false,
  });
  const location = useLocation();

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

  const products = [
    "CSAT Survey",
    "Opinion Survey",
    "Feedback",
    "Complaint Management",
  ];

  const socialLinks = [
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://www.instagram.com",
      label: "Instagram",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-[#1a1f2e] via-[#242a3a] to-[#1a1f2e] text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c60240]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#c60240]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12 pt-16 lg:pt-20 pb-8">
        {/* Logo Section */}
        <div
          data-section="logo"
          className={`flex justify-center mb-12 lg:mb-16 transition-all duration-1000 ${isVisible.logo
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
            }`}
        >
          <img
            src="/img/prasaar.webp"
            alt="Prasaar Logo"
            className="w-28 lg:w-36 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* About Section */}
          <div
            data-section="about"
            className={`lg:col-span-1 transition-all duration-1000 delay-100 ${isVisible.about
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
              }`}
          >
            <h3 className="text-base font-semibold mb-4 text-white">
              About Prasaar
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We help businesses connect with customers effortlessly through
              WhatsApp, combining automation and real-time interactions to
              enhance engagement, trust, and revenue.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#c60240] hover:text-white hover:border-[#c60240] hover:-translate-y-0.5 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div
            data-section="products"
            className={`transition-all duration-1000 delay-200 ${isVisible.products
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
              }`}
          >
            <h3 className="text-base font-semibold mb-4 text-white">
              Products
            </h3>
            <ul className="space-y-3">
              {products.map((product, index) => (
                <li key={index}>
                  <span className="text-sm text-gray-400 hover:text-white cursor-pointer inline-flex items-center gap-1.5 group transition-colors duration-200">
                    <span className="w-1 h-1 rounded-full bg-[#c60240]/60 group-hover:bg-[#c60240] transition-colors" />
                    {product}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div
            data-section="contact"
            className={`transition-all duration-1000 delay-300 ${isVisible.contact
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
              }`}
          >
            <h3 className="text-base font-semibold mb-4 text-white">
              Contact
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="tel:+919226333789"
                  className="text-sm text-gray-400 hover:text-white inline-flex items-start gap-2.5 group transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#c60240]/70 group-hover:text-[#c60240] transition-colors" />
                  +91 9226333789
                </a>
              </li>
              <li>
                <a
                  href="mailto:ashok@prasaar.co"
                  className="text-sm text-gray-400 hover:text-white inline-flex items-start gap-2.5 group transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#c60240]/70 group-hover:text-[#c60240] transition-colors" />
                  ashok@prasaar.co
                </a>
              </li>
              <li className="text-sm text-gray-400 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#c60240]/70" />
                <span className="leading-relaxed">
                  Office 615, Fortuna Business Center, Pimple Saudagar, Pune -
                  411025
                </span>
              </li>
              {location.pathname.includes("/election") && (
                <li className="text-sm text-gray-400 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#c60240]/70" />
                  <span className="leading-relaxed">
                    Office no 301, 4th floor, Bhagwat Complex, above Bata show
                    room, in front of Police Colony, Anishabad, Patna 800002
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div
            data-section="social"
            className={`transition-all duration-1000 delay-[400ms] ${isVisible.social
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
              }`}
          >
            <h3 className="text-base font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-gray-400 hover:text-white inline-flex items-center gap-1 group transition-colors duration-200"
                >
                  Terms & Conditions
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  to="/readiness-check"
                  className="text-sm text-gray-400 hover:text-white inline-flex items-center gap-1 group transition-colors duration-200"
                >
                  Readiness Check
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=919226333789&text=Hello%20Team%2C%20I%20would%20like%20to%20get%20more%20details.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white inline-flex items-center gap-1 group transition-colors duration-200"
                >
                  WhatsApp Us
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          data-section="legal"
          className={`mt-14 lg:mt-16 pt-6 border-t border-white/10 transition-all duration-1000 delay-500 ${isVisible.legal
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
            }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span className="text-xs text-gray-500">
              © {new Date().getFullYear()} Prasaar Technologies. All rights
              reserved.
            </span>
            <span className="text-xs text-gray-600">
              Powered by Eitot Technologies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
