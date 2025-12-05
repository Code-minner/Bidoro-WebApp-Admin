// components/ProductHeader.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'All', href: '/products' },
  { name: 'Pending', href: '/products?status=pending' },
  { name: 'AI Verified', href: '/products?status=ai-verified' },
  { name: 'Manual', href: '/products?status=manual' },
  { name: 'Reported', href: '/products/reported' },
  { name: 'Requested', href: '/products/requested' },
];

export const ProductHeader: React.FC = () => {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    if (href === '/products') {
      return pathname === '/products' || pathname === '/(ADMIN_CMS)/products';
    }
    return pathname.includes(href);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Products</h1>
      
      {/* White Container with Tabs */}
      <div className="bg-white rounded-t-lg shadow-sm">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 px-6 pt-4">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
                isActive(tab.href)
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
              {isActive(tab.href) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};