"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, MoveRight } from "lucide-react";
import { postRequest } from "@/libs/request";
import { signupSchema, SignupFormValues } from "./signup.schema";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      gender: "UNKNOWN",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      // Construct payload matching 'CreateUserAndCredentialDto'
      const payload = {
        user: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          gender: data.gender,
          phone: data.phone || null,
          countryCode: "+977",
        },
        credential: {
          provider: "OTP",
        },
      };

      // Call Backend
      // This matches router.post("/") in user_route.py
      await postRequest("/users/", payload);

      toast.success("Account created!");

      // IMPORTANT: Backend create_user does NOT return a token.
      // We must redirect to Login to do the OTP flow.
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed:", error);
      const msg = error.response?.data?.detail || "Something went wrong";
      toast.error(Array.isArray(msg) ? msg[0].msg : msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block font-bold text-2xl tracking-tight mb-2"
          >
            Dacura
          </Link>
          <h1 className="text-xl font-medium text-gray-900">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Start analyzing your documents today
          </p>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className={`w-full h-10 px-3 rounded-lg border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-black transition-colors`}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  className={`w-full h-10 px-3 rounded-lg border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-black transition-colors`}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email")}
                className={`w-full h-10 px-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:border-black transition-colors`}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Phone (Optional)
              </label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-black text-white rounded-lg font-medium text-sm hover:bg-black/90 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Create Account <MoveRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-black hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
