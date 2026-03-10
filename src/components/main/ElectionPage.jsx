import { useState } from "react";
import {
  Smartphone,
  MessageSquare,
  Zap,
  FileDown,
  Vote,
  Users,
  X,
  Phone,
  Download,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  QrCode,
} from "lucide-react";

const ElectionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageOrientation, setImageOrientation] = useState("landscape");
  const whatsappLink =
    "https://api.whatsapp.com/send/?phone=919226333789&text=Hello%20Team%2C%20I%20would%20like%20to%20get%20more%20details%20about%20the%20app.%20Please%20share%20information%20on%20features%2C%20demo%2C%20and%20pricing.&type=phone_number&app_absent=0";
  const phoneNumber = "tel:+919226333789";

  const voterSlipPDFs = [
    { name: "Booth Voter Slip", file: "./prasaar_demo_voter_slip.pdf" },
    {
      name: "Booth Voters List",
      file: "./prasaar_demo_boothwise_voter_list.pdf",
    },
    { name: "Family Voters List", file: "./prasaar_demo_family_voter_list.pdf" },
    { name: "Alphabetical Voters List", file: "./prasaar_demo_alphabetical_voters_list.pdf" },
  ];

  const handleDownload = (filePath, fileName) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      icon: <FileDown className="w-6 h-6" />,
      title: "Voter Slips & Reports",
      description:
        "Download ready-made voter slips and detailed electoral reports. These are sample reports — we generate many more customized PDF reports based on your constituency data.",
      isVoterSlips: true,
    },
    {
      icon: <Vote className="w-6 h-6" />,
      title: "EVM Demo Link",
      description:
        "Help voters easily identify you on the EVM. Displays your name, serial number, photo & election symbol clearly.",
      imageSpace: true,
      imageSrc: "./img/evm_demo1.png",
      demoLink: "https://myevm.in/demo/demo",
      buttonText: "Try EVM Demo",
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
    // {
    //   icon: <Zap className="w-6 h-6" />,
    //   title: "Blasto – Auto WhatsApp & SMS",
    //   description:
    //     "Automatically send WhatsApp & SMS messages after every call",
    //   imageSpace: true,
    //   imageSrc: "./img/getblasto.webp",
    //   demoLink:
    //     "https://api.whatsapp.com/send/?phone=919226333789&text=Hello%20Team%2C%20I%20am%20interested%20in%20the%20Blasto%20app%20that%20automatically%20sends%20WhatsApp%20and%20SMS%20messages%20after%20every%20call.%20Please%20share%20the%20details.&type=phone_number&app_absent=0",
    //   buttonText: "Get Blasto App",
    // },
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
    <div className="bg-white min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <div className="relative overflow-hidden pt-16 sm:pt-16 lg:pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2e] via-[#242a3a] to-[#1a1f2e]" />

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c60240]/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#c60240]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c60240]/5 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Content - Left Side */}
            <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c60240]/15 border border-[#c60240]/20 text-[#c60240] text-sm font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c60240] animate-pulse" />
                Election Campaign Platform
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 lg:mb-6 leading-tight">
                Connect, Engage,
                <br />
                and{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c60240] to-[#ff4d7a]">
                  Win
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 lg:mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Powerful digital tools to reach every voter — seamlessly.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button
                  onClick={() =>
                    window.open(whatsappLink, "_blank", "noopener,noreferrer")
                  }
                  className="cursor-pointer inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#c60240] to-[#a00235] text-white px-7 sm:px-8 py-3.5 text-sm sm:text-base rounded-xl font-semibold hover:shadow-lg hover:shadow-[#c60240]/25 hover:scale-105 transition-all duration-300"
                >
                  Connect on WhatsApp
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCallClick}
                  className="cursor-pointer lg:hidden inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-7 sm:px-8 py-3.5 text-sm sm:text-base rounded-xl font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Us
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>Live Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>Free Demo</span>
                </div>
              </div>
            </div>

            {/* Image - Right Side */}
            <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
                {/* Glow behind image */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#c60240]/20 to-transparent rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-white/10 shadow-2xl">
                  <img
                    src="./img/election.png"
                    alt="Election Campaign Platform"
                    className="w-full h-40 sm:h-52 lg:h-80 object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SERVICES SECTION ===== */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-28">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c60240]/10 text-[#c60240] text-sm font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c60240] animate-pulse" />
            Our Solutions
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 px-2">
            All-in-One Voter{" "}
            <span className="text-[#c60240]">Engagement</span> Platform
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Comprehensive digital solutions designed to modernize your campaign
            strategy and connect you with every voter
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl flex flex-col h-full border border-gray-100 hover:border-[#c60240]/20 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-[#c60240]/5 hover:-translate-y-1"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c60240]/[0.02] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex-grow">
                {/* Icon + number */}
                <div className="flex items-start justify-between mb-5">
                  <div className="bg-gradient-to-br from-[#c60240] to-[#a00235] text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-[#c60240]/20 group-hover:shadow-xl group-hover:shadow-[#c60240]/30 group-hover:scale-105 transition-all duration-300">
                    {service.icon}
                  </div>
                  <span className="text-xs font-mono text-gray-300 mt-1">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-snug group-hover:text-[#c60240] transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Image preview */}
                {service.imageSpace && (
                  <div
                    className="mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl h-40 sm:h-44 flex items-center justify-center overflow-hidden cursor-pointer group/img border border-gray-100 hover:border-[#c60240]/20 transition-all duration-300"
                    onClick={(e) => {
                      if (e.target.tagName === "IMG") {
                        openImageModal(service.imageSrc, e);
                      }
                    }}
                  >
                    <img
                      src={service.imageSrc}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      onLoad={(e) => handleImageLoad(e, service.imageSrc)}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML =
                          '<span class="text-xs text-gray-400 font-medium">[Preview Image]</span>';
                      }}
                    />
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Voter Slips PDF Download List */}
                {service.isVoterSlips && (
                  <div className="space-y-2 mb-4">
                    {voterSlipPDFs.map((pdf, pdfIndex) => (
                      <button
                        key={pdfIndex}
                        onClick={() =>
                          handleDownload(
                            pdf.file,
                            pdf.file.split("/").pop()
                          )
                        }
                        className="cursor-pointer w-full flex items-center gap-3 bg-gray-50 hover:bg-gradient-to-r hover:from-[#c60240]/5 hover:to-[#c60240]/10 border border-gray-100 hover:border-[#c60240]/25 rounded-xl px-4 py-2.5 text-left transition-all duration-200 group/pdf"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#c60240]/10 flex items-center justify-center flex-shrink-0 group-hover/pdf:bg-[#c60240]/15 transition-colors">
                          <Download className="w-4 h-4 text-[#c60240]" />
                        </div>
                        <span className="text-sm text-gray-600 group-hover/pdf:text-gray-900 transition-colors truncate flex-grow">
                          {pdf.name}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover/pdf:text-[#c60240] group-hover/pdf:translate-x-0.5 transition-all flex-shrink-0" />
                      </button>
                    ))}
                    <div className="flex items-start gap-2 mt-3 px-1">
                      <div className="w-1 h-1 rounded-full bg-[#c60240]/40 mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-400 leading-relaxed">
                        These are sample reports. We provide many more
                        customized PDF reports tailored to your constituency.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action button */}
              {service.buttonText && (
                <button
                  onClick={() => handleDemoClick(service.demoLink)}
                  className="cursor-pointer relative z-10 w-full mt-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#c60240] to-[#a00235] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-[#c60240]/20 hover:scale-[1.02] transition-all duration-300"
                >
                  {service.buttonText}
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== CTA SECTION ===== */}
      <div className="mx-4 sm:mx-6 lg:mx-12 mb-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2e] via-[#242a3a] to-[#1a1f2e]" />

          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#c60240]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#c60240]/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c60240]/15 border border-[#c60240]/20 text-[#c60240] text-sm font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c60240] animate-pulse" />
                Get Started
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                Ready to Transform Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c60240] to-[#ff4d7a]">
                  Election Campaign?
                </span>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-gray-400 mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of representatives using Prasaar for smarter
                governance and winning campaigns
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={() =>
                    window.open(whatsappLink, "_blank", "noopener,noreferrer")
                  }
                  className="cursor-pointer inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#c60240] to-[#a00235] text-white px-8 py-3.5 text-sm sm:text-base rounded-xl font-semibold hover:shadow-lg hover:shadow-[#c60240]/25 hover:scale-105 transition-all duration-300"
                >
                  Get Demo
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCallClick}
                  className="cursor-pointer lg:hidden inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 text-sm sm:text-base rounded-xl font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== IMAGE MODAL ===== */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
            onClick={closeModal}
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full view"
              className={`${imageOrientation === "portrait"
                  ? "max-h-[90vh] w-auto"
                  : "max-w-[90vw] h-auto"
                } object-contain rounded-xl shadow-2xl`}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectionPage;
