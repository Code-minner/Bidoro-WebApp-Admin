// reported/page.tsx
'use client';

import React, { useState } from 'react';
import AdminHeader from '../../../../components/AdminHeader';
import { ProductHeader } from '../components/ProductHeader';
import { ReportedContent } from '../components/ReportedContent';

const IPHONE_IMAGE = '/assets/iPhone.png';
const USER_IMAGE = '/assets/user.png';

const ReportedPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const reportedProducts = [
    {
      id: 'PB04234',
      name: 'iPhone 16 pro',
      seller: 'Johndoestores',
      sellerProfilePic: USER_IMAGE,
      productImage: IPHONE_IMAGE,
      reporter: 'Opeyemi',
      reporterProfilePic: USER_IMAGE,
      report: 'The price of this product seems unrealistic',
      status: 'Resolved',
      date: 'May 01, 2025'
    },
    {
      id: 'PB04235',
      name: 'Samsung S23',
      seller: 'TechWorld',
      sellerProfilePic: USER_IMAGE,
      productImage: IPHONE_IMAGE,
      reporter: 'Israel',
      reporterProfilePic: USER_IMAGE,
      report: 'The product description does not match the pictures',
      status: 'Unresolved',
      date: 'May 01, 2025'
    },
    {
      id: 'PB04236',
      name: 'MacBook Air',
      seller: 'Hormot stores',
      sellerProfilePic: USER_IMAGE,
      productImage: IPHONE_IMAGE,
      reporter: 'Hamzatt',
      reporterProfilePic: USER_IMAGE,
      report: 'The price of this product seems unrealistic',
      status: 'Resolved',
      date: 'May 01, 2025'
    },
    {
      id: 'PB04237',
      name: 'AirPods Pro',
      seller: 'Sule Gadgets',
      sellerProfilePic: USER_IMAGE,
      productImage: IPHONE_IMAGE,
      reporter: 'Sule',
      reporterProfilePic: USER_IMAGE,
      report: 'The price of this product seems unrealistic',
      status: 'Unresolved',
      date: 'May 01, 2025'
    },
        {
      id: 'PB04237',
      name: 'AirPods Pro',
      seller: 'Sule Gadgets',
      sellerProfilePic: USER_IMAGE,
      productImage: IPHONE_IMAGE,
      reporter: 'Boluwatife',
      reporterProfilePic: USER_IMAGE,
      report: 'The price of this product seems unrealistic',
      status: 'Resolved',
      date: 'May 01, 2025'
    },    {
      id: 'PB04237',
      name: 'AirPods Pro',
      seller: 'Sule Gadgets',
      sellerProfilePic: USER_IMAGE,
      productImage: IPHONE_IMAGE,
      reporter: 'Sule',
      reporterProfilePic: USER_IMAGE,
      report: 'The price of this product seems unrealistic',
      status: 'Resolved',
      date: 'May 01, 2025'
    }
  ];

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <ProductHeader />
          <ReportedContent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            products={reportedProducts as any}
            currentPage={currentPage}
            totalPages={30}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default ReportedPage;
