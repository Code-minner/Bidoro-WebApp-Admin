// src/app/(ADMIN_CMS)/dashboard/components/DashboardHeader.tsx
"use client";

import { Bell, ChevronDown } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b px-4 sm:px-6 lg:px-8 py-3 sm:py-3">
      <div className="flex items-center justify-between lg:justify-end gap-3 sm:gap-4">
        {/* Spacer for mobile - takes up space where hamburger menu is */}
        <div className="w-10 lg:hidden"></div>
        
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-[#F6F5FA] rounded-lg transition-colors">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#6C6C6C]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-[#F6F5FA] rounded-lg transition-colors">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#15340B] rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
              JD
            </div>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[#6C6C6C] hidden sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}