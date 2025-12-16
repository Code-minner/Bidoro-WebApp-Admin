"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function getMenuOptions(status: string) {
  switch (status) {
    case "Successful":
      return ["Order Details", "Delete"];
    case "Pending":
      return ["Order Details", "Cancel"];
    case "Overdue":
      return ["Order Details", "Message Vendor", "Refund", "Cancel"];
    case "Cancelled":
      return ["Order Details", "Delete"];
    default:
      return ["Order Details"];
  }
}

function ActionMenu({
  options,
  onClose,
  onAction,
}: {
  options: string[];
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
      {options.map((item, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => {
            onAction?.(item);
            onClose();
          }}
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default function OrderManagement() {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const tabs = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "delivered", label: "Delivered" },
    { id: "overdue", label: "Overdue" },
  ];

  // Generate diverse orders for all tabs
  const allOrders = [
    // Mixed statuses for "All" tab
    ...Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      product: "iPhone 16 pro",
      productId: `#P80${4234 + i}`,
      date: "May 01 2025",
      vendor: "Holluster gadgets",
      price: "N850,000",
      status: i % 4 === 0 ? "Successful" : i % 4 === 1 ? "Pending" : i % 4 === 2 ? "Cancelled" : "Overdue",
      statusColor: i % 4 === 0 ? "bg-green-100 text-green-700" : i % 4 === 1 ? "bg-yellow-100 text-yellow-700" : i % 4 === 2 ? "bg-gray-100 text-gray-700" : "bg-orange-100 text-orange-700",
    })),
  ];

  // Generate 30 orders for each specific tab
  const pendingOrders = Array.from({ length: 30 }, (_, i) => ({
    id: 100 + i,
    product: "iPhone 16 pro",
    productId: `#P80${5000 + i}`,
    date: "May 01 2025",
    vendor: "Holluster gadgets",
    price: "N850,000",
    status: "Pending",
    statusColor: "bg-yellow-100 text-yellow-700",
  }));

  const deliveredOrders = Array.from({ length: 30 }, (_, i) => ({
    id: 200 + i,
    product: "iPhone 16 pro",
    productId: `#P80${6000 + i}`,
    date: "May 01 2025",
    vendor: "Holluster gadgets",
    price: "N850,000",
    status: "Successful",
    statusColor: "bg-green-100 text-green-700",
  }));

  const overdueOrders = Array.from({ length: 30 }, (_, i) => ({
    id: 300 + i,
    product: "iPhone 16 pro",
    productId: `#P80${7000 + i}`,
    date: "May 01 2025",
    vendor: "Holluster gadgets",
    price: "N850,000",
    status: "Overdue",
    statusColor: "bg-orange-100 text-orange-700",
  }));

  const filterOrders = () => {
    let filtered;

    switch (activeTab) {
      case "pending":
        filtered = pendingOrders;
        break;
      case "delivered":
        filtered = deliveredOrders;
        break;
      case "overdue":
        filtered = overdueOrders;
        break;
      default:
        filtered = allOrders;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (o) =>
          o.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredOrders = filterOrders();
  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleMenuAction = (orderId: number, action: string) => {
    if (action === "Order Details") {
      router.push(`/orders/${orderId}`);
      return;
    }
    console.log(`Action: "${action}" on order ${orderId}`);
  };

  // Generate page numbers for pagination
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
    <div className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Orders</h2>

      <div className="bg-white rounded-lg border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200 px-4 sm:px-6">
          <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                }}
                className={`py-3 sm:py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#495D48] text-[#495D48] font-medium"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0">
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
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495D48] border-gray-300 bg-gray-50"
            />
          </div>

          <button
            type="button"
            className="sm:ml-4 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 bg-gray-50"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vendor
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3"></th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 sm:px-6 py-12 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {order.product}
                      </div>
                      <div className="text-sm text-gray-500">{order.productId}</div>
                    </td>

                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{order.date}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{order.vendor}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{order.price}</td>

                    <td className="px-4 sm:px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${order.statusColor}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-4 sm:px-6 py-4 text-right relative">
                      <button
                        type="button"
                        onClick={() => setOpenMenu(openMenu === order.id ? null : order.id)}
                        aria-expanded={openMenu === order.id}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openMenu === order.id && (
                        <ActionMenu
                          options={getMenuOptions(order.status)}
                          onClose={() => setOpenMenu(null)}
                          onAction={(action) => handleMenuAction(order.id, action)}
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
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
          <div className="text-sm text-gray-700 text-center sm:text-left">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                type="button"
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={page === "..."}
                className={`px-2 sm:px-3 py-1 rounded text-sm ${
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

          <div className="flex items-center justify-center sm:justify-end gap-2">
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
  );
}