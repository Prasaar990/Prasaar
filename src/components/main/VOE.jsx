import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VoeAssessment() {
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

  // Handle checkbox changes
  const handleInputChange = (e) => {
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
    const pdfContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Employee Trust Assessment Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }
            .header { text-align: center; border-bottom: 3px solid #b42642; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { color: #b42642; font-size: 28px; margin: 0; }
            .header p { color: #6b7280; margin: 5px 0; }
            .section { margin-bottom: 30px; }
            .section-title { color: #b42642; font-size: 20px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
            .subsection-title { color: #374151; font-size: 16px; font-weight: bold; margin-bottom: 10px; }
            .score-container { background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .score-large { font-size: 36px; font-weight: bold; color: #b42642; text-align: center; }
            .score-breakdown { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-top: 20px; }
            .score-item { background: #f9fafb; padding: 15px; border-radius: 8px; text-align: center; border-left: 4px solid #b42642; }
            .score-item h4 { margin: 0 0 10px 0; color: #374151; font-size: 14px; }
            .score-item p { margin: 0; font-size: 24px; font-weight: bold; color: #b42642; }
            .assessment-section { background: #f9fafb; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
            .checkbox-list { margin: 15px 0; }
            .checkbox-item { margin: 5px 0; padding: 5px 0; }
            .selected { color: #059669; font-weight: 500; }
            .unselected { color: #6b7280; }
            .checkmark { color: #059669; font-weight: bold; }
            .crossmark { color: #dc2626; font-weight: bold; }
            .summary-box { background: #dbeafe; padding: 20px; border-radius: 8px; border-left: 6px solid #b42642; margin: 20px 0; }
            .recommendations { background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 6px solid #f59e0b; }
            .page-break { page-break-before: always; }
            @media print { body { margin: 20px; } .page-break { page-break-before: always; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Employee Trust ASSESSMENT REPORT</h1>
            <p><strong>Assessment Date:</strong> ${currentDate} at ${currentTime}</p>
            <div style="margin-top: 20px;">
              <p><strong>Name:</strong> ${userData.fullName}</p>
              <p><strong>Email:</strong> ${userData.companyEmail}</p>
              <p><strong>Company:</strong> ${userData.companyName}</p>
              <p><strong>Job Role:</strong> ${userData.jobRole}</p>
            </div>
          </div>

          <div class="section">
            <div class="section-title">OVERALL READINESS SCORE</div>
            <div class="score-container">
              <div class="score-large">${readiness.overall}%</div>
              <div class="summary-box">
                <strong>Assessment Summary:</strong><br>
                ${getScoreMessage(readiness.overall)}
              </div>
            </div>
            
            <div class="score-breakdown">
              <div class="score-item">
                <h4>Response Mechanisms</h4>
                <p>${readiness.responseMechanisms}%</p>
              </div>
              <div class="score-item">
                <h4>Data Security</h4>
                <p>${readiness.dataSecurity}%</p>
              </div>
              <div class="score-item">
                <h4>Leadership</h4>
                <p>${readiness.leadership}%</p>
              </div>
              <div class="score-item">
                <h4>Culture</h4>
                <p>${readiness.culture}%</p>
              </div>
              <div class="score-item">
                <h4>Engagement</h4>
                <p>${readiness.engagement}%</p>
              </div>
            </div>
          </div>

          <div class="page-break"></div>

          <div class="section">
            <div class="section-title">DETAILED ASSESSMENT RESULTS</div>
            
            ${[
              generateSectionContent(
                "1) EMPLOYEE RESPONSE MECHANISMS",
                responseMechanismsItems,
                "responseMechanisms"
              ),
              generateSectionContent(
                "2) DATA PRIVACY & SECURITY MEASURES",
                dataSecurityItems,
                "dataSecurity"
              ),
              generateSectionContent(
                "3) LEADERSHIP SUPPORT",
                leadershipItems,
                "leadership"
              ),
              generateSectionContent(
                "4) CULTURE OF OPENNESS & FEEDBACK",
                cultureItems,
                "culture"
              ),
              generateSectionContent(
                "5) ENGAGEMENT CHANNELS",
                engagementItems,
                "engagement"
              ),
            ]
              .map(
                (section) => `
              <div class="assessment-section">
                <div class="subsection-title">${section.title}</div>
                <p><strong>Score: ${section.score}%</strong> (${
                  section.selectedItems.length
                }/${section.total} items selected)</p>
                
                <div class="checkbox-list">
                  <p><strong>✓ Selected Items (${
                    section.selectedItems.length
                  }):</strong></p>
                  ${
                    section.selectedItems.length > 0
                      ? section.selectedItems
                          .map(
                            (item) =>
                              `<div class="checkbox-item selected"><span class="checkmark">✓</span> ${item.label}</div>`
                          )
                          .join("")
                      : '<div class="checkbox-item unselected">None selected</div>'
                  }
                  
                  <p style="margin-top: 15px;"><strong>✗ Not Selected Items (${
                    section.unselectedItems.length
                  }):</strong></p>
                  ${
                    section.unselectedItems.length > 0
                      ? section.unselectedItems
                          .map(
                            (item) =>
                              `<div class="checkbox-item unselected"><span class="crossmark">✗</span> ${item.label}</div>`
                          )
                          .join("")
                      : '<div class="checkbox-item selected">All items selected</div>'
                  }
                </div>
              </div>
            `
              )
              .join("")}
          </div>

          <div class="section">
            <div class="section-title">RECOMMENDATIONS</div>
            <div class="recommendations">
              <p><strong>Based on your overall score of ${
                readiness.overall
              }%, here are key areas to focus on:</strong></p>
              <ul>
                ${
                  readiness.responseMechanisms < 70
                    ? "<li><strong>Improve Employee Response Mechanisms</strong> - Consider implementing more feedback collection methods to capture comprehensive employee insights.</li>"
                    : ""
                }
                ${
                  readiness.dataSecurity < 70
                    ? "<li><strong>Strengthen Data Privacy & Security</strong> - Enhance security measures and transparency to build employee trust in feedback systems.</li>"
                    : ""
                }
                ${
                  readiness.leadership < 70
                    ? "<li><strong>Increase Leadership Support</strong> - Enhance leadership commitment and visible support for employee voice initiatives.</li>"
                    : ""
                }
                ${
                  readiness.culture < 70
                    ? "<li><strong>Build Culture of Openness</strong> - Foster an environment where employees feel safe to provide honest feedback.</li>"
                    : ""
                }
                ${
                  readiness.engagement < 70
                    ? "<li><strong>Improve Engagement Channels</strong> - Create better systems for acting on employee feedback and closing the loop.</li>"
                    : ""
                }
                ${
                  readiness.overall >= 70
                    ? "<li><strong>Maintain Excellence</strong> - Continue to strengthen your existing capabilities and consider advanced employee voice strategies.</li>"
                    : ""
                }
              </ul>
            </div>
          </div>

          <div style="text-align: center; margin-top: 50px; padding-top: 30px; border-top: 2px solid #e5e7eb; color: #6b7280;">
            <p>Generated On Prasaar: https://prasaar.co </p>
            <p style="font-size: 12px;">Report generated on ${currentDate} at ${currentTime}</p>
          </div>
        </body>
      </html>
    `;

    // Create PDF using print functionality
    const printWindow = window.open("", "_blank");
    printWindow.document.write(pdfContent);
    printWindow.document.close();

    // Set title for the print dialog
    printWindow.document.title = `Employee_Trust_Assessment_Report_${userData.fullName.replace(
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
                <h3 className="font-medium text-gray-800 mb-[8px]">Summary</h3>
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

          {/* Action Buttons Section - Moved to bottom with matching styles */}
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
                className="px-[24px] py-[12px] text-[16px] font-medium text-black bg-gray-100  hover:bg-gray-300 border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2"
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
                  navigate("/customer-trust");
                }}
                className="px-[24px] py-[12px] text-[16px] font-medium text-white bg_primary hover:bg-purple-700 border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors flex items-center justify-center gap-2"
              >
                Check Customer Trust
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
