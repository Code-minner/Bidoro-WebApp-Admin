"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, MoreVertical, ChevronLeft, ChevronRight, X } from "lucide-react";
import AdminHeader from "../../../../components/AdminHeader";
import Image from "next/image";

function ActionMenu({
  onClose,
}: {
  onClose: () => void;
}) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      role="menu"
      className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg py-1 z-50 min-w-[150px]"
    >
      <button
        type="button"
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        View details
      </button>
      <button
        type="button"
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        End auction
      </button>
      <button
        type="button"
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        Delete
      </button>
    </div>
  );
}

function ChangeBiddingTimeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [dayOfWeek, setDayOfWeek] = useState("Sunday");
  const [startTime, setStartTime] = useState("12:00 pm");
  const [duration, setDuration] = useState("6 hours");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 md:p-6 max-w-sm w-full">
        <div className="flex justify-between items-start border-b pb-4 mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Change Bidding Time</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 mb-4 md:mb-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Day of the Week</label>
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15340B] bg-white"
            >
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Start Time</label>
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15340B]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Duration (Hourly)</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15340B] bg-white"
            >
              <option value="1 hour">1 hour</option>
              <option value="2 hours">2 hours</option>
              <option value="3 hours">3 hours</option>
              <option value="4 hours">4 hours</option>
              <option value="5 hours">5 hours</option>
              <option value="6 hours">6 hours</option>
              <option value="8 hours">8 hours</option>
              <option value="12 hours">12 hours</option>
              <option value="24 hours">24 hours</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            console.log("Bidding time changed");
            onClose();
          }}
          className="w-full px-4 py-2.5 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] text-sm font-medium"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default function BudgetBids() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showChangeTimeModal, setShowChangeTimeModal] = useState(false);

  // Generate 30 budget bid records
  const budgetBids = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    product: {
      name: "iPhone 16 pro",
      category: "Phones",
      image: "/assets/user.png",
    },
    seller: "Johndoestores",
    startingTime: "12:00pm",
    endTime: "6:00pm",
    currentBid: i % 3 === 0 ? "N0" : i % 3 === 1 ? "N950,000" : "N1,500,000",
    bids: i % 3 === 0 ? 0 : i % 3 === 1 ? 25 : 45,
    status: i % 3 === 0 ? "Scheduled" : i % 3 === 1 ? "Ended" : "Active",
    statusColor: i % 3 === 0 ? "bg-yellow-100 text-yellow-700" : i % 3 === 1 ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-700",
  }));

  const filterBids = () => {
    let filtered = budgetBids;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (b) =>
          b.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.seller.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredBids = filterBids();
  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredBids.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBids = filteredBids.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AdminHeader />

      <ChangeBiddingTimeModal
        isOpen={showChangeTimeModal}
        onClose={() => setShowChangeTimeModal(false)}
      />

      <div className="flex-1 overflow-auto p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">Budget bids</h2>

        {/* Next Auction Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-500">Next Auction</div>
              <div className="text-base md:text-lg font-semibold text-gray-900">Sunday, November 16, 2025</div>
              <div className="text-sm text-gray-500">⏰ 12:00pm - 6 hours Duration</div>
            </div>
          </div>
          <button 
            onClick={() => setShowChangeTimeModal(true)}
            className="px-4 py-2 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] text-sm font-medium w-full sm:w-auto"
          >
            Change
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Search and Filter */}
          <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15340B] border-gray-300 bg-gray-50"
              />
            </div>

            <button
              type="button"
              className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 bg-gray-50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span>Filters</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <table className="w-full hidden md:table">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Starting Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    End Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Current Bid
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Bids
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedBids.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No budget bids found
                    </td>
                  </tr>
                ) : (
                  paginatedBids.map((bid) => (
                    <tr key={bid.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                            <Image
                              src={bid.product.image}
                              alt={bid.product.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {bid.product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {bid.product.category}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {bid.seller}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {bid.startingTime}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {bid.endTime}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {bid.currentBid}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {bid.bids}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${bid.statusColor}`}
                        >
                          {bid.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(openMenu === bid.id ? null : bid.id)
                          }
                          aria-expanded={openMenu === bid.id}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical size={20} />
                        </button>

                        {openMenu === bid.id && (
                          <ActionMenu onClose={() => setOpenMenu(null)} />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {paginatedBids.length === 0 ? (
                <div className="px-4 py-12 text-center text-gray-500">
                  No budget bids found
                </div>
              ) : (
                paginatedBids.map((bid) => (
                  <div key={bid.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center flex-1">
                        <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center mr-3 overflow-hidden flex-shrink-0">
                          <Image
                            src={bid.product.image}
                            alt={bid.product.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {bid.product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {bid.product.category}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${bid.statusColor}`}
                        >
                          {bid.status}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(openMenu === bid.id ? null : bid.id)
                          }
                          className="text-gray-400 hover:text-gray-600 relative"
                        >
                          <MoreVertical size={20} />
                          {openMenu === bid.id && (
                            <ActionMenu onClose={() => setOpenMenu(null)} />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Seller</div>
                        <div className="text-gray-900 font-medium">{bid.seller}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Current Bid</div>
                        <div className="text-gray-900 font-medium">{bid.currentBid}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Time</div>
                        <div className="text-gray-900">{bid.startingTime} - {bid.endTime}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Total Bids</div>
                        <div className="text-gray-900">{bid.bids}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:grid sm:grid-cols-3 items-center gap-4">
            <div className="text-sm text-gray-700 text-center sm:text-left">
              Page {currentPage} of {totalPages}
            </div>

            <div className="flex items-center justify-center gap-1 md:gap-2 flex-wrap">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => typeof page === "number" && setCurrentPage(page)}
                  disabled={page === "..."}
                  className={`px-2 md:px-3 py-1 rounded text-sm ${
                    page === "..." ? "cursor-default" : "hover:bg-gray-100"
                  } ${
                    page === currentPage
                      ? "border border-gray-900 text-gray-900 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}