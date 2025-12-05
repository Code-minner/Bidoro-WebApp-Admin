// components/ReportedContent.tsx
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight, Eye, Trash2, X } from 'lucide-react';
import { useRouter } from "next/navigation";

// --- Updated Interface to include image paths ---
interface ReportedProduct {
  id: string;
  name: string;
  seller: string;
  sellerProfilePic: string; // New field for seller profile image path
  productImage: string; // New field for product image path
  reporter: string;
  reporterProfilePic: string; // New field for reporter profile image path
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
    case 'Unresolved': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

// --- Updated Component: ReportedProductModal ---
interface ReportedProductModalProps {
    product: ReportedProduct;
    onClose: () => void;
}




const ReportedProductModal: React.FC<ReportedProductModalProps> = ({ product, onClose }) => {
    const router = useRouter();

    const handleInspect = () => {
        router.push(`/products/reported/${product.id}`); // ← navigate to inspect page
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            {/* Modal container */}
            <div className="relative bg-white rounded-lg shadow-xl w-[440px]">

                {/* Close Icon (outside top-right like Figma) */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white hover:text-gray-300"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Body */}
                <div className="px-6 py-6 space-y-6 text-sm">

                    {/* Seller Section */}
                    <div className="flex items-center gap-3 mb-2">
                        <img
                            src={product.sellerProfilePic}
                            alt="seller"
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div className="font-semibold text-gray-900">
                            {product.seller}'s stores
                        </div>
                    </div>

                    {/* Reporter */}
                    <div className="flex">
                        <div className="uppercase text-[11px] font-medium text-gray-500 w-1/3 pt-1">
                            Reporter
                        </div>
                        <div className="w-2/3 flex items-center gap-2">
                            <img
                                src={product.reporterProfilePic}
                                className="w-6 h-6 rounded-full"
                                alt="reporter"
                            />
                            <span className="font-medium text-gray-900">{product.reporter}</span>
                        </div>
                    </div>

                    {/* Product + Date Reported */}
                    <div className="flex">
                        <div className="uppercase text-[11px] font-medium text-gray-500 w-1/3 pt-1">
                            Product
                        </div>

                        <div className="w-2/3 space-y-3">
                            <div className="flex items-center gap-2">
                                <img
                                    src={product.productImage}
                                    className="w-8 h-8 rounded object-cover"
                                    alt={product.name}
                                />
                                <span className="font-medium text-gray-900">{product.name}</span>
                            </div>

                            <div>
                                <div className="uppercase text-[11px] font-medium text-gray-500">
                                    Date Reported
                                </div>
                                <div className="text-gray-900 mt-1">{product.date}</div>
                            </div>
                        </div>
                    </div>

                    {/* Report Field */}
                    <div>
                        <div className="uppercase text-[11px] font-medium text-gray-500 mb-1">
                            Report
                        </div>

                        <div className="border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-800 text-sm leading-relaxed">
                            {product.report}
                        </div>
                    </div>
                </div>

                {/* Footer Button */}
                <div className="px-6 pb-6">
                    <button
                        onClick={handleInspect}
                        className="w-full bg-[#15340B] text-white py-3 rounded-md font-medium hover:bg-[#0f2908] transition"
                    >
                        Inspect Product
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ReportedProductModal;


// --- End Updated Component: ReportedProductModal ---

// (ReportedActionsDropdown and getStatusColor remain the same as previous response, 
// but ensure ReportedActionsDropdown uses the updated interface when passed props)

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
      {/* ... (Search and Filters code remains the same) */}
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-200">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100 focus:bg-white focus:border-black focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>


      {/* Table */}
      <div className="overflow-hidden">
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
                      className="text-gray-400 hover:text-gray-600"
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

       
        {/* ... (Pagination code remains the same) */}
        <div className="px-6 py-4 border-t border-gray-200 grid grid-cols-3 items-center">
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, '...', 10, 11, 12].map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === '...'}
                className={`px-3 py-1 rounded text-sm ${
                  page === '...' ? 'cursor-default' : 'hover:bg-gray-100'
                } ${page === currentPage ? 'border border-gray-900 text-gray-900 font-medium' : 'text-gray-700'}`}
              >
                {page}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Modal - Only render if a product is selected */}
      {selectedProduct && (
        <ReportedProductModal 
          product={selectedProduct} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};