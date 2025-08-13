import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetCode() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      toast.error("Please enter your email first");
      navigate("/forgot-password");
    }
  }, [navigate]);

  const validationSchema = object({
    resetCode: string("Reset code must be string")
      .required("Reset code is required")
      .length(6, "Reset code must be 6 digits"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyResetCode,
    validationSchema,
  });

  async function verifyResetCode(values) {
    const loadingToast = toast.loading("Verifying code...🔃");
    setIsLoading(true);

    try {
      setError("");
      const email = localStorage.getItem("resetEmail");

      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: {
          email: email,
          resetCode: values.resetCode,
        },
      };

      const { data } = await axios.request(options);
      console.log(data);
      toast.success("Code verified successfully! ✅");

      setTimeout(() => {
        navigate("/new-password");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid reset code");
      setError(error.response?.data?.message || "Invalid reset code");
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  }

  const handleBackToForgotPassword = () => {
    localStorage.removeItem("resetEmail");
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-1/2 flex items-center justify-center   py-12 px-4 sm:px-6 lg:px-8 shadow-2xl shadow-gray-400 bg-white border border-gray-200 sm:rounded- rounded-2xl p-20">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter Reset Code
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a 6-digit code to your email
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="resetCode"
              className="block text-sm font-medium text-gray-700"
            >
              Reset Code
            </label>
            <input
              id="resetCode"
              name="resetCode"
              type="text"
              maxLength="6"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-center text-lg tracking-widest font-mono"
              placeholder="000000"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.resetCode}
            />
            {formik.errors.resetCode && formik.touched.resetCode && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.resetCode}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-mainColor hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify Code"
              )}
            </button>
          </div>

          <div className="text-center space-y-6 mt-10">
            <button
              type="button"
              onClick={handleBackToForgotPassword}
              className="w-1/2 flex justify-center py-2 px-4 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-mainColor hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Forgot Password
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className=" w-1/2 flex justify-center py-2 px-4 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-mainColor hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
