import { useState, useEffect } from "react";
import {
  Smartphone,
  MessageSquare,
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
  ScanLine,
} from "lucide-react";
import initialData from "./tnElectionData.json";

const TNPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageOrientation, setImageOrientation] = useState("landscape");

  // Voting state
  const [pollData, setPollData] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Load from local storage or initial data
    const storedData = localStorage.getItem("tn_poll_data");
    const votedStatus = localStorage.getItem("tn_has_voted");

    if (storedData) {
      setPollData(JSON.parse(storedData));
    } else {
      setPollData(initialData);
    }

    if (votedStatus === "true") {
      setHasVoted(true);
    }
  }, []);

  useEffect(() => {
    const updateVotes = () => {
      setPollData((currentData) => {
        if (!currentData || currentData.length === 0) return currentData;
        const newData = currentData.map((party) => {
          let increase = 0;
          if (party.id === "dmk") {
            increase = Math.floor(Math.random() * 3) + 5; // 5 to 7
          } else if (party.id === "admk") {
            increase = Math.floor(Math.random() * 3) + 3; // 3 to 5
          } else if (party.id === "tvk_others") {
            increase = Math.floor(Math.random() * 3) + 1; // 1 to 3
          }
          return { ...party, votes: party.votes + increase };
        });
        localStorage.setItem("tn_poll_data", JSON.stringify(newData));
        return newData;
      });
    };

    const interval = setInterval(updateVotes, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = (id) => {
    if (hasVoted) return;

    const updatedData = pollData.map((party) => {
      if (party.id === id) {
        return { ...party, votes: party.votes + 1 };
      }
      return party;
    });

    setPollData(updatedData);
    setHasVoted(true);

    localStorage.setItem("tn_poll_data", JSON.stringify(updatedData));
    localStorage.setItem("tn_has_voted", "true");
  };

  const totalVotes = pollData.reduce((acc, party) => acc + party.votes, 0);

  const whatsappLink =
    "https://api.whatsapp.com/send/?phone=919226333789&text=Hello%20Team%2C%20I%20would%20like%20to%20get%20more%20details%20about%20the%20app.&type=phone_number&app_absent=0";
  const phoneNumber = "tel:+919226333789";

  const voterSlipPDFs = [
    { name: "Booth Voter Slip", file: "./prasaar_demo_voter_slip.pdf" },
    { name: "Booth Voters List", file: "./prasaar_demo_boothwise_voter_list.pdf" },
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
      id: "candidate-profile",
      icon: <QrCode className="w-6 h-6" />,
      title: "Candidate Profile Link + QR Code",
      description: "உங்கள் பணி, தொலைநோக்குப் பார்வை மற்றும் சாதனைகள். ஒரே இணைப்பு. ஒரே QR குறியீடு.",
      imageSpace: true,
      imageSrc: "./img/extra_page/candidate_profile.jpeg",
      demoLink: "https://hiroqr.com/tamilnadu",
    },
    {
      id: "evm-demo",
      icon: <Vote className="w-6 h-6" />,
      title: "EVM Demo Link",
      description: "மின்னணு வாக்குப்பதிவு இயந்திரத்தில் (EVM) வாக்காளர்கள் உங்களை எளிதாக அடையாளம் காண உதவுங்கள்.",
      imageSpace: true,
      imageSrc: "./img/extra_page/demo_evm_link.jpeg",
      demoLink: "https://myevm.in/demo/muthukumar",
    },
    {
      id: "voter-search",
      icon: <Users className="w-6 h-6" />,
      title: "Voter Search Link",
      description: "உங்கள் வாக்குச்சாவடியைக் கண்டறியவும்",
      imageSpace: true,
      imageSrc: "./img/extra_page/voter_search.jpeg",
      demoLink: "https://voter.prasaar.co/share/428TND",
    },
    {
      id: "voter-list",
      icon: <Smartphone className="w-6 h-6" />,
      title: "Voter List App & Software",
      description: "ஐபோன் மற்றும் ஆண்ட்ராய்டுக்கான சிறந்த வாக்காளர் பட்டியல் செயலி.",
      imageSpace: true,
      imageSrc: "./img/extra_page/app_screenshot_1.jpeg",
      demoLink: "https://www.youtube.com/shorts/xw476wC_kW0",
    },
    {
      id: "chatbot",
      icon: <MessageSquare className="w-6 h-6" />,
      title: "WhatsApp Chatbot",
      description: "டிஜிட்டல் வாக்காளர் சீட்டுகளை நேரடியாக வாட்ஸ்அப்பில் பெறுங்கள்.",
      imageSpace: true,
      imageSrc: "./img/extra_page/whatsapp_chatbot.jpeg",
      demoLink: "https://api.whatsapp.com/send/?phone=918766631808&text=Ganeshji&type=phone_number&app_absent=0",
    },
    {
      id: "qr-voter-slip",
      icon: <ScanLine className="w-6 h-6" />,
      title: "Scan QR Get Voter Slip",
      description: "QR குறியீட்டை ஸ்கேன் செய்து, வாட்ஸ்அப்பில் டிஜிட்டல் வாக்காளர் சீட்டைப் பெறுங்கள்.",
      imageSpace: true,
      imageSrc: "./img/extra_page/voter_card.jpeg",
      demoLink: "https://hiqr.at/dPHQaLbw?qr=1",
    },
    {
      id: "reports",
      icon: <FileDown className="w-6 h-6" />,
      title: "Voter Slips & Reports",
      description: "அச்சிடுவதற்குத் தயாரான PDF அறிக்கைகள்.",
      isVoterSlips: true,
      demoLink: "https://api.whatsapp.com/send/?phone=919226333789&text=Hello%20Team%2C%20I%20need%20details%20on%20Voter%20Slips%20and%20Reports.&type=phone_number&app_absent=0",
    },
  ];

  const handleImageLoad = (e, imageSrc) => {
    const img = e.target;
    const orientation = img.naturalWidth > img.naturalHeight ? "landscape" : "portrait";
    if (selectedImage === imageSrc) {
      setImageOrientation(orientation);
    }
  };

  const openImageModal = (imageSrc, e) => {
    const img = e.target;
    const orientation = img.naturalWidth > img.naturalHeight ? "landscape" : "portrait";
    setImageOrientation(orientation);
    setSelectedImage(imageSrc);
  };

  const closeModal = () => setSelectedImage(null);

  const handleGeneralLink = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <div className="relative overflow-hidden pt-8 sm:pt-8 lg:pt-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2e] via-[#242a3a] to-[#1a1f2e]" />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c60240]/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#c60240]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c60240]/5 rounded-full blur-3xl" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-28">
          <div className="flex flex-col items-center gap-10">
            {/* Titles */}
            <div className="w-full text-center">

              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-white mb-4 leading-tight">
                Tamil Nadu Assembly Elections 2026 ePoll
              </h1>

              <h2 className="text-xl sm:text-2xl text-gray-300 font-medium mb-8">
                Vote for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c60240] to-[#ff4d7a]">Future</span>
              </h2>
            </div>

            {/* Poll Section */}
            <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
              <div className="flex justify-between items-end mb-8">
                <h3 className="text-2xl font-medium text-white">Live Poll</h3>
                <p className="text-gray-400 font-medium">
                  Total Votes: <span className="text-white font-medium">{totalVotes.toLocaleString()}</span>
                </p>
              </div>

              <div className="space-y-6">
                {pollData.map((party) => {
                  const percentage = totalVotes === 0 ? 0 : ((party.votes / totalVotes) * 100).toFixed(1);
                  return (
                    <div key={party.id} className="relative">
                      <div className="flex items-center justify-between mb-2 z-10 relative">
                        <div className="flex items-center gap-4">
                          <img
                            src={party.logo}
                            alt={party.name}
                            className="w-12 h-12 rounded-full border-2 border-white/20 bg-white"
                          />
                          <span className="text-white font-semibold text-lg">{party.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          {hasVoted && (
                            <div className="text-right">
                              <div className="text-white font-bold">{percentage}%</div>
                              <div className="text-gray-400 text-sm">{party.votes.toLocaleString()} votes</div>
                            </div>
                          )}
                          {!hasVoted && (
                            <button
                              onClick={() => handleVote(party.id)}
                              className="px-6 py-2 bg-gradient-to-r from-[#c60240] to-[#a00235] text-white rounded-lg font-medium hover:scale-105 transition-all shadow-lg"
                            >
                              Vote
                            </button>
                          )}
                        </div>
                      </div>
                      {/* Percent Bar */}
                      {hasVoted && (
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#c60240] to-[#ff4d7a] rounded-full transition-all duration-1000"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {hasVoted && (
                <div className="mt-8 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-center">
                  <p className="text-green-400 font-medium">Thank you for voting. Your vote has been recorded!</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ===== SERVICES SECTION ===== */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-28">
        <div className="text-center mb-12 sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c60240]/10 text-[#c60240] text-sm font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c60240] animate-pulse" />
            Prasaar Services
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 px-2">
            All-in-One Voter <span className="text-[#c60240]">Engagement</span> Platform
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl flex flex-col h-full border border-gray-100 hover:border-[#c60240]/20 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-[#c60240]/5 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c60240]/[0.02] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex-grow">
                <div className="flex items-start justify-between mb-5">
                  <div className="bg-gradient-to-br from-[#c60240] to-[#a00235] text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-[#c60240]/20 group-hover:shadow-xl group-hover:shadow-[#c60240]/30 group-hover:scale-105 transition-all duration-300">
                    {service.icon}
                  </div>
                  <span className="text-xs font-mono text-gray-300 mt-1">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-snug group-hover:text-[#c60240] transition-colors duration-300">
                  {service.title}
                </h3>

                {service.imageSpace && service.imageSrc && (
                  <div
                    className="mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl h-64 sm:h-72 w-full flex items-center justify-center overflow-hidden cursor-pointer group/img border border-gray-100 hover:border-[#c60240]/20 transition-all duration-300 p-3"
                    onClick={(e) => {
                      if (e.target.tagName === "IMG") {
                        openImageModal(service.imageSrc, e);
                      }
                    }}
                  >
                    <img
                      src={service.imageSrc}
                      alt={service.title}
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
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

                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {service.description}
                </p>

                {service.isVoterSlips && (
                  <div className="space-y-2 mb-4">
                    {voterSlipPDFs.map((pdf, pdfIndex) => (
                      <button
                        key={pdfIndex}
                        onClick={() => handleDownload(pdf.file, pdf.file.split("/").pop())}
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
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="relative z-10 w-full mt-auto flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => handleGeneralLink(service.demoLink)}
                  className="cursor-pointer flex-1 inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:border-[#c60240] hover:text-[#c60240] transition-all duration-300"
                >
                  Demo
                </button>
                <button
                  onClick={() => handleGeneralLink(`https://api.whatsapp.com/send/?phone=919226333789&text=Hello%20Team%2C%20I%20need%20the%20${encodeURIComponent(service.title)}%20service.&type=phone_number&app_absent=0`)}
                  className="cursor-pointer flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#c60240] to-[#a00235] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#c60240]/20 hover:scale-[1.02] transition-all duration-300"
                >
                  Need this service
                </button>
              </div>
            </div>
          ))}
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

export default TNPage;
