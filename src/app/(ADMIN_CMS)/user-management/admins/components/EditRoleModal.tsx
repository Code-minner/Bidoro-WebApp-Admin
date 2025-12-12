// EditRoleModal.tsx
import { useState, useEffect } from "react";
import { Check, Info } from "lucide-react";

const ALL_PERMISSIONS = [
  "KYC approval",
  "Edit User",
  "Create Admin",
  "Remove Admins",
  "Create Roles",
  "Read Products",
  "Delete Products",
  "Approve Products",
  "Suspend Customer",
];

interface EditRoleModalProps {
  onClose: () => void;
  role: { title: string; permissions: string[] };
  onSubmit: (data: { title: string; permissions: string[] }) => void;
}

const EditRoleModal = ({ onClose, role, onSubmit }: EditRoleModalProps) => {
  const [title, setTitle] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    setTitle(role.title);
    setSelectedPermissions(role.permissions);
  }, [role]);

  const handleToggle = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ title, permissions: selectedPermissions });
    onClose();
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
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-500 hover:text-gray-900 text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-300 -mx-4 sm:-mx-6 px-4 sm:px-6">
          Edit role
        </h2>

        {/* Role Title */}
        <label className="block text-sm font-medium text-black mb-1">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full px-3 py-2 bg-gray-100 rounded-lg text-sm sm:text-base"
        />

        {/* Permissions */}
        <label className="block text-sm font-medium text-black mb-2 mt-4">
          Permissions
        </label>

        <div className="border border-gray-300 rounded-lg p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
            {ALL_PERMISSIONS.map((permission) => {
              const selected = selectedPermissions.includes(permission);
              return (
                <label
                  key={permission}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handleToggle(permission)}
                >
                  <span
                    className={`w-5 h-5 flex-shrink-0 border rounded-sm flex items-center justify-center ${
                      selected
                        ? "bg-primaryGreen-500 border-primaryGreen-600 text-white"
                        : "bg-white border-gray-400"
                    }`}
                  >
                    {selected && <Check className="w-4 h-4" />}
                  </span>

                  <span className="text-sm text-gray-800">{permission}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* ⚠️ Warning Info Box */}
        <div className="mt-4 sm:mt-5 p-3 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start gap-2 sm:gap-3">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs sm:text-sm text-yellow-700 leading-snug">
            Any changes made affect all instances of this role, both existing and future.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
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
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRoleModal;