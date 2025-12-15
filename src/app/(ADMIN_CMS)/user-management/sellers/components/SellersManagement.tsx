// src/app/(ADMIN_CMS)/user-management/sellers/components/SellersManagement.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import UserManagementHeader from "../../components/UserManagementHeader";
import SellerTable from "./SellerTable";
import KYCSubmissionsTable from "./KYCSubmissionsTable";
import { 
  getSellers, 
  getKycApplications, 
  type Seller, 
  type KYCSubmission,
  type Pagination,
  type KYCApplication
} from "@/lib/api/admin";

export default function SellersManagement() {
  const [activeTab, setActiveTab] = useState<"all" | "kyc">("all");
  
  // Sellers state
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [sellersLoading, setSellersLoading] = useState(true);
  const [sellersPagination, setSellersPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  // KYC submissions state
  const [kycSubmissions, setKycSubmissions] = useState<KYCSubmission[]>([]);
  const [kycLoading, setKycLoading] = useState(true);
  const [kycCount, setKycCount] = useState(0);
  const [kycPagination, setKycPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  // Fetch sellers
  const fetchSellers = useCallback(async (page = 1) => {
    setSellersLoading(true);
    try {
      const response = await getSellers({ page, limit: 20 });
      if (response.success) {
        setSellers(response.data.sellers);
        setSellersPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch sellers:", error);
    } finally {
      setSellersLoading(false);
    }
  }, []);

  // Fetch KYC submissions
  const fetchKycSubmissions = useCallback(async (page = 1) => {
    setKycLoading(true);
    try {
      const response = await getKycApplications({ page, limit: 20, status: 'submitted' });
      if (response.success) {
        // Transform API data to match component interface
        const transformedSubmissions: KYCSubmission[] = response.data.applications.map((app: KYCApplication) => ({
          id: app.application_id,
          name: app.users?.name || 'Unknown',
          email: app.users?.email || '',
          regDate: new Date(app.submitted_at || app.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          }),
          phoneNumber: app.users?.phone_number || '',
          products: 0,
          location: app.identity_state 
            ? `${app.identity_state}${app.identity_lga ? ', ' + app.identity_lga : ''}` 
            : '-',
          status: app.status === 'submitted' ? 'Pending' : 
                  app.status === 'approved' ? 'Approved' : 'Declined'
        }));
        
        setKycSubmissions(transformedSubmissions);
        setKycCount(response.data.summary.submitted);
        setKycPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch KYC submissions:", error);
    } finally {
      setKycLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchSellers();
    fetchKycSubmissions();
  }, [fetchSellers, fetchKycSubmissions]);

  // Callback to refresh data after actions
  const handleSellerAction = useCallback(() => {
    fetchSellers(sellersPagination.page);
  }, [fetchSellers, sellersPagination.page]);

  const handleKycAction = useCallback(() => {
    fetchKycSubmissions(kycPagination.page);
    // Also refresh sellers in case someone was approved
    fetchSellers(sellersPagination.page);
  }, [fetchKycSubmissions, fetchSellers, kycPagination.page, sellersPagination.page]);

  const handleSellersPageChange = useCallback((page: number) => {
    fetchSellers(page);
  }, [fetchSellers]);

  const handleKycPageChange = useCallback((page: number) => {
    fetchKycSubmissions(page);
  }, [fetchKycSubmissions]);

  return (
    <div className="min-h-screen bg-[#F6F5FA]">
      <UserManagementHeader />

      <main className="p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb and Tabs */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[#6C6C6C]">
              <span>User Management</span>
              <span>›</span>
              <span className="text-[#242424] font-medium">Sellers</span>
            </div>

            {/* Tabs with border */}
            <div className="inline-flex items-center gap-1 p-1 bg-[#F6F5FA] border border-[#E9E9E9] rounded-lg">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "all"
                    ? "bg-white text-[#242424] shadow-sm"
                    : "text-[#6C6C6C] hover:text-[#242424]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("kyc")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "kyc"
                    ? "bg-white text-[#242424] shadow-sm"
                    : "text-[#6C6C6C] hover:text-[#242424]"
                }`}
              >
                KYC Submissions
                {kycCount > 0 && (
                  <span className="bg-[#15340B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {kycCount > 99 ? '99+' : kycCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Conditional rendering based on active tab */}
        {activeTab === "all" ? (
          sellersLoading ? (
            <div className="bg-white rounded-xl shadow-sm p-8 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#15340B] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-[#6C6C6C]">Loading sellers...</p>
              </div>
            </div>
          ) : (
            <SellerTable 
              sellers={sellers} 
              pagination={sellersPagination}
              onPageChange={handleSellersPageChange}
              onActionComplete={handleSellerAction}
            />
          )
        ) : (
          kycLoading ? (
            <div className="bg-white rounded-xl shadow-sm p-8 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#15340B] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-[#6C6C6C]">Loading KYC submissions...</p>
              </div>
            </div>
          ) : (
            <KYCSubmissionsTable 
              submissions={kycSubmissions}
              pagination={kycPagination}
              onPageChange={handleKycPageChange}
              onActionComplete={handleKycAction}
            />
          )
        )}
      </main>
    </div>
  );
}