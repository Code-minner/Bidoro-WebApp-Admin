"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, MoreVertical, ChevronLeft, ChevronRight, X, Send } from "lucide-react";
import AdminHeader from "../../../../components/AdminHeader";
import Image from "next/image";

function ActionMenu({
  onClose,
  onAction,
}: {
  onClose: () => void;
  onAction?: (action: string) => void;
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
      className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg py-1 z-50 min-w-[170px]"
    >
      <button
        type="button"
        onClick={() => {
          onAction?.("Message Customer");
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        Message Customer
      </button>
      <button
        type="button"
        onClick={() => {
          onAction?.("Message Seller");
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        Message Seller
      </button>
      <button
        type="button"
        onClick={() => {
          onAction?.("Resolve");
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        Resolve
      </button>
      <button
        type="button"
        onClick={() => {
          onAction?.("Cancel");
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        Cancel
      </button>
    </div>
  );
}

function MessageModal({
  isOpen,
  onClose,
  recipient,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  recipient: { name: string; email: string };
  type: "customer" | "seller";
}) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: type === "customer" ? "John Doe" : "Hollustergadget",
      text: type === "customer" 
        ? "Hi, I want to open a dispute for my order. What I got is not what I paid for."
        : "I just got a dispute on Order #2841. Please what's the issue?",
      isUser: false,
    },
    {
      date: "10/9/2025",
      isDateDivider: true,
    },
    {
      sender: "Admin",
      text: type === "customer"
        ? "Hello, thank you for reaching out. Please share the details or photos of the issue so we can review it."
        : "The buyer reported receiving a damaged item. Kindly provide your side of the case or any supporting evidence.",
      isUser: true,
    },
  ]);

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, {
        sender: "Admin",
        text: message,
        isUser: true,
      }]);
      setMessage("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl mx-4 flex flex-col max-h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/user.png"
                alt={recipient.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {recipient.name}
              </div>
              <div className="text-xs text-gray-500">{recipient.email}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg, index) => (
            <div key={index}>
              {(msg as any).isDateDivider ? (
                <div className="flex justify-center my-4">
                  <span className="text-xs text-gray-400">{(msg as any).date}</span>
                </div>
              ) : msg.isUser ? (
                <div className="flex justify-end">
                  <div className="bg-[#495D48] text-white rounded-lg px-3 py-2 max-w-[50%]">
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-[50%]">
                  <p className="text-sm text-gray-900">{msg.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <button className="text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-transparent border-none outline-none text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#15340B] text-white rounded-full p-2 hover:bg-[#192F18]"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Disputes() {
  const [activeTab, setActiveTab] = useState<string>("disputes");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageType, setMessageType] = useState<"customer" | "seller">("customer");
  const [selectedRecipient, setSelectedRecipient] = useState({ name: "", email: "" });

  const tabs = [
    { id: "disputes", label: "Disputes" },
    { id: "appeals", label: "Appeals" },
    { id: "resolved", label: "Resolved" },
  ];

  const stats = [
    {
      label: "Pending",
      value: "15",
      subtitle: "3 urgent (>24hr)",
      color: "text-gray-900",
      showTrend: false,
    },
    {
      label: "In Progress",
      value: "8",
      subtitle: "2 awaiting response",
      color: "text-gray-900",
      showTrend: false,
    },
    {
      label: "Resolved Today",
      value: "5",
      subtitle: "20% from yesterday",
      color: "text-gray-900",
      showTrend: true,
    },
  ];

  // Generate 30 dispute records
  const allDisputes = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    ticketId: "PRDID234",
    date: "May 01 2025",
    parties: {
      seller: "Holluster gadgets",
      buyer: "John Doe",
    },
    lastMessage: "I'm not getting a response",
    status: i % 3 === 0 ? "Open" : i % 3 === 1 ? "Resolved" : "In Progress",
    statusColor: i % 3 === 0 ? "bg-gray-100 text-gray-700" : i % 3 === 1 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700",
  }));

  const appealDisputes = Array.from({ length: 30 }, (_, i) => ({
    id: 100 + i,
    ticketId: "PRDID234",
    date: "May 01 2025",
    parties: {
      seller: "Holluster gadgets",
      buyer: "John Doe",
    },
    lastMessage: "I'm not getting a response",
    status: "In Progress",
    statusColor: "bg-yellow-100 text-yellow-700",
  }));

  const resolvedDisputes = Array.from({ length: 30 }, (_, i) => ({
    id: 200 + i,
    ticketId: "PRDID234",
    date: "May 01 2025",
    parties: {
      seller: "Holluster gadgets",
      buyer: "John Doe",
    },
    lastMessage: "I'm not getting a response",
    status: "Resolved",
    statusColor: "bg-green-100 text-green-700",
  }));

  const filterDisputes = () => {
    let filtered;

    switch (activeTab) {
      case "appeals":
        filtered = appealDisputes;
        break;
      case "resolved":
        filtered = resolvedDisputes;
        break;
      default:
        filtered = allDisputes;
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (d) =>
          d.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.parties.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.parties.buyer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredDisputes = filterDisputes();
  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredDisputes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDisputes = filteredDisputes.slice(startIndex, startIndex + itemsPerPage);

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

  const handleMenuAction = (dispute: any, action: string) => {
    if (action === "Message Customer") {
      setSelectedRecipient({
        name: dispute.parties.buyer,
        email: "johndoe@email.com",
      });
      setMessageType("customer");
      setShowMessageModal(true);
    } else if (action === "Message Seller") {
      setSelectedRecipient({
        name: dispute.parties.seller,
        email: "hollustergadget@email.com",
      });
      setMessageType("seller");
      setShowMessageModal(true);
    } else {
      console.log(`Action: ${action}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AdminHeader />

      <MessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        recipient={selectedRecipient}
        type={messageType}
      />

      <div className="flex-1 overflow-auto p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Disputes</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
              <div className={`text-3xl font-semibold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              {stat.showTrend ? (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path 
                      d="M2 12C2 12 4 10 6 10C8 10 8 12 10 12C12 12 14 8 14 8" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                    <path 
                      d="M12 8L14 8L14 10" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{stat.subtitle}</span>
                </div>
              ) : (
                <div className="text-xs text-gray-300">{stat.subtitle}</div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-[#15340B] text-[#15340B] font-medium"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="p-6 flex justify-between items-center">
            <div className="relative w-full max-w-md">
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
                className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15340B] border-gray-300 bg-gray-100"
              />
            </div>

            <button
              type="button"
              className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-100 bg-gray-100 ml-4"
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
            <table className="w-full">
              <thead className=" border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tickets ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Parties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Last message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedDisputes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No disputes found
                    </td>
                  </tr>
                ) : (
                  paginatedDisputes.map((dispute) => (
                    <tr key={dispute.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {dispute.ticketId}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {dispute.date}
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {dispute.parties.seller}
                        </div>
                        <div className="text-sm text-gray-500">
                          {dispute.parties.buyer}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {dispute.lastMessage}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${dispute.statusColor}`}
                        >
                          {dispute.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(openMenu === dispute.id ? null : dispute.id)
                          }
                          aria-expanded={openMenu === dispute.id}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical size={20} />
                        </button>

                        {openMenu === dispute.id && (
                          <ActionMenu 
                            onClose={() => setOpenMenu(null)}
                            onAction={(action) => handleMenuAction(dispute, action)}
                          />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 grid grid-cols-3 items-center">
            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>

            <div className="flex items-center justify-center gap-2">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => typeof page === "number" && setCurrentPage(page)}
                  disabled={page === "..."}
                  className={`px-3 py-1 rounded text-sm ${
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