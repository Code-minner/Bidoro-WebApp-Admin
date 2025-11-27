// src/app/(ADMIN_CMS)/dashboard/components/StatsCards.tsx
"use client";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Total Customers */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm text-[#6C6C6C]">total customers</span>
          <div className="p-1.5 sm:p-2 bg-[#F6F5FA] rounded-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#6C6C6C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-[#242424] mb-1 sm:mb-2">163</div>
        <div className="flex items-center gap-1 text-xs text-error-500">
          <span>↓</span>
          <span>15 from last month</span>
        </div>
      </div>

      {/* Total Sellers */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm text-[#6C6C6C]">total sellers</span>
          <div className="p-1.5 sm:p-2 bg-[#F6F5FA] rounded-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#6C6C6C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-[#242424] mb-1 sm:mb-2">54</div>
        <div className="flex items-center gap-1 text-xs text-success-500">
          <span>↑</span>
          <span>40% from last month</span>
        </div>
      </div>

      {/* Total Admins */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm text-[#6C6C6C]">total admins</span>
          <div className="p-1.5 sm:p-2 bg-[#F6F5FA] rounded-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#6C6C6C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-[#242424] mb-1 sm:mb-2">4</div>
        <div className="flex items-center gap-1 text-xs text-success-500">
          <span>↑</span>
          <span>400% from last month</span>
        </div>
      </div>

      {/* Active Products */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm text-[#6C6C6C]">Active products</span>
          <div className="p-1.5 sm:p-2 bg-[#F6F5FA] rounded-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#6C6C6C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-[#242424] mb-1 sm:mb-2">342</div>
        <div className="text-xs text-[#6C6C6C]">
          <span className="text-success-500">See all →</span>
        </div>
      </div>
    </div>
  );
}