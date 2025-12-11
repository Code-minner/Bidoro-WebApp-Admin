// AddRoleModal.tsx
import { useState } from "react";
import { Check } from "lucide-react";

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
        className="bg-white rounded-xl w-full max-w-xl p-4 sm:p-6 relative shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-500 hover:text-gray-900 text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-300 -mx-4 sm:-mx-6 px-4 sm:px-6">
          Add new role
        </h2>

        {/* Role Title */}
        <label className="block text-sm text-black font-medium mb-1">
          Role Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none text-sm sm:text-base"
          placeholder="Enter role title (e.g., Content Manager)"
        />

        {/* Permissions */}
        <label className="block text-sm text-black font-medium mb-2 mt-4">
          Select Permissions
        </label>

        {/* Bordered permissions container */}
        <div className="border rounded-lg p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
            {ALL_PERMISSIONS.map((permission) => {
              const isSelected = selectedPermissions.includes(permission);
              return (
                <label
                  key={permission}
                  className="flex items-center gap-3 cursor-pointer select-none"
                  onClick={() => handleTogglePermission(permission)}
                >
                  {/* Square checkbox */}
                  <span
                    className={`w-5 h-5 flex-shrink-0 border rounded-sm flex items-center justify-center transition ${
                      isSelected
                        ? "bg-primaryGreen-500 border-primaryGreen-500 text-white"
                        : "border-gray-400 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4" />}
                  </span>

                  <span className="text-sm text-gray-800">{permission}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            onClick={onClose}
            className="w-full sm:w-1/2 py-2.5 bg-gray-200 rounded-lg font-medium text-sm sm:text-base"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="w-full sm:w-1/2 py-2.5 bg-primaryGreen-500 text-white rounded-lg font-medium hover:bg-primaryGreen-600 transition text-sm sm:text-base"
          >
            Create Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoleModal;