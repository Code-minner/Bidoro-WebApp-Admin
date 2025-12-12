"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, MoreVertical, X, Download, ChevronLeft, ChevronRight } from "lucide-react";
import AdminHeader from "../../../../../components/AdminHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
      className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg py-1 z-50 min-w-[150px]"
    >
      <button
        type="button"
        onClick={() => {
          onAction?.("Pay seller");
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        Pay seller
      </button>
      <button
        type="button"
        onClick={() => {
          onAction?.("Refund customer");
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        Refund customer
      </button>
      <button
        type="button"
        onClick={() => {
          onAction?.("Delete");
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        Delete
      </button>
    </div>
  );
}

function PaySellerModal({
  isOpen,
  onClose,
  payment,
}: {
  isOpen: boolean;
  onClose: () => void;
  payment: any;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Pay seller</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6 leading-relaxed text-center">
          You're manually paying this seller regardless of the fact that the customer hasn't confirmed the product. Are you sure you want to proceed?
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Seller</span>
              <span className="text-sm text-gray-900 font-medium">Johndoe stores</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="text-sm text-gray-900 font-medium">{payment?.amount || "N50,000"}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Payment confirmed");
              onClose();
            }}
            className="flex-1 px-4 py-2.5 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] text-sm font-medium"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}

function RefundCustomerModal({
  isOpen,
  onClose,
  payment,
}: {
  isOpen: boolean;
  onClose: () => void;
  payment: any;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Refund customer</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6 leading-relaxed text-center">
          Seller will not be paid for the product. Are you sure you want to refund customer?
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Customer</span>
              <span className="text-sm text-gray-900 font-medium">John Doe</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="text-sm text-gray-900 font-medium">{payment?.amount || "N50,000"}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Refund confirmed");
              onClose();
            }}
            className="flex-1 px-4 py-2.5 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] text-sm font-medium"
          >
            Refund
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EscrowLedger() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const tabs = [
    { id: "pending", label: "Pending payments" },
    { id: "refunds", label: "Refunds" },
  ];

  // Generate 30 pending payment records
  const pendingPayments = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    payee: {
      name: "John Doe",
      email: "johndoe@email.com",
    },
    date: "May 01 2025",
    transactionId: "ID23456788",
    amount: "N50,000",
    status: "Pending",
    statusColor: "bg-yellow-100 text-yellow-700",
  }));

  // Generate 30 refund records
  const refundPayments = Array.from({ length: 30 }, (_, i) => ({
    id: 100 + i,
    payee: {
      name: "John Doe",
      email: "johndoe@email.com",
    },
    date: "May 01 2025",
    transactionId: "ID23456788",
    amount: "N50,000",
    reason: "Faulty product",
    status: i % 4 === 0 ? "Refunded" : i % 4 === 1 ? "Pending" : i % 4 === 2 ? "Cancelled" : "Refunded",
    statusColor: i % 4 === 0 ? "bg-green-100 text-green-700" : i % 4 === 1 ? "bg-yellow-100 text-yellow-700" : i % 4 === 2 ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-700",
  }));

  const filterPayments = () => {
    let filtered = activeTab === "pending" ? pendingPayments : refundPayments;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.payee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.payee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredPayments = filterPayments();
  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  const handleMenuAction = (payment: any, action: string) => {
    if (action === "Pay seller") {
      setSelectedPayment(payment);
      setShowPayModal(true);
    } else if (action === "Refund customer") {
      setSelectedPayment(payment);
      setShowRefundModal(true);
    } else {
      console.log(`Action: "${action}" on payment ${payment.id}`);
    }
  };

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

      <PaySellerModal
        isOpen={showPayModal}
        onClose={() => setShowPayModal(false)}
        payment={selectedPayment}
      />

      <RefundCustomerModal
        isOpen={showRefundModal}
        onClose={() => setShowRefundModal(false)}
        payment={selectedPayment}
      />

      <div className="flex-1 overflow-auto p-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <button 
            onClick={() => router.push('/payments')}
            className="hover:text-gray-900 text-lg"
          >
            Payments
          </button>
          <span>›</span>
          <span className="text-gray-900 font-big text-lg">Escrow ledger</span>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Header with Download */}
          <div className="px-6 py-4 border-gray-200 flex justify-end">
            <button
              type="button"
              className="flex items-center space-x-2 px-4 py-2 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18]"
            >
              <Download size={20} />
              <span>Download</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b px-6">
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
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15340B] border-gray-300 bg-gray-100"
              />
            </div>

            <button
              type="button"
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 bg-gray-100 ml-4"
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
              <thead className="border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {activeTab === "refunds" ? "Payee(customer)" : "Payee (seller)"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  {activeTab === "refunds" && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Reason
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedPayments.length === 0 ? (
                  <tr>
                    <td colSpan={activeTab === "refunds" ? 7 : 6} className="px-6 py-12 text-center text-gray-500">
                      No payments found
                    </td>
                  </tr>
                ) : (
                  paginatedPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                            <Image
                              src="/assets/user.png"
                              alt={payment.payee.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {payment.payee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {payment.payee.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {payment.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {payment.transactionId}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {payment.amount}
                      </td>

                      {activeTab === "refunds" && (
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {(payment as any).reason}
                        </td>
                      )}

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${payment.statusColor}`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === payment.id ? null : payment.id
                            )
                          }
                          aria-expanded={openMenu === payment.id}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical size={20} />
                        </button>

                        {openMenu === payment.id && (
                          <ActionMenu
                            onClose={() => setOpenMenu(null)}
                            onAction={(action) =>
                              handleMenuAction(payment, action)
                            }
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
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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