import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VocAssessment() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showOverallScore, setShowOverallScore] = useState(false);
  const [isFormLocked, setIsFormLocked] = useState(false);

  const getUserDetails = () => {
    const storedData = localStorage.getItem("userDetails");
    return storedData ? JSON.parse(storedData) : null;
  };

  const userData = getUserDetails() || {
    fullName: "No name provided",
    companyEmail: "No email provided",
    companyName: "No company provided",
    jobRole: "No job role provided",
    formType: "VOC",
  };

  const dataCollectionItems = [
    { key: "onlineSurveys", label: "Online Surveys" },
    { key: "npsTools", label: "NPS Tools" },
    { key: "inAppFeedback", label: "In-app Feedback Widgets" },
    { key: "socialListening", label: "Social Listening" },
    { key: "customerServiceForms", label: "Customer Service Feedback Forms" },
    { key: "productReviewPlatforms", label: "Product Review Platforms" },
    { key: "surveys", label: "Surveys" },
    { key: "chatTextMessages", label: "Chat and Text Messages" },
    { key: "phoneCalls", label: "Phone Calls" },
    { key: "speechAnalytics", label: "Speech Analytics" },
    { key: "emails", label: "Emails" },
  ];

  const touchpointItems = [
    { key: "website", label: "Website" },
    { key: "mobileApp", label: "Mobile App" },
    { key: "email", label: "Email" },
    { key: "socialMedia", label: "Social Media" },
    { key: "callCenters", label: "Call Centers" },
    { key: "physicalStores", label: "Physical Stores" },
    { key: "chatbots", label: "Chatbots" },
    { key: "onlineForums", label: "Online Forums" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "qr", label: "QR" },
  ];

  const organizationalItems = [
    { key: "cxWorkshops", label: "CX Workshops & Training" },
    { key: "cxKpis", label: "CX KPIs in Performance Reviews" },
    { key: "leadershipReviews", label: "Leadership CX Review Meetings" },
    {
      key: "customerCentricVision",
      label: "Customer-Centric Vision Statements",
    },
    { key: "other", label: "Other" },
  ];

  const technologyItems = [
    { key: "crmTools", label: "CRM Tools" },
    { key: "feedbackPlatforms", label: "Customer Feedback Platforms" },
    { key: "dashboards", label: "Analytics Dashboards" },
    { key: "integrationTools", label: "Integration Tools" },
    { key: "dataLakes", label: "Data Lakes or Centralized Data Platforms" },
    {
      key: "apis",
      label: "APIs to pull data from survey tools into CRM or BI tools",
    },
  ];

  const governanceItems = [
    { key: "dedicatedTeam", label: "Dedicated VoC Team" },
    { key: "cxManager", label: "CX Manager" },
    { key: "feedbackRouting", label: "Feedback Routing Workflows" },
    { key: "dataGovernance", label: "Data Governance Policies" },
    {
      key: "centralizedRepository",
      label: "Centralized Repository For Feedback",
    },
    { key: "feedbackPlaybooks", label: "Feedback-to-action Playbooks" },
  ];

  const [formData, setFormData] = useState({
    // 1. Data Collection Capabilities
    onlineSurveys: false,
    npsTools: false,
    inAppFeedback: false,
    socialListening: false,
    customerServiceForms: false,
    productReviewPlatforms: false,
    surveys: false,
    chatTextMessages: false,
    phoneCalls: false,
    speechAnalytics: false,
    emails: false,

    // 2. Existing Customer Touchpoints
    website: false,
    mobileApp: false,
    email: false,
    socialMedia: false,
    callCenters: false,
    physicalStores: false,
    chatbots: false,
    onlineForums: false,
    none: false,
    all: false,
    whatsapp: false,
    qr: false,

    // 3. Organizational Alignment
    cxWorkshops: false,
    cxKpis: false,
    leadershipReviews: false,
    customerCentricVision: false,
    other: false,

    // 4. Technology Readiness
    crmTools: false,
    feedbackPlatforms: false,
    dashboards: false,
    integrationTools: false,
    dataLakes: false,
    apis: false,

    // 5. Feedback Governance
    dedicatedTeam: false,
    cxManager: false,
    feedbackRouting: false,
    dataGovernance: false,
    centralizedRepository: false,
    feedbackPlaybooks: false,
  });

  // Readiness scores state
  const [readiness, setReadiness] = useState({
    dataCollection: 0,
    touchpoints: 0,
    organizational: 0,
    technology: 0,
    governance: 0,
    overall: 0,
  });

  // Handle checkbox changes
  const handleInputChange = (e) => {
    if (isFormLocked) return; // Prevent changes when form is locked

    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Calculate readiness scores whenever checkboxes change
  useEffect(() => {
    const dataCollectionScore = calculateScore([
      formData.onlineSurveys,
      formData.npsTools,
      formData.inAppFeedback,
      formData.socialListening,
      formData.customerServiceForms,
      formData.productReviewPlatforms,
      formData.surveys,
      formData.chatTextMessages,
      formData.phoneCalls,
      formData.speechAnalytics,
      formData.emails,
    ]);

    const touchpointsScore = calculateScore([
      formData.website,
      formData.mobileApp,
      formData.email,
      formData.socialMedia,
      formData.callCenters,
      formData.physicalStores,
      formData.chatbots,
      formData.onlineForums,
      formData.whatsapp,
      formData.qr,
    ]);

    const organizationalScore = calculateScore([
      formData.cxWorkshops,
      formData.cxKpis,
      formData.leadershipReviews,
      formData.customerCentricVision,
      formData.other,
    ]);

    const technologyScore = calculateScore([
      formData.crmTools,
      formData.feedbackPlatforms,
      formData.dashboards,
      formData.integrationTools,
      formData.dataLakes,
      formData.apis,
    ]);

    const governanceScore = calculateScore([
      formData.dedicatedTeam,
      formData.cxManager,
      formData.feedbackRouting,
      formData.dataGovernance,
      formData.centralizedRepository,
      formData.feedbackPlaybooks,
    ]);

    const overallScore = calculateOverallScore([
      dataCollectionScore,
      touchpointsScore,
      organizationalScore,
      technologyScore,
      governanceScore,
    ]);

    setReadiness({
      dataCollection: dataCollectionScore,
      touchpoints: touchpointsScore,
      organizational: organizationalScore,
      technology: technologyScore,
      governance: governanceScore,
      overall: overallScore,
    });
  }, [formData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Helper function to calculate score based on selected checkboxes
  const calculateScore = (checkboxes) => {
    const selected = checkboxes.filter(Boolean).length;
    const total = checkboxes.length;
    return total > 0 ? Math.round((selected / total) * 100) : 0;
  };

  // Calculate overall score
  const calculateOverallScore = (scores) => {
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return Math.round(sum / scores.length);
  };

  // Get class for progress bar based on score
  const getProgressBarClass = (score) => {
    if (score < 30) return "bg-red-500";
    if (score < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getScoreMessage = (score) => {
    if (score < 30) {
      return "Your organization needs significant improvement in Customer Trust factors.";
    } else if (score >= 30 && score < 70) {
      return "Your organization has moderate Customer Trust but there's room for improvement.";
    } else {
      return "Your organization demonstrates strong Customer Trust across key areas.";
    }
  };

  // Handle showing overall score
  const handleShowOverallScore = async () => {
    setShowOverallScore(true);
    setIsFormLocked(true);

    // Auto-submit the form when overall score is shown
    await submitToNetlify();
  };

  // Submit form data
  const submitToNetlify = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission (replace with actual Netlify submission in real implementation)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In real implementation, you would create FormData and submit to Netlify here
      console.log("Submitting form data:", {
        userData,
        formData,
        readiness,
        timestamp: new Date().toISOString(),
      });

      setSubmitStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Download function for PDF
  const downloadResponse = () => {
    const currentDate = new Date().toLocaleDateString();

    // Create PDF content using HTML
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Customer Trust Assessment Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
          .score-section { margin: 20px 0; padding: 15px; background: #f5f5f5; }
          .section { margin: 20px 0; }
          .section h3 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Customer Trust Assessment Report</h1>
          <p><strong>Name:</strong> ${userData.fullName}</p>
          <p><strong>Company:</strong> ${userData.companyName}</p>
          <p><strong>Role:</strong> ${userData.jobRole}</p>
          <p><strong>Date:</strong> ${currentDate}</p>
        </div>
        
        <div class="score-section">
          <h2>Overall Customer Trust Score: ${readiness.overall}%</h2>
          <p>${getScoreMessage(readiness.overall)}</p>
        </div>
        
        <div class="section">
          <h3>Detailed Scores:</h3>
          <ul>
            <li>Data Collection: ${readiness.dataCollection}%</li>
            <li>Touchpoints: ${readiness.touchpoints}%</li>
            <li>Organizational: ${readiness.organizational}%</li>
            <li>Technology: ${readiness.technology}%</li>
            <li>Governance: ${readiness.governance}%</li>
          </ul>
        </div>
      </body>
      </html>
    `;

    // Create PDF using print functionality
    const printWindow = window.open("", "_blank");
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    printWindow.document.title = `Customer_Trust_Assessment_${userData.fullName.replace(
      /\s+/g,
      "_"
    )}_${currentDate.replace(/\//g, "-")}`;

    printWindow.onload = function () {
      setTimeout(() => {
        printWindow.print();
        setTimeout(() => {
          printWindow.close();
        }, 1000);
      }, 500);
    };
  };

  const CheckboxSection = ({ title, items, scoreKey, scoreLabel }) => (
    <div className={isFormLocked ? "opacity-60" : ""}>
      <h3 className="text-[18px] font-medium text-gray-800 mb-[16px]">
        {title}
      </h3>
      <div className="space-y-[12px]">
        {items.map(({ key, label }) => (
          <div key={key} className="flex items-center">
            <input
              type="checkbox"
              id={key}
              name={key}
              checked={formData[key]}
              onChange={handleInputChange}
              disabled={isFormLocked}
              className={`w-[16px] h-[16px] text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
                isFormLocked ? "cursor-not-allowed" : ""
              }`}
            />
            <label
              className={`ml-[12px] text-[16px] text-gray-700 ${
                isFormLocked ? "cursor-not-allowed" : ""
              }`}
              htmlFor={key}
            >
              {label}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-[24px]">
        <div className="flex justify-between items-center mb-[8px]">
          <span className="text-[14px] font-medium text-gray-700">
            {scoreLabel}
          </span>
          <span className="text-[14px] font-bold text-gray-900">
            {readiness[scoreKey]}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-[12px]">
          <div
            className={`h-[12px] rounded-full transition-all duration-300 ${getProgressBarClass(
              readiness[scoreKey]
            )}`}
            style={{ width: `${readiness[scoreKey]}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-[96px] px-[16px] sm:px-[24px] lg:px-[32px]">
      <div className="max-w-[1152px] mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-2xl p-8 mb-8 border border-gray-100">
          <div className="space-y-2">
            <h1 className="primaryColor text-2xl sm:text-3xl font-[600] text-primary mb-4 tracking-tight">
              CUSTOMER TRUST
            </h1>
            {userData?.fullName && (
              <p className="text-gray-800 text-lg font-medium">
                👋 Welcome,{" "}
                <span className="font-semibold">{userData.fullName}</span>
              </p>
            )}
            {userData?.jobRole && (
              <p className="text-gray-700 text-base">
                <span className="font-semibold">Role:</span> {userData.jobRole}
              </p>
            )}
            {userData?.companyName && (
              <p className="text-gray-700 text-base">
                <span className="font-semibold">Company:</span>{" "}
                {userData.companyName}
              </p>
            )}
            {userData?.companyEmail && (
              <p className="text-gray-700 text-base">
                <span className="font-semibold">Email:</span>{" "}
                {userData.companyEmail}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-[24px]">
          {/* Customer Trust Checklist */}
          <div className="bg-white shadow-sm rounded-[8px] overflow-hidden">
            <div className="bg-blue-50 px-[24px] py-[16px] border-b border-blue-100">
              <h2 className="text-[20px] font-semibold primaryColor">
                Customer Trust Checklist
              </h2>
              {isFormLocked && (
                <p className="text-sm text-gray-600 mt-1">
                  Form is locked after viewing overall score
                </p>
              )}
            </div>

            <div className="p-[24px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[32px]">
                <CheckboxSection
                  title="1) Data Collection Capabilities"
                  items={dataCollectionItems}
                  scoreKey="dataCollection"
                  scoreLabel="Data Collection Readiness"
                />

                <CheckboxSection
                  title="2) Customer Touchpoints"
                  items={touchpointItems}
                  scoreKey="touchpoints"
                  scoreLabel="Touchpoints Coverage"
                />

                <CheckboxSection
                  title="3) Organizational Alignment"
                  items={organizationalItems}
                  scoreKey="organizational"
                  scoreLabel="Organizational Readiness"
                />

                <CheckboxSection
                  title="4) Technology Readiness"
                  items={technologyItems}
                  scoreKey="technology"
                  scoreLabel="Technology Readiness"
                />

                <CheckboxSection
                  title="5) Feedback Governance"
                  items={governanceItems}
                  scoreKey="governance"
                  scoreLabel="Governance Readiness"
                />
              </div>
            </div>
          </div>

          {/* Overall Readiness Score - Only show if button was clicked */}
          {showOverallScore && (
            <div className="bg-white shadow-sm rounded-[8px] overflow-hidden">
              <div className="bg-gray-50 px-[24px] py-[16px] border-b border-gray-200">
                <h2 className="text-[20px] font-semibold text-gray-800">
                  Overall Customer Trust Readiness Score
                </h2>
              </div>

              <div className="p-[24px]">
                <div className="mb-[24px]">
                  <div className="flex justify-between items-center mb-[12px]">
                    <span className="text-[18px] font-medium text-gray-900">
                      Overall Score
                    </span>
                    <span className="text-[24px] font-bold text-gray-900">
                      {readiness.overall}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-[16px]">
                    <div
                      className={`h-[16px] rounded-full transition-all duration-500 ${getProgressBarClass(
                        readiness.overall
                      )}`}
                      style={{ width: `${readiness.overall}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-[8px] p-[16px] mb-[24px]">
                  <h3 className="font-medium text-gray-800 mb-[8px]">
                    Summary
                  </h3>
                  <p className="text-gray-700">
                    {getScoreMessage(readiness.overall)}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[16px]">
                  <div className="bg-blue-50 rounded-[8px] p-[16px]">
                    <h4 className="font-medium text-blue-800 mb-[4px]">
                      Data Collection
                    </h4>
                    <p className="text-[24px] font-bold text-blue-900">
                      {readiness.dataCollection}%
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-[8px] p-[16px]">
                    <h4 className="font-medium text-green-800 mb-[4px]">
                      Touchpoints
                    </h4>
                    <p className="text-[24px] font-bold text-green-900">
                      {readiness.touchpoints}%
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-[8px] p-[16px]">
                    <h4 className="font-medium text-purple-800 mb-[4px]">
                      Organizational
                    </h4>
                    <p className="text-[24px] font-bold text-purple-900">
                      {readiness.organizational}%
                    </p>
                  </div>
                  <div className="bg-indigo-50 rounded-[8px] p-[16px]">
                    <h4 className="font-medium text-indigo-800 mb-[4px]">
                      Technology
                    </h4>
                    <p className="text-[24px] font-bold text-indigo-900">
                      {readiness.technology}%
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-[8px] p-[16px]">
                    <h4 className="font-medium text-orange-800 mb-[4px]">
                      Governance
                    </h4>
                    <p className="text-[24px] font-bold text-orange-900">
                      {readiness.governance}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons Section */}
          <div className="bg-white shadow-sm rounded-[8px] p-[24px]">
            <div className="border-b border-gray-200 pb-[16px] mb-[24px]">
              <h2 className="text-[20px] font-semibold text-gray-800">
                {!showOverallScore
                  ? "Assessment Actions"
                  : "Complete Your Assessment"}
              </h2>
              <p className="text-gray-600 mt-[4px]">
                {!showOverallScore
                  ? "Click below to view your overall assessment score"
                  : "Your assessment is complete. Download results or continue to Employee Trust."}
              </p>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-[24px] p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                ✅ Form submitted successfully! Your response has been saved.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-[24px] p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                ❌ Error submitting form. Please try again.
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-[12px] justify-center">
              {/* Show Overall Score Button - Only visible before score is shown */}
              {!showOverallScore && (
                <button
                  onClick={handleShowOverallScore}
                  disabled={isSubmitting}
                  className={`px-[24px] py-[12px] text-[16px] font-medium text-white border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002 2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Show Overall Score
                    </>
                  )}
                </button>
              )}

              {/* Action buttons - Only visible after score is shown */}
              {showOverallScore && (
                <>
                  <button
                    onClick={downloadResponse}
                    className="px-[24px] py-[12px] text-[16px] font-medium text-black bg-gray-100 hover:bg-gray-300 border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download PDF Response
                  </button>

                  <button
                    onClick={() => {
                      navigate("/employee-trust");
                    }}
                    className="px-[24px] py-[12px] text-[16px] font-medium text-white bg-purple-600 hover:bg-purple-700 border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Check Employee Trust
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
