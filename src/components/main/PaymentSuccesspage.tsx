import { useState, useEffect } from "react";

const PaymentSuccessPage = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        paymentId: "",
        timestamp: "",
    });

    useEffect(() => {
        window.scrollTo(0, 0);

        // Get payment ID from URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = urlParams.get("payment_id");

        if (paymentId) {
            setPaymentDetails({
                paymentId: paymentId,
                timestamp: new Date().toLocaleString(),
            });
        }
    }, []);

    const handleGoHome = () => {
        window.location.href = "/";
    };

    const handleNewRegistration = () => {
        window.location.href = "/payment";
    };

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-green-50">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
                    {/* Success Header */}
                    <div className="relative py-10 px-8 bg-gradient-to-r from-green-500 to-green-600">
                        <div className="absolute inset-0 bg-black opacity-5"></div>
                        <div className="relative flex justify-center mb-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <svg
                                    className="w-10 h-10 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="relative text-center">
                            <h1 className="text-2xl font-bold text-white mb-2">
                                Payment Successful!
                            </h1>
                            <p className="text-green-50 text-sm">
                                Your registration has been completed successfully
                            </p>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="px-6 sm:px-8 py-8">
                        <div className="space-y-5">
                            {/* Confirmation Message */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border border-green-200">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <svg
                                            className="w-5 h-5 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                                            Registration Complete
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Thank you for completing your payment. Your registration has been processed successfully.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-5 border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-2 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    Payment Details
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100">
                                        <span className="text-xs text-gray-600 font-medium">Payment ID</span>
                                        <span className="text-xs text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                                            {paymentDetails.paymentId || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100">
                                        <span className="text-xs text-gray-600 font-medium">Date & Time</span>
                                        <span className="text-xs text-gray-900 font-medium">
                                            {paymentDetails.timestamp}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100">
                                        <span className="text-xs text-gray-600 font-medium">Status</span>
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                                            Completed
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Next Steps */}


                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    onClick={handleGoHome}
                                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg"
                                >
                                    Go to Home
                                </button>
                                <button
                                    onClick={handleNewRegistration}
                                    className="flex-1 bg-white border-2 border-green-600 text-green-600 py-3 rounded-lg text-sm font-medium hover:bg-green-50 transition-all"
                                >
                                    New Registration
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;