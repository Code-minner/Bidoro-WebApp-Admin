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
      <div className="relative bg-white rounded-lg shadow-xl w-[500px]">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Reason for declining</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-sm text-gray-600 mb-4">
            You declined <span className="font-medium text-gray-900">{productName}</span> because:
          </p>
          
          <div className="border border-gray-200 bg-gray-50 rounded-lg p-4 text-gray-800 text-sm leading-relaxed min-h-[100px]">
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
        {/* Main Content */}
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
              <p className="text-sm text-gray-600">jondoe@example.com</p>
            </div>
          </div>

          {/* Form Grid (3 columns) */}
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
                value={productName}
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
              value="The iPhone 15 Pro Max features an A17 chip with advanced performance capabilities, stunning titanium design, and industry-leading camera system. Includes 512GB storage, 8GB RAM, and iOS 18."
              disabled
            />
          </div>

          {/* 2-Column Input Grid */}
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

          {/* Image Grid */}
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

            {/* Bottom row (2 images) */}
            <div className="grid grid-cols-2 gap-4" style={{ width: 'calc((100% / 5) * 2)' }}>
              <div className="w-full h-28 relative rounded-xl overflow-hidden">
                <Image src="/assets/16Front.png" alt="Video" fill className="object-cover" />
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl hover:bg-opacity-20">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              <div className="w-full h-28 relative rounded-xl overflow-hidden">
                <Image src="/assets/Reciept.png" alt="Receipt" fill className="object-cover" />
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}