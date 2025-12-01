// src/app/(ADMIN_CMS)/user-management/sellers/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import UserManagementHeader from "../../components/UserManagementHeader";
import Image from "next/image";
import { useState } from "react";
import { CheckmarkIcon } from "../../../../../../public/svgs/svg";

export default function SellerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const sellerId = params.id;

  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [documentFeedback, setDocumentFeedback] = useState("");
  const [selectedDocumentStatus, setSelectedDocumentStatus] = useState<"blur_selfie" | "invalid_document" | "expired_cac" | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mock seller data - replace with actual API call
  const seller = {
    id: sellerId,
    firstName: "John",
    lastName: "Doe",
    email: "Example@gmail.com",
    phoneNumber: "0001234567B",
    countryCode: "+234",
    identityNumber: "3/22393458961",
    address: "Not spungle/go street, ikoridu",
    businessName: "",
    businessAddress: "",
    businessIdentityNumber: "",
    status: "Pending",
    avatar: "/assets/user.png",
    documents: [
      { name: "ID card(National ID card)", size: "Feb 30, 2025 • 3MB", type: "image", id: "id_card" },
      { name: "Personal photo/Selfie", size: "Feb 30, 2025 • 3MB", type: "image", id: "selfie" },
      { name: "Business document(CAC)", size: "Feb 30, 2025 • 3MB", type: "pdf", id: "cac" },
    ]
  };

  const handleApprove = () => {
    console.log("Approving seller:", sellerId);
    setShowSuccessModal(true);
    // TODO: Implement approve logic
  };

  const handleReject = () => {
    console.log("Rejecting seller:", sellerId);
    // TODO: Implement reject logic
  };

  const handleDocumentClick = (documentId: string) => {
    setSelectedDocument(documentId);
    setDocumentFeedback("");
    setSelectedDocumentStatus(null);
  };

  const handleDocumentStatusClick = (status: "blur_selfie" | "invalid_document" | "expired_cac") => {
    setSelectedDocumentStatus(status);
  };

  const handleSendFeedback = () => {
    console.log("Sending feedback for document:", selectedDocument);
    console.log("Status:", selectedDocumentStatus);
    console.log("Feedback:", documentFeedback);
    // TODO: Implement feedback sending logic
    setSelectedDocument(null);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F6F5FA]">
      <UserManagementHeader />

      <main className="p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 text-sm text-[#6C6C6C]">
            <button
              onClick={() => router.push('/user-management')}
              className="hover:text-[#242424] transition-colors"
            >
              User Management
            </button>
            <span>›</span>
            <button
              onClick={() => router.back()}
              className="hover:text-[#242424] transition-colors"
            >
              Sellers
            </button>
            <span>›</span>
            <span className="text-[#242424] font-medium">User profile</span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm min-h-[600px] sm:min-h-[700px]">
          <div className="p-6 sm:p-8 lg:p-10">
            <h2 className="text-lg sm:text-xl font-semibold text-[#242424] mb-6 sm:mb-8">Seller details</h2>

            {/* Avatar */}
            <div className="flex justify-start mb-8 sm:mb-10">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#E9E9E9] flex items-center justify-center overflow-hidden">
                {seller.avatar ? (
                  <Image 
                    src={seller.avatar} 
                    alt={`${seller.firstName} ${seller.lastName}`} 
                    width={128}
                    height={128}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <span className="text-3xl sm:text-4xl font-medium text-[#6C6C6C]">
                    {seller.firstName[0]}{seller.lastName[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-5 sm:space-y-6">
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#242424] mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    value={seller.firstName}
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
                    value={seller.lastName}
                    readOnly
                    className="w-full px-4 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] focus:outline-none cursor-default"
                  />
                </div>
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#242424] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={seller.email}
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
                      value={seller.countryCode}
                      disabled
                      className="w-28 sm:w-32 px-2 sm:px-3 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] focus:outline-none cursor-default"
                    >
                      <option value="+234">🇳🇬 +234</option>
                    </select>
                    <input
                      type="tel"
                      value={seller.phoneNumber}
                      readOnly
                      className="flex-1 px-4 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] focus:outline-none cursor-default"
                    />
                  </div>
                </div>
              </div>

              {/* Address and Identity Number Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#242424] mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={seller.address}
                    readOnly
                    className="w-full px-4 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] focus:outline-none cursor-default"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#242424] mb-2">
                    Identity number
                  </label>
                  <input
                    type="text"
                    value={seller.identityNumber}
                    readOnly
                    className="w-full px-4 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] focus:outline-none cursor-default"
                  />
                </div>
              </div>

              {/* Business Details Section */}
              <div className="pt-6 border-t border-[#E9E9E9]">
                <h3 className="text-base sm:text-lg font-semibold text-[#242424] mb-4 sm:mb-6">Business details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#242424] mb-2">
                      Business/store name
                    </label>
                    <input
                      type="text"
                      value={seller.businessName}
                      placeholder="Enter your registered business name"
                      readOnly
                      className="w-full px-4 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] placeholder:text-[#9A9A9A] focus:outline-none cursor-default"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#242424] mb-2">
                      Business/store address
                    </label>
                    <input
                      type="text"
                      value={seller.businessAddress}
                      placeholder="Enter in detailed addresses"
                      readOnly
                      className="w-full px-4 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] placeholder:text-[#9A9A9A] focus:outline-none cursor-default"
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 md:w-1/2 md:pr-3">
                  <label className="block text-sm font-medium text-[#242424] mb-2">
                    Business identity number
                  </label>
                  <input
                    type="text"
                    value={seller.businessIdentityNumber}
                    placeholder="Enter your business ID number"
                    readOnly
                    className="w-full px-4 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] placeholder:text-[#9A9A9A] focus:outline-none cursor-default"
                  />
                </div>
              </div>

              {/* Documents Section */}
              <div className="pt-6 border-t border-[#E9E9E9]">
                <h3 className="text-base sm:text-lg font-semibold text-[#242424] mb-4 sm:mb-6">Documents</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
                  {seller.documents.map((doc, index) => (
                    <button
                      key={index}
                      onClick={() => handleDocumentClick(doc.id)}
                      className="border border-[#E9E9E9] rounded-lg p-5 flex flex-col items-center text-center cursor-pointer hover:border-[#15340B] hover:bg-[#F6F5FA] transition-all min-h-[180px]"
                    >
                      <div className="w-16 h-16 bg-[#F6F5FA] rounded-lg flex items-center justify-center mb-3">
                        <span className="text-2xl">{doc.type === "pdf" ? "📄" : "🖼️"}</span>
                      </div>
                      <div className="text-sm font-medium text-[#242424] mb-1">{doc.name}</div>
                      <div className="text-xs text-[#6C6C6C]">{doc.size}</div>
                      <div className="text-xs text-[#15340B] mt-2">Click to review</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6">
                <button
                  onClick={handleApprove}
                  className="px-8 py-2.5 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] transition-colors text-sm font-medium"
                >
                  Approve
                </button>
                <button
                  onClick={handleReject}
                  className="px-8 py-2.5 border border-[#DC2626] text-[#DC2626] rounded-lg hover:bg-[#FEF2F2] transition-colors text-sm font-medium"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Document Review Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedDocument(null)}
              className="absolute top-4 right-4 text-[#6C6C6C] hover:text-[#242424] text-xl"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold text-[#242424] mb-6">Document Review</h3>

            {/* Status Options */}
         {/* Status Options */}
<div className="flex items-center gap-4 mb-6 whitespace-nowrap">
  {/* Blur selfie */}
  <label
    className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all whitespace-nowrap
      ${selectedDocumentStatus === "blur_selfie" 
        ? "border-[#15340B] bg-[#15340B] text-white" 
        : "border-[#E9E9E9] bg-white text-[#242424]"
      }`}
  >
    <input
      type="radio"
      name="documentStatus"
      value="blur_selfie"
      checked={selectedDocumentStatus === "blur_selfie"}
      onChange={() => handleDocumentStatusClick("blur_selfie")}
      className="w-4 h-4 text-[#15340B]"
    />
    <span className="text-sm">Blur selfie</span>
  </label>

  {/* Invalid document */}
  <label
    className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all whitespace-nowrap
      ${selectedDocumentStatus === "invalid_document" 
        ? "border-[#15340B] bg-[#15340B] text-white" 
        : "border-[#E9E9E9] bg-white text-[#242424]"
      }`}
  >
    <input
      type="radio"
      name="documentStatus"
      value="invalid_document"
      checked={selectedDocumentStatus === "invalid_document"}
      onChange={() => handleDocumentStatusClick("invalid_document")}
      className="w-4 h-4 text-[#15340B]"
    />
    <span className="text-sm">Invalid document</span>
  </label>

  {/* Expired CAC */}
  <label
    className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all whitespace-nowrap
      ${selectedDocumentStatus === "expired_cac" 
        ? "border-[#15340B] bg-[#15340B] text-white" 
        : "border-[#E9E9E9] bg-white text-[#242424]"
      }`}
  >
    <input
      type="radio"
      name="documentStatus"
      value="expired_cac"
      checked={selectedDocumentStatus === "expired_cac"}
      onChange={() => handleDocumentStatusClick("expired_cac")}
      className="w-4 h-4 text-[#15340B]"
    />
    <span className="text-sm">Expired CAC</span>
  </label>
</div>



            {/* Feedback Textarea */}
            <div className="mb-6">
              <textarea
                value={documentFeedback}
                onChange={(e) => setDocumentFeedback(e.target.value)}
                placeholder="Type your reason here..."
                className="w-full px-4 py-3 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg text-sm text-[#242424] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#15340B] resize-none"
                rows={4}
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendFeedback}
              className="w-full px-6 py-3 bg-[#15340B] text-white rounded-lg hover:bg-[#192F18] transition-colors text-sm font-medium"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8 relative text-center">
            <button
              onClick={closeSuccessModal}
              className="absolute top-4 right-4 text-[#6C6C6C] hover:text-[#242424] text-xl"
            >
              ✕
            </button>

           <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center">
  <CheckmarkIcon className="w-20 h-20 text-white" />
</div>


            <h3 className="text-2xl font-bold text-[#242424] mb-3">Success!!!</h3>
            <p className="text-sm text-[#6C6C6C] mb-6">
              Johndoestores has been approved. They now have access to the seller app and can now post products on Bidoro
            </p>
          </div>
        </div>
      )}
    </div>
  );
}