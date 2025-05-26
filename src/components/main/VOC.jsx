import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VocAssessment() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  // Submit form data
  const submitToNetlify = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
    const currentTime = new Date().toLocaleTimeString();

    const generateSectionContent = (title, items, scoreKey) => {
      const selectedItems = items.filter((item) => formData[item.key]);
      const unselectedItems = items.filter((item) => !formData[item.key]);

      return {
        title,
        score: readiness[scoreKey],
        selectedItems,
        unselectedItems,
        total: items.length,
      };
    };

    // Create PDF content using HTML
    const pdfContent = "";

    // Create PDF using print functionality
    const printWindow = window.open("", "_blank");
    printWindow.document.write(pdfContent);
    printWindow.document.close();

    // Set title for the print dialog
    printWindow.document.title = `VoC_Assessment_Report_${userData.fullName.replace(
      /\s+/g,
      "_"
    )}_${currentDate.replace(/\//g, "-")}`;

    // Wait for content to load then print
    printWindow.onload = function () {
      setTimeout(() => {
        printWindow.print();
        // Close the window after printing (optional)
        setTimeout(() => {
          printWindow.close();
        }, 1000);
      }, 500);
    };
  };

  const CheckboxSection = ({ title, items, scoreKey, scoreLabel }) => (
    <div>
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
              className="w-[16px] h-[16px] text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              className="ml-[12px] text-[16px] text-gray-700"
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
        {/* Header - Now without action buttons */}
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

          {/* Overall Readiness Score */}
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
                <h3 className="font-medium text-gray-800 mb-[8px]">Summary</h3>
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

          {/* Action Buttons Section - Now at the bottom */}
          <div className="bg-white shadow-sm rounded-[8px] p-[24px]">
            <div className="border-b border-gray-200 pb-[16px] mb-[24px]">
              <h2 className="text-[20px] font-semibold text-gray-800">
                Complete Your Assessment
              </h2>
              <p className="text-gray-600 mt-[4px]">
                Save your responses or download a copy of your results
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
              <button
                onClick={downloadResponse}
                className="px-[24px] py-[12px] text-[16px] font-medium text-white bg-blue-600 hover:bg-blue-700 border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2"
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
                onClick={submitToNetlify}
                disabled={isSubmitting}
                className={`px-[24px] py-[12px] text-[16px] font-medium text-white border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
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
                    Submitting...
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Save Response
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  alert(
                    "Navigation to Employee Trust assessment would happen here"
                  );
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
                    d="M17 20h5v-2a3 3 0 000-6h-.025a5.56 5.56 0 001.544-3.029 11.422 11.422 0 00.026-.495v-.004a7.998 7.998 0 00-.181-1.943M12 3C9.333 3 9.333 9 12 9s2.667-6 0-6z"
                  />
                </svg>
                Check Employee Trust
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
