import { useState } from "react";

// Example structure for a permission item.
const ALL_PERMISSIONS = [
  "KYC approval",
  "Edit User",
  "Create Admin",
  "Remove Admins",
  "Create Roles",
  "Suspend Customer",
  "Read Products",
  "Delete Products",
  "Approve Products",
  "Manage Orders",
];

// =======================
// AddRoleModal
// =======================
interface AddRoleModalProps {
  onClose: () => void;
  onSubmit: (data: { title: string; permissions: string[] }) => void;
}

const AddRoleModal = ({ onClose, onSubmit }: AddRoleModalProps) => {
  const [title, setTitle] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleTogglePermission = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = () => {
    if (title.trim() && selectedPermissions.length > 0) {
      onSubmit({ title, permissions: selectedPermissions });
      onClose();
    } else {
      alert("Please enter a title and select at least one permission.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-xl p-6 relative shadow-xl max-h-[90vh] overflow-y-auto"
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
          Add new role
        </h2>

        {/* Role Title */}
        <label className="block text-sm text-black font-medium mb-1">
          Role Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none"
          placeholder="Enter role title (e.g., Content Manager)"
        />

        {/* Permissions */}
        <label className="block text-sm text-black font-medium mb-2 mt-4">
          Select Permissions
        </label>
        <div className="border border-gray-200 p-3 rounded-lg flex flex-wrap gap-2">
          {ALL_PERMISSIONS.map((permission) => (
            <button
              key={permission}
              onClick={() => handleTogglePermission(permission)}
              className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                selectedPermissions.includes(permission)
                  ? "bg-primaryGreen-500 text-white border-primaryGreen-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {permission}
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="w-1/2 py-2.5 bg-gray-200 rounded-lg font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="w-1/2 py-2.5 bg-primaryGreen-500 text-white rounded-lg font-medium hover:bg-primaryGreen-600 transition"
          >
            Create Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoleModal;