import React from "react";
import AmazonLogo from '../../assets/images/amazon-pay.png'
import AmericanLogo from '../../assets/images/American-Express-Color.png'
import MasterLogo from '../../assets/images/mastercard.webp'
import PaypalLogo from '../../assets/images/paypal.png'
import appleLogo from '../../assets/images/get-apple-store.png'
import googlePlayLogo from '../../assets/images/get-google-play.png'



export default function Footer() {



  return (


    <footer className="bg-slate-100 dark:bg-gray-900 py-10 border-t border-slate-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container">
        <div className="ps-20 ">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-gray-100">
            Get the freshCart app
          </h2>
          <p className="text-slate-400 dark:text-gray-400 my-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perferendis repellat illo accusantium dignissimos
          </p>
        </div>

        <div className="flex gap-2 ps-24">
          <input
            className="px-2 py-1 rounded-md focus:outline-none border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 grow"
            type="text"
            placeholder="Enter your email....."
          />

          <button className="bg-mainColor px-2 py-1 rounded-md text-white dark:bg-green-700 dark:hover:bg-green-800 transition-colors">
            {" "}
            Share App Link
          </button>
        </div>

        <div className="flex justify-between gap-3 ps-24">
          <div className="flex gap-3 items-center">
        <h3 className="text-slate-800 dark:text-gray-100">Payment Methods</h3>
        <img className='w-21' src={AmazonLogo} alt="" />
        <img className='w-21' src={PaypalLogo} alt="" />
        <img className='w-21' src={MasterLogo} alt="" />
        <img className='w-21' src={AmericanLogo} alt="" />
          </div>

          <div className="flex gap-3 items-center">
            <h3 className="text-slate-800 dark:text-gray-100">Get Delevries with fresh cart</h3>
            <img className="w-21" src= {appleLogo} alt="" />
            <img className="w-21"  src={googlePlayLogo} alt="" />
          </div>
      </div>
      </div>
    </footer>
  );
}
