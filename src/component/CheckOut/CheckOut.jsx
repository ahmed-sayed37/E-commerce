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
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5175`,
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
      <div className="container  max-w-[535px] mt-12">
        <span className="block mt-12 mx-auto w-[200px] rounded-full h-[2px] bg-mainColor"></span>
        <h2 className="text-center my-2 font-bold text-lg Outfit">Check Out</h2>
        <span className="block  mx-auto w-[200px] rounded-full h-[2px] bg-mainColor"></span>

        <form
          onSubmit={formik.handleSubmit}
          id="checkOut"
          className="w-full p-8 border border-gray-300 rounded-lg duration-700 target:border-darkPrimary   flex flex-col gap-6 mt-12"
        >
          <h3 className="font-bold text-lg -ml-2">Cart totals</h3>

          <div className="flex  gap-4 items-center">
            <span className="font-bold">Total :</span>
            <span className="text-primary font-semibold">
              ${totalCartPrice} USD
            </span>
          </div>
          <div>
            <input
              className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
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
            <p className="text-red-600 font-bold text-sm -my-3 ">
              {formik.errors.city}
            </p>
          )}
          <div>
            <input
              className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
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
            <p className="text-red-600 font-bold text-sm -my-3 ">
              {formik.errors.phone}
            </p>
          )}
          <div>
            <textarea
              className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
              placeholder="Details"
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.details && formik.touched.details && (
            <p className="text-red-600 font-bold text-sm -my-3 ">
              {formik.errors.details}
            </p>
          )}

          <div className=" flex max-md:flex-col  gap-4 justify-between items-center">
            <button
              type="submit"
              onClick={() => {
                setPay("cash");
              }}
              className="btn cursor-pointer bg-mainColor rounded-md hover:bg-green-700 text-white w-full flex py-2 text-nowrap items-center justify-center gap-2"
            >
              {/* <img
                className="size-10"
                src={cashPaymentImg}
                alt="Cash Payment Img"
              /> */}
              <span> Cash Order</span>
            </button>
            <button
              type="submit"
              onClick={() => {
                setPay("online");
              }}
              className="btn cursor-pointer flex py-2 text-nowrap items-center justify-center gap-2 hover:text-white hover:bg-darkPrimary bg-white text-darkPrimary w-full"
            >
              {/* <img
                className="size-10 object-cover"
                src={onlinePaymentImg}
                alt="Online Payment Img"
              /> */}
              <span className="text-mainColor hover:text-white hover:bg-mainColor cursor-pointer flex py-2 text-nowrap items-center justify-center gap-2 w-full rounded-md ">
                Online Order
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
