// components/ProductContent.tsx
import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight, Eye, Check, Ban, Trash2 } from 'lucide-react';
import iphoneImg from "../../../../../public/assets/iphone.png";

interface Product {
  id: string;
  name: string;
  seller: string;
  category: string;
  price: string;
  status: string;
  date: string;
}

interface ProductContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Approved': return 'bg-green-100 text-green-700';
    case 'Declined': return 'bg-red-100 text-red-700';
    case 'Pending': return 'bg-yellow-100 text-yellow-700';
    case 'Suspended': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

interface DropdownProps {
  product: Product;
  onClose: () => void;
}

const ProductActionsDropdown: React.FC<DropdownProps> = ({ product, onClose }) => {
  const router = useRouter();

  const handleAction = (action: string) => {
    if (action === 'view') {
      // Navigate based on status
      if (product.status === 'Suspended' || product.status === 'Declined') {
        router.push(`/products/view-suspended/${product.id}`);
      } else {
        router.push(`/products/view/${product.id}`);
      }
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
      
      {product.status === 'Pending' && (
        <button
          onClick={() => handleAction('approve')}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          Approve
        </button>
      )}
      
      {product.status === 'Approved' && (
        <button
          onClick={() => handleAction('suspend')}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <Ban className="w-4 h-4" />
          Suspend
        </button>
      )}
      
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

export const ProductContent: React.FC<ProductContentProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  products,
  currentPage,
  totalPages,
  setCurrentPage
}) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-b-lg shadow-sm">
      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100  focus:bg-white focus:border-black focus:outline-none"
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* Product Image */}
                    <Image
                      src={iphoneImg}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.seller}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.date}</td>
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
                        />
                        <ProductActionsDropdown 
                          product={product} 
                          onClose={() => setOpenDropdown(null)} 
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 grid grid-cols-3 items-center">
          <div className="text-sm text-gray-700">Page {currentPage} of {totalPages}</div>

          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, '...', 10, 11, 12].map((page, index) => {
              const isActive = page === currentPage;
              return (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                  className={`px-3 py-1 rounded text-sm ${page === '...' ? 'cursor-default' : 'hover:bg-gray-100'} ${isActive ? 'border border-gray-900 text-gray-900 font-medium' : 'text-gray-700'}`}
                >
                  {page}
                </button>
              );
            })}
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
    </div>
  );
};