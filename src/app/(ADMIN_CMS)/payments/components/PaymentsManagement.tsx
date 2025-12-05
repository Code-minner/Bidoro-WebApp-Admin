"use client";
import AdminHeader from "../../../../components/AdminHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState, useRef, useEffect } from "react";
import { Search, Download, MoreVertical, X } from "lucide-react";


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

export default function PaymentsManagement() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const stats = [
    {
      label: "Total funds held",
      value: "N200,634",
      change: "-1% than last month",
      changeType: "negative",
      icon: "📊",
    },
    {
      label: "Total inflow",
      value: "N350,345",
      change: "+8% than last month",
      changeType: "positive",
      icon: "📥",
    },
    {
      label: "Total outflow",
      value: "N120,908",
      change: "+8% than last month",
      changeType: "positive",
      icon: "📤",
    },
    {
      label: "Total refunds",
      value: "N69,300",
      change: "+5% than last month",
      changeType: "positive",
      icon: "🔄",
    },
  ];

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

  const filterPayments = () => {
    let filtered = activeTab === "pending" ? pendingPayments : [];

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

  const handleMenuAction = (payment: any, action: string) => {
    if (action === "Pay seller" || action === "Refund customer") {
      router.push('/payments/escrow-ledger');
    } else {
      console.log(`Action: "${action}" on payment ${payment.id}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="flex-1 overflow-auto p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payments</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{stat.icon}</span>
                <button className="text-gray-400 hover:text-gray-600">
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className="text-2xl font-semibold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div
                className={`text-xs flex items-center ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <span className="mr-1">
                  {stat.changeType === "positive" ? "↗" : "↘"}
                </span>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Escrow Ledger Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Header with Download and View all */}
          <div className="px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Escrow ledger
            </h3>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex items-center space-x-2 px-4 py-2 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18]"
              >
                <Download size={20} />
                <span>Download</span>
              </button>
              <button
                type="button"
                onClick={() => router.push('/payments/escrow-ledger')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 bg-gray-50"
              >
                View all
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
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
          <div className="p-6 border-gray-200 flex justify-between items-center">
            <div className="relative w-full max-w-md">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15340B] bg-gray-100"
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
              <thead className="border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Payee (seller)
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No payments found
                    </td>
                  </tr>
                ) : (
                  filteredPayments.slice(0, 5).map((payment) => (
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
        </div>
      </div>
    </div>
  );
}