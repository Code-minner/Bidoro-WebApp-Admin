// src/app/(ADMIN_CMS)/user-management/customers/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import UserManagementHeader from "../../components/UserManagementHeader";
import Image from "next/image";

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id;

  const user = {
    id: userId,
    firstName: "John",
    lastName: "Doe",
    email: "Example@gmail.com",
    phoneNumber: "08012345678",
    countryCode: "+234",
    status: "Active",
    avatar: "/assets/user.png",
  };

  return (
    <div className="min-h-screen bg-[#F6F5FA]">
      <UserManagementHeader />

      <main className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#6C6C6C]">
            <button
              onClick={() => router.push("/user-management")}
              className="hover:text-[#242424] transition-colors"
            >
              User Management
            </button>
            <span>›</span>
            <button
              onClick={() => router.back()}
              className="hover:text-[#242424] transition-colors"
            >
              Customers
            </button>
            <span>›</span>
            <span className="text-[#242424] font-medium">User profile</span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm w-full min-h-[600px] sm:min-h-[700px]">
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            <h2 className="text-lg sm:text-xl font-semibold text-[#242424]">User profile</h2>

            {/* Avatar */}
            <div className="flex justify-center sm:justify-start mb-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#E9E9E9] flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl sm:text-4xl font-medium text-[#6C6C6C]">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-5 sm:space-y-6">
              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#242424] mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    value={user.firstName}
                    readOnly
                    className="w-full px-4 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] focus:outline-none cursor-default"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#242424] mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={user.lastName}
                    readOnly
                    className="w-full px-4 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] focus:outline-none cursor-default"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#242424] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full px-4 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] focus:outline-none cursor-default"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#242424] mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-2 sm:gap-3">
                    <select
                      value={user.countryCode}
                      disabled
                      className="w-28 sm:w-32 px-2 sm:px-3 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] focus:outline-none cursor-default"
                    >
                      <option value="+234">🇳🇬 +234</option>
                    </select>
                    <input
                      type="tel"
                      value={user.phoneNumber}
                      readOnly
                      className="flex-1 px-4 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] focus:outline-none cursor-default"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
