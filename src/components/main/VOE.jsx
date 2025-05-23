import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VoeAssessment() {
  const getUserDetails = () => {
    const storedData = localStorage.getItem("userDetails");
    return storedData ? JSON.parse(storedData) : null;
  };
  const userData = getUserDetails() || {
    fullName: "no name provided",
    companyEmail: "",
    companyName: "",
    jobRole: "",
    formType: "VOE",
  };
  const navigate = useNavigate();
  function onBack() {
    navigate(-1);
  }

  const [formData, setFormData] = useState({
    // 1. Employee Response Mechanisms
    employeePulseSurveys: false,
    anonymousFeedbackPlatforms: false,
    internalSocialNetworks: false,
    suggestionBoxes: false,
    employeeForums: false,
    mobileFeedbackApps: false,

    // 2. Data Privacy & Security Measures
    anonymousSurveyTools: false,
    dataUseTransparency: false,
    encryptedDataStorage: false,
    roleBasedAccess: false,
    privacyLawCompliance: false,
    confidentialReportingChannels: false,

    // 3. Leadership Support
    executiveSponsorship: false,
    voiceMetricsInDashboards: false,
    leaderParticipationInFeedback: false,
    employeeExperienceTeam: false,
    hrListeningPolicies: false,
    voiceProgramResourcing: false,

    // 4. Culture of Openness & Feedback
    openDoorPolicies: false,
    regularFeedbackTraining: false,
    recognitionPrograms: false,
    feedbackFollowThrough: false,
    activeLeaderListening: false,

    // 5. Engagement Channels
    feedbackAnalyticsTools: false,
    actionTeams: false,
    employeeCoCreation: false,
    actionDashboards: false,
    progressUpdates: false,
    hrPlanningIntegration: false,
  });

  // Readiness scores state
  const [readiness, setReadiness] = useState({
    responseMechanisms: 0,
    dataSecurity: 0,
    leadership: 0,
    culture: 0,
    engagement: 0,
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
    const responseMechanismsScore = calculateScore([
      formData.employeePulseSurveys,
      formData.anonymousFeedbackPlatforms,
      formData.internalSocialNetworks,
      formData.suggestionBoxes,
      formData.employeeForums,
      formData.mobileFeedbackApps,
    ]);

    const dataSecurityScore = calculateScore([
      formData.anonymousSurveyTools,
      formData.dataUseTransparency,
      formData.encryptedDataStorage,
      formData.roleBasedAccess,
      formData.privacyLawCompliance,
      formData.confidentialReportingChannels,
    ]);

    const leadershipScore = calculateScore([
      formData.executiveSponsorship,
      formData.voiceMetricsInDashboards,
      formData.leaderParticipationInFeedback,
      formData.employeeExperienceTeam,
      formData.hrListeningPolicies,
      formData.voiceProgramResourcing,
    ]);

    const cultureScore = calculateScore([
      formData.openDoorPolicies,
      formData.regularFeedbackTraining,
      formData.recognitionPrograms,
      formData.feedbackFollowThrough,
      formData.activeLeaderListening,
    ]);

    const engagementScore = calculateScore([
      formData.feedbackAnalyticsTools,
      formData.actionTeams,
      formData.employeeCoCreation,
      formData.actionDashboards,
      formData.progressUpdates,
      formData.hrPlanningIntegration,
    ]);

    const overallScore = calculateOverallScore([
      responseMechanismsScore,
      dataSecurityScore,
      leadershipScore,
      cultureScore,
      engagementScore,
    ]);

    setReadiness({
      responseMechanisms: responseMechanismsScore,
      dataSecurity: dataSecurityScore,
      leadership: leadershipScore,
      culture: cultureScore,
      engagement: engagementScore,
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
      return "Your organization needs significant improvement in Voice of Employee readiness factors.";
    } else if (score >= 30 && score < 70) {
      return "Your organization has moderate Voice of Employee readiness but there's room for improvement.";
    } else {
      return "Your organization demonstrates strong Voice of Employee readiness across key areas.";
    }
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

  const responseMechanismsItems = [
    { key: "employeePulseSurveys", label: "Employee Pulse Surveys" },
    {
      key: "anonymousFeedbackPlatforms",
      label: "Anonymous Feedback Platforms",
    },
    {
      key: "internalSocialNetworks",
      label: "Internal Social Networks and Collaboration Tools",
    },
    { key: "suggestionBoxes", label: "Suggestion Boxes" },
    { key: "employeeForums", label: "Employee Forums and Discussion Boards" },
    { key: "mobileFeedbackApps", label: "Mobile Feedback Apps" },
  ];

  const dataSecurityItems = [
    { key: "anonymousSurveyTools", label: "Anonymous Survey Tools" },
    { key: "dataUseTransparency", label: "Data Use Transparency" },
    { key: "encryptedDataStorage", label: "Encrypted Data Storage" },
    { key: "roleBasedAccess", label: "Role-Based Access" },
    { key: "privacyLawCompliance", label: "Privacy Law Compliance" },
    {
      key: "confidentialReportingChannels",
      label: "Confidential Reporting Channels",
    },
  ];

  const leadershipItems = [
    { key: "executiveSponsorship", label: "Executive Sponsorship" },
    { key: "voiceMetricsInDashboards", label: "Voice Metrics in Dashboards" },
    {
      key: "leaderParticipationInFeedback",
      label: "Leader Participation in Feedback",
    },
    { key: "employeeExperienceTeam", label: "Employee Experience Team" },
    { key: "hrListeningPolicies", label: "HR Listening Policies" },
    { key: "voiceProgramResourcing", label: "Voice Program Resourcing" },
  ];

  const cultureItems = [
    { key: "openDoorPolicies", label: "Open-door policies" },
    {
      key: "regularFeedbackTraining",
      label: "Regular Feedback Training for Managers and Employees",
    },
    {
      key: "recognitionPrograms",
      label: "Recognition Programs Celebrating Constructive Feedback",
    },
    { key: "feedbackFollowThrough", label: "Feedback Follow-Through" },
    { key: "activeLeaderListening", label: "Active Leader Listening" },
  ];

  const engagementItems = [
    { key: "feedbackAnalyticsTools", label: "Feedback Analytics Tools" },
    { key: "actionTeams", label: "Action Teams" },
    { key: "employeeCoCreation", label: "Employee Co-Creation" },
    { key: "actionDashboards", label: "Action Dashboards" },
    { key: "progressUpdates", label: "Progress Updates" },
    { key: "hrPlanningIntegration", label: "HR Planning Integration" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-[96px] px-[16px] sm:px-[24px] lg:px-[32px]">
      <div className="max-w-[1152px] mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg mb-[24px] p-[24px]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-[24px] sm:text-[30px] font-bold primaryColor mb-[8px]">
                Voice of Employee
              </h1>
              <p className="text-gray-600 text-[18px]">
                Welcome, {userData.fullName}
              </p>
              <p className="text-gray-600 text-[18px]">
                {userData?.companyName} - {userData?.companyEmail}
              </p>
              <p className="text-gray-600 text-[18px]">{userData?.jobRole}</p>
            </div>
            <button
              onClick={onBack}
              className="mt-[16px] sm:mt-0 px-[16px] py-[8px] text-[14px] font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              ← Back to Form
            </button>
          </div>
        </div>

        <div className="space-y-[24px]">
          {/* Voice of Employee Checklist */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="bg-purple-50 px-[24px] py-[16px] border-b border-purple-100">
              <h2 className="text-[20px] font-semibold primaryColor">
                Voice of Employee Checklist
              </h2>
            </div>

            <div className="p-[24px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[32px]">
                <CheckboxSection
                  title="1) Employee Response Mechanisms"
                  items={responseMechanismsItems}
                  scoreKey="responseMechanisms"
                  scoreLabel="Response Mechanisms Readiness"
                />

                <CheckboxSection
                  title="2) Data Privacy & Security Measures"
                  items={dataSecurityItems}
                  scoreKey="dataSecurity"
                  scoreLabel="Data Security Readiness"
                />

                <CheckboxSection
                  title="3) Leadership Support"
                  items={leadershipItems}
                  scoreKey="leadership"
                  scoreLabel="Leadership Support Readiness"
                />

                <CheckboxSection
                  title="4) Culture of Openness & Feedback"
                  items={cultureItems}
                  scoreKey="culture"
                  scoreLabel="Culture Readiness"
                />

                <CheckboxSection
                  title="5) Engagement Channels"
                  items={engagementItems}
                  scoreKey="engagement"
                  scoreLabel="Engagement Readiness"
                />
              </div>
            </div>
          </div>

          {/* Overall Readiness Score */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-[24px] py-[16px] border-b border-gray-200">
              <h2 className="text-[20px] font-semibold text-gray-800">
                Overall Voice of Employee Readiness Score
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

              <div className="bg-gray-50 rounded-lg p-[16px] mb-[24px]">
                <h3 className="font-medium text-gray-800 mb-[8px]">Summary</h3>
                <p className="text-gray-700">
                  {getScoreMessage(readiness.overall)}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[16px]">
                <div className="bg-blue-50 rounded-lg p-[16px]">
                  <h4 className="font-medium text-blue-800 mb-[4px]">
                    Response Mechanisms
                  </h4>
                  <p className="text-[24px] font-bold text-blue-900">
                    {readiness.responseMechanisms}%
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-[16px]">
                  <h4 className="font-medium text-green-800 mb-[4px]">
                    Data Security
                  </h4>
                  <p className="text-[24px] font-bold text-green-900">
                    {readiness.dataSecurity}%
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-[16px]">
                  <h4 className="font-medium text-purple-800 mb-[4px]">
                    Leadership
                  </h4>
                  <p className="text-[24px] font-bold text-purple-900">
                    {readiness.leadership}%
                  </p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-[16px]">
                  <h4 className="font-medium text-indigo-800 mb-[4px]">
                    Culture
                  </h4>
                  <p className="text-[24px] font-bold text-indigo-900">
                    {readiness.culture}%
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-[16px]">
                  <h4 className="font-medium text-orange-800 mb-[4px]">
                    Engagement
                  </h4>
                  <p className="text-[24px] font-bold text-orange-900">
                    {readiness.engagement}%
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
