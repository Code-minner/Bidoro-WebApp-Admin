// src/app/(ADMIN_CMS)/dashboard/components/UserAnalytics.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const stats = {
  customers: {
    label: "Customers",
    userLabel: "Users",
    total: "2,153",
    growth: "+4.37%",
    growthDirection: "up",
    highlightMonth: "May, 2025",
    highlightValue: "Users: 6,172"
  },
  sellers: {
    label: "Sellers",
    userLabel: "Sellers",
    total: "743",
    growth: "+2.12%",
    growthDirection: "up",
    highlightMonth: "May, 2025",
    highlightValue: "Sellers: 1,122"
  }
};

export default function UserAnalytics() {
  const [selectedType, setSelectedType] = useState<"customers" | "sellers">("customers");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const active = stats[selectedType];

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3 relative">
          {/* Icon */}
          <div className="p-1.5 sm:p-2 bg-[#15340B] rounded-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>

          {/* Dynamic Label */}
          <h3 className="text-base sm:text-lg font-semibold text-[#242424]">{active.label}</h3>

          {/* Dropdown Button */}
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="ml-1 sm:ml-2 p-1 hover:bg-[#F6F5FA] rounded">
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[#6C6C6C]" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-10 left-12 sm:left-20 bg-white border shadow-lg rounded-lg w-32 z-20">
              <button className="w-full text-left px-4 py-2 hover:bg-[#F6F5FA] text-sm" onClick={() => { setSelectedType("customers"); setDropdownOpen(false); }}>
                Customers
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-[#F6F5FA] text-sm" onClick={() => { setSelectedType("sellers"); setDropdownOpen(false); }}>
                Sellers
              </button>
            </div>
          )}
        </div>

        {/* Year Selector */}
        <select className="px-3 py-1.5 sm:px-4 sm:py-2 border border-[#E9E9E9] rounded-lg text-xs sm:text-sm text-[#6C6C6C] bg-white">
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>

      {/* Stats */}
      <div className="mb-4 sm:mb-6">
        <div className="text-xs sm:text-sm text-[#6C6C6C] mb-1">{active.userLabel}</div>
        <div className="flex items-baseline gap-2 sm:gap-3">
          <div className="text-2xl sm:text-3xl font-bold text-[#242424]">{active.total}</div>
          <div className="flex items-center gap-1 text-xs sm:text-sm text-success-500">
            <span>↑</span>
            <span>{active.growth}</span>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="h-48 sm:h-64 relative overflow-x-auto scrollbar-hide -mr-4 pr-4">
        <div className="min-w-[600px] h-full">
          <svg viewBox="0 0 1000 240" className="w-full h-full">
            {/* Y-Axis Labels */}
            <text x="30" y="220" fontSize="10" fill="#6C6C6C">100</text>
            <text x="30" y="185" fontSize="10" fill="#6C6C6C">200</text>
            <text x="30" y="150" fontSize="10" fill="#6C6C6C">500</text>
            <text x="20" y="115" fontSize="10" fill="#6C6C6C">1000</text>
            <text x="20" y="80" fontSize="10" fill="#6C6C6C">2000</text>
            <text x="20" y="45" fontSize="10" fill="#6C6C6C">3000</text>

            {/* AREA PATH */}
            <path d="M50,180 C75,185 100,180 125,185 C150,190 175,185 200,180 C225,175 250,180 275,185 C300,190 325,185 350,180 C375,175 400,180 425,177 C450,174 475,175 500,170 C525,165 550,170 575,165 C600,160 625,155 650,150 C675,145 700,140 725,135 C750,130 775,125 800,120 C825,115 850,110 875,105 C900,100 925,95 950,90 L950,215 L50,215 Z" fill="#C5D1C3" opacity="0.3" />

            {/* LINE PATH */}
            <path d="M50,180 C75,185 100,180 125,185 C150,190 175,185 200,180 C225,175 250,180 275,185 C300,190 325,185 350,180 C375,175 400,180 425,177 C450,174 475,175 500,170 C525,165 550,170 575,165 C600,160 625,155 650,150 C675,145 700,140 725,135 C750,130 775,125 800,120 C825,115 850,110 875,105 C900,100 925,95 950,90" fill="none" stroke="#62775C" strokeWidth="2" />

            {/* Highlight Dot */}
            <circle cx="425" cy="177" r="5" fill="#15340B" />

            {/* Tooltip Box */}
            <rect x="370" y="135" width="110" height="35" rx="6" fill="#15340B" />
            <text x="425" y="152" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">
              {active.highlightMonth}
            </text>
            <text x="425" y="166" textAnchor="middle" fill="white" fontSize="11">
              {active.highlightValue}
            </text>

            {/* Tooltip Pointer */}
            <path d="M425,170 L430,177 L420,177 Z" fill="#15340B" />
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-xs text-[#6C6C6C] min-w-[600px]" style={{ paddingLeft: "50px", paddingRight: "50px" }}>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>
      </div>
    </div>
  );
}