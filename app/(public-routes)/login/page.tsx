"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, MoveRight, ArrowLeft } from "lucide-react";
import { postRequest } from "@/libs/request";

// --- SCHEMAS ---
// Schema for Step 1: Just Email
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Schema for Step 2: OTP
const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [isLoading, setIsLoading] = useState(false);

  // State to hold data between steps
  const [userEmail, setUserEmail] = useState("");
  const [challenge, setChallenge] = useState("");

  // --- FORMS ---
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  // --- HANDLERS ---

  // Step 1: Request OTP
  const onRequestOtp = async (data: EmailFormValues) => {
    setIsLoading(true);
    try {
      // 1. Call Backend to get OTP
      // Endpoint matches: router.post('/get-otp') in user_route.py
      const response = await postRequest("/users/get-otp", {
        email: data.email,
        provider: "OTP",
      });

      // 2. Save the challenge needed for the next step
      const receivedChallenge = response.data.challenge;
      setChallenge(receivedChallenge);
      setUserEmail(data.email);

      toast.success(response.data.msg || "OTP sent to your email/console");
      setStep("OTP"); // Move to next screen
    } catch (error: any) {
      console.error("OTP Request failed:", error);
      toast.error(error.response?.data?.detail || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP and Login
  const onLogin = async (data: OtpFormValues) => {
    setIsLoading(true);
    try {
      // 3. Call Backend to Login
      // Endpoint matches: router.post("/otp-login") in user_route.py
      const response = await postRequest("/users/otp-login", {
        providerId: userEmail, // Backend expects 'providerId' (the email)
        provider: "OTP", // Enum match
        otp: data.otp,
        challenge: challenge, // The hash we saved from Step 1
      });

      // 4. Handle Success
      const { token, user } = response.data; // Adjusted key to 'token' based on your backend logic

      if (token) {
        localStorage.setItem("accessToken", token);
        if (user) localStorage.setItem("user", JSON.stringify(user));

        toast.success("Welcome back!");
        router.push("/users"); // Redirect to dashboard
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.detail || "Invalid Code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block font-bold text-2xl tracking-tight mb-2"
          >
            Dacura
          </Link>
          <h1 className="text-xl font-medium text-gray-900">
            {step === "EMAIL"
              ? "Sign in to your workspace"
              : "Check your inbox"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {step === "EMAIL"
              ? "Enter your email to receive a login code"
              : `We sent a code to ${userEmail}`}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 md:p-8">
          {/* STEP 1: EMAIL FORM */}
          {step === "EMAIL" && (
            <form
              onSubmit={emailForm.handleSubmit(onRequestOtp)}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black transition-colors"
                  {...emailForm.register("email")}
                />
                {emailForm.formState.errors.email && (
                  <p className="text-xs text-red-500">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 bg-black text-white rounded-lg font-medium text-sm hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Get Login Code"
                )}
              </button>
            </form>
          )}

          {/* STEP 2: OTP FORM */}
          {step === "OTP" && (
            <form
              onSubmit={otpForm.handleSubmit(onLogin)}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Enter Code
                </label>
                <input
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black transition-colors tracking-widest text-center font-mono"
                  {...otpForm.register("otp")}
                />
                {otpForm.formState.errors.otp && (
                  <p className="text-xs text-red-500">
                    {otpForm.formState.errors.otp.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 bg-black text-white rounded-lg font-medium text-sm hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep("EMAIL")}
                className="w-full text-xs text-gray-500 hover:text-black flex items-center justify-center gap-1 mt-4"
              >
                <ArrowLeft className="w-3 h-3" /> Go back
              </button>
            </form>
          )}

          {/* Footer */}
          {step === "EMAIL" && (
            <div className="mt-6 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-black hover:underline"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
