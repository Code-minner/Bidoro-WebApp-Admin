// src/app/(ADMIN_CMS)/user-management/admins/page.tsx
"use client";

import UserManagementHeader from "../components/UserManagementHeader";
// IMPORT THE NEW COMPONENT
import AdminTable from "./components/AdminTable"; // Assuming AdminTable is created inside /admins/components

const admins = [
  { id: "1", name: "Admin User", email: "admin@bidoro.com", role: "Super Admin", regDate: "Jan 01 2025", phoneNumber: "08123456789", status: "Active" as const },
  { id: "2", name: "Super Admin", email: "superadmin@bidoro.com", role: "Super Admin", regDate: "Jan 01 2025", phoneNumber: "08198765432", status: "Inactive" as const },
  { id: "3", name: "Content Manager", email: "content@bidoro.com", role: "Content Manager", regDate: "Feb 15 2025", phoneNumber: "08134567890", status: "Active" as const },
  { id: "4", name: "Support Lead", email: "support@bidoro.com", role: "Customer Support", regDate: "Mar 10 2025", phoneNumber: "08145678901", status: "Active" as const },
];

export default function AdminsPage() {
  return (
    <div className="min-h-screen bg-[#F6F5FA]">
      <UserManagementHeader />

      <main className="p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-[#6C6C6C] mb-2">
            <span>User Management</span>
            <span>›</span>
            <span className="text-[#242424] font-medium">Admins</span>
          </div>
        </div>

        {/* Use the specific AdminTable component */}
        <AdminTable admins={admins} /> 
      </main>
    </div>
  );
}