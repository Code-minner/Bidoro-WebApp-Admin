// src/app/(ADMIN_CMS)/dashboard/page.tsx
"use client";

import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import Charts from "./components/Charts";
import UserAnalytics from "./components/UserAnalytics";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F6F5FA]">
      {/* Top Navigation Bar */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Welcome Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#242424] mb-1 sm:mb-2">Hello John Doe</h1>
          <p className="text-xs sm:text-sm text-[#6C6C6C]">Here's an overview of how Bidoro is doing</p>
        </div>

        {/* Stats Grid - Top Row */}
        <StatsCards />

        {/* Charts Row */}
        <div className="my-4 sm:my-6">
          <Charts />
        </div>

        {/* Customers / Sellers Section */}
        <UserAnalytics />
      </main>
    </div>
  );
}