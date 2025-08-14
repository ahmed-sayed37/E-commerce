import axios from "axios";
import { useFormik } from "formik";
import React, { cache, useContext, useState } from "react";
import * as Yup from "yup";
import { cartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckOut({ totalCartPrice }) {
  const { cart, getLoggedUserCart } = useContext(cartContext);
  const [ pay, setPay ] = useState("cash");
  const phoneRegex = /^01[0125][0-9]{8}$/;
  const validationSchema = Yup.object({
    details: Yup.string().required("Details are required"),
    phone: Yup.string()
      .required("Phone is required")
      .min(3)
      .matches(phoneRegex, "Phone must be a valid Egyptian phone number")
      .max(50),
    city: Yup.string().required("City is required").min(3).max(50),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: (x) => {
      if (pay == "cash") {
        payCash(x);
      } else {
        payOnline(x);
      }
    },
    validationSchema,
  });

  const navigate = useNavigate();
  async function payOnline(values) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=https://ahmed-sayed37.github.io/E-commerce`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (data.status == "success") {
        localStorage.setItem('returnToOrders', 'true');
        toast.success("Redirecting to payment gateway...");
        window.location.href = data.session.url;
        console.log("Payment successful, redirecting to payment gateway...");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function payCash(values) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Order Placed Successfully✅✅✅");
      if (data.status == "success") {
        navigate("/Allorders");
        getLoggedUserCart();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="container max-w-[535px] mt-12">
        <span className="block mt-12 mx-auto w-[200px] rounded-full h-[2px] bg-mainColor"></span>
        <h2 className="text-center my-2 font-bold text-lg text-gray-900 dark:text-white font-['Encode_Sans_Expanded']">Check Out</h2>
        <span className="block mx-auto w-[200px] rounded-full h-[2px] bg-mainColor"></span>

        <form
          onSubmit={formik.handleSubmit}
          id="checkOut"
          className="w-full p-8 border border-gray-300 dark:border-gray-600 rounded-lg duration-700 target:border-darkPrimary flex flex-col gap-6 mt-12 bg-white dark:bg-gray-800 transition-colors duration-300"
        >
          <h3 className="font-bold text-lg -ml-2 text-gray-900 dark:text-white font-['Encode_Sans_Expanded']">Cart totals</h3>

          <div className="flex gap-4 items-center">
            <span className="font-bold text-gray-900 dark:text-white">Total :</span>
            <span className="text-mainColor font-semibold dark:text-green-400">
              ${totalCartPrice} USD
            </span>
          </div>
          <div>
            <input
              className="p-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-mainColor focus:border-2 transition-colors duration-300"
              autoComplete="off"
              type="text"
              placeholder="Enter Your City Name"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.city && formik.touched.city && (
            <p className="text-red-600 dark:text-red-400 font-bold text-sm -my-3">
              {formik.errors.city}
            </p>
          )}
          <div>
            <input
              className="p-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-mainColor focus:border-2 transition-colors duration-300"
              autoComplete="off"
              type="tel"
              placeholder="Enter Your Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-600 dark:text-red-400 font-bold text-sm -my-3">
              {formik.errors.phone}
            </p>
          )}
          <div>
            <textarea
              className="p-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-mainColor focus:border-2 transition-colors duration-300"
              placeholder="Details"
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.details && formik.touched.details && (
            <p className="text-red-600 dark:text-red-400 font-bold text-sm -my-3">
              {formik.errors.details}
            </p>
          )}

          <div className="flex max-md:flex-col gap-4 justify-between items-center">
            <button
              type="submit"
              onClick={() => {
                setPay("cash");
              }}
              className="btn cursor-pointer bg-mainColor hover:bg-green-700 dark:hover:bg-green-600 rounded-md text-white w-full flex py-2 text-nowrap items-center justify-center gap-2 transition-all duration-300 font-['Encode_Sans_Expanded']"
            >
              <span>Cash Order</span>
            </button>
            <button
              type="submit"
              onClick={() => {
                setPay("online");
              }}
              className="btn cursor-pointer flex py-2 text-nowrap items-center justify-center gap-2 hover:text-white hover:bg-mainColor dark:hover:bg-green-600 bg-white dark:bg-gray-700 text-mainColor dark:text-green-400 w-full rounded-md border border-mainColor dark:border-green-500 transition-all duration-300 font-['Encode_Sans_Expanded']"
            >
              <span>Online Order</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
