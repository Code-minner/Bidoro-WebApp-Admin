"use client";

import { useState } from "react";
import AdminRoles from "./AdminRoles";

// =======================
// Admin Type
// =======================
export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  regDate: string;
  lastSeen?: string;
  status: "Active" | "Inactive";
}

interface AdminTableProps {
  admins: Admin[];
}

// =======================
// StatusPill
// =======================
const StatusPill = ({ status }: { status: "Active" | "Inactive" }) => (
  <span
    className={`px-3 py-1 text-xs font-semibold rounded-full ${
      status === "Active"
        ? "bg-success-50 text-success-700"
        : "bg-gray-100 text-gray-800"
    }`}
  >
    {status}
  </span>
);

// =======================
// ActionsDropdown
// =======================
interface ActionsDropdownProps {
  adminId: string;
  onViewAdmin: () => void;
}

const ActionsDropdown = ({ adminId, onViewAdmin }: ActionsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action: string) => {
    if (action === "View admin") onViewAdmin();
    console.log(`${action} requested for Admin ID: ${adminId}`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="text-gray-500 hover:text-gray-900"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 14a2 2 0 110-4 2 2 0 010 4zm0-7a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10 rounded-md">
          <div className="py-1">
            <button
              onClick={() => handleAction("View admin")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
            >
              View admin
            </button>
            <button
              onClick={() => handleAction("Reset password")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Reset password
            </button>
            <button
              onClick={() => handleAction("Delete")}
              className="block w-full text-left px-4 py-2 text-sm text-error-500 hover:bg-error-50 rounded-b-md"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// =======================
// Admin Details Modal
// =======================
interface AdminDetailsModalProps {
  admin: Admin;
  onClose: () => void;
}

const AdminDetailsModal = ({ admin, onClose }: AdminDetailsModalProps) => {
  const fields = [
    { label: "Name", value: admin.name },
    { label: "Email", value: admin.email },
    { label: "Role", value: admin.role },
    { label: "Date added", value: admin.regDate },
    { label: "Status", value: admin.status },
    { label: "Last seen", value: admin.lastSeen || "N/A" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-sm relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="p-6 pt-10">
          <div className="space-y-3">
            {fields.map((field) => (
              <div key={field.label} className="flex justify-between text-sm">
                <span className="text-gray-500">{field.label}:</span>

                {field.label === "Status" ? (
                  <StatusPill status={field.value as "Active" | "Inactive"} />
                ) : (
                  <span className="text-gray-800">{field.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// =======================
// Add Admin Modal
// =======================
interface AddAdminModalProps {
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; role: string }) => void;
}

const AddAdminModal = ({ onClose, onSubmit }: AddAdminModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    onSubmit({ name, email, role });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-900"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-6 pb-4 border-b border-gray-300 -mx-6 px-6">
          Add new admin
        </h2>

        {/* Full Name */}
        <label className="block text-sm text-black font-medium mb-1">
          Full name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none"
          placeholder="Enter full name"
        />

        {/* Email */}
        <label className="block text-sm text-black font-medium mb-1">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none"
          placeholder="Example@gmail.com"
        />

        {/* Role */}
        <label className="block text-sm text-black font-medium mb-1">
          Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mb-6 w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none"
        >
          <option value="">Select option</option>
          <option value="Super Admin">Super Admin</option>
          <option value="Admin">Admin</option>
        </select>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={onClose}
            className="w-1/2 py-2.5 bg-gray-200 rounded-lg font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="w-1/2 py-2.5 bg-primaryGreen-500 text-white rounded-lg font-medium"
          >
            Add admin
          </button>
        </div>
      </div>
    </div>
  );
};

// =======================
// MAIN COMPONENT WITH TABS
// =======================
export default function AdminTable({ admins }: AdminTableProps) {
  const [selectedTab, setSelectedTab] = useState<"admins" | "roles">("admins");
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  if (!admins.length)
    return (
      <p className="p-4 bg-white shadow-lg rounded-lg">No admins found.</p>
    );

  const dataToRender = admins.map((admin) => ({
    ...admin,
    name: "John Doe",
    email: "john.doe@example.com",
  }));

  return (
    <div className="bg-white shadow-lg rounded-lg">
      {/* Tabs */}
      <div className="px-6 pt-6">
        <div className="flex gap-6 border-b border-gray-200">
          <button
            className={`pb-3 text-sm font-medium ${
              selectedTab === "admins"
                ? "text-primaryGreen-600 border-b-2 border-primaryGreen-600"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("admins")}
          >
            Admins
          </button>

          <button
            className={`pb-3 text-sm font-medium ${
              selectedTab === "roles"
                ? "text-primaryGreen-600 border-b-2 border-primaryGreen-600"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("roles")}
          >
            Roles
          </button>
        </div>
      </div>

      {/* -------------------- ADMINS TAB -------------------- */}
      {selectedTab === "admins" && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center p-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:ring-primaryGreen-500"
              />
              <svg
                className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="currentColor"
              >
                <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
              </svg>
            </div>

            {/* Add Admin */}
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primaryGreen-500 text-white px-4 py-2 rounded-lg flex items-center shadow-md"
            >
              <svg className="h-5 w-5 mr-1" fill="currentColor">
                <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
              Add admin
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Name", "Email", "Role", "Date added", "Status", ""].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {dataToRender.map((admin) => (
                  <tr
                    key={admin.id}
                    onClick={() => setSelectedAdmin(admin)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {admin.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {admin.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {admin.role}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {admin.regDate}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <StatusPill status={admin.status} />
                    </td>

                    <td className="px-6 py-4 text-right">
                      <ActionsDropdown
                        adminId={admin.id}
                        onViewAdmin={() => setSelectedAdmin(admin)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* -------------------- ROLES TAB -------------------- */}
      {/* {selectedTab === "roles" && (
        <div className="p-6 text-gray-600 text-sm">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-center text-gray-500">
              Roles management will be implemented here.
            </p>
          </div>
        </div>
      )} */}


      {/* -------------------- ROLES TAB -------------------- */}
      {selectedTab === "roles" && <AdminRoles />}

      {/* Modals */}
      {selectedAdmin && (
        <AdminDetailsModal
          admin={selectedAdmin}
          onClose={() => setSelectedAdmin(null)}
        />
      )}

      {showAddModal && (
        <AddAdminModal
          onClose={() => setShowAddModal(false)}
          onSubmit={(data) => console.log("Admin added:", data)}
        />
      )}
    </div>
  );
}
