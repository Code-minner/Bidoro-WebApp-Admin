"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminHeader from "../../../../../components/AdminHeader";
import Image from "next/image";
import { X } from "lucide-react";

// Modal Component
interface DeclineModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const DeclineModal: React.FC<DeclineModalProps> = ({ isOpen, onClose, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-[500px]">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Reason for declining</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <p className="text-sm text-gray-600 mb-4">
            You declined <span className="font-medium text-gray-900">{productName}</span> because:
          </p>
          
          <div className="border border-gray-200 bg-gray-50 rounded-lg p-3 sm:p-4 text-gray-800 text-sm leading-relaxed min-h-[100px]">
            The product listing violates our community guidelines regarding authentic product representation and pricing transparency.
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ViewSuspendedProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock product status - in real app, fetch from API
  const productStatus = "Declined"; // or "Suspended"
  const productName = "Apple iPhone 15 Pro Max";

  return (
    <div className="min-h-screen bg-[#F6F5FA]">
      <AdminHeader />

      {/* Breadcrumb */}
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
        {/* Main Content */}
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
              <p className="text-xs sm:text-sm text-gray-600 truncate">jondoe@example.com</p>
            </div>
          </div>

          {/* Form Grid - Responsive */}
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
                value={productName}
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
              value="The iPhone 15 Pro Max features an A17 chip with advanced performance capabilities, stunning titanium design, and industry-leading camera system. Includes 512GB storage, 8GB RAM, and iOS 18."
              disabled
            />
          </div>

          {/* 2-Column Input Grid */}
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

          {/* Image Grid */}
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
                <Image src="/assets/16Front.png" alt="Video" fill className="object-cover" />
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg sm:rounded-xl hover:bg-opacity-20">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              <div className="w-full aspect-square relative rounded-lg sm:rounded-xl overflow-hidden">
                <Image src="/assets/Reciept.png" alt="Receipt" fill className="object-cover" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decline Modal */}
      <DeclineModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productName={productName}
      />
    </div>
  );
}