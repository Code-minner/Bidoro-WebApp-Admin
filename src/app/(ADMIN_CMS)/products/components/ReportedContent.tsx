// components/ReportedContent.tsx
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight, Eye, Trash2, X } from 'lucide-react';
import { useRouter } from "next/navigation";

// --- Updated Interface to include image paths ---
interface ReportedProduct {
  id: string;
  name: string;
  seller: string;
  sellerProfilePic: string;
  productImage: string;
  reporter: string;
  reporterProfilePic: string;
  report: string;
  status: string;
  date: string;
}

interface ReportedContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: ReportedProduct[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Resolved': return 'bg-green-100 text-green-700';
    case 'Unresolved': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

// --- Modal Props Interface ---
interface ReportedProductModalProps {
    product: ReportedProduct;
    onClose: () => void;
}

// --- Resolved Product Modal (No Action Button) ---
const ResolvedProductModal: React.FC<ReportedProductModalProps> = ({ product, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
                {/* Header with Close Button Only */}
                <div className="flex items-center justify-end px-4 sm:px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body - Responsive Layout */}
                <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
                    {/* Seller Section */}
                    <div className="flex items-center gap-3">
                        <img
                            src={product.sellerProfilePic}
                            alt="seller"
                            className="w-10 h-10 rounded-full object-cover border border-gray-200 flex-shrink-0"
                        />
                        <div className="min-w-0">
                            <div className="font-semibold text-gray-900 text-sm sm:text-base">
                                {product.seller}'s stores
                            </div>
                            <div className="text-xs text-gray-500 break-all">
                                {product.seller.toLowerCase().replace(/\s+/g, '')}@gmail.com
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-x-6 sm:gap-y-6 text-sm">
                        {/* Reporter */}
                        <div>
                            <div className="uppercase text-[11px] font-medium text-gray-500 mb-2">
                                Reporter
                            </div>
                            <div className="flex items-center gap-2">
                                <img
                                    src={product.reporterProfilePic}
                                    className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                                    alt="reporter"
                                />
                                <span className="font-medium text-gray-900">{product.reporter}</span>
                            </div>
                        </div>

                        {/* Product */}
                        <div>
                            <div className="uppercase text-[11px] font-medium text-gray-500 mb-2">
                                Product
                            </div>
                            <div className="flex items-center gap-2">
                                <img
                                    src={product.productImage}
                                    className="w-8 h-8 rounded object-cover flex-shrink-0"
                                    alt={product.name}
                                />
                                <div className="min-w-0">
                                    <div className="font-medium text-gray-900 truncate">{product.name}</div>
                                    <div className="text-xs text-gray-500">{product.id}</div>
                                </div>
                            </div>
                        </div>

                        {/* Date Reported */}
                        <div>
                            <div className="uppercase text-[11px] font-medium text-gray-500 mb-2">
                                Date Reported
                            </div>
                            <div className="text-gray-900">{product.date}</div>
                        </div>

                        {/* Report Field - spans full width */}
                        <div className="col-span-1 sm:col-span-3">
                            <div className="uppercase text-[11px] font-medium text-gray-500 mb-2">
                                Report
                            </div>
                            <div className="border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-800 text-sm leading-relaxed">
                                {product.report}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Unresolved Product Modal (With Inspect Button) ---
const UnresolvedProductModal: React.FC<ReportedProductModalProps> = ({ product, onClose }) => {
    const router = useRouter();

    const handleInspect = () => {
        router.push(`/products/reported/${product.id}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
                {/* Header with Close Button Only */}
                <div className="flex items-center justify-end px-4 sm:px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body - Responsive Layout */}
                <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
                    {/* Seller Section */}
                    <div className="flex items-center gap-3">
                        <img
                            src={product.sellerProfilePic}
                            alt="seller"
                            className="w-10 h-10 rounded-full object-cover border border-gray-200 flex-shrink-0"
                        />
                        <div className="min-w-0">
                            <div className="font-semibold text-gray-900 text-sm sm:text-base">
                                {product.seller}'s stores
                            </div>
                            <div className="text-xs text-gray-500 break-all">
                                {product.seller.toLowerCase().replace(/\s+/g, '')}@gmail.com
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-x-6 sm:gap-y-6 text-sm">
                        {/* Reporter */}
                        <div>
                            <div className="uppercase text-[11px] font-medium text-gray-500 mb-2">
                                Reporter
                            </div>
                            <div className="flex items-center gap-2">
                                <img
                                    src={product.reporterProfilePic}
                                    className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                                    alt="reporter"
                                />
                                <span className="font-medium text-gray-900">{product.reporter}</span>
                            </div>
                        </div>

                        {/* Product */}
                        <div>
                            <div className="uppercase text-[11px] font-medium text-gray-500 mb-2">
                                Product
                            </div>
                            <div className="flex items-center gap-2">
                                <img
                                    src={product.productImage}
                                    className="w-8 h-8 rounded object-cover flex-shrink-0"
                                    alt={product.name}
                                />
                                <div className="min-w-0">
                                    <div className="font-medium text-gray-900 truncate">{product.name}</div>
                                    <div className="text-xs text-gray-500">{product.id}</div>
                                </div>
                            </div>
                        </div>

                        {/* Date Reported */}
                        <div>
                            <div className="uppercase text-[11px] font-medium text-gray-500 mb-2">
                                Date Reported
                            </div>
                            <div className="text-gray-900">{product.date}</div>
                        </div>

                        {/* Report Field - spans full width */}
                        <div className="col-span-1 sm:col-span-3">
                            <div className="uppercase text-[11px] font-medium text-gray-500 mb-2">
                                Report
                            </div>
                            <div className="border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-800 text-sm leading-relaxed">
                                {product.report}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Button - Only for Unresolved */}
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <button
                        onClick={handleInspect}
                        className="w-full bg-[#15340B] text-white py-3 rounded-md font-medium hover:bg-[#0f2908] transition text-sm sm:text-base"
                    >
                        Inspect Product
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Actions Dropdown ---
interface DropdownProps {
    product: ReportedProduct;
    onClose: () => void;
    onView: (product: ReportedProduct) => void;
}

const ReportedActionsDropdown: React.FC<DropdownProps> = ({ product, onClose, onView }) => {
  const handleAction = (action: string) => {
    if (action === 'view') {
        onView(product);
    } else {
        console.log(`${action} action for product ${product.id}`);
    }
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
      <button
        onClick={() => handleAction('view')}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
      >
        <Eye className="w-4 h-4" />
        View
      </button>
      
      <button
        onClick={() => handleAction('delete')}
        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </div>
  );
};

// --- Main Component ---
export const ReportedContent: React.FC<ReportedContentProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  products,
  currentPage,
  totalPages,
  setCurrentPage
}) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ReportedProduct | null>(null);

  const handleViewProduct = (product: ReportedProduct) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="bg-white rounded-b-lg shadow-sm">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-2 border rounded-lg bg-gray-100 focus:bg-white focus:border-black focus:outline-none text-sm"
          />
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 border rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seller
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reporter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date reported
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                {/* Product Column */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                        src={product.productImage} 
                        alt={product.name}
                        className="h-10 w-10 flex-shrink-0 object-cover rounded"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.seller}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.reporter}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {product.report}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {openDropdown === index && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setOpenDropdown(null)}
                        ></div>
                        <ReportedActionsDropdown 
                          product={product}
                          onClose={() => setOpenDropdown(null)} 
                          onView={handleViewProduct}
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden px-4 py-4">
        <div className="space-y-3">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              {/* Header with Product Image and Actions */}
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="h-14 w-14 rounded object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{product.id}</p>
                </div>

                {/* Actions Dropdown */}
                <div className="relative flex-shrink-0">
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                  {openDropdown === index && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setOpenDropdown(null)}
                      ></div>
                      <ReportedActionsDropdown 
                        product={product}
                        onClose={() => setOpenDropdown(null)} 
                        onView={handleViewProduct}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-2 text-xs mb-3">
                <div className="flex">
                  <span className="text-gray-500 w-24 flex-shrink-0">Seller:</span>
                  <span className="text-gray-900 truncate">{product.seller}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24 flex-shrink-0">Reporter:</span>
                  <span className="text-gray-900 truncate">{product.reporter}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24 flex-shrink-0">Report:</span>
                  <span className="text-gray-900 line-clamp-2">{product.report}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24 flex-shrink-0">Date:</span>
                  <span className="text-gray-900">{product.date}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:grid sm:grid-cols-3 items-center gap-4">
        <div className="text-sm text-gray-700 text-center sm:text-left order-1">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto order-3 sm:order-2 w-full sm:w-auto">
          {[1, 2, 3, '...', 10, 11, 12].map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              disabled={page === '...'}
              className={`px-2 sm:px-3 py-1 rounded text-sm flex-shrink-0 ${
                page === '...' ? 'cursor-default' : 'hover:bg-gray-100'
              } ${page === currentPage ? 'border border-gray-900 text-gray-900 font-medium' : 'text-gray-700'}`}
            >
              {page}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-2 order-2 sm:order-3">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Modal - Show different modal based on status */}
      {selectedProduct && (
        selectedProduct.status === 'Resolved' ? (
          <ResolvedProductModal 
            product={selectedProduct} 
            onClose={handleCloseModal} 
          />
        ) : (
          <UnresolvedProductModal 
            product={selectedProduct} 
            onClose={handleCloseModal} 
          />
        )
      )}
    </div>
  );
};