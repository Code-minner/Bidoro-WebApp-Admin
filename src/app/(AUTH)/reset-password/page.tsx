// src/app/(AUTH)/reset-password/page.tsx
"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Logo, CheckmarkIcon } from "../../../../public/svgs/svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Step 1: Email validation
const emailSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

// Step 3: New password validation
const passwordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

type EmailFormData = yup.InferType<typeof emailSchema>;
type PasswordFormData = yup.InferType<typeof passwordSchema>;

type Step = "email" | "verification" | "newPassword" | "success";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Email form
  const emailForm = useForm<EmailFormData>({
    resolver: yupResolver(emailSchema),
  });

  // Password form
  const passwordForm = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
  });

  // Step 1: Submit email
  const onEmailSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    try {
      // Add your forgot password API call here
      console.log("Sending reset code to:", data.email);
      setEmail(data.email);
      setStep("verification");
    } catch (error) {
      console.error("Email submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verification code handlers
  const handleCodeChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split("").forEach((char, index) => {
      if (index < 4) newCode[index] = char;
    });
    setCode(newCode);

    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  const onVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length !== 4) return;

    setIsLoading(true);
    try {
      // Add your verification API call here
      console.log("Verifying code:", verificationCode);
      setStep("newPassword");
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      console.log("Resending code to:", email);
      // Add resend API call here
    } catch (error) {
      console.error("Resend error:", error);
    }
  };

  // Step 3: Submit new password
  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsLoading(true);
    try {
      // Add your reset password API call here
      console.log("Setting new password");
      setStep("success");
    } catch (error) {
      console.error("Password reset error:", error);
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

      {/* Form Container */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[480px] bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
          {/* Back Button (except on success) */}
          {step !== "success" && (
            <Link
              href={step === "email" ? "/login" : "#"}
              onClick={(e) => {
                if (step === "verification") {
                  e.preventDefault();
                  setStep("email");
                } else if (step === "newPassword") {
                  e.preventDefault();
                  setStep("verification");
                }
              }}
              className="inline-flex items-center text-sm text-[#6C6C6C] hover:text-[#242424] mb-6 sm:mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          )}

          {/* Step 1: Email */}
          {step === "email" && (
            <>
              <div className="mb-6 sm:mb-8 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#242424] mb-2">
                  Reset Password
                </h1>
                <p className="text-sm text-[#6C6C6C]">
                  Let's verify it's you. Kindly enter your email.
                </p>
              </div>

              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#242424] mb-2">
                    Email
                  </label>
                  <input
                    {...emailForm.register("email")}
                    type="email"
                    id="email"
                    placeholder="Example@gmail.com"
                    className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border ${
                      emailForm.formState.errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#E9E9E9] focus:ring-[#15340B]"
                    } focus:outline-none focus:ring-2 transition-colors placeholder:text-[#9A9A9A] text-sm sm:text-base`}
                  />
                  {emailForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#15340B] text-white py-2.5 sm:py-3 rounded-lg font-medium hover:bg-[#192F18] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? "Sending..." : "Login"}
                </button>
              </form>
            </>
          )}

          {/* Step 2: Verification Code */}
          {step === "verification" && (
            <>
              <div className="mb-6 sm:mb-8 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#242424] mb-2">
                  Verification code
                </h1>
                <p className="text-sm text-[#6C6C6C]">
                  A verification code has been sent to{" "}
                  <span className="font-semibold block mt-1 break-words">{email}</span>
                </p>
              </div>

              <form onSubmit={onVerificationSubmit} className="space-y-5 sm:space-y-6">
                <div className="flex justify-center gap-2 sm:gap-3">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-12 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-semibold rounded-lg border border-[#E9E9E9] focus:border-[#15340B] focus:ring-2 focus:ring-[#15340B] focus:outline-none transition-colors"
                    />
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-xs sm:text-sm text-[#6C6C6C]">
                    Did not receive the email?{" "}
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-[#15340B] hover:underline font-medium"
                    >
                      Resend in 59s
                    </button>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || code.join("").length !== 4}
                  className="w-full bg-[#15340B] text-white py-2.5 sm:py-3 rounded-lg font-medium hover:bg-[#192F18] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </button>
              </form>
            </>
          )}

          {/* Step 3: New Password */}
          {step === "newPassword" && (
            <>
              <div className="mb-6 sm:mb-8 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#242424] mb-2">
                  Enter New Password
                </h1>
                <p className="text-sm text-[#6C6C6C]">
                  Kindly your new password
                </p>
              </div>

              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#242424] mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      {...passwordForm.register("password")}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter new password"
                      className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border ${
                        passwordForm.formState.errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#E9E9E9] focus:ring-[#15340B]"
                      } focus:outline-none focus:ring-2 transition-colors pr-12 text-sm sm:text-base`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C6C6C] hover:text-[#242424]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                  {passwordForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {passwordForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#242424] mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      {...passwordForm.register("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Confirm new password"
                      className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border ${
                        passwordForm.formState.errors.confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#E9E9E9] focus:ring-[#15340B]"
                      } focus:outline-none focus:ring-2 transition-colors pr-12 text-sm sm:text-base`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C6C6C] hover:text-[#242424]"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#15340B] text-white py-2.5 sm:py-3 rounded-lg font-medium hover:bg-[#192F18] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>
            </>
          )}

          {/* Step 4: Success */}
          {step === "success" && (
            <div className="text-center py-6 sm:py-8">
              <div className="flex justify-center mb-6">
                <CheckmarkIcon className="w-20 h-20 sm:w-24 sm:h-24" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#242424] mb-2">
                Password Changed
              </h2>
              <p className="text-sm text-[#6C6C6C] mb-6 px-4">
                Your password has been changed. You can now log in with your new password
              </p>
              <button
                onClick={() => router.push("/login")}
                className="w-full bg-[#15340B] text-white py-2.5 sm:py-3 rounded-lg font-medium hover:bg-[#192F18] transition-colors text-sm sm:text-base"
              >
                Back to login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}