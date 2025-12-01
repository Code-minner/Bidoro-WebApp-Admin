// src/app/(ADMIN_CMS)/user-management/sellers/page.tsx
"use client";

import UserManagementHeader from "../components/UserManagementHeader";
import SellerTable from "./components/SellerTable";
import KYCSubmissionsTable from "./components/KYCSubmissionsTable";
import { useState } from "react";

const sellers = [
  { id: "1", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Active" as const, avatar: "/assets/user.png" },
  { id: "2", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Active" as const, avatar: "/assets/user.png" },
  { id: "3", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Active" as const, avatar: "/assets/user.png" },
  { id: "4", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Active" as const, avatar: "/assets/user.png" },
  { id: "5", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Active" as const, avatar: "/assets/user.png" },
  { id: "6", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Active" as const, avatar: "/assets/user.png" },
  { id: "7", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Active" as const, avatar: "/assets/user.png" },
  { id: "8", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Active" as const, avatar: "/assets/user.png" },
];

const kycSubmissions = [
  { id: "1", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Pending" as const, avatar: "/assets/user.png" },
  { id: "2", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Pending" as const, avatar: "/assets/user.png" },
  { id: "3", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Pending" as const, avatar: "/assets/user.png" },
  { id: "4", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Pending" as const, avatar: "/assets/user.png" },
  { id: "5", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Pending" as const, avatar: "/assets/user.png" },
  { id: "6", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", products: 312, location: "Ikorode", status: "Pending" as const, avatar: "/assets/user.png" },
];

export default function SellersPage() {
  const [activeTab, setActiveTab] = useState<"all" | "kyc">("all");

  return (
    <div className="min-h-screen bg-[#F6F5FA]">
      <UserManagementHeader />

      <main className="p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb and Tabs */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[#6C6C6C]">
              <span>User Management</span>
              <span>›</span>
              <span className="text-[#242424] font-medium">Sellers</span>
            </div>

            {/* Tabs with border */}
            <div className="inline-flex items-center gap-1 p-1 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "all"
                    ? "bg-white text-[#242424] shadow-sm"
                    : "text-[#6C6C6C] hover:text-[#242424]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("kyc")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "kyc"
                    ? "bg-white text-[#242424] shadow-sm"
                    : "text-[#6C6C6C] hover:text-[#242424]"
                }`}
              >
                KYC Submissions
                <span className="bg-[#15340B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {kycSubmissions.length}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Conditional rendering based on active tab */}
        {activeTab === "all" ? (
          <SellerTable sellers={sellers} />
        ) : (
          <KYCSubmissionsTable submissions={kycSubmissions} />
        )}
      </main>
    </div>
  );
}