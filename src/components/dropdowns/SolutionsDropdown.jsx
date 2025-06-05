import { useState, useEffect } from "react";
import {
  Settings,
  BarChart,
  MessageSquare,
  QrCode,
  ChevronRight,
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
      icon: <QrCode className="primaryColor" size={18} />,
    },
    {
      title: "CSAT - Customer Satisfaction",
      description:
        "Understand how customer is satisfied with your product or service with CSAT survey.",
      icon: <MessageSquare className="primaryColor" size={18} />,
    },
    {
      title: "NPS - Net Promoter Score",
      description:
        "NPS shows probability of a customer recommending your product / service to others.",
      icon: <BarChart className="primaryColor" size={18} />,
    },
    {
      title: "Grievance Redressal",
      description:
        "Turn complaints into compliments with an easy-to-use Grievance Redressal / Complaint Management System.",
      icon: <Settings className="primaryColor" size={18} />,
    },
  ];

  // Desktop dropdown menu (unchanged for now)
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
          <h3 className="text-xl font-bold primaryColor mb-2">SOLUTIONS</h3>
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
                <h4 className="font-medium ml-2 text-gray-800 group-hover:primaryColor transition-colors duration-300">
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

  // Enhanced Mobile dropdown menu
  const MobileMenu = () => (
    <div
      className={`bg-white  overflow-hidden transition-all duration-300 ease-in-out ${
        dropdownSolutions ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="py-3 mt-10">
        {solutionItems.map((item, index) => (
          <div
            key={index}
            className="px-4 py-3 hover:bg-red-50 transition-colors duration-200 cursor-pointer group border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-[32px] h-[32px] rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors duration-200">
                {item.icon}
              </div>
              <div className="ml-3 flex-1 text-[14px]">
                <h4 className="font-medium text-gray-800 text-[14px] group-hover:primaryColor transition-colors duration-200">
                  {item.title}
                </h4>
                <p className="text-[14px] text-gray-600 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <ChevronRight
                size={14}
                className="text-gray-400 group-hover:text-red-500 transition-colors duration-200 flex-shrink-0 w-[14px] h-[14px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return <>{!isTablet ? <DesktopMenu /> : <MobileMenu />}</>;
}
