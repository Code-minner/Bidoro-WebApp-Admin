// src/app/(ADMIN_CMS)/layout.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F6F5FA]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col w-full">
        {/* Mobile menu button - moved here to be accessible */}
        <div className="lg:hidden fixed top-4 left-4 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-[#F6F5FA] transition-colors"
          >
            <Menu className="w-6 h-6 text-[#6C6C6C]" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}