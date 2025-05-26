import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VoeAssessment() {
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
    formType: "VOE",
  };

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

  // Handle checkbox changes - only if form is not locked
  const handleInputChange = (e) => {
    if (isFormLocked) return;

    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
      return "Your organization needs significant improvement in Employee Trust factors.";
    } else if (score >= 30 && score < 70) {
      return "Your organization has moderate Employee Trust but there's room for improvement.";
    } else {
      return "Your organization demonstrates strong Employee Trust across key areas.";
    }
  };

  // Submit form data to Netlify
  const submitToNetlify = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create FormData object for submission
      const submissionData = new FormData();

      // Add form name and user details
      submissionData.append("form-name", "employee-trust-assessment");
      submissionData.append("fullName", userData.fullName);
      submissionData.append("companyEmail", userData.companyEmail);
      submissionData.append("companyName", userData.companyName);
      submissionData.append("jobRole", userData.jobRole);
      submissionData.append("formType", "employee-trust");

      // Add all checkbox values from formData state
      Object.keys(formData).forEach((key) => {
        submissionData.append(key, formData[key] ? "true" : "false");
      });

      // Add readiness scores
      submissionData.append(
        "responseMechanismsScore",
        readiness.responseMechanisms
      );
      submissionData.append("dataSecurityScore", readiness.dataSecurity);
      submissionData.append("leadershipScore", readiness.leadership);
      submissionData.append("cultureScore", readiness.culture);
      submissionData.append("engagementScore", readiness.engagement);
      submissionData.append("overallScore", readiness.overall);

      // Add submission timestamp
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      submissionData.append("submissionDate", currentDate);
      submissionData.append("submissionTime", currentTime);

      // Submit to Netlify
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(submissionData).toString(),
      });

      if (response.ok) {
        setSubmitStatus("success");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle showing overall score and auto-submit (Fixed to match Customer Trust flow)
  const handleShowOverallScore = async () => {
    setShowOverallScore(true);
    setIsFormLocked(true);

    // Auto-submit the form when overall score is shown
    await submitToNetlify();
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

    // Generate PDF content
    const sections = [
      generateSectionContent(
        "Employee Response Mechanisms",
        responseMechanismsItems,
        "responseMechanisms"
      ),
      generateSectionContent(
        "Data Privacy & Security Measures",
        dataSecurityItems,
        "dataSecurity"
      ),
      generateSectionContent(
        "Leadership Support",
        leadershipItems,
        "leadership"
      ),
      generateSectionContent(
        "Culture of Openness & Feedback",
        cultureItems,
        "culture"
      ),
      generateSectionContent(
        "Engagement Channels",
        engagementItems,
        "engagement"
      ),
    ];

    const pdfContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Employee Trust Assessment Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 25px; page-break-inside: avoid; }
        .score-bar { height: 20px; background: #f0f0f0; border-radius: 10px; margin: 10px 0; }
        .score-fill { height: 100%; border-radius: 10px; }
        .low { background: #ef4444; }
        .medium { background: #eab308; }
        .high { background: #22c55e; }
        .selected { color: #22c55e; }
        .unselected { color: #ef4444; }
        ul { margin: 10px 0; }
        li { margin: 5px 0; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Employee Trust Assessment Report</h1>
        <h2>${userData.fullName}</h2>
        <p><strong>Company:</strong> ${userData.companyName}</p>
        <p><strong>Role:</strong> ${userData.jobRole}</p>
        <p><strong>Email:</strong> ${userData.companyEmail}</p>
        <p><strong>Assessment Date:</strong> ${currentDate} at ${currentTime}</p>
      </div>

      <div class="section">
        <h2>Overall Employee Trust Score: ${readiness.overall}%</h2>
        <div class="score-bar">
          <div class="score-fill ${
            readiness.overall < 30
              ? "low"
              : readiness.overall < 70
              ? "medium"
              : "high"
          }" 
               style="width: ${readiness.overall}%"></div>
        </div>
        <p><strong>Summary:</strong> ${getScoreMessage(readiness.overall)}</p>
      </div>

      ${sections
        .map(
          (section) => `
        <div class="section">
          <h3>${section.title}: ${section.score}%</h3>
          <div class="score-bar">
            <div class="score-fill ${
              section.score < 30
                ? "low"
                : section.score < 70
                ? "medium"
                : "high"
            }" 
                 style="width: ${section.score}%"></div>
          </div>
          <p><strong>Selected (${section.selectedItems.length}/${
            section.total
          }):</strong></p>
          <ul>
            ${section.selectedItems
              .map((item) => `<li class="selected">✓ ${item.label}</li>`)
              .join("")}
            ${
              section.selectedItems.length === 0 ? "<li>None selected</li>" : ""
            }
          </ul>
          <p><strong>Not Selected (${section.unselectedItems.length}/${
            section.total
          }):</strong></p>
          <ul>
            ${section.unselectedItems
              .map((item) => `<li class="unselected">✗ ${item.label}</li>`)
              .join("")}
            ${
              section.unselectedItems.length === 0
                ? "<li>All items selected</li>"
                : ""
            }
          </ul>
        </div>
      `
        )
        .join("")}

    </body>
    </html>
    `;

    // Create PDF using print functionality
    const printWindow = window.open("", "_blank");
    printWindow.document.write(pdfContent);
    printWindow.document.close();

    // Set title for the print dialog
    printWindow.document.title = `Employee_Trust_Assessment_${userData.fullName.replace(
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
        {/* Header - Updated styling to match Customer Trust */}
        <div className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-2xl p-8 mb-8 border border-gray-100">
          <div className="space-y-2">
            <h1 className="primaryColor text-2xl sm:text-3xl font-[600] text-primary mb-4 tracking-tight">
              EMPLOYEE TRUST
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
          {/* Employee Trust Checklist */}
          <div className="bg-white shadow-sm rounded-[8px] overflow-hidden">
            <div className="bg-purple-50 px-[24px] py-[16px] border-b border-purple-100">
              <h2 className="text-[20px] font-semibold primaryColor">
                Employee Trust Checklist
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

          {/* Overall Readiness Score - Only show if button was clicked */}
          {showOverallScore && (
            <div className="bg-white shadow-sm rounded-[8px] overflow-hidden">
              <div className="bg-gray-50 px-[24px] py-[16px] border-b border-gray-200">
                <h2 className="text-[20px] font-semibold text-gray-800">
                  Overall Employee Trust Readiness Score
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
                      Response Mechanisms
                    </h4>
                    <p className="text-[24px] font-bold text-blue-900">
                      {readiness.responseMechanisms}%
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-[8px] p-[16px]">
                    <h4 className="font-medium text-green-800 mb-[4px]">
                      Data Security
                    </h4>
                    <p className="text-[24px] font-bold text-green-900">
                      {readiness.dataSecurity}%
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-[8px] p-[16px]">
                    <h4 className="font-medium text-purple-800 mb-[4px]">
                      Leadership
                    </h4>
                    <p className="text-[24px] font-bold text-purple-900">
                      {readiness.leadership}%
                    </p>
                  </div>
                  <div className="bg-indigo-50 rounded-[8px] p-[16px]">
                    <h4 className="font-medium text-indigo-800 mb-[4px]">
                      Culture
                    </h4>
                    <p className="text-[24px] font-bold text-indigo-900">
                      {readiness.culture}%
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-[8px] p-[16px]">
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
                  : "Your assessment is complete. Download results or continue to Customer Trust."}
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
                  className={`px-[24px] cursor-pointer py-[12px] text-[16px] font-medium text-white border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg_primary hover:bg-purple-700"
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
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
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002 2m0 0V5a2 2 0 012-2h2a2 2 0 012-2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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
                    className="cursor-pointer px-[24px] py-[12px] text-[16px] font-medium text-black bg-gray-100 hover:bg-gray-300 border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2"
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
                      navigate("/customer-trust");
                    }}
                    className="cursor-pointer px-[24px] py-[12px] text-[16px] font-medium text-white bg_primary hover:bg-purple-700 border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors flex items-center justify-center gap-2"
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
                    Check Customer Trust
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
