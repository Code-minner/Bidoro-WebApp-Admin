// src/app/(ADMIN_CMS)/user-management/sellers/components/KYCSubmissionsTable.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, MoreVertical } from "lucide-react";
import Image from "next/image";
import { approveKycApplication, rejectKycApplication, type KYCSubmission, type Pagination } from "@/lib/api/admin";

interface KYCSubmissionsTableProps {
  submissions: KYCSubmission[];
  pagination?: Pagination;
  onPageChange?: (page: number) => void;
  onActionComplete?: () => void;
}

export default function KYCSubmissionsTable({ 
  submissions,
  pagination,
  onPageChange,
  onActionComplete
}: KYCSubmissionsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);
  
  // Decline modal state
  const [declineModalSubmission, setDeclineModalSubmission] = useState<KYCSubmission | null>(null);
  const [declineReason, setDeclineReason] = useState("");

  const filterRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filter submissions based on search
  const filteredSubmissions = submissions.filter(submission => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      submission.name.toLowerCase().includes(query) ||
      submission.email.toLowerCase().includes(query) ||
      submission.phoneNumber?.toLowerCase().includes(query)
    );
  });

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

  const handleViewProfile = (e: React.MouseEvent<HTMLButtonElement>, submissionId: string) => {
    e.stopPropagation();
    router.push(`/user-management/sellers/${submissionId}`);
    setOpenDropdownId(null);
  };

  const handleApprove = async (e: React.MouseEvent<HTMLButtonElement>, submissionId: string) => {
    e.stopPropagation();
    setOpenDropdownId(null);
    setIsActionLoading(submissionId);
    
    try {
      const response = await approveKycApplication(submissionId);
      if (response.success) {
        onActionComplete?.();
      }
    } catch (error) {
      console.error("Approve error:", error);
    } finally {
      setIsActionLoading(null);
    }
  };

  const handleDeclineClick = (e: React.MouseEvent<HTMLButtonElement>, submission: KYCSubmission) => {
    e.stopPropagation();
    setDeclineModalSubmission(submission);
    setDeclineReason("");
    setOpenDropdownId(null);
  };

  const handleConfirmDecline = async () => {
    if (!declineModalSubmission) return;
    
    setIsActionLoading(declineModalSubmission.id);
    
    try {
      const response = await rejectKycApplication(
        declineModalSubmission.id, 
        declineReason || 'Application declined by admin'
      );
      if (response.success) {
        setDeclineModalSubmission(null);
        onActionComplete?.();
      }
    } catch (error) {
      console.error("Decline error:", error);
    } finally {
      setIsActionLoading(null);
    }
  };

  // Generate page numbers
  const getPageNumbers = (): (number | string)[] => {
    if (!pagination) return [];
    
    const { page, pages } = pagination;
    const pageNumbers: (number | string)[] = [];
    
    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', pages);
      } else if (page >= pages - 2) {
        pageNumbers.push(1, '...', pages - 3, pages - 2, pages - 1, pages);
      } else {
        pageNumbers.push(1, '...', page - 1, page, page + 1, '...', pages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden min-h-[80vh]"> 
        {/* Search + Filter Bar */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C6C6C]" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
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
                
                {/* Status Filter */}
                <div className="mb-3">
                  <label className="text-xs text-[#6C6C6C] mb-1 block">Status</label>
                  <select className="border border-[#E9E9E9] rounded p-2 text-sm w-full">
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>

                {/* Apply Button */}
                <button className="w-full px-4 py-2 bg-[#15340B] text-white text-sm rounded">
                  Apply
                </button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Phone number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#6C6C6C] uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-[#E9E9E9]">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#6C6C6C]">
                    {searchQuery ? 'No submissions found matching your search.' : 'No KYC submissions pending review.'}
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-[#F6F5FA] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E9E9E9] flex items-center justify-center overflow-hidden">
                          {submission.avatar ? (
                            <Image src={submission.avatar} alt={submission.name} width={40} height={40} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-sm font-medium text-[#6C6C6C]">
                              {submission.name.split(" ").map((n) => n[0]).join("")}
                            </span>
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
                    <td className="px-6 py-4 text-sm text-[#6C6C6C]">{submission.location || "-"}</td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        submission.status === "Pending" ? "bg-[#FEF3C7] text-[#92400E]" :
                        submission.status === "Approved" ? "bg-green-50 text-green-700" :
                        "bg-red-50 text-red-700"
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
                          disabled={isActionLoading === submission.id}
                        >
                          {isActionLoading === submission.id ? (
                            <div className="w-4 h-4 border-2 border-[#15340B] border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <MoreVertical className="w-4 h-4 text-[#6C6C6C]" />
                          )}
                        </button>

                        {openDropdownId === submission.id && (
                          <div data-dropdown-menu className="absolute right-0 mt-2 w-40 bg-white border border-[#E9E9E9] rounded-lg shadow-lg z-50 py-1">
                            <button 
                              onClick={(e) => handleViewProfile(e, submission.id)} 
                              className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F5FA] text-[#242424]"
                            >
                              View profile
                            </button>
                            {submission.status === "Pending" && (
                              <>
                                <button 
                                  onClick={(e) => handleApprove(e, submission.id)} 
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F5FA] text-[#15340B]"
                                >
                                  Approve
                                </button>
                                <button 
                                  onClick={(e) => handleDeclineClick(e, submission)} 
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F5FA] text-[#DC2626]"
                                >
                                  Decline
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-[#E9E9E9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[#6C6C6C]">
              Page {pagination.page} of {pagination.pages}
            </div>

            <div className="flex items-center gap-1">
              {getPageNumbers().map((pageNum, index) => (
                pageNum === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-[#6C6C6C]">...</span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange?.(pageNum as number)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
                      pagination.page === pageNum
                        ? 'bg-[#15340B] text-white'
                        : 'border border-[#E9E9E9] text-[#6C6C6C] hover:bg-[#F6F5FA]'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => onPageChange?.(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F6F5FA]"
              >
                ‹
              </button>
              <button 
                onClick={() => onPageChange?.(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F6F5FA]"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Decline Modal */}
      {declineModalSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setDeclineModalSubmission(null)}
              className="absolute top-4 right-4 text-[#6C6C6C] hover:text-[#242424] text-xl"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold text-[#242424] mb-2 text-center">
              Decline KYC Application
            </h3>

            <p className="text-sm text-[#6C6C6C] text-center mb-4">
              Are you sure you want to decline this KYC application?
            </p>

            {/* User Info */}
            <div className="bg-[#F6F5FA] rounded-lg p-4 mb-4">
              <div className="bg-white rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6C6C6C]">Name</span>
                  <span className="text-[#242424] font-medium">{declineModalSubmission.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6C6C6C]">Email</span>
                  <span className="text-[#242424]">{declineModalSubmission.email}</span>
                </div>
              </div>
            </div>

            {/* Reason Textarea */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#242424] mb-2">
                Reason for declining
              </label>
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Enter reason for declining this application..."
                className="w-full px-4 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#15340B] resize-none"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setDeclineModalSubmission(null)}
                className="flex-1 px-4 py-3 border border-[#E9E9E9] rounded-lg hover:bg-[#F6F5FA] text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDecline}
                disabled={isActionLoading === declineModalSubmission.id}
                className="flex-1 px-4 py-3 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isActionLoading === declineModalSubmission.id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Declining...
                  </>
                ) : (
                  'Decline'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}