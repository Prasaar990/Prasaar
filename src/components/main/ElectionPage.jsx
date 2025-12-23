import { useState } from "react";
import {
  Smartphone,
  MessageSquare,
  Zap,
  QrCode,
  Vote,
  Users,
  X,
  Phone,
} from "lucide-react";

const ElectionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageOrientation, setImageOrientation] = useState("landscape");
  const whatsappLink =
    "https://api.whatsapp.com/send/?phone=919226333789&text=Hello%20Team%2C%20I%20would%20like%20to%20get%20more%20details%20about%20the%20app.%20Please%20share%20information%20on%20features%2C%20demo%2C%20and%20pricing.&type=phone_number&app_absent=0";
  const phoneNumber = "tel:+919226333789";

  const services = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Voter List App & Software",
      description:
        "Smart voter list app for iPhone & Android with a Web portal for your entire team. Search, manage, and update voter data anytime, anywhere.",
      imageSpace: true,
      imageSrc: "./img/portal.png",
      demoLink:
        "https://api.whatsapp.com/send/?phone=919226333789&text=Hello%20Team%2C%20I%20am%20interested%20in%20the%20Voter%20List%20App%20and%20Election%20Management%20Software.%20Please%20share%20pricing%20and%20features.&type=phone_number&app_absent=0",
      buttonText: "Contact For App",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Voter Search Link",
      description:
        "The simplest voter search experience for citizens. Promote your candidate branding while helping voters instantly find their details.",
      imageSpace: true,
      imageSrc: "./img/voter_search.png",
      demoLink: "https://voter.prasaar.co/search/205PRA",
      buttonText: "Try Voter Search Demo",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "WhatsApp Chatbot",
      description: "Send digital voter slips directly on WhatsApp.",
      imageSpace: true,
      imageSrc: "./img/chatbot.png",
      demoLink:
        "https://api.whatsapp.com/send/?phone=918766631808&text=Ganeshji&type=phone_number&app_absent=0",
      buttonText: "Try WhatsappBot Demo",
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "Candidate Profile Link + QR Code",
      description:
        "Showcase your work, vision, and achievements. One link. One QR. Stronger voter connection.",
      imageSpace: true,
      imageSrc: "./img/candidate_profile.png",
      demoLink: "https://hiroqr.com/mydemo",
      buttonText: "View Demo Profile",
    },
    {
      icon: <Vote className="w-6 h-6" />,
      title: "EVM Demo Link",
      description:
        "Help voters easily identify you on the EVM. Displays your name, serial number, photo & election symbol clearly.",
      imageSpace: true,
      imageSrc: "./img/evm_demo.png",
      demoLink: "https://myevm.in/demo/demo",
      buttonText: "Try EVM Demo",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Blasto – Auto WhatsApp & SMS",
      description:
        "Automatically send WhatsApp & SMS messages after every call",
      imageSpace: true,
      imageSrc: "./img/getblasto.webp",
      demoLink:
        "https://api.whatsapp.com/send/?phone=919226333789&text=Hello%20Team%2C%20I%20am%20interested%20in%20the%20Blasto%20app%20that%20automatically%20sends%20WhatsApp%20and%20SMS%20messages%20after%20every%20call.%20Please%20share%20the%20details.&type=phone_number&app_absent=0",
      buttonText: "Get Blasto App",
    },
  ];

  const handleImageLoad = (e, imageSrc) => {
    const img = e.target;
    const orientation =
      img.naturalWidth > img.naturalHeight ? "landscape" : "portrait";
    if (selectedImage === imageSrc) {
      setImageOrientation(orientation);
    }
  };

  const openImageModal = (imageSrc, e) => {
    const img = e.target;
    const orientation =
      img.naturalWidth > img.naturalHeight ? "landscape" : "portrait";
    setImageOrientation(orientation);
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleDemoClick = (demoLink) => {
    window.open(demoLink, "_blank", "noopener,noreferrer");
  };

  const handleCallClick = () => {
    window.location.href = phoneNumber;
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-16 sm:pt-16 lg:pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#a00235] via-[#c60240] to-[#d4034a] text-white py-12 sm:py-16 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-16">
            {/* Content - Left Side */}
            <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-3 sm:mb-4 lg:mb-6 leading-tight">
                Prasaar: Connect, Engage, and Win
              </h1>
              <p className="text-sm sm:text-base lg:text-xl opacity-95 mb-6 sm:mb-8 leading-relaxed">
                Powerful digital tools to reach every voter — seamlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button
                  onClick={() =>
                    window.open(whatsappLink, "_blank", "noopener,noreferrer")
                  }
                  className="cursor-pointer bg-white text-[#c60240] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base lg:text-lg rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
                >
                  Connect on Whatsapp
                </button>
                {/* Call Button - Mobile Only */}
                <button
                  onClick={handleCallClick}
                  className="cursor-pointer lg:hidden bg-white text-[#c60240] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Us
                </button>
              </div>
            </div>

            {/* Image - Right Side */}
            <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-none">
                <img
                  src="./img/election.png"
                  alt="Election Campaign Platform"
                  className="w-full h-32 sm:h-48 lg:h-96 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Title */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-24">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-900 mb-3 sm:mb-4 px-2">
            All-in-One Voter Engagement Platform
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Comprehensive digital solutions designed to modernize your campaign
            strategy
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl flex flex-col h-full border border-gray-200 p-5 sm:p-6 lg:p-8 hover:shadow-2xl hover:border-[#c60240]/20 transition-all duration-300 group"
            >
              <div>
                <div className="bg-gradient-to-br from-[#a00235] to-[#c60240] text-white p-2.5 sm:p-3 rounded-xl mb-4 sm:mb-5 inline-block  transition-transform">
                  {service.icon}
                </div>

                <h3 className="text-base sm:text-lg lg:text-xl font-normal text-gray-900 mb-2 sm:mb-3 leading-tight">
                  {service.title}
                </h3>

                {/* Image placeholder */}
                {service.imageSpace && (
                  <div
                    className="mb-3 sm:mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg sm:rounded-xl h-40 sm:h-44 lg:h-48 flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={(e) => {
                      if (e.target.tagName === "IMG") {
                        openImageModal(service.imageSrc, e);
                      }
                    }}
                  >
                    <img
                      src={service.imageSrc}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onLoad={(e) => handleImageLoad(e, service.imageSrc)}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML =
                          '<span class="text-xs sm:text-sm text-gray-400 font-medium">[Preview Image]</span>';
                      }}
                    />
                  </div>
                )}

                <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  {service.description}
                </p>
              </div>

              {service.buttonText && (
                <button
                  onClick={() => handleDemoClick(service.demoLink)}
                  className="cursor-pointer w-full mt-auto bg-gradient-to-br from-[#a00235] to-[#c60240] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {service.buttonText}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#a00235] via-[#c60240] to-[#d4034a] py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-normal text-white mb-3 sm:mb-4 lg:mb-6 px-2">
            Ready to Transform Your Election Campaign?
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-white mb-6 sm:mb-8 lg:mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed px-4">
            Join thousands of representatives using Prasaar for smarter
            governance and winning campaigns
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button
              onClick={() =>
                window.open(whatsappLink, "_blank", "noopener,noreferrer")
              }
              className="cursor-pointer bg-white text-[#c60240] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base lg:text-lg rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
            >
              Get Demo
            </button>
            {/* Call Button - Mobile Only */}
            <button
              onClick={handleCallClick}
              className="cursor-pointer lg:hidden bg-white text-[#c60240] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Call Us
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            onClick={closeModal}
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <div
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full view"
              className={`${
                imageOrientation === "portrait"
                  ? "max-h-[90vh] w-auto"
                  : "max-w-[90vw] h-auto"
              } object-contain rounded-lg shadow-2xl`}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectionPage;
