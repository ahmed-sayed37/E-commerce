import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Register() {
  // formik
  const [error , setError] = useState('')
const passwordRegex = /^[A-Z][a-z0-9]{3,}$/
const phoneRegex = /^01[0125][0-9]{8}$/
const navigate = useNavigate()


  async function sendDataToRegister(values) {
    const loagingToast = toast.loading('loading....🔃🔃')

  try{
    setError('')
  const options= {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      method: "POST",
      data: values,
    }
    
const {data} = await axios.request(options)
    console.log(data);
    toast.success('Your account registered successfully..✅')

    setTimeout(() => {
      navigate('/login')
    }, 2000);

  } catch (error) {
    setError(error.response.data.message);
    toast.error(error.response.data.message)
  }finally{
    toast.dismiss(loagingToast)
  }
  }

 const validationSchema = object({
   name:string('name must be string').required('name is requierd').min(3,'name must be more than 3').max(20, 'name must be less than 20'),
   email:string(' email must be string ').required('email is required  ').email(' email must be valid '),
   password:string('password must be string').required('password is required').matches(passwordRegex, 'password must start with capital letter followed by 5 characters').min(3, ).max(50, ),
   rePassword:string().required().matches(passwordRegex).oneOf([ref('password')], 'passwords must match'),
   phone:string().required().matches(phoneRegex, 'phone must be egyptian phone number'), 
 })

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: sendDataToRegister,
    validationSchema,
  });





  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 shadow-2xl shadow-gray-400 bg-white border border-gray-200 rounded-2xl p-8 sm:p-12">
        <h1 className="text-2xl pb-4 text-gray-900 dark:text-gray-900 font-bold">Register Form</h1>
        {error && <p className="text-red-500 my-2 font-semibold">{error}</p>}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-gray-700 dark:text-gray-800 font-medium">Name</label>
            <input
              className="px-3 py-2 rounded-md focus:outline-none border-2 border-slate-200 bg-white dark:bg-white text-gray-900 dark:text-gray-900 w-full focus:border-blue-500 transition-colors"
              type="text"
              placeholder="Enter your name"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && <p className="text-red-500 my-2 font-semibold">
              {formik.errors.name}</p>}
          </div>
          
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-gray-700 dark:text-gray-800 font-medium">Email</label>
            <input
              className="px-3 py-2 rounded-md focus:outline-none border-2 border-slate-200 bg-white dark:bg-white text-gray-900 dark:text-gray-900 w-full focus:border-blue-500 transition-colors"
              type="email"
              placeholder="Enter your email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && <p className="text-red-500 my-2 font-semibold">{formik.errors.email}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-gray-700 dark:text-gray-800 font-medium">Password</label>
            <input
              className="px-3 py-2 rounded-md focus:outline-none border-2 border-slate-200 bg-white dark:bg-white text-gray-900 dark:text-gray-900 w-full focus:border-blue-500 transition-colors"
              type="password"
              placeholder="Enter your password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && <p className="text-red-500 my-2 font-semibold">{formik.errors.password}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="rePassword" className="text-gray-700 dark:text-gray-800 font-medium">Confirm Password</label>
            <input
              className="px-3 py-2 rounded-md focus:outline-none border-2 border-slate-200 bg-white dark:bg-white text-gray-900 dark:text-gray-900 w-full focus:border-blue-500 transition-colors"
              type="password"
              placeholder="Enter your re-password"
              name="rePassword"
              id="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword && <p className="text-red-500 my-2 font-semibold">{formik.errors.rePassword}</p>}
          </div>
          
          <div className="flex flex-col space-y-2">
            <label htmlFor="phone" className="text-gray-700 dark:text-gray-800 font-medium">Phone</label>
            <input
              className="px-3 py-2 rounded-md focus:outline-none border-2 border-slate-200 bg-white dark:bg-white text-gray-900 dark:text-gray-900 w-full focus:border-blue-500 transition-colors"
              type="text"
              placeholder="Enter your phone"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone && <p className="text-red-500 my-2 font-semibold">
              {formik.errors.phone}</p>}
          </div>

          <button type="submit" className="bg-mainColor w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
