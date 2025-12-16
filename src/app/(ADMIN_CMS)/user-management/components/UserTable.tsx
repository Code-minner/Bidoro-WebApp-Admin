// src/app/(ADMIN_CMS)/user-management/components/UserTable.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, MoreVertical, X } from "lucide-react";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  regDate: string;
  phoneNumber: string;
  orders?: number;
  status: "Active" | "Suspended";
  avatar?: string;
}

interface UserTableProps {
  users: User[];
  userType: "customers" | "sellers" | "admins";
}

export default function UserTable({ users, userType }: UserTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [suspendModalUser, setSuspendModalUser] = useState<User | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
      if (openDropdownId !== null) {
        const dropdowns = document.querySelectorAll("[data-dropdown-menu]");
        let clickedInside = false;

        dropdowns.forEach((dropdown) => {
          if (dropdown.contains(e.target as Node)) clickedInside = true;
        });

        if (!clickedInside) setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownId]);

  const handleViewProfile = (e: React.MouseEvent<HTMLButtonElement>, userId: string) => {
    e.stopPropagation();
    router.push(`/user-management/${userType}/${userId}`);
    setOpenDropdownId(null);
  };

  const handleSuspendClick = (e: React.MouseEvent<HTMLButtonElement>, user: User) => {
    e.stopPropagation();
    setSuspendModalUser(user);
    setOpenDropdownId(null);
  };

  const handleConfirmSuspend = () => {
    console.log("Suspending user:", suspendModalUser?.id);
    setSuspendModalUser(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Search + Filter */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
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

          {/* Filter */}
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
                {/* Filter menu */}
                <p className="text-sm font-medium mb-3">Filters</p>

                {/* Date range */}
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[#6C6C6C]">Date range</label>
                  <button className="text-xs text-[#15340B] font-medium">Reset</button>
                </div>

                <div className="flex gap-2 mb-3">
                  <div className="flex-1">
                    <label className="text-xs text-[#6C6C6C]">From:</label>
                    <input
                      type="text"
                      placeholder="Start"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => !e.target.value && (e.target.type = "text")}
                      className="border border-[#E9E9E9] rounded p-2 text-sm w-full mt-1"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="text-xs text-[#6C6C6C]">To:</label>
                    <input
                      type="text"
                      placeholder="End"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => !e.target.value && (e.target.type = "text")}
                      className="border border-[#E9E9E9] rounded p-2 text-sm w-full mt-1"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[#6C6C6C]">Status</label>
                  <button className="text-xs text-[#15340B] font-medium">Reset</button>
                </div>

                <select className="border border-[#E9E9E9] rounded p-2 text-sm w-full mb-4">
                  <option value="">Select option</option>
                  <option>Active</option>
                  <option>Suspended</option>
                </select>

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

        {/* Table wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="border-b border-[#E9E9E9]">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Name</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Reg. date</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Phone number</th>

                {userType !== "admins" && (
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Orders</th>
                )}

                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6C6C6C] uppercase">Status</th>

                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6C6C6C] uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-[#E9E9E9]">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[#F6F5FA] transition-colors">
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E9E9E9] flex items-center justify-center overflow-hidden shrink-0">
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-medium text-[#6C6C6C]">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-[#242424] truncate">{user.name}</div>
                        <div className="text-xs text-[#6C6C6C] break-all">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-[#6C6C6C]">{user.regDate}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-[#6C6C6C]">{user.phoneNumber}</td>

                  {userType !== "admins" && (
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-[#242424] font-medium">{user.orders || 0}</td>
                  )}

                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-success-50 text-success-700"
                          : "bg-error-50 text-error-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === user.id ? null : user.id);
                          setIsFilterOpen(false);
                        }}
                        className="p-2 hover:bg-[#F6F5FA] rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-[#6C6C6C]" />
                      </button>

                      {openDropdownId === user.id && (
                        <div
                          data-dropdown-menu
                          className="absolute right-0 mt-2 w-40 bg-white border border-[#E9E9E9] rounded-lg shadow-lg z-50 py-1"
                        >
                          <button
                            onClick={(e) => handleViewProfile(e, user.id)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F5FA] text-[#242424]"
                          >
                            View profile
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F5FA] text-[#242424]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => handleSuspendClick(e, user)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F5FA] text-[#6C6C6C]"
                          >
                            Suspend
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
        <div className="px-4 sm:px-6 py-4 border-t border-[#E9E9E9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#6C6C6C]">Page 1 of 30</div>

          <div className="flex flex-wrap justify-center gap-1">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`w-8 h-8 flex items-center justify-center border rounded-lg ${
                  n === 3 ? "bg-[#15340B] text-white" : "text-[#6C6C6C]"
                }`}
              >
                {n}
              </button>
            ))}

            <span className="px-2 text-[#6C6C6C]">...</span>

            {[10, 11, 12].map((n) => (
              <button key={n} className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">
                {n}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">‹</button>
            <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-[#6C6C6C]">›</button>
          </div>
        </div>
      </div>

      {/* Suspend Modal */}
      {suspendModalUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-4 sm:p-6 relative">
            <button
              onClick={() => setSuspendModalUser(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1 hover:bg-[#F6F5FA] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#6C6C6C]" />
            </button>

            <h3 className="text-base sm:text-lg font-semibold text-[#242424] mb-2 text-center">Suspend customer</h3>

            <p className="text-xs sm:text-sm text-[#6C6C6C] text-center mb-4 sm:mb-6">
              User will no longer have access to their account. Are you sure you want to blacklist this user?
            </p>

            <div className="bg-[#F6F5FA] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="bg-white rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#6C6C6C]">Name</span>
                  <span className="text-[#242424] font-medium">{suspendModalUser.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#6C6C6C]">Email</span>
                  <span className="text-[#242424] break-all">{suspendModalUser.email}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#6C6C6C]">Reg. date</span>
                  <span className="text-[#242424]">{suspendModalUser.regDate}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setSuspendModalUser(null)}
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
