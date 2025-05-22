import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VocAssessment() {
  const getUserDetails = () => {
    const storedData = localStorage.getItem("userAssessmentDetails");
    return storedData ? JSON.parse(storedData) : null;
  };
  const userData = getUserDetails() || { fullName: "No Name Provided" };
  const navigate = useNavigate();
  function onBack() {
    navigate(-1);
  }

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
      return "Your organization needs significant improvement in Voice of Customer readiness factors.";
    } else if (score >= 30 && score < 70) {
      return "Your organization has moderate Voice of Customer readiness but there's room for improvement.";
    } else {
      return "Your organization demonstrates strong Voice of Customer readiness across key areas.";
    }
  };

  const CheckboxSection = ({ title, items, scoreKey, scoreLabel }) => (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map(({ key, label }) => (
          <div key={key} className="flex items-center">
            <input
              type="checkbox"
              id={key}
              name={key}
              checked={formData[key]}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-3 text-gray-700" htmlFor={key}>
              {label}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {scoreLabel}
          </span>
          <span className="text-sm font-bold text-gray-900">
            {readiness[scoreKey]}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${getProgressBarClass(
              readiness[scoreKey]
            )}`}
            style={{ width: `${readiness[scoreKey]}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

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

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg mb-6 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-2">
                Voice of Customer
              </h1>
              <p className="text-gray-600">Welcome, {userData.fullName}</p>
            </div>
            <button
              onClick={onBack}
              className="mt-4 sm:mt-0 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              ← Back to Form
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Voice of Customer Checklist */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
              <h2 className="text-xl font-semibold text-blue-800">
                Voice of Customer Checklist
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Overall Voice of Customer Readiness Score
              </h2>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-medium text-gray-900">
                    Overall Score
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {readiness.overall}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 ${getProgressBarClass(
                      readiness.overall
                    )}`}
                    style={{ width: `${readiness.overall}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Summary</h3>
                <p className="text-gray-700">
                  {getScoreMessage(readiness.overall)}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-1">
                    Data Collection
                  </h4>
                  <p className="text-2xl font-bold text-blue-900">
                    {readiness.dataCollection}%
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-1">
                    Touchpoints
                  </h4>
                  <p className="text-2xl font-bold text-green-900">
                    {readiness.touchpoints}%
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 mb-1">
                    Organizational
                  </h4>
                  <p className="text-2xl font-bold text-purple-900">
                    {readiness.organizational}%
                  </p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h4 className="font-medium text-indigo-800 mb-1">
                    Technology
                  </h4>
                  <p className="text-2xl font-bold text-indigo-900">
                    {readiness.technology}%
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-medium text-orange-800 mb-1">
                    Governance
                  </h4>
                  <p className="text-2xl font-bold text-orange-900">
                    {readiness.governance}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
