import React, { useContext, useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

export default function Login() {
  const passwordRegex = /^[A-Z][a-z0-9]{5,}$/;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState("password");

  let { setToken, token, verifyToken } = useContext(authContext);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function toggleShowPassword() {
    setShowPassword(showPassword === "password" ? "text" : "password");
  }

  useEffect(() => {
    sessionStorage.removeItem("loginToastShown");
  }, []);

  useEffect(() => {
    if (token && isLoggingIn && !sessionStorage.getItem("loginToastShown")) {
      toast.success("You are logged in successfully..✅");
      sessionStorage.setItem("loginToastShown", "true");
      navigate("/home");
      setIsLoggingIn(false);
    }
  }, [token, isLoggingIn, navigate]);

  const validationSchema = object({
    email: string(" email must be string ")
      .required("email is required  ")
      .email(" email must be valid "),
    password: string("password must be string")
      .required("password is required")
      .matches(
        passwordRegex,
        "password must start with capital letter followed by 5 characters"
      )
      .min(3)
      .max(50),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: sendDataToLogin,
    validationSchema,
  });

  async function sendDataToLogin(values) {
    const loagingToast = toast.loading("loading....🔃🔃");
    try {
      setError("");
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };

      const { data } = await axios.request(options);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      verifyToken();
      setIsLoggingIn(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setError(error.response.data.message);
    } finally {
      toast.dismiss(loagingToast);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
<div className="max-w-md w-full space-y-6 sm:space-y-8 shadow-2xl shadow-gray-400 bg-white border border-gray-200 sm:rounded-2xl p-8">
        <div>
          <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-700">
            Enter your credentials to access your account
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-800"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-gray-900 bg-white dark:bg-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div className="relative min-h-[4.5rem]">
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-800"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword}
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-gray-900 bg-white dark:bg-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <div
              className="absolute right-3 sm:right-4 top-[2rem] transform cursor-pointer z-20"
              onClick={toggleShowPassword}
            >
              {showPassword === 'password' ? <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 sm:size-6 text-gray-600 dark:text-gray-700 hover:text-gray-800 dark:hover:text-gray-600 transition-colors pointer-events-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg> : <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 sm:size-6 text-gray-600 dark:text-gray-700 hover:text-gray-800 dark:hover:text-gray-600 transition-colors pointer-events-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>}

            </div>

            {formik.errors.password && formik.touched.password && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-mainColor hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-mainColor hover:text-green-800 text-xs sm:text-sm font-medium"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
