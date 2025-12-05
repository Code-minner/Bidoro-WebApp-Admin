// requested/page.tsx
'use client';

import React, { useState } from 'react';
import AdminHeader from '../../../../components/AdminHeader';
import { ProductHeader } from '../components/ProductHeader';
import { RequestedContent } from '../components/RequestedContent';

const RequestedPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const requestedProducts = [
    { id: 'PB04234', name: 'iPhone 16 pro', seller: 'Johndoestores', requestedBy: 'Jacob Mayowa', price: 'N850,000', status: 'Responded', date: 'May 01, 2025' },
    { id: 'PB04234', name: 'iPhone 16 pro', seller: 'Johndoestores', requestedBy: 'Tunji Priscilla', price: 'N850,000', status: 'Not Responded', date: 'May 01, 2025' },
    { id: 'PB04234', name: 'iPhone 16 pro', seller: 'Johndoestores', requestedBy: 'Nelson Fred', price: 'N850,000', status: 'Responded', date: 'May 01, 2025' },
    { id: 'PB04234', name: 'iPhone 16 pro', seller: 'Johndoestores', requestedBy: 'Joseph Lucian', price: 'N850,000', status: 'Not Responded', date: 'May 01, 2025' },
  ];

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <ProductHeader />
          <RequestedContent 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            products={requestedProducts}
            currentPage={currentPage}
            totalPages={30}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default RequestedPage;