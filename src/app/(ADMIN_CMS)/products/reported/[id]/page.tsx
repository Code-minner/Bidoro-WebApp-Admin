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
      <div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
        <span
          className="text-gray-500 hover:underline cursor-pointer text-sm sm:text-base"
          onClick={() => router.push("/products")}
        >
          Products
        </span>
        <span className="text-gray-500">{`  >  `}</span>
        <span className="text-gray-700 font-medium text-sm sm:text-base">View</span>
      </div>

      <div className="px-4 sm:px-6 lg:px-10 w-full pb-6 sm:pb-10">

        {/* ======================== LEFT MAIN FORM ======================== */}
        <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm border border-[#E9E9E9]">

          {/* Store Name with Profile Picture and Email */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex-shrink-0">
              <Image 
                src="/assets/User.png" 
                alt="Store Profile" 
                fill 
                className="rounded-full object-cover" 
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-black truncate">Jondoe's Stores</h2>
              <p className="text-xs sm:text-sm text-black truncate">jondoe@example.com</p>
            </div>
          </div>

          {/* ------- FORM GRID (responsive: 1 col mobile, 2 col tablet, 3 col desktop) ------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm text-black mb-1">Category</label>
              <input
                className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm"
                value="Phones & Tablets"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm text-black mb-1">Subcategory</label>
              <input
                className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm"
                value="Phones"
                disabled
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-sm text-black mb-1">Location</label>
              <input
                className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm"
                value="Wuse, Abuja"
                disabled
              />
            </div>
          </div>

          {/* Product Title and Price */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm text-black mb-1">Product Title</label>
              <input
                className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm"
                value="Apple iPhone 15 Pro Max"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Price</label>
              <input
                className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm"
                value="₦850,000"
                disabled
              />
            </div>
          </div>

          {/* Product description */}
          <div className="mt-4 sm:mt-6">
            <label className="block text-sm text-black mb-1">Product Description</label>
            <textarea
              className="w-full p-3 border rounded-lg bg-white h-24 sm:h-32 resize-none text-gray-400 text-sm"
              value="The iPhone 15 Pro Max features an A17 chip..."
              disabled
            />
          </div>

          {/* ------------------ 2-COLUMN INPUT GRID ------------------ */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm text-black mb-1">Condition</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm" value="Fairly Used" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Open to negotiation?</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm" value="Yes" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Model</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm" value="iPhone 15 Pro Max" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Screen Size</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm" value="6.9 inches" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Colour</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm" value="Black Titanium" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Operating System</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm" value="iOS 18" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">RAM</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm" value="8GB" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Storage</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm" value="512GB" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Card Slot</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm" value="No memory card slot" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Main camera</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm" value="48MP wide lens" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Selfie Camera</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm" value="12MP front" disabled />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Battery</label>
              <input className="w-full p-3 border rounded-lg bg-white text-gray-400 text-sm" value="4855 mAh" disabled />
            </div>
          </div>

          {/* ------------------ IMAGE GRID ------------------ */}
          <div className="mt-6 sm:mt-10 max-w-full lg:max-w-[700px]">
            <h3 className="font-semibold mb-3 text-black text-sm sm:text-base">Product Images</h3>

            {/* Top row - responsive grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4 mb-2 sm:mb-4">
              <div className="w-full aspect-square relative rounded-lg sm:rounded-xl overflow-hidden">
                <Image src="/assets/16Front.png" alt="Front 1" fill className="object-cover" />
              </div>
              <div className="w-full aspect-square relative rounded-lg sm:rounded-xl overflow-hidden">
                <Image src="/assets/16Front.png" alt="Front 2" fill className="object-cover" />
              </div>
              <div className="w-full aspect-square relative rounded-lg sm:rounded-xl overflow-hidden">
                <Image src="/assets/16Back.png" alt="Back 1" fill className="object-cover" />
              </div>
              <div className="w-full aspect-square relative rounded-lg sm:rounded-xl overflow-hidden">
                <Image src="/assets/16Back.png" alt="Back 2" fill className="object-cover" />
              </div>
              <div className="w-full aspect-square relative rounded-lg sm:rounded-xl overflow-hidden">
                <Image src="/assets/16Back.png" alt="Back 3" fill className="object-cover" />
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 max-w-full sm:max-w-[calc(40%)]">
              <div className="w-full aspect-square relative rounded-lg sm:rounded-xl overflow-hidden">
                <Image src="/assets/16Front.png" alt="Bottom Left" fill className="object-cover" />
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg sm:rounded-xl hover:bg-opacity-20">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              <div className="w-full aspect-square relative rounded-lg sm:rounded-xl overflow-hidden">
                <Image src="/assets/Reciept.png" alt="Receipt" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Buttons - responsive layout */}
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-6">
            <button className="w-full sm:w-auto px-12 sm:px-20 py-3 sm:py-2 rounded-xl bg-[#15340B] text-white text-sm sm:text-base font-medium">
              Approve
            </button>
            <button className="w-full sm:w-auto px-12 sm:px-20 py-3 sm:py-2 rounded-xl bg-gray-300 text-black text-sm sm:text-base font-medium">
              Decline
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}