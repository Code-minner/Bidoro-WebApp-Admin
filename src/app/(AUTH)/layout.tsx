// src/app/(AUTH)/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Bidoro Admin",
  description: "Login to Bidoro Admin Dashboard",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}