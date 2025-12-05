"use client";

import AdminHeader from "@/components/AdminHeader"; 
import OrderManagementScreen from "./components/OrderManagement";

export default function Page() {
  return (
    <div className="flex flex-col w-full">
      <AdminHeader />
      <OrderManagementScreen />
    </div>
  );
}
