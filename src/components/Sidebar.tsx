// src/components/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../../public/svgs/svg";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  CreditCard,
  Gavel,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  subItems?: { label: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "User Management",
    href: "/user-management",
    icon: <Users className="w-5 h-5" />,
    subItems: [
      { label: "Customers", href: "/user-management/customers" },
      { label: "Sellers", href: "/user-management/sellers" },
      { label: "Admins", href: "/user-management/admins" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    icon: <Package className="w-5 h-5" />,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    label: "Payments",
    href: "/payments",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    label: "Budget bids",
    href: "/budget-bids",
    icon: <Gavel className="w-5 h-5" />,
  },
  {
    label: "Disputes",
    href: "/disputes",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 min-h-screen bg-white border-r border-[#E9E9E9] 
          flex flex-col font-poppins
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6 flex items-center justify-between">
          <Logo width="125" height="30" />
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-[#F6F5FA] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#6C6C6C]" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const active = isActive(item.href);
              const expanded = expandedItems.includes(item.label);
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      if (hasSubItems) {
                        e.preventDefault();
                        toggleExpand(item.label);
                      } else {
                        onClose();
                      }
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? "bg-[#15340B] text-white"
                        : "text-[#6C6C6C] hover:bg-[#F6F5FA] hover:text-[#242424]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={active ? "text-white" : "text-[#6C6C6C]"}>
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {hasSubItems &&
                      (expanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      ))}
                  </Link>

                  {hasSubItems && expanded && (
                    <div className="ml-6 mt-1 pl-4 border-l border-gray-300">
                      <ul className="space-y-1">
                        {item.subItems?.map((subItem) => {
                          const subActive = isActive(subItem.href);
                          return (
                            <li key={subItem.label}>
                              <Link
                                href={subItem.href}
                                onClick={onClose}
                                className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                                  subActive
                                    ? "text-[#242424] font-semibold"
                                    : "text-[#6C6C6C] hover:text-[#242424]"
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-[#E9E9E9]">
          <button
            onClick={() => {
              console.log("Logging out...");
              onClose();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-[#6C6C6C] hover:bg-[#F6F5FA] hover:text-[#242424] rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
