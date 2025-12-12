// ProfileTab Component - app/settings/components/ProfileTab.tsx
// ===========================================

"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function ProfileTab() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "Example@gmail.com",
    phoneNumber: "08012345678",
    countryCode: "+234",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", formData);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile</h3>

      <div className="max-w-2xl">
        {/* Profile Picture */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src="/assets/user.png"
                alt="Profile"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15340B]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15340B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15340B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex gap-2">
              <select
                value={formData.countryCode}
                onChange={(e) => handleInputChange("countryCode", e.target.value)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15340B]"
              >
                <option value="+234">🇳🇬 +234</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15340B]"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSaveChanges}
              className="px-6 py-2.5 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] font-medium"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}