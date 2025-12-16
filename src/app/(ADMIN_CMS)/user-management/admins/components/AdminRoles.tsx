// AdminRoles.tsx
import { useState } from "react";
import AddRoleModal from "./AddRoleModal";
import EditRoleModal from "./EditRoleModal";
import { Pencil, Trash2 } from "lucide-react";

interface Role {
  title: string;
  permissions: string[];
}

const DUMMY_ROLES: Role[] = [
  {
    title: "Super Admin",
    permissions: [
      "KYC approval",
      "Edit User",
      "Create Admin",
      "Remove Admins",
      "Create Roles",
      "Read Products",
      "Delete Products",
      "Approve Products",
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
      "Create Roles",
      "Read Products",
      "Delete Products",
      "Approve Products",
      "Suspend Customer",
    ],
  },
  {
    title: "Compliance",
    permissions: [
      "KYC approval",
      "Edit User",
      "Create Admin",
      "Remove Admins",
      "Create Roles",
      "Read Products",
      "Delete Products",
      "Approve Products",
      "Suspend Customer",
    ],
  },
  {
    title: "Customer Support",
    permissions: [
      "KYC approval",
      "Edit User",
      "Create Admin",
      "Remove Admins",
      "Create Roles",
      "Read Products",
      "Delete Products",
      "Approve Products",
      "Suspend Customer",
    ],
  },
  {
    title: "Reviewer",
    permissions: [
      "KYC approval",
      "Edit User",
      "Create Admin",
      "Remove Admins",
      "Create Roles",
      "Read Products",
      "Delete Products",
      "Approve Products",
      "Suspend Customer",
    ],
  },
];

const PermissionsPill = ({ text }: { text: string }) => (
  <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full mr-2 mb-1">
    <span className="text-gray-400 mr-2">|</span>
    {text}
  </span>
);

export default function AdminRoles() {
  const [roles] = useState<Role[]>(DUMMY_ROLES);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);

  const filteredRoles = roles.filter((role) =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = (data: { title: string; permissions: string[] }) => {
    console.log("New Role Added:", data);
  };

  return (
    <div>
      {/* Header with Search and Add Role Button */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center px-4 sm:px-6 pb-4 gap-3">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-gray-100 rounded-lg focus:ring-primaryGreen-500 focus:outline-none border border-transparent text-sm"
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
          onClick={() => setShowAddRoleModal(true)}
          className="bg-primaryGreen-500 text-white px-4 py-2 rounded-lg flex items-center justify-center shadow-md text-sm font-medium hover:bg-primaryGreen-600 transition"
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

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto px-4 sm:px-6 pb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
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
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  {role.title}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex flex-wrap">
                    {role.permissions.map((p, index) => (
                      <PermissionsPill key={index} text={p} />
                    ))}
                  </div>
                </td>

                <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                  <div className="flex justify-end gap-4">
                    <button
                      className="text-primaryGreen-600 hover:text-primaryGreen-900"
                      onClick={() => {
                        setRoleToEdit(role);
                        setShowEditModal(true);
                      }}
                    >
                      <Pencil className="w-5 h-5" />
                    </button>

                    <button className="text-error-600 hover:text-error-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden px-4 pb-6 space-y-4">
        {filteredRoles.map((role) => (
          <div key={role.title} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-base font-semibold text-gray-900">{role.title}</h3>
              <div className="flex gap-3">
                <button
                  className="text-primaryGreen-600 hover:text-primaryGreen-900"
                  onClick={() => {
                    setRoleToEdit(role);
                    setShowEditModal(true);
                  }}
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button className="text-error-600 hover:text-error-900">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-2">Permissions</div>
            <div className="flex flex-wrap">
              {role.permissions.map((p, index) => (
                <PermissionsPill key={index} text={p} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredRoles.length === 0 && (
        <p className="mt-4 p-4 text-center text-gray-500 bg-gray-50 rounded-lg mx-4 sm:mx-6 mb-6 text-sm">
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

      {/* Edit Role Modal */}
      {showEditModal && roleToEdit && (
        <EditRoleModal
          role={roleToEdit}
          onClose={() => setShowEditModal(false)}
          onSubmit={(data) => {
            console.log("Edited role:", data);
          }}
        />
      )}
    </div>
  );
}