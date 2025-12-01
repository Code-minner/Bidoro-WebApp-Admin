// src/app/(ADMIN_CMS)/user-management/sellers/components/KYCSubmissionsTable.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, MoreVertical } from "lucide-react";
import Image from "next/image";

interface KYCSubmission {
  id: string;
  name: string;
  email: string;
  regDate: string;
  phoneNumber: string;
  products?: number;
  location?: string;
  status: "Pending" | "Approved" | "Declined";
  avatar?: string;
}

interface KYCSubmissionsTableProps {
  submissions: KYCSubmission[];
}

export default function KYCSubmissionsTable({ submissions }: KYCSubmissionsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }

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

  const handleViewProfile = (e: React.MouseEvent<HTMLButtonElement>, sellerId: string) => {
    e.stopPropagation();
    router.push(`/user-management/sellers/${sellerId}`);
    setOpenDropdownId(null);
  };

  const handleApprove = (e: React.MouseEvent<HTMLButtonElement>, submissionId: string) => {
    e.stopPropagation();
    console.log("Approving submission:", submissionId);
    setOpenDropdownId(null);
    // TODO: Implement approve logic
  };

  const handleDecline = (e: React.MouseEvent<HTMLButtonElement>, submissionId: string) => {
    e.stopPropagation();
    console.log("Declining submission:", submissionId);
    setOpenDropdownId(null);
    // TODO: Implement decline logic
  };

  return (
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
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-[#E9E9E9] rounded-lg hover:bg-[#F6F5FA] transition-colors text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 top-12 w-72 bg-white rounded-lg border border-[#E9E9E9] shadow-md p-4 z-40">
              <p className="text-sm font-medium mb-3">Filters</p>
              
              {/* Add filter options here similar to SellerTable */}
              <div className="text-sm text-[#6C6C6C]">Filter options...</div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-[#E9E9E9]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Reg. date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Phone number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Products</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#6C6C6C] uppercase">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-[#E9E9E9]">
            {submissions.map((submission) => (
              <tr key={submission.id} className="hover:bg-[#F6F5FA] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E9E9E9] flex items-center justify-center overflow-hidden">
                      {submission.avatar ? (
                        <Image src={submission.avatar} alt={submission.name} width={40} height={40} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm font-medium text-[#6C6C6C]">{submission.name.split(" ").map((n) => n[0]).join("")}</span>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#242424]">{submission.name}</div>
                      <div className="text-xs text-[#6C6C6C]">{submission.email}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-[#6C6C6C]">{submission.regDate}</td>
                <td className="px-6 py-4 text-sm text-[#6C6C6C]">{submission.phoneNumber}</td>
                <td className="px-6 py-4 text-sm text-[#242424] font-medium">{submission.products || 0}</td>
                <td className="px-6 py-4 text-sm text-[#6C6C6C]">{submission.location || "-"}</td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    submission.status === "Pending" ? "bg-[#FEF3C7] text-[#92400E]" :
                    submission.status === "Approved" ? "bg-success-50 text-success-700" :
                    "bg-error-50 text-error-700"
                  }`}>
                    {submission.status}
                  </span>
                </td>

                {/* 3-dots dropdown */}
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(openDropdownId === submission.id ? null : submission.id);
                      }}
                      className="p-2 hover:bg-[#F6F5FA] rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-[#6C6C6C]" />
                    </button>

                    {openDropdownId === submission.id && (
                      <div data-dropdown-menu className="absolute right-0 mt-2 w-40 bg-white border border-[#E9E9E9] rounded-lg shadow-lg z-50 py-1">
                        <button onClick={(e) => handleViewProfile(e, submission.id)} className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F5FA] text-[#242424]">
                          View profile
                        </button>
                        <button onClick={(e) => handleApprove(e, submission.id)} className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F5FA] text-[#15340B]">
                          Approve
                        </button>
                        <button onClick={(e) => handleDecline(e, submission.id)} className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F5FA] text-[#DC2626]">
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
          <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">1</button>
          <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">2</button>
          <button className="w-8 h-8 flex items-center justify-center bg-[#15340B] text-white rounded-lg">3</button>
          <span className="px-2 text-[#6C6C6C]">...</span>
          <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">10</button>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">‹</button>
          <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">›</button>
        </div>
      </div>
    </div>
  );
}