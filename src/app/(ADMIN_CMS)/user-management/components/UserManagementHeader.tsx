// src/app/(ADMIN_CMS)/user-management/components/UserManagementHeader.tsx
"use client";

import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function UserManagementHeader() {
  return (
    <header className="bg-white border-b border-[#E9E9E9] px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
      <div
        className="
          flex items-center justify-between 
          lg:justify-end 
          gap-2 sm:gap-4
          min-h-[50px]
        "
      >
        {/* Spacer for LG hidden sidebar alignment */}
        <div className="w-8 sm:w-10 lg:hidden" />

        <div className="flex items-center gap-2 sm:gap-4">

          {/* Notification Bell */}
          <button
            className="
              relative p-2 
              hover:bg-[#F6F5FA] 
              rounded-lg transition-colors
              active:scale-95
            "
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#6C6C6C]" />

            {/* Notification Dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-error-500 rounded-full" />
          </button>

          {/* User Profile */}
          <button
            className="
              flex items-center gap-2 sm:gap-3 
              p-1.5 sm:p-2 
              hover:bg-[#F6F5FA] 
              rounded-lg 
              transition-colors
              active:scale-95
            "
          >
            {/* Avatar */}
            <div
              className="
                w-8 h-8 sm:w-10 sm:h-10 
                rounded-full overflow-hidden bg-[#E9E9E9]
                flex-shrink-0
              "
            >
              <Image
                src="/assets/user.png"
                alt="User profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hide dropdown arrow on mobile */}
            <ChevronDown
              className="
                w-3 h-3 sm:w-4 sm:h-4 
                text-[#6C6C6C] 
                hidden sm:block
              "
            />
          </button>
        </div>
      </div>
    </header>
  );
}
