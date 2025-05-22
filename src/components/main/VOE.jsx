import { useState, useEffect } from "react";

export default function VoeAssessment() {
  const userData = { fullName: "xyz" };
  function onBack() {}
  const [formData, setFormData] = useState({
    // Voice of Customer checkboxes
    nps: false,
    survey: false,
    social: false,
    crm: false,
    feedback: false,
  });

  // Readiness scores state
  const [readiness, setReadiness] = useState({
    dataCollection: 0,
    techReadiness: 0,
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

    // Calculate overall score
    const overallScore = calculateOverallScore(
      dataCollectionScore,
      techReadinessScore
    );

    setReadiness({
      dataCollection: dataCollectionScore,
      techReadiness: techReadinessScore,
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
  const calculateOverallScore = (dataCollection, techReadiness) => {
    return Math.round((dataCollection + techReadiness) / 2);
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

  return (
    <div className="min-h-screen bg-gray-50 py-52 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg mb-6 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-2">
                Voice of Customer Assessment
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
          {/* Voice of Customer Section */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
              <h2 className="text-xl font-semibold text-blue-800">
                Voice of Customer Checklist
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Data Collection */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    1) Data Collection
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="nps"
                        name="nps"
                        checked={formData.nps}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-3 text-gray-700" htmlFor="nps">
                        Net Promoter Score (NPS)
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
                      <label className="ml-3 text-gray-700" htmlFor="survey">
                        Customer Surveys
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
                      <label className="ml-3 text-gray-700" htmlFor="social">
                        Social Media Monitoring
                      </label>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Data Collection Readiness
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {readiness.dataCollection}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${getProgressBarClass(
                          readiness.dataCollection
                        )}`}
                        style={{ width: `${readiness.dataCollection}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Tech Readiness */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    2) Technology Readiness
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="crm"
                        name="crm"
                        checked={formData.crm}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-3 text-gray-700" htmlFor="crm">
                        CRM System
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
                      <label className="ml-3 text-gray-700" htmlFor="feedback">
                        Feedback Management System
                      </label>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Tech Readiness
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {readiness.techReadiness}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${getProgressBarClass(
                          readiness.techReadiness
                        )}`}
                        style={{ width: `${readiness.techReadiness}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
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

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">
                  Assessment Summary
                </h3>
                <p className="text-gray-700">
                  {getScoreMessage(readiness.overall)}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-1">
                    Data Collection
                  </h4>
                  <p className="text-2xl font-bold text-blue-900">
                    {readiness.dataCollection}%
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-1">
                    Technology Readiness
                  </h4>
                  <p className="text-2xl font-bold text-blue-900">
                    {readiness.techReadiness}%
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
