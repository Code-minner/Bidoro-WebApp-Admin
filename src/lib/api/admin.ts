// src/lib/api/admin.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

// Helper to get auth token
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

// Helper for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // Token is optional for now (admin login not implemented yet)
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data as T;
}

// TODO: Add this function when admin login is implemented
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
  }
}

// ============ COMMON TYPES ============

export interface ApiResponse {
  success: boolean;
  message?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// ============ SELLERS ============

export interface Seller {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  regDate: string;
  products: number;
  location: string;
  status: 'Active' | 'Suspended';
  avatar?: string;
  businessName?: string;
}

export interface SellerDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  address: string;
  identityNumber: string;
  businessName: string;
  businessAddress: string;
  businessIdentityNumber: string;
  status: string;
  regDate: string;
  products: number;
  location: {
    state: string;
    city: string;
    area: string;
  };
}

export interface SellerDocument {
  id: string;
  name: string;
  type: 'image' | 'pdf';
  url: string;
  size: string;
  uploadedAt: string;
  status: string;
}

export interface SellersResponse extends ApiResponse {
  data: {
    sellers: Seller[];
    pagination: Pagination;
    summary: {
      total: number;
      active: number;
      suspended: number;
    };
  };
}

export interface SellerDetailsResponse extends ApiResponse {
  data: {
    seller: SellerDetails;
    documents: SellerDocument[];
    kycApplication: KYCApplication | null;
  };
}

export interface SellerActionResponse extends ApiResponse {
  data?: {
    sellerId: string;
    sellerName: string;
    newStatus: string;
  };
}

// Get all sellers
export async function getSellers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  location?: string;
}): Promise<SellersResponse> {
  const searchParams = new URLSearchParams();
  
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.search) searchParams.set('search', params.search);
  if (params?.status) searchParams.set('status', params.status);
  if (params?.location) searchParams.set('location', params.location);

  const query = searchParams.toString();
  return apiCall<SellersResponse>(`/api/admin/sellers${query ? `?${query}` : ''}`);
}

// Get single seller details
export async function getSellerDetails(sellerId: string): Promise<SellerDetailsResponse> {
  return apiCall<SellerDetailsResponse>(`/api/admin/sellers/${sellerId}`);
}

// Suspend seller
export async function suspendSeller(sellerId: string, reason?: string): Promise<SellerActionResponse> {
  return apiCall<SellerActionResponse>(`/api/admin/sellers/${sellerId}/suspend`, {
    method: 'PUT',
    body: JSON.stringify({ reason }),
  });
}

// Unsuspend seller
export async function unsuspendSeller(sellerId: string): Promise<SellerActionResponse> {
  return apiCall<SellerActionResponse>(`/api/admin/sellers/${sellerId}/unsuspend`, {
    method: 'PUT',
  });
}

// ============ KYC APPLICATIONS ============

export interface KYCSubmission {
  id: string;
  name: string;
  email: string;
  regDate: string;
  phoneNumber: string;
  products?: number;
  location?: string;
  status: 'Pending' | 'Approved' | 'Declined';
  avatar?: string;
}

export interface KYCApplication {
  application_id: string;
  user_id: string;
  status: string;
  store_name: string;
  address: string;
  identity_state: string;  // Location state from KYC form
  identity_lga: string;    // Local Government Area
  id_number: string;
  store_address: string;
  business_id: string;
  store_category: string;
  pickup_options: string;
  active_hours: string;
  account_number: string;
  bank_name: string;
  bank_code: string;
  account_name: string;
  submitted_at: string;
  created_at: string;
  updated_at: string;
  users?: {
    user_id: string;
    name: string;
    email: string;
    phone_number: string;
    created_at: string;
  };
}

export interface KYCApplicationsResponse extends ApiResponse {
  data: {
    applications: KYCApplication[];
    pagination: Pagination;
    summary: {
      total: number;
      submitted: number;
      under_review: number;
      approved: number;
      rejected: number;
    };
  };
}

export interface KYCApplicationDetailsResponse extends ApiResponse {
  data: {
    application: KYCApplication;
    documents: SellerDocument[];
    history: Array<{
      from_status: string;
      to_status: string;
      reason: string;
      created_at: string;
      changed_by_user?: {
        name: string;
        email: string;
      };
    }>;
  };
}

export interface KYCActionResponse extends ApiResponse {
  data?: {
    application: KYCApplication;
    old_status: string;
    new_status: string;
  };
}

export interface DocumentFeedbackResponse extends ApiResponse {
  data?: {
    documentId: string;
    status: string;
    feedback: string;
  };
}

export interface BulkActionResponse extends ApiResponse {
  data?: {
    results: Array<{
      application_id: string;
      success: boolean;
      message?: string;
    }>;
    summary: {
      successful: number;
      failed: number;
      total: number;
    };
  };
}

// Get KYC applications
export async function getKycApplications(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}): Promise<KYCApplicationsResponse> {
  const searchParams = new URLSearchParams();
  
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.status) searchParams.set('status', params.status);
  if (params?.search) searchParams.set('search', params.search);

  const query = searchParams.toString();
  return apiCall<KYCApplicationsResponse>(`/api/admin/kyc/applications${query ? `?${query}` : ''}`);
}

// Get single KYC application details
export async function getKycApplicationDetails(applicationId: string): Promise<KYCApplicationDetailsResponse> {
  return apiCall<KYCApplicationDetailsResponse>(`/api/admin/kyc/applications/${applicationId}`);
}

// Approve KYC application
export async function approveKycApplication(applicationId: string, notes?: string): Promise<KYCActionResponse> {
  return apiCall<KYCActionResponse>(`/api/admin/kyc/applications/${applicationId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status: 'approved', notes }),
  });
}

// Reject KYC application
export async function rejectKycApplication(applicationId: string, reason: string, notes?: string): Promise<KYCActionResponse> {
  return apiCall<KYCActionResponse>(`/api/admin/kyc/applications/${applicationId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status: 'rejected', reason, notes }),
  });
}

// Send document feedback
export async function sendDocumentFeedback(
  applicationId: string,
  documentId: string,
  status: 'blur_selfie' | 'invalid_document' | 'expired_cac',
  feedback: string
): Promise<DocumentFeedbackResponse> {
  return apiCall<DocumentFeedbackResponse>(`/api/admin/kyc/applications/${applicationId}/document-feedback`, {
    method: 'POST',
    body: JSON.stringify({ documentId, status, feedback }),
  });
}

// Bulk action on KYC applications
export async function bulkKycAction(
  applicationIds: string[],
  action: 'approve' | 'reject',
  reason?: string
): Promise<BulkActionResponse> {
  return apiCall<BulkActionResponse>(`/api/admin/kyc/applications/bulk-action`, {
    method: 'POST',
    body: JSON.stringify({ applicationIds, action, reason }),
  });
}