"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import AdminHeader from "../../../../../components/AdminHeader";

export default function InspectReportedProduct() {
  const router = useRouter();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#F6F5FA]">
      <AdminHeader />

      {/* ===================== BREADCRUMB (IN GRAY AREA) ===================== */}
      <div className="px-10 py-6">
        <span
          className="text-gray-500 hover:underline cursor-pointer"
          onClick={() => router.push("/products")}
        >
          Products
        </span>
        <span className="text-gray-500">{`  >  `}</span>
        <span className="text-gray-700 font-medium">View</span>
      </div>

      <div className="px-10 flex gap-10 w-full pb-10">

        {/* ======================== LEFT MAIN FORM ======================== */}
        <div className="flex-1 bg-white rounded-xl p-8 shadow-sm border border-[#E9E9E9]">
          
          {/* Store Name */}
          <h2 className="text-xl font-semibold mb-8">Johnson's Store</h2>

       


          {/* ------- FORM GRID (3 columns like Figma) ------- */}
          <div className="grid grid-cols-3 gap-6">

            {/* Category */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Category</label>
              <input
                className="w-full p-3 border rounded-lg bg-[#F6F5FA]"
                value="Phones & Tablets"
                disabled
              />
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Subcategory</label>
              <input
                className="w-full p-3 border rounded-lg bg-[#F6F5FA]"
                value="Phones"
                disabled
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Location</label>
              <input
                className="w-full p-3 border rounded-lg bg-[#F6F5FA]"
                value="Wuse, Abuja"
                disabled
              />
            </div>

          </div>

          {/* Product Title */}
          <div className="mt-6">
            <label className="block text-sm text-gray-600 mb-1">Product Title</label>
            <input
              className="w-full p-3 border rounded-lg bg-[#F6F5FA]"
              value="Apple iPhone 15 Pro Max"
              disabled
            />
          </div>

          {/* Product description */}
          <div className="mt-6">
            <label className="block text-sm text-gray-600 mb-1">Product Description</label>
            <textarea
              className="w-full p-3 border rounded-lg bg-[#F6F5FA] h-32 resize-none"
              value="The iPhone 15 Pro Max features an A17 chip..."
              disabled
            />
          </div>

          {/* ------------------ 2-COLUMN INPUT GRID ------------------ */}
          <div className="mt-6 grid grid-cols-2 gap-6">

            {/* Condition */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Condition</label>
              <input className="w-full p-3 border rounded-lg bg-[#F6F5FA]" value="Fairly Used" disabled />
            </div>

            {/* Negotiation */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Open to negotiation?</label>
              <input className="w-full p-3 border rounded-lg bg-[#F6F5FA]" value="Yes" disabled />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Model</label>
              <input className="w-full p-3 border rounded-lg bg-[#F6F5FA]" value="iPhone 15 Pro Max" disabled />
            </div>

            {/* Screen */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Screen Size</label>
              <input className="w-full p-3 border rounded-lg bg-[#F6F5FA]" value="6.9 inches" disabled />
            </div>

            {/* Colour */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Colour</label>
              <input className="w-full p-3 border rounded-lg bg-[#F6F5FA]" value="Black Titanium" disabled />
            </div>

            {/* OS */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Operating System</label>
              <input className="w-full p-3 border rounded-lg bg-[#F6F5FA]" value="iOS 18" disabled />
            </div>

            {/* RAM */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">RAM</label>
              <input className="w-full p-3 border rounded-lg bg-[#F6F5FA]" value="8GB" disabled />
            </div>

            {/* Storage */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Storage</label>
              <input className="w-full p-3 border rounded-lg bg-[#F6F5FA]" value="512GB" disabled />
            </div>

            {/* Card slot */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Card Slot</label>
              <input className="w-full p-3 border rounded-lg bg-[#F6F5FA]" value="No memory card slot" disabled />
            </div>

            {/* Main camera */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Main camera</label>
              <input className="w-full p-3 border rounded-lg bg-[#F6F5FA]" value="48MP wide lens" disabled />
            </div>

            {/* Selfie */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Selfie Camera</label>
              <input className="w-full p-3 border rounded-lg bg-[#F6F5FA]" value="12MP front" disabled />
            </div>

            {/* Battery */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Battery</label>
              <input className="w-full p-3 border rounded-lg bg-[#F6F5FA]" value="4855 mAh" disabled />
            </div>

          </div>

          {/* ------------------ IMAGE GRID ------------------ */}
          <div className="mt-10">
            <h3 className="font-semibold mb-3">Product Images</h3>

            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-full h-28 bg-gray-300 rounded-xl"></div>
              ))}
            </div>
          </div>

          {/* Product video + receipt */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="w-full h-28 bg-gray-300 rounded-xl"></div>
            <div className="w-full h-28 bg-gray-300 rounded-xl"></div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex gap-6">
            <button className="px-6 py-3 rounded-xl border border-red-600 text-red-600">
              Decline
            </button>
            <button className="px-6 py-3 rounded-xl bg-[#15340B] text-white">
              Approve
            </button>
          </div>

        </div>

        {/* ======================== RIGHT PANEL ======================== */}
        <div className="w-[350px] bg-white border border-[#E9E9E9] rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Product (Reported Unresolved)</h3>

          {/* Layout properties (disabled inputs) */}
          <div className="space-y-4">
            {[
              "Category",
              "Subcategory",
              "Product Title",
              "Colours",
              "Background"
            ].map((label) => (
              <div key={label}>
                <label className="block text-sm text-gray-600 mb-1">{label}</label>
                <input
                  disabled
                  className="w-full p-3 border rounded-lg bg-[#F6F5FA]"
                  value=" "
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
