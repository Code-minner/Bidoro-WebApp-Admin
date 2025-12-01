// src/app/(ADMIN_CMS)/user-management/customers/page.tsx
"use client";

import UserManagementHeader from "../components/UserManagementHeader";
import UserTable from "../components/UserTable";

const customers = [
  { id: "1", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", orders: 312, status: "Active" as const, avatar: "/assets/user.png" },
  { id: "2", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", orders: 312, status: "Suspended" as const, avatar: "/assets/user.png" },
  { id: "3", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", orders: 312, status: "Active" as const, avatar: "/assets/user.png" },
  { id: "4", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", orders: 312, status: "Active" as const, avatar: "/assets/user.png" },
  { id: "5", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", orders: 312, status: "Active" as const, avatar: "/assets/user.png" },
  { id: "6", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", orders: 312, status: "Active" as const, avatar: "/assets/user.png" },
  { id: "7", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", orders: 312, status: "Active" as const, avatar: "/assets/user.png" },
  { id: "8", name: "John Doe", email: "JohnDoe@email.com", regDate: "May 01 2025", phoneNumber: "08123456789", orders: 312, status: "Active" as const, avatar: "/assets/user.png" },
];

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-[#F6F5FA]">
      <UserManagementHeader />

      <main className="p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-[#6C6C6C] mb-2">
            <span>User Management</span>
            <span>›</span>
            <span className="text-[#242424] font-medium">Customers</span>
          </div>
        </div>

        <UserTable users={customers} userType="customers" />
      </main>
    </div>
  );
}