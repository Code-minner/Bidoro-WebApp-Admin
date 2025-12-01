// src/app/(ADMIN_CMS)/user-management/sellers/components/SellerTable.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { Search, SlidersHorizontal, MoreVertical, X, Calendar } from "lucide-react";
import Image from "next/image";

interface Seller {
  id: string;
  name: string;
  email: string;
  regDate: string;
  phoneNumber: string;
  products?: number;
  location?: string;
  status: "Active" | "Suspended";
  avatar?: string;
}

interface SellerTableProps {
  sellers: Seller[];
}

export default function SellerTable({ sellers }: SellerTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [suspendModalSeller, setSuspendModalSeller] = useState<Seller | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filterRef = useRef<HTMLDivElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Close Filter dropdown
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
      
      // Close Action menu dropdown
      if (openDropdownId !== null) {
        const dropdowns = document.querySelectorAll('[data-dropdown-menu]');
        let clickedInside = false;
        
        dropdowns.forEach((dropdown) => {
          if (dropdown.contains(e.target as Node)) {
            clickedInside = true;
          }
        });
        
        if (!clickedInside) {
          setOpenDropdownId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownId]);

  // Navigation handler
  const handleViewProfile = (e: React.MouseEvent<HTMLButtonElement>, sellerId: string) => {
    e.stopPropagation();
    router.push(`/user-management/sellers/${sellerId}`);
    setOpenDropdownId(null); 
  };

  // Suspend handler
  const handleSuspendClick = (e: React.MouseEvent<HTMLButtonElement>, seller: Seller) => {
    e.stopPropagation();
    setSuspendModalSeller(seller);
    setOpenDropdownId(null);
  };

  // Confirm suspend
  const handleConfirmSuspend = () => {
    // TODO: Implement actual suspend logic here
    console.log("Suspending seller:", suspendModalSeller?.id);
    setSuspendModalSeller(null);
  };

  // Handle calendar icon click
  const handleCalendarClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.showPicker();
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Search + Filter Bar */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C6C6C]" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15340B] text-sm placeholder:text-[#9A9A9A]"
            />
          </div>

          {/* Filter dropdown */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
                setOpenDropdownId(null);
              }}
              className="flex items-center gap-2 px-4 py-2 border border-[#E9E9E9] rounded-lg hover:bg-[#F6F5FA] transition-colors text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 top-12 w-72 bg-white rounded-lg border border-[#E9E9E9] shadow-md p-4 z-40">
                {/* Filter Content */}
                <p className="text-sm font-medium mb-3">Filters</p>

                {/* Date Range */}
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[#6C6C6C]">Date range</label>
                  <button className="text-xs text-[#15340B] font-medium">Reset</button>
                </div>

                <div className="flex gap-2 mb-3">
                  <div className="flex-1">
                    <label className="text-xs text-[#6C6C6C]">From:</label>
                    <div className="relative mt-1">
                      <input
                        ref={startDateRef}
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border border-[#E9E9E9] rounded p-2 pr-8 text-sm w-full opacity-0 absolute inset-0 cursor-pointer"
                      />
                      <div className="border border-[#E9E9E9] rounded p-2 pr-8 text-sm w-full flex items-center justify-between">
                        <span className="text-[#6C6C6C] text-sm">
                          {startDate || "Start"}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCalendarClick(startDateRef)}
                          className="pointer-events-auto"
                        >
                          <Calendar className="w-4 h-4 text-[#6C6C6C]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="text-xs text-[#6C6C6C]">To:</label>
                    <div className="relative mt-1">
                      <input
                        ref={endDateRef}
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border border-[#E9E9E9] rounded p-2 pr-8 text-sm w-full opacity-0 absolute inset-0 cursor-pointer"
                      />
                      <div className="border border-[#E9E9E9] rounded p-2 pr-8 text-sm w-full flex items-center justify-between">
                        <span className="text-[#6C6C6C] text-sm">
                          {endDate || "End"}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCalendarClick(endDateRef)}
                          className="pointer-events-auto"
                        >
                          <Calendar className="w-4 h-4 text-[#6C6C6C]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[#6C6C6C]">Status</label>
                  <button className="text-xs text-[#15340B] font-medium">Reset</button>
                </div>

                <select className="border border-[#E9E9E9] rounded p-2 text-sm w-full mb-3">
                  <option value="">Select option</option>
                  <option>Active</option>
                  <option>Suspended</option>
                </select>

                {/* Location */}
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[#6C6C6C]">Location</label>
                  <button className="text-xs text-[#15340B] font-medium">Reset</button>
                </div>

                <select className="border border-[#E9E9E9] rounded p-2 text-sm w-full mb-4">
                  <option value="">Select option</option>
                  <option>Ikorode</option>
                  <option>Lagos</option>
                  <option>Abuja</option>
                </select>

                {/* Bottom Buttons */}
                <div className="flex items-center justify-between">
                  <button className="text-sm text-[#6C6C6C] border border-[#E9E9E9] rounded-lg px-3 py-1 hover:bg-[#F6F5FA]">
                    Reset all
                  </button>

                  <button className="px-4 py-1 bg-[#15340B] text-white text-sm rounded">
                    Apply now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#E9E9E9]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">
                  Reg. date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">
                  Phone number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#6C6C6C] uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-[#E9E9E9]">
              {sellers.map((seller) => (
                <tr key={seller.id} className="hover:bg-[#F6F5FA] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E9E9E9] flex items-center justify-center overflow-hidden">
                        {seller.avatar ? (
                          <Image
                            src={seller.avatar}
                            alt={seller.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-medium text-[#6C6C6C]">
                            {seller.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#242424]">{seller.name}</div>
                        <div className="text-xs text-[#6C6C6C]">{seller.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-[#6C6C6C]">{seller.regDate}</td>

                  <td className="px-6 py-4 text-sm text-[#6C6C6C]">{seller.phoneNumber}</td>

                  <td className="px-6 py-4 text-sm text-[#242424] font-medium">
                    {seller.products || 0}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#6C6C6C]">
                    {seller.location || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        seller.status === "Active"
                          ? "bg-success-50 text-success-700"
                          : "bg-error-50 text-error-700"
                      }`}
                    >
                      {seller.status}
                    </span>
                  </td>

                  {/* 3-dots dropdown */}
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block"> 
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === seller.id ? null : seller.id);
                          setIsFilterOpen(false);
                        }}
                        className="p-2 hover:bg-[#F6F5FA] rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-[#6C6C6C]" />
                      </button>

                      {openDropdownId === seller.id && (
                        <div 
                          data-dropdown-menu
                          className="absolute right-0 mt-2 w-40 bg-white border border-[#E9E9E9] rounded-lg shadow-lg z-50 py-1"
                        >
                          <button 
                              onClick={(e) => handleViewProfile(e, seller.id)}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F5FA] text-[#242424]"
                          >
                            View profile
                          </button>
                          
                          <button 
                              onClick={(e) => e.stopPropagation()}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F5FA] text-[#242424]"
                          >
                            Approve
                          </button>
                          <button 
                              onClick={(e) => handleSuspendClick(e, seller)}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F5FA] text-[#6C6C6C]"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#E9E9E9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#6C6C6C]">Page 1 of 30</div>

          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-[#15340B] text-white rounded-lg">
              3
            </button>
            <span className="px-2 text-[#6C6C6C]">...</span>
            <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">
              10
            </button>
            <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">
              11
            </button>
            <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">
              12
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">
              ‹
            </button>
            <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Suspend Modal */}
      {suspendModalSeller && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-4 sm:p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setSuspendModalSeller(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1 hover:bg-[#F6F5FA] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#6C6C6C]" />
            </button>

            {/* Title - Centered */}
            <h3 className="text-base sm:text-lg font-semibold text-[#242424] mb-2 text-center">
              Suspend seller
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#6C6C6C] text-center mb-4 sm:mb-6">
              User will no longer have access to their account. Are you sure you want to blacklist this user?
            </p>

            {/* User Info - Gray background wrapper */}
            <div className="bg-[#F6F5FA] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              {/* White background for content */}
              <div className="bg-white rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#6C6C6C]">Name</span>
                  <span className="text-[#242424] font-medium">{suspendModalSeller.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#6C6C6C]">Email</span>
                  <span className="text-[#242424] break-all">{suspendModalSeller.email}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#6C6C6C]">Reg. date</span>
                  <span className="text-[#242424]">{suspendModalSeller.regDate}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setSuspendModalSeller(null)}
                className="flex-1 px-4 py-2.5 sm:py-3 border border-[#E9E9E9] rounded-lg hover:bg-[#F6F5FA] transition-colors text-sm font-medium text-[#242424]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSuspend}
                className="flex-1 px-4 py-2.5 sm:py-3 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] transition-colors text-sm font-medium"
              >
                Suspend
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}