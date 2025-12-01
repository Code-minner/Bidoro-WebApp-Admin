"use client";

import { useState } from "react";

interface AddAdminModalProps {
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; role: string }) => void;
}

export default function AddAdminModal({ onClose, onSubmit }: AddAdminModalProps) {
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
        className="bg-white w-full max-w-md rounded-xl shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with border */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Add new admin</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="p-6">

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black mb-1">
              Full name
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-primaryGreen-500 outline-none"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-primaryGreen-500 outline-none"
              placeholder="Example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-black mb-1">
              Role
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-primaryGreen-500 outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select option</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        {/* FULL-WIDTH SIDE-BY-SIDE BUTTONS */}
        <div className="flex w-full px-6 pb-6 gap-4">

          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg border text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-lg bg-primaryGreen-600 text-white font-semibold hover:bg-primaryGreen-700 transition"
          >
            Add admin
          </button>

        </div>
      </div>
    </div>
  );
}
