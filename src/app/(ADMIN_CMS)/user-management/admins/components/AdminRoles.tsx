// This component displays the list of roles and their permissions.

import { useState } from "react";
import AddRoleModal from "./AddRoleModal"; // Import the new modal

// =======================
// Role Type
// =======================
interface Role {
  title: string;
  permissions: string[]; // e.g., "KYC approval", "Edit user", "Create Admin"
}

// Dummy data based on the Figma image
const DUMMY_ROLES: Role[] = [
  {
    title: "Super Admin",
    permissions: [
      "KYC approval",
      "Edit User",
      "Create Admin",
      "Remove Admins",
      "Create Roles",
      "Suspend Customer",
    ],
  },
  {
    title: "Admin",
    permissions: [
      "KYC approval",
      "Edit User",
      "Create Admin",
      "Remove Admins",
      "Suspend Customer",
    ],
  },
  {
    title: "Compliance",
    permissions: [
      "Read Products",
      "Delete Products",
      "Approve Products",
      "Suspend Customer",
    ],
  },
  {
    title: "Customer Support",
    permissions: ["KYC approval", "Edit User", "Suspend Customer"],
  },
  {
    title: "Reviewer",
    permissions: [
      "KYC approval",
      "Edit User",
      "Remove Admins",
      "Suspend Customer",
    ],
  },
];

// =======================
// PermissionsPill Component
// =======================
const PermissionsPill = ({ text }: { text: string }) => (
  <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full mr-2 mb-1">
    {text}
  </span>
);

// =======================
// AdminRoles Main Component
// =======================
export default function AdminRoles() {
  const [roles] = useState<Role[]>(DUMMY_ROLES);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddRoleModal, setShowAddRoleModal] = useState(false); // New state for modal

  const filteredRoles = roles.filter((role) =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = (data: { title: string; permissions: string[] }) => {
    console.log("New Role Added:", data);
    // In a real app, you would add logic to update the roles state/API here.
  };

  return (
    <div>
      {/* Header with Search and Add Role Button */}
      {/* FIXED PADDING: px-6 pb-4 pt-0 aligns the search bar correctly below the tab border */}
      <div className="flex justify-between items-center px-6 pb-4">
        {/* Search */}
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-gray-100 rounded-lg focus:ring-primaryGreen-500 focus:outline-none focus:border-primaryGreen-500 border border-transparent"
          />
          <svg
            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Add Role */}
        <button
          onClick={() => setShowAddRoleModal(true)} // Toggle modal
          className="bg-primaryGreen-500 text-white px-4 py-2 rounded-lg flex items-center shadow-md text-sm font-medium hover:bg-primaryGreen-600 transition duration-150"
        >
          <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add role
        </button>
      </div>

      {/* Roles Table */}
      <div className="overflow-x-auto px-6 pb-6">
        <div className="border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-1/5">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-3/5">
                  Permissions
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase w-1/5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRoles.map((role) => (
                <tr key={role.title}>
                  {/* Title */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {role.title}
                  </td>

                  {/* Permissions */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap">
                      {role.permissions.map((p, index) => (
                        <PermissionsPill key={index} text={p} />
                      ))}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <button className="text-primaryGreen-600 hover:text-primaryGreen-900 mr-4">
                      Edit
                    </button>
                    <button className="text-error-600 hover:text-error-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredRoles.length === 0 && (
        <p className="mt-4 p-4 text-center text-gray-500 bg-gray-50 rounded-lg mx-6 mb-6">
          No roles match your search term.
        </p>
      )}

      {/* Add Role Modal */}
      {showAddRoleModal && (
        <AddRoleModal
          onClose={() => setShowAddRoleModal(false)}
          onSubmit={handleAddRole}
        />
      )}
    </div>
  );
}