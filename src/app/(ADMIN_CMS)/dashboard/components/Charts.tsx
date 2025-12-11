// src/app/(ADMIN_CMS)/dashboard/components/Charts.tsx
"use client";

export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Orders Chart */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <h3 className="text-base sm:text-lg font-semibold text-[#242424] mb-1 sm:mb-2">Orders</h3>
            <div className="text-2xl sm:text-3xl font-bold text-[#242424]">2,025</div>
            <div className="flex items-center gap-1 text-xs text-success-500 mt-1">
              <span>↑</span>
              <span>6.2% than last month</span>
            </div>
          </div>

          <div className="flex items-end gap-3 sm:gap-4 w-full sm:w-auto justify-center">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="transform -rotate-90 scale-110">
                <circle cx="50" cy="50" r="35" fill="none" stroke="#E9E9E9" strokeWidth="15" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#62775C" strokeWidth="15" strokeDasharray="143 220" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#9AA996" strokeWidth="15" strokeDasharray="55 220" strokeDashoffset="-143" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#C5D1C3" strokeWidth="15" strokeDasharray="22 220" strokeDashoffset="-198" />
              </svg>
            </div>

            <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#62775C]"></div>
                <span className="text-[#6C6C6C]">65% Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#9AA996]"></div>
                <span className="text-[#6C6C6C]">20% Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#C5D1C3]"></div>
                <span className="text-[#6C6C6C]">15% Returned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Chart */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <h3 className="text-base sm:text-lg font-semibold text-[#242424] mb-1 sm:mb-2">Transactions</h3>
            <div className="text-2xl sm:text-3xl font-bold text-[#242424]">₦450,000</div>
            <div className="flex items-center gap-1 text-xs text-success-500 mt-1">
              <span>↑</span>
              <span>0.2% than last month</span>
            </div>
          </div>

          <div className="flex items-end gap-3 sm:gap-4 w-full sm:w-auto justify-center">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="transform -rotate-90 scale-110">
                <circle cx="50" cy="50" r="35" fill="none" stroke="#E9E9E9" strokeWidth="15" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#62775C" strokeWidth="15" strokeDasharray="88 220" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#9AA996" strokeWidth="15" strokeDasharray="86 220" strokeDashoffset="-88" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#C5D1C3" strokeWidth="15" strokeDasharray="46 220" strokeDashoffset="-174" />
              </svg>
            </div>

            <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#62775C]"></div>
                <span className="text-[#6C6C6C]">75% Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#9AA996]"></div>
                <span className="text-[#6C6C6C]">25% Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}