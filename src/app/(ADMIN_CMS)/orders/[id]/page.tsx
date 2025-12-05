"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Edit, CheckCircle } from "lucide-react";
import AdminHeader from "../../../../components/AdminHeader"; // cleaned path

// --- Mock Data ---
const orderData = {
  id: "#9743578",
  status: "Pending",
  date: "25 October 2025",
  time: "9:20am",
  vendor: "Holkuster Gadgets",
  customer: {
    name: "David",
    email: "davidemma@gmail.com",
    contact: "080548978",
  },
  delivery: {
    name: "JOHN DOE",
    address: "9, Ikot Ekpene Road, Uyo, Akwa Ibom State",
  },
  products: [
    { name: "Rolex daytona luxury watch", qty: 1, price: 450000 },
    { name: "Rolex daytona luxury watch", qty: 1, price: 450000 },
  ],
  payment: {
    method: "Visa **** 1234",
    totalItems: 2,
    totalPrice: 900000,
  },
};

// --- Helper Components ---
function Badge({ status }: { status: string }) {
  let styles = "";
  switch (status) {
    case "Successful":
      styles = "bg-success-50 text-success-700";
      break;
    case "Pending":
      styles = "bg-warning-50 text-warning-700";
      break;
    case "Cancelled":
    default:
      styles = "bg-grayScale-50 text-grayScale-700";
      break;
  }

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles}`}>
      {status}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-grayScale-50 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// --- Main Page Component ---
export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ⭐ FULL-WIDTH HEADER */}
      <AdminHeader />

      {/* PAGE CONTENT (padded separately) */}
      <div className="p-6 md:p-8">

        {/* Breadcrumbs */}
        <div className="flex justify-between items-center mb-6 mt-6">
          <div className="flex items-center text-sm text-grayScale-500">
            <Link href="/orders" className="hover:text-primaryGreen-500 transition-colors">
              Orders
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="font-medium text-grayScale-900">Order Details</span>
          </div>
        </div>

        <div className="space-y-6">

          {/* CONTAINER 1 */}
          <Card className="p-0">

            <div className="flex p-6 pb-4 relative">

              <div className="absolute top-6 right-6">
                <Badge status={orderData.status} />
              </div>

              <div className="w-1/3 pr-6 mr-6">
                <h2 className="text-lg font-bold text-grayScale-900 mb-4">
                  Order ID: {orderData.id}
                </h2>
                <div className="space-y-1 text-sm">
                  <p className="text-grayScale-500">Order Created</p>
                  <p className="text-grayScale-800 font-medium">{orderData.date}</p>
                  <p className="text-grayScale-800 font-medium">{orderData.time}</p>
                </div>
              </div>

              <div className="w-2/3 pl-6">
                <p className="text-sm font-bold text-primaryGreen-500 mb-4">
                  {orderData.vendor}
                </p>
                <div className="grid grid-cols-3 gap-y-4 text-sm">
                  <div className="col-span-1 space-y-1">
                    <p className="text-grayScale-500">Name</p>
                    <p className="text-grayScale-800 font-medium">
                      {orderData.customer.name}
                    </p>
                  </div>
                  <div className="col-span-1 space-y-1">
                    <p className="text-grayScale-500">Contact</p>
                    <p className="text-grayScale-800 font-medium">
                      {orderData.customer.contact}
                    </p>
                  </div>
                  <div className="col-span-3 space-y-1">
                    <p className="text-grayScale-500">Email</p>
                    <p className="text-grayScale-800 font-medium">
                      {orderData.customer.email}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-6 pt-0">
              <div className="bg-secondaryYellow-50 p-6 rounded-xl border border-secondaryYellow-200 shadow-sm w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-grayScale-900 mb-2">DELIVERY ADDRESS</p>
                    <p className="text-lg font-medium text-grayScale-900 mb-1">
                      {orderData.delivery.name}
                    </p>
                    <p className="text-sm text-grayScale-700">{orderData.delivery.address}</p>
                  </div>

                  <button className="flex items-center gap-1 text-sm font-medium text-primaryGreen-500 border border-primaryGreen-500 rounded-lg px-3 py-1 hover:bg-primaryGreen-50 transition-colors">
                    <Edit size={16} />
                    Edit
                  </button>
                </div>
              </div>
            </div>

          </Card>

          {/* CONTAINER 2 */}
          <Card className="p-6">

            <h3 className="text-lg font-bold text-grayScale-900 mb-4">Products</h3>

            <div className="space-y-4 mb-8">
              {orderData.products.map((product, index) => (
                <div key={index} className="flex justify-between items-center pb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="/assets/Watch.png"
                      alt={product.name}
                      className="w-20 h-20 rounded-lg object-cover bg-grayScale-50"
                    />
                    <div>
                      <p className="font-medium text-grayScale-900">{product.name}</p>
                      <p className="text-sm text-grayScale-500">Qty: {product.qty}</p>
                    </div>
                  </div>
                  <span className="font-bold text-grayScale-900">
                    ₦{product.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t">
              <div>
                <h3 className="text-lg font-bold text-grayScale-900 mb-4">Payment Details</h3>
                <div className="space-y-1">
                  <p className="text-sm text-grayScale-300">Payment Method</p>
                  <p className="text-sm text-grayScale-300">Sub Total</p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="w-fit space-y-2 text-right">

                  {/* PAID STATUS */}
                  <div className="flex justify-between gap-6 text-sm">
                    <span className="font-medium text-green-800 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-800" />
                      paid
                    </span>
                  </div>

                  <div className="flex justify-between gap-6 text-sm">
                    <p className="text-base font-medium text-grayScale-800">
                      {orderData.payment.method}
                    </p>
                  </div>

                  <div className="flex justify-between gap-6 border-grayScale-200">
                    <span className="text-lg font-medium text-grayScale-900">2 items</span>
                    <span className="text-lg font-medium text-grayScale-900">
                      ₦{orderData.payment.totalPrice.toLocaleString()}
                    </span>
                  </div>

                </div>
              </div>

            </div>

          </Card>

        </div>

      </div>
    </div>
  );
}
