import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewPassword() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const passwordRegex = /^[A-Z][a-z0-9]{5,}$/;

  // Check if user has email stored (came from reset code page)
  useEffect(() => {
    const email = localStorage.getItem('resetEmail');
    if (!email) {
      toast.error("Please complete the reset process");
      navigate('/forgot-password');
    }
  }, [navigate]);

  const validationSchema = object({
    newPassword: string("password must be string")
      .required("password is required")
      .matches(
        passwordRegex,
        "password must start with capital letter followed by 5 characters"
      )
      .min(3)
      .max(50),
    confirmPassword: string()
      .required("confirm password is required")
      .matches(passwordRegex)
      .oneOf([ref('newPassword')], 'passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: resetPassword,
    validationSchema,
  });

  async function resetPassword(values) {
    const loadingToast = toast.loading("Resetting password...🔃");
    setIsLoading(true);
    
    try {
      setError('');
      const email = localStorage.getItem('resetEmail');
      
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: {
          email: email,
          newPassword: values.newPassword
        }
      };

      const { data } = await axios.request(options);
      console.log(data);
      toast.success("Password reset successfully! ✅");
      
      localStorage.removeItem('resetEmail');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
      setError(error.response?.data?.message || "Failed to reset password");
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  }

  const handleBackToResetCode = () => {
    navigate('/reset-code');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 shadow-2xl shadow-gray-400 bg-white border border-gray-200 sm:rounded- rounded-2xl p-20">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set New Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 space-y-6"
        >
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.newPassword}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Confirm new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              onClick={handleBackToResetCode}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              Back to Reset Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 