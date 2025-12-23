import { useState, useEffect } from "react";
import { Copy, Download, Check } from "lucide-react";

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    corporation: "",
    candidateName: "",
    ward: "",
    mobile: "",
    amount: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Payment details
  const paymentDetails = {
    upiId: "9226333789@hdfc",
    mobileNumber: "9226333789",
    qrCode: "/img/qrImage.jpeg",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.corporation.trim()) {
      newErrors.corporation = "Required";
    }

    if (!formData.candidateName.trim()) {
      newErrors.candidateName = "Required";
    }

    if (!formData.ward.trim()) {
      newErrors.ward = "Required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    if (!formData.amount.trim()) {
      newErrors.amount = "Required";
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Invalid amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxzd1MiSzWFBBLd0bihUOUKES81KpzFqu7A1pnjTblwp43ug3UW0I1FwmZsHg19SvcMjA/exec";

      // Get IST date and time
      const now = new Date();
      const istTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      const date = istTime.toLocaleDateString("en-IN");
      const time = istTime.toLocaleTimeString("en-IN");

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          corporation: formData.corporation,
          candidateName: formData.candidateName,
          ward: formData.ward,
          mobile: formData.mobile,
          amount: formData.amount,
          date: date,
          time: time,
        }),
      });

      setShowPayment(true);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      corporation: "",
      candidateName: "",
      ward: "",
      mobile: "",
      amount: "",
    });
    setShowPayment(false);
    setShowSuccessModal(false);
    setErrors({});
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = paymentDetails.qrCode;
    link.download = "Prasaar-payment-qr-code.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendWhatsAppMessage = () => {
    const message = `नमस्कार / Hello,

मी पेमेंट केले आहे. खालील माहिती पहा:
I have completed the payment. Please find details below:

नाव / Name: ${formData.candidateName}
मोबाईल / Mobile: ${formData.mobile}
महानगरपालिका / Corporation: ${formData.corporation}
प्रभाग / Ward: ${formData.ward}
रक्कम / Amount: ₹${formData.amount}

पेमेंट स्क्रीनशॉट खाली आहे.
Payment screenshot is attached below. 
  
https://prasaar.co/pay`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=919226333789&text=${encodedMessage}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className=" lg:py-20 pt-24 px-4 bg-gray-50">
      <div className={`mx-auto ${showPayment ? "max-w-6xl" : "max-w-xl"}`}>
        <div
          className={`bg-white rounded-lg shadow-sm border border-gray-200 ${
            showPayment ? "grid lg:grid-cols-2 gap-0" : ""
          }`}
        >
          {showPayment && (
            <div className="border-l border-gray-200 bg-gray-50">
              <div className="py-6 px-6 bg-gradient-to-r from-[#a00235] to-[#c60240] border-b">
                <h2 className="text-xl font-medium text-white text-center">
                  Payment Details / पेमेंट तपशील
                </h2>
              </div>

              <div className="p-6">
                <div className="border rounded bg-white p-4 mb-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 text-center">
                    Scan QR Code / QR कोड स्कॅन करा
                  </h3>

                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <img
                        src={paymentDetails.qrCode}
                        alt="Payment QR Code"
                        className="w-72 h-72 border-2 border-gray-200 rounded"
                      />
                      <button
                        onClick={downloadQR}
                        className="absolute top-1 right-1 bg-white p-1.5 rounded shadow-md hover:bg-gray-50"
                        title="Download QR"
                      >
                        <Download className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">UPI ID</p>
                          <p className="text-base font-medium">
                            {paymentDetails.upiId}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(paymentDetails.upiId, "upi")
                          }
                          className="p-2 hover:bg-gray-200 rounded transition-colors"
                          title="Copy UPI ID"
                        >
                          {copiedField === "upi" ? (
                            <Check className="w-5 h-5 lg:w-4 lg:h-4 text-green-600" />
                          ) : (
                            <Copy className="w-5 h-5 lg:w-4 lg:h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            Pay To Mobile Number / मोबाईल क्रमांकावर पेमेंट करा
                          </p>
                          <p className="text-base font-medium">
                            {paymentDetails.mobileNumber}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              paymentDetails.mobileNumber,
                              "mobile"
                            )
                          }
                          className="p-2 hover:bg-gray-200 rounded transition-colors"
                          title="Copy Mobile Number"
                        >
                          {copiedField === "mobile" ? (
                            <Check className="w-5 h-5 lg:w-4 lg:h-4 text-green-600" />
                          ) : (
                            <Copy className="w-5 h-5 lg:w-4 lg:h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
                  <p className="font-medium mb-1">Note / टीप:</p>
                  <p>
                    After payment, click "Payment Done" and send screenshot on
                    WhatsApp for verification.
                  </p>
                  <p className="mt-1">
                    पेमेंट केल्यानंतर, "पेमेंट झाले" वर क्लिक करा आणि
                    पडताळणीसाठी व्हाट्सअॅपवर स्क्रीनशॉट पाठवा.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className={showPayment ? "" : ""}>
            <div className="py-6 px-6 bg-gradient-to-r from-[#c60240] to-[#a00235] border-b">
              <h1 className="text-xl font-medium text-white text-center">
                Payment Registration / पेमेंट नोंदणी
              </h1>
            </div>

            <div className="p-8">
              {!showPayment ? (
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Corporation / महानगरपालिका *
                    </label>
                    <input
                      type="text"
                      name="corporation"
                      value={formData.corporation}
                      onChange={handleChange}
                      className={`w-full px-3 py-2.5 text-base border ${
                        errors.corporation
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded focus:ring-1 focus:ring-[#c60240] focus:border-[#c60240] outline-none`}
                      placeholder="Enter corporation / महानगरपालिका प्रविष्ट करा"
                    />
                    {errors.corporation && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.corporation}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Candidate Name / उमेदवाराचे नाव *
                    </label>
                    <input
                      type="text"
                      name="candidateName"
                      value={formData.candidateName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2.5 text-base border ${
                        errors.candidateName
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded focus:ring-1 focus:ring-[#c60240] focus:border-[#c60240] outline-none`}
                      placeholder="Enter candidate name / उमेदवाराचे नाव प्रविष्ट करा"
                    />
                    {errors.candidateName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.candidateName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ward / प्रभाग *
                    </label>
                    <input
                      type="text"
                      name="ward"
                      value={formData.ward}
                      onChange={handleChange}
                      className={`w-full px-3 py-2.5 text-base border ${
                        errors.ward ? "border-red-500" : "border-gray-300"
                      } rounded focus:ring-1 focus:ring-[#c60240] focus:border-[#c60240] outline-none`}
                      placeholder="Enter ward / प्रभाग प्रविष्ट करा"
                    />
                    {errors.ward && (
                      <p className="mt-1 text-sm text-red-600">{errors.ward}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number / मोबाईल नंबर *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength="10"
                      className={`w-full px-3 py-2.5 text-base border ${
                        errors.mobile ? "border-red-500" : "border-gray-300"
                      } rounded focus:ring-1 focus:ring-[#c60240] focus:border-[#c60240] outline-none`}
                      placeholder="Enter 10-digit mobile / १० अंकी मोबाईल नंबर"
                    />
                    {errors.mobile && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Amount (₹) / पेमेंट रक्कम (₹) *
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className={`w-full px-3 py-2.5 text-base border ${
                        errors.amount ? "border-red-500" : "border-gray-300"
                      } rounded focus:ring-1 focus:ring-[#c60240] focus:border-[#c60240] outline-none`}
                      placeholder="Enter amount / रक्कम प्रविष्ट करा"
                    />
                    {errors.amount && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.amount}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-[#c60240] text-white py-3 text-base rounded font-medium hover:bg-[#a00235] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? "Processing... / प्रक्रिया सुरू आहे..."
                      : `Pay ₹${formData.amount || "0"} / पेमेंट करा ₹${
                          formData.amount || "0"
                        }`}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="bg-gray-50 rounded p-4 mb-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      Registration Details / नोंदणी तपशील
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Corporation / महानगरपालिका:
                        </span>
                        <span className="font-medium">
                          {formData.corporation}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Candidate / उमेदवार:
                        </span>
                        <span className="font-medium">
                          {formData.candidateName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ward / प्रभाग:</span>
                        <span className="font-medium">{formData.ward}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mobile / मोबाईल:</span>
                        <span className="font-medium">{formData.mobile}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-900 font-medium">
                          Amount / रक्कम:
                        </span>
                        <span className="font-semibold text-[#c60240]">
                          ₹{formData.amount}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowSuccessModal(true)}
                    className="w-full bg-green-600 text-white py-3 text-base rounded font-medium hover:bg-green-700 transition-colors"
                  >
                    Payment Done / पेमेंट झाले &#8594;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {showSuccessModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-12 z-50"
            onClick={() => setShowSuccessModal(false)}
          >
            <div
              className="bg-white rounded-lg px-8 py-8 lg:w-[400px] w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Payment Confirmed! / पेमेंट पूर्ण झाले!
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Please send payment screenshot on WhatsApp to verify.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  कृपया पडताळणीसाठी पेमेंट स्क्रीनशॉट व्हाट्सअॅपवर पाठवा.
                </p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    sendWhatsAppMessage();
                    setTimeout(() => handleReset(), 1000);
                  }}
                  className="w-full bg-green-600 text-white py-3 text-base rounded font-medium hover:bg-green-700 transition-colors mb-2"
                >
                  Send on WhatsApp / व्हाट्सअॅपवर पाठवा
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    handleReset();
                  }}
                  className="w-full bg-gray-200 text-gray-700 py-2.5 text-base rounded font-medium hover:bg-gray-300 transition-colors"
                >
                  Close / बंद करा
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
