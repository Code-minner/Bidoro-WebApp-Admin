"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import AdminHeader from "../../../../../components/AdminHeader";
import Image from "next/image";

export default function InspectReportedProduct() {
  const router = useRouter();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#F6F5FA]">
      <AdminHeader />

      {/* ===================== BREADCRUMB ===================== */}
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

      <div className="px-10 w-full pb-10">

        {/* ======================== LEFT MAIN FORM ======================== */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E9E9E9]">

          {/* Store Name with Profile Picture and Email */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 relative">
              <Image 
                src="/assets/User.png" 
                alt="Store Profile" 
                fill 
                className="rounded-full object-cover" 
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black">Jondoe's Stores</h2>
              <p className="text-sm text-black">jondoe@example.com</p>
            </div>
          </div>

          {/* ------- FORM GRID (3 columns) ------- */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-black mb-1">Category</label>
              <input
                className="w-full p-3 border rounded-lg bg-white text-gray-400"
                value="Phones & Tablets"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm text-black mb-1">Subcategory</label>
              <input
                className="w-full p-3 border rounded-lg bg-white text-gray-400"
                value="Phones"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm text-black mb-1">Location</label>
              <input
                className="w-full p-3 border rounded-lg bg-white text-gray-400"
                value="Wuse, Abuja"
                disabled
              />
            </div>
          </div>

          {/* Product Title and Price */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-black mb-1">Product Title</label>
              <input
                className="w-full p-3 border rounded-lg bg-white text-gray-400"
                value="Apple iPhone 15 Pro Max"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Price</label>
              <input
                className="w-full p-3 border rounded-lg bg-white text-gray-400"
                value="₦850,000"
                disabled
              />
            </div>
          </div>

          {/* Product description */}
          <div className="mt-6">
            <label className="block text-sm text-black mb-1">Product Description</label>
            <textarea
              className="w-full p-3 border rounded-lg bg-white h-32 resize-none text-gray-400"
              value="The iPhone 15 Pro Max features an A17 chip..."
              disabled
            />
          </div>

          {/* ------------------ 2-COLUMN INPUT GRID ------------------ */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-black mb-1">Condition</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400" value="Fairly Used" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Open to negotiation?</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400" value="Yes" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Model</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400" value="iPhone 15 Pro Max" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Screen Size</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400" value="6.9 inches" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Colour</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400" value="Black Titanium" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Operating System</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400" value="iOS 18" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">RAM</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400" value="8GB" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Storage</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400" value="512GB" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Card Slot</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400" value="No memory card slot" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Main camera</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400" value="48MP wide lens" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Selfie Camera</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400" value="12MP front" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Battery</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400" value="4855 mAh" disabled />
            </div>
          </div>

          {/* ------------------ IMAGE GRID ------------------ */}
          <div className="mt-10" style={{ maxWidth: '700px' }}>
            <h3 className="font-semibold mb-3 text-black">Product Images</h3>

            {/* Top row (5 images) */}
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className="w-full h-28 relative rounded-xl overflow-hidden">
                <Image src="/assets/16Front.png" alt="Front 1" fill className="object-cover" />
              </div>
              <div className="w-full h-28 relative rounded-xl overflow-hidden">
                <Image src="/assets/16Front.png" alt="Front 2" fill className="object-cover" />
              </div>
              <div className="w-full h-28 relative rounded-xl overflow-hidden">
                <Image src="/assets/16Back.png" alt="Back 1" fill className="object-cover" />
              </div>
              <div className="w-full h-28 relative rounded-xl overflow-hidden">
                <Image src="/assets/16Back.png" alt="Back 2" fill className="object-cover" />
              </div>
              <div className="w-full h-28 relative rounded-xl overflow-hidden">
                <Image src="/assets/16Back.png" alt="Back 3" fill className="object-cover" />
              </div>
            </div>

            {/* Bottom row (2 images under first two top images) */}
            <div className="grid grid-cols-2 gap-4" style={{ width: 'calc((100% / 5) * 2)' }}>
              <div className="w-full h-28 relative rounded-xl overflow-hidden">
                <Image src="/assets/16Front.png" alt="Bottom Left" fill className="object-cover" />
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl hover:bg-opacity-20">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              <div className="w-full h-28 relative rounded-xl overflow-hidden">
                <Image src="/assets/Reciept.png" alt="Receipt" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex gap-6">
            <button className="px-20 py-2 rounded-xl bg-[#15340B] text-white">
              Approve
            </button>
            <button className="px-20 py-2 rounded-xl bg-gray-300 text-black">
              Decline
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
