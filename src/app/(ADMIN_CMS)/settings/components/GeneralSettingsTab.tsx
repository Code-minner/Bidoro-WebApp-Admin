"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function GeneralSettingsTab() {
  const [logos, setLogos] = useState({
    websiteNav: "/assets/Frame 1.png",
    websiteFooter: "/assets/Frame 2.png",
    dashboard: "/assets/Frame 1.png",
    favicon: "/assets/Frame 3.png",
  });

  const handleFileUpload = (type: string) => {
    // Handle file upload logic here
    console.log(`Uploading ${type} logo`);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-8">
        General settings
      </h3>

      <div className="space-y-8">
        {/* Logo Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Website Nav Logo */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Website nav logo
            </h4>
            <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-4">
              <Image
                src={logos.websiteNav}
                alt="Website Nav Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            <button
              onClick={() => handleFileUpload("websiteNav")}
              className="w-full px-4 py-2 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] font-medium"
            >
              Edit
            </button>
          </div>

          {/* Website Footer Logo */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Website footer logo
            </h4>
            <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center mb-4">
              <Image
                src={logos.websiteFooter}
                alt="Website Footer Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            <button
              onClick={() => handleFileUpload("websiteFooter")}
              className="w-full px-4 py-2 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] font-medium"
            >
              Edit
            </button>
          </div>

          {/* Dashboard Logo */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Dashboard logo
            </h4>
            <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-4">
              <Image
                src={logos.dashboard}
                alt="Dashboard Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            <button
              onClick={() => handleFileUpload("dashboard")}
              className="w-full px-4 py-2 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] font-medium"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Favicon Section */}
        <div className="grid grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Favicon</h4>
            <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-[#15340B] rounded-lg flex items-center justify-center">
                <Image
                  src={logos.favicon}
                  alt="Favicon"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
            <button
              onClick={() => handleFileUpload("favicon")}
              className="w-full px-4 py-2 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] font-medium"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}