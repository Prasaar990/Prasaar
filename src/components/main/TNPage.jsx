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

const ServiceImageCarousel = ({ service, openImageModal, handleImageLoad }) => {
  const images = service.imageSrcs || (service.imageSrc ? [service.imageSrc] : []);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="mb-4 relative h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-gray-100 hover:border-[#c60240]/15 transition-all duration-300 bg-gradient-to-b from-gray-50 to-gray-100/80">
      {images.map((src, imgIndex) => (
        <div
          key={imgIndex}
          className={`absolute inset-0 w-full h-full flex items-center justify-center p-2 transition-transform duration-700 ease-in-out`}
          style={{ transform: `translateX(${(imgIndex - currentIndex) * 100}%)` }}
          onClick={(e) => {
            if (e.target.tagName === "IMG") {
              openImageModal(src, e);
            }
          }}
        >
          <img
            src={src}
            alt={`${service.title} - ${imgIndex + 1}`}
            className="w-full h-full object-contain rounded-lg drop-shadow-md transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
            loading="lazy"
            onLoad={(e) => handleImageLoad(e, src)}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML =
                '<span class="text-xs text-gray-400 font-medium">[Preview Image]</span>';
            }}
          />
        </div>
      ))}

      {/* Indicator Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(dotIndex);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === dotIndex ? "bg-[#c60240] w-4" : "bg-gray-300/80 hover:bg-gray-400"}`}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* party-specific bar colours */
const PARTY_COLORS = {
  dmk: { from: "#c60240", to: "#ff4d7a" },
  admk: { from: "#1a8c3a", to: "#4ae06a" },
  tvk_others: { from: "#d4a017", to: "#f5d34e" },
};

const TNPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageOrientation, setImageOrientation] = useState("landscape");

  // Voting state
  const [pollData, setPollData] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const API_BASE_URL = "https://electionmanagementworkshop.in";

  const fetchPollData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/polls`);
      if (res.ok) {
        const data = await res.json();
        setPollData(data);
      }
    } catch (error) {
      console.error("Error fetching poll data:", error);
    }
  };

  useEffect(() => {
    const votedStatus = localStorage.getItem("tn_has_voted");
    if (votedStatus === "true") {
      setHasVoted(true);
    }
    fetchPollData();
  }, []);

  useEffect(() => {
    // Poll the server every 9 seconds to update dummy and actual counts
    const interval = setInterval(fetchPollData, 9000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (id) => {
    if (hasVoted || isVoting) return;

    setIsVoting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/polls/${id}/vote`, {
        method: "POST",
      });

      if (res.ok) {
        setHasVoted(true);
        localStorage.setItem("tn_has_voted", "true");
        fetchPollData();
      } else if (res.status === 400 || res.status === 429) {
        // IP already voted or Rate Limited -> lock voting for them client-side too
        setHasVoted(true);
        localStorage.setItem("tn_has_voted", "true");
        fetchPollData();
      } else {
        console.error("Failed to vote");
      }
    } catch (error) {
      console.error("Error casting vote:", error);
    } finally {
      setIsVoting(false);
    }
  };

  const totalVotes = pollData.reduce((acc, party) => acc + party.votes, 0);

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
      id: "evm-demo",
      icon: <Vote className="w-6 h-6" />,
      title: "EVM Demo Link",
      description: "மின்னணு வாக்குப்பதிவு இயந்திரத்தில் (EVM) வாக்காளர்கள் உங்களை எளிதாக அடையாளம் காண உதவுங்கள்.",
      imageSpace: true,
      imageSrc: "./img/extra_page/demo_evm_link.jpeg",
      demoLink: "https://myevm.in/demo/muthukumar",
    },
    {
      id: "voter-list",
      icon: <Smartphone className="w-6 h-6" />,
      title: "Voter List App & Software",
      description: "ஐபோன் மற்றும் ஆண்ட்ராய்டுக்கான சிறந்த வாக்காளர் பட்டியல் செயலி.",
      imageSpace: true,
      imageSrcs: [
        "./img/extra_page/app_screenshot_1.jpeg",
        "./img/extra_page/app_screenshot_2.jpeg"
      ],
      demoLink: "https://www.youtube.com/shorts/xw476wC_kW0",
    },
    {
      id: "voter-search",
      icon: <Users className="w-6 h-6" />,
      title: "Voter Search Link",
      description: "உங்கள் வாக்குச்சாவடியைக் கண்டறியவும்",
      imageSpace: true,
      imageSrcs: ["./img/extra_page/voter_search1.jpeg",
        "./img/extra_page/voter_search2.jpeg"],
      demoLink: "https://voter.prasaar.co/share/428TND",
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
    {
      id: "candidate-profile",
      icon: <QrCode className="w-6 h-6" />,
      title: "Candidate Profile Link + QR Code",
      description: "உங்கள் பணி, தொலைநோக்குப் பார்வை மற்றும் சாதனைகள். ஒரே இணைப்பு. ஒரே QR குறியீடு.",
      imageSpace: true,
      imageSrc: "./img/extra_page/candidate_profile.jpeg",
      demoLink: "https://hiroqr.com/tamilnadu",
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
    <div className="bg-[#f8f9fb] min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <div className="relative overflow-hidden pt-8 sm:pt-8 lg:pt-8">
        {/* Background – deep dark with subtle angled split */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1320] via-[#181d2e] to-[#1e2436]" />

        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-[#c60240]/12 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] bg-[#4338ca]/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#c60240]/[0.04] rounded-full blur-[80px]" />
        </div>

        {/* Fine grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12 py-14 sm:py-20 lg:py-24">
          <div className="flex flex-col items-center gap-8 sm:gap-10">
            {/* Hero copy */}
            <div className="w-full text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-white mb-3 leading-tight tracking-tight">
                Tamil Nadu Assembly Elections 2026
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c60240] to-[#ff4d7a] mt-1">
                  ePoll
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-400 font-normal max-w-md mx-auto">
                Vote for your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c60240] to-[#ff4d7a] font-medium">
                  Future
                </span>
              </p>
            </div>

            {/* Poll Card */}
            <div className="w-full max-w-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl shadow-black/30">
              {/* Header row */}
              <div className="flex items-center justify-between mb-7">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">Live Poll</h3>
                </div>
                <p className="text-sm text-gray-400">
                  <span className="text-gray-500">Total</span>{" "}
                  <span className="text-white font-semibold tabular-nums">{totalVotes.toLocaleString()}</span>
                </p>
              </div>

              {/* Party rows */}
              <div className="space-y-5">
                {pollData.map((party) => {
                  const percentage = totalVotes === 0 ? 0 : ((party.votes / totalVotes) * 100).toFixed(1);
                  const colors = PARTY_COLORS[party.id] || PARTY_COLORS.dmk;

                  return (
                    <div key={party.id}>
                      {/* Party info row */}
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={party.logo}
                            alt={party.name}
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white/10 bg-white object-cover"
                          />
                          <span className="text-white font-medium text-base sm:text-lg tracking-tight">{party.name}</span>
                        </div>

                        {hasVoted ? (
                          <div className="text-right">
                            <span className="text-white font-semibold text-lg tabular-nums">{percentage}%</span>
                            <p className="text-gray-500 text-xs tabular-nums">{party.votes.toLocaleString()} votes</p>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleVote(party.id)}
                            className="cursor-pointer px-5 py-2 text-sm font-semibold rounded-lg text-white transition-all duration-200 hover:brightness-110"
                            style={{
                              background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                            }}
                          >
                            Vote
                          </button>
                        )}
                      </div>

                      {/* Progress bar – always visible, grows when voted */}
                      <div className="w-full h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-[1200ms] ease-out"
                          style={{
                            width: hasVoted ? `${percentage}%` : "0%",
                            background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {hasVoted && (
                <div className="mt-7 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                  <p className="text-emerald-400 text-sm font-medium">✓ Thank you for voting. Your vote has been recorded!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== SERVICES SECTION ===== */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c60240]/10 text-[#c60240] text-sm font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c60240] animate-pulse" />
            Prasaar Services
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 px-2">
            All-in-One Voter <span className="text-[#c60240]">Engagement</span> Platform
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Comprehensive digital solutions to modernize your campaign strategy
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl flex flex-col h-full border border-gray-200/70 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:border-[#c60240]/15 hover:-translate-y-0.5"
            >
              <div className="relative z-10 flex-grow">
                {/* Icon + number */}
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-br from-[#c60240] to-[#a00235] text-white w-11 h-11 rounded-xl flex items-center justify-center shadow-md shadow-[#c60240]/15 group-hover:shadow-lg group-hover:shadow-[#c60240]/25 transition-shadow duration-300">
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-mono text-gray-300 mt-1 select-none">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2.5 leading-snug group-hover:text-[#c60240] transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Image preview – portrait friendly / Carousel */}
                {service.imageSpace && (service.imageSrc || service.imageSrcs) && (
                  <ServiceImageCarousel
                    service={service}
                    openImageModal={openImageModal}
                    handleImageLoad={handleImageLoad}
                  />
                )}

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Voter Slips PDF List */}
                {service.isVoterSlips && (
                  <div className="space-y-2 mb-4">
                    {voterSlipPDFs.map((pdf, pdfIndex) => (
                      <button
                        key={pdfIndex}
                        onClick={() => handleDownload(pdf.file, pdf.file.split("/").pop())}
                        className="cursor-pointer w-full flex items-center gap-3 bg-gray-50 hover:bg-[#c60240]/[0.04] border border-gray-100 hover:border-[#c60240]/20 rounded-xl px-4 py-2.5 text-left transition-all duration-200 group/pdf"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#c60240]/10 flex items-center justify-center flex-shrink-0 group-hover/pdf:bg-[#c60240]/15 transition-colors">
                          <Download className="w-4 h-4 text-[#c60240]" />
                        </div>
                        <span className="text-sm text-gray-600 group-hover/pdf:text-gray-900 transition-colors truncate flex-grow">
                          {pdf.name}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover/pdf:text-[#c60240] transition-all flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="relative z-10 w-full mt-auto flex gap-2.5 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleGeneralLink(service.demoLink)}
                  className="cursor-pointer flex-1 inline-flex items-center justify-center gap-1.5 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-semibold hover:border-[#c60240]/40 hover:text-[#c60240] hover:bg-[#c60240]/[0.03] transition-all duration-200"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Get Demo
                </button>
                <button
                  onClick={() => handleGeneralLink(`https://api.whatsapp.com/send/?phone=919226333789&text=${encodeURIComponent(`Need ${service.title} for my Assembly.\nPlease callback.`)}&type=phone_number&app_absent=0`)}
                  className="cursor-pointer flex-1 inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#c60240] to-[#a00235] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:shadow-md hover:shadow-[#c60240]/20 transition-all duration-200"
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
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
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
