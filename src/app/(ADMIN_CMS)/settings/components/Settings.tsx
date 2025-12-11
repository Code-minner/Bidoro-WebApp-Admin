// Main Settings Component - app/settings/components/Settings.tsx
"use client";
import React, { useState } from "react";
import AdminHeader from "../../../../components/AdminHeader";
import ProfileTab from "./ProfileTab";
import GeneralSettingsTab from "./GeneralSettingsTab";
import PaymentOptionTab from "./PaymentOptionTab";
import NotificationTab from "./NotificationTab";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [headerAction, setHeaderAction] = useState<React.ReactNode>(null);

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "general", label: "General settings" },
    { id: "payment", label: "Payment option" },
    { id: "notification", label: "Notification" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "general":
        return <GeneralSettingsTab />;
      case "payment":
        return (
          <PaymentOptionTab 
            setHeaderAction={setHeaderAction}
            onAddPaymentClick={() => console.log("Add payment method clicked")}
          />
        );
      case "notification":
        return <NotificationTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AdminHeader />

      <div className="flex-1 overflow-auto p-8">
        {/* Header with Title and Action Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
          {/* Button appears only when PaymentOptionTab sets it */}
          {headerAction}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 flex">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 p-6">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}