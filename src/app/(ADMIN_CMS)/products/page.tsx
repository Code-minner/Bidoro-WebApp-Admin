// page.tsx (Main Products Page - All products)
'use client';

import React, { useState } from 'react';
import AdminHeader from '../../../components/AdminHeader';
import { ProductHeader } from './components/ProductHeader';
import { ProductContent } from './components/ProductContent';

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { id: 'PB04234', name: 'iPhone 16 pro', seller: 'Johndoestores', category: 'Phones & tablet', price: 'N850,000', status: 'Approved', date: 'May 01, 2025' },
    { id: 'PB04234', name: 'iPhone 16 pro', seller: 'Johndoestores', category: 'Phones & tablet', price: 'N850,000', status: 'Declined', date: 'May 01, 2025' },
    { id: 'PB04234', name: 'iPhone 16 pro', seller: 'Johndoestores', category: 'Phones & tablet', price: 'N850,000', status: 'Approved', date: 'May 01, 2025' },
    { id: 'PB04234', name: 'iPhone 16 pro', seller: 'Johndoestores', category: 'Phones & tablet', price: 'N850,000', status: 'Declined', date: 'May 01, 2025' },
    { id: 'PB04234', name: 'iPhone 16 pro', seller: 'Johndoestores', category: 'Phones & tablet', price: 'N850,000', status: 'Pending', date: 'May 01, 2025' },
    { id: 'PB04234', name: 'iPhone 16 pro', seller: 'Johndoestores', category: 'Phones & tablet', price: 'N850,000', status: 'Suspended', date: 'May 01, 2025' },
    { id: 'PB04234', name: 'iPhone 16 pro', seller: 'Johndoestores', category: 'Phones & tablet', price: 'N850,000', status: 'Pending', date: 'May 01, 2025' },
  ];

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <ProductHeader />
          <ProductContent 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            products={products}
            currentPage={currentPage}
            totalPages={30}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;