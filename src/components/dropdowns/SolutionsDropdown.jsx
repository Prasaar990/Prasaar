import { useState, useEffect } from "react";
import {
  ChevronDown,
  Settings,
  BarChart,
  MessageSquare,
  QrCode,
} from "lucide-react";

export default function Solutions({ dropdownSolutions, isTablet = true }) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (dropdownSolutions) {
      setAnimateIn(true);
    } else {
      setAnimateIn(false);
    }
  }, [dropdownSolutions]);

  // Solution items data
  const solutionItems = [
    {
      title: "QR Codes",
      description:
        "Create dynamic QR codes for your business to get seamlessly connected with customers.",
      icon: <QrCode className="text-red-600" size={20} />,
    },
    {
      title: "CSAT - Customer Satisfaction",
      description:
        "Understand how customer is satisfied with your product or service with CSAT survey.",
      icon: <MessageSquare className="text-red-600" size={20} />,
    },
    {
      title: "NPS - Net Promoter Score",
      description:
        "NPS shows probability of a customer recommending your product / service to others.",
      icon: <BarChart className="text-red-600" size={20} />,
    },
    {
      title: "Grievance Redressal",
      description:
        "Turn complaints into compliments with an easy-to-use Grievance Redressal / Complaint Management System.",
      icon: <Settings className="text-red-600" size={20} />,
    },
  ];

  // Desktop dropdown menu
  const DesktopMenu = () => (
    <div
      className={`fixed top-18 left-0 w-full bg-white shadow-lg z-50 transform transition-all duration-500 ease-in-out ${
        animateIn
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-8 pointer-events-none"
      }`}
    >
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-red-600 mb-2">Solutions</h3>
          <p className="text-gray-600">
            Our customer engagement solutions helps brands grow more
            organically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutionItems.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-gray-100 rounded-lg hover:bg-red-50 transition-colors duration-300 cursor-pointer group"
            >
              <div className="flex items-center mb-2">
                {item.icon}
                <h4 className="font-medium ml-2 text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                  {item.title}
                </h4>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Mobile dropdown menu
  const MobileMenu = () => (
    <div
      className={`bg-white/95 rounded-md overflow-hidden transition-all duration-300 ease-in-out ${
        dropdownSolutions ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <ul className="py-2 px-4">
        {solutionItems.map((item, index) => (
          <li
            key={index}
            className="py-3 border-b border-gray-100 last:border-0 flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200 cursor-pointer"
          >
            <span className="mr-2">{item.icon}</span>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );

  return <>{!isTablet ? <DesktopMenu /> : <MobileMenu />}</>;
}
