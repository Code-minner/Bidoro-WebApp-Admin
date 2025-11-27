// src/app/(AUTH)/login/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { Logo } from "../../../../public/svgs/svg";
import Link from "next/link";

// Validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Add your login API call here
      console.log("Login data:", data);
      // Example: await loginUser(data);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5FA] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 font-poppins">
      {/* Logo at top left */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-16">
        <Logo width="100" height="24" className="sm:w-[125px] sm:h-[30px]" />
      </div>

      {/* Login Form Container */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[480px] bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
          {/* Welcome Text - Centered */}
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#242424] mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-[#6C6C6C]">
              Enter your login details below
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#242424] mb-2">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Example@gmail.com"
                className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#E9E9E9] focus:ring-[#15340B]"
                } focus:outline-none focus:ring-2 transition-colors placeholder:text-[#9A9A9A] text-sm sm:text-base`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#242424]">
                  Password
                </label>
                <Link
                  href="/reset-password"
                  className="text-xs sm:text-sm text-[#15340B] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[#E9E9E9] focus:ring-[#15340B]"
                  } focus:outline-none focus:ring-2 transition-colors pr-12 text-sm sm:text-base`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C6C6C] hover:text-[#242424]"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#15340B] text-white py-2.5 sm:py-3 rounded-lg font-medium hover:bg-[#192F18] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}