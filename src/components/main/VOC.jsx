import { useState, useEffect } from "react";

export default function Voc() {
  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    companyEmail: "",
    companyName: "",
    mobile: "",
    jobRole: "",
    // Voice of Customer checkboxes
    nps: false,
    survey: false,
    social: false,
    crm: false,
    feedback: false,
    // Voice of Employee checkboxes
    employeePulse: false,
    suggestionBox: false,
    exeSponsor: false,
    hrPolicies: false,
  });

  // Readiness scores state
  const [readiness, setReadiness] = useState({
    dataCollection: 0,
    techReadiness: 0,
    engagementChannels: 0,
    leadershipSupport: 0,
    overall: 0,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Calculate readiness scores whenever checkboxes change
  useEffect(() => {
    // Calculate Voice of Customer scores
    const dataCollectionScore = calculateScore([
      formData.nps,
      formData.survey,
      formData.social,
    ]);

    const techReadinessScore = calculateScore([
      formData.crm,
      formData.feedback,
    ]);

    // Calculate Voice of Employee scores
    const engagementChannelsScore = calculateScore([
      formData.employeePulse,
      formData.suggestionBox,
    ]);

    const leadershipSupportScore = calculateScore([
      formData.exeSponsor,
      formData.hrPolicies,
    ]);

    // Calculate overall score
    const overallScore = calculateOverallScore(
      dataCollectionScore,
      techReadinessScore,
      engagementChannelsScore,
      leadershipSupportScore
    );

    setReadiness({
      dataCollection: dataCollectionScore,
      techReadiness: techReadinessScore,
      engagementChannels: engagementChannelsScore,
      leadershipSupport: leadershipSupportScore,
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
  const calculateOverallScore = (
    dataCollection,
    techReadiness,
    engagementChannels,
    leadershipSupport
  ) => {
    return Math.round(
      (dataCollection +
        techReadiness +
        engagementChannels +
        leadershipSupport) /
        4
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you might want to do something with the form data here
    alert(`Overall Readiness Score: ${readiness.overall}%`);
  };

  // Get class for progress bar based on score
  const getProgressBarClass = (score) => {
    if (score < 30) return "bg-red-500";
    if (score < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg pt-24">
      <h1 className="text-2xl font-bold text-center text-blue-800 mb-6 ">
        Check Your Readiness
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Your Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="companyEmail"
              >
                Company Email
              </label>
              <input
                type="email"
                id="companyEmail"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="companyName"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mobile"
              >
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="jobRole"
              >
                Job Role
              </label>
              <input
                type="text"
                id="jobRole"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Readiness Assessment Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Voice of Customer Section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Voice of Customer Checklist
            </h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                1) Data Collection
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="nps"
                    name="nps"
                    checked={formData.nps}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-gray-700" htmlFor="nps">
                    NPS
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="survey"
                    name="survey"
                    checked={formData.survey}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-gray-700" htmlFor="survey">
                    Survey
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="social"
                    name="social"
                    checked={formData.social}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-gray-700" htmlFor="social">
                    Social
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium">
                  Readiness: {readiness.dataCollection}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div
                    className={`h-2.5 rounded-full ${getProgressBarClass(
                      readiness.dataCollection
                    )}`}
                    style={{ width: `${readiness.dataCollection}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                2) Tech Readiness
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="crm"
                    name="crm"
                    checked={formData.crm}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-gray-700" htmlFor="crm">
                    CRM
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="feedback"
                    name="feedback"
                    checked={formData.feedback}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-gray-700" htmlFor="feedback">
                    Feedback
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium">
                  Readiness: {readiness.techReadiness}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div
                    className={`h-2.5 rounded-full ${getProgressBarClass(
                      readiness.techReadiness
                    )}`}
                    style={{ width: `${readiness.techReadiness}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Voice of Employee Section */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Voice of Employee Checklist
            </h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                1) Engagement Channels
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="employeePulse"
                    name="employeePulse"
                    checked={formData.employeePulse}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label className="ml-2 text-gray-700" htmlFor="employeePulse">
                    Employee Pulse
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="suggestionBox"
                    name="suggestionBox"
                    checked={formData.suggestionBox}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label className="ml-2 text-gray-700" htmlFor="suggestionBox">
                    Suggestion Box
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium">
                  Readiness: {readiness.engagementChannels}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div
                    className={`h-2.5 rounded-full ${getProgressBarClass(
                      readiness.engagementChannels
                    )}`}
                    style={{ width: `${readiness.engagementChannels}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                2) Leadership Support
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="exeSponsor"
                    name="exeSponsor"
                    checked={formData.exeSponsor}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label className="ml-2 text-gray-700" htmlFor="exeSponsor">
                    Exe Sponsorship
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hrPolicies"
                    name="hrPolicies"
                    checked={formData.hrPolicies}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label className="ml-2 text-gray-700" htmlFor="hrPolicies">
                    HR Policies
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium">
                  Readiness: {readiness.leadershipSupport}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div
                    className={`h-2.5 rounded-full ${getProgressBarClass(
                      readiness.leadershipSupport
                    )}`}
                    style={{ width: `${readiness.leadershipSupport}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Readiness Score */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Overall Readiness Score
          </h2>
          <div className="flex items-center">
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium">
                  Score: {readiness.overall}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${getProgressBarClass(
                    readiness.overall
                  )}`}
                  style={{ width: `${readiness.overall}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-gray-700">
            {readiness.overall < 30 && (
              <p>
                Your organization needs significant improvement in readiness
                factors.
              </p>
            )}
            {readiness.overall >= 30 && readiness.overall < 70 && (
              <p>
                Your organization has moderate readiness but there&apos;s room
                for improvement.
              </p>
            )}
            {readiness.overall >= 70 && (
              <p>
                Your organization demonstrates strong readiness across key
                areas.
              </p>
            )}
          </div>
        </div>

        {/* <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            
          </button>
        </div> */}
      </form>
    </div>
  );
}
