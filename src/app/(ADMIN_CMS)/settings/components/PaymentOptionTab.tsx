"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface PaymentOptionTabProps {
  onAddPaymentClick?: () => void;
  setHeaderAction?: (action: React.ReactNode) => void;
}

export default function PaymentOptionTab({ 
  onAddPaymentClick,
  setHeaderAction 
}: PaymentOptionTabProps) {
  const [selected, setSelected] = useState<"flutterwave" | "paystack" | null>(
    "flutterwave"
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<"flutterwave" | "paystack" | null>(null);

  // Set the header button when this component mounts
  useEffect(() => {
    if (setHeaderAction) {
      setHeaderAction(
        <button 
          onClick={onAddPaymentClick}
          className="px-4 py-2 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] font-medium"
        >
          + Add payment method
        </button>
      );
    }

    // Clear the header button when component unmounts (switching tabs)
    return () => {
      if (setHeaderAction) {
        setHeaderAction(null);
      }
    };
  }, [setHeaderAction, onAddPaymentClick]);

  const handleEdit = (method: "flutterwave" | "paystack") => {
    setEditingMethod(method);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingMethod(null);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-8">
        Payment option
      </h3>

      {/* Payment Methods */}
      <div className="space-y-6">
        {/* ===== Flutterwave Card ===== */}
        <div className="w-full border border-gray-200 bg-white rounded-lg p-6 flex items-center justify-between transition hover:border-gray-300">
          <button
            onClick={() => setSelected("flutterwave")}
            className="flex items-center space-x-4 flex-1"
          >
            {/* Custom green radio */}
            <div
              className={`
                w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                ${selected === "flutterwave" ? "border-[#15340B]" : "border-gray-400"}
              `}
            >
              {selected === "flutterwave" && (
                <div className="w-2 h-2 bg-[#15340B] rounded-full"></div>
              )}
            </div>

            <Image
              src="/assets/flutterwave.png"
              alt="Flutterwave Logo"
              width={150}
              height={40}
              className="object-contain"
            />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit("flutterwave");
            }}
            className="px-4 py-2 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] font-medium"
          >
            Edit
          </button>
        </div>

        {/* ===== Paystack Card ===== */}
        <div className="w-full border border-gray-200 bg-white rounded-lg p-6 flex items-center justify-between transition hover:border-gray-300">
          <button
            onClick={() => setSelected("paystack")}
            className="flex items-center space-x-4 flex-1"
          >
            {/* Custom green radio */}
            <div
              className={`
                w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0
                ${selected === "paystack" ? "border-[#15340B]" : "border-gray-400"}
              `}
            >
              {selected === "paystack" && (
                <div className="w-2 h-2 bg-[#15340B] rounded-full"></div>
              )}
            </div>

            <Image
              src="/assets/paystack.png"
              alt="Paystack Logo"
              width={150}
              height={40}
              className="object-contain"
            />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit("paystack");
            }}
            className="px-4 py-2 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] font-medium"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Edit</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Payment Provider Logo */}
            <div className="mb-6">
              {editingMethod === "flutterwave" ? (
                <Image
                  src="/assets/flutterwave.png"
                  alt="Flutterwave Logo"
                  width={150}
                  height={40}
                  className="object-contain"
                />
              ) : (
                <Image
                  src="/assets/paystack.png"
                  alt="Paystack Logo"
                  width={150}
                  height={40}
                  className="object-contain"
                />
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select className="w-full px-4 py-2 bg-white border border-[#15340B] rounded-lg focus:ring-2 focus:ring-[#15340B] focus:border-[#15340B] outline-none">
                  <option>NGN</option>
                  <option>USD</option>
                  <option>GBP</option>
                  <option>EUR</option>
                </select>
              </div>

              {/* Public Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Public key
                </label>
                <input
                  type="text"
                  placeholder="Enter public key"
                  className="w-full px-4 py-2 border border-[#15340B] rounded-lg focus:ring-2 focus:ring-[#15340B] focus:border-[#15340B] outline-none"
                />
              </div>

              {/* Secret Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secret key
                </label>
                <input
                  type="password"
                  placeholder="Enter secret key"
                  className="w-full px-4 py-2 border border-[#15340B] rounded-lg focus:ring-2 focus:ring-[#15340B] focus:border-[#15340B] outline-none"
                />
              </div>

              {/* Webhook URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  placeholder="Enter webhook URL"
                  className="w-full px-4 py-2 border border-[#15340B] rounded-lg focus:ring-2 focus:ring-[#15340B] focus:border-[#15340B] outline-none"
                />
              </div>
            </div>

            {/* Save Button */}
            <button className="w-full mt-6 px-4 py-3 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] font-medium">
              Save changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}