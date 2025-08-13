import React, { useContext, useEffect } from "react";
import { cartContext } from "../../Context/CartContext";
import CartItem from "../../component/CartItem/CartItem";
import CheckOut from "../../component/CheckOut/CheckOut";
export default function Cart() {
  let { loading, cart, getLoggedUserCart, clearCart } = useContext(cartContext);

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  if (loading) {
    return (
      <div className="bg-white pt-20">
        <h1 className="mb-10 animate-pulse bg-gray-300 h-8 w-1/3 mx-auto rounded" />
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            <div className="animate-pulse bg-gray-300 h-24 rounded mb-4" />
            <div className="animate-pulse bg-gray-300 h-24 rounded mb-4" />
            <div className="animate-pulse bg-gray-300 h-24 rounded mb-4" />
          </div>
          <div className="mt-6 h-full rounded-lg bg-gray-200 p-6 md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <div className="animate-pulse bg-gray-300 h-4 w-1/3 rounded" />
              <div className="animate-pulse bg-gray-300 h-4 w-1/4 rounded" />
            </div>
            <div className="flex justify-between">
              <div className="animate-pulse bg-gray-300 h-4 w-1/3 rounded" />
              <div className="animate-pulse bg-gray-300 h-4 w-1/4 rounded" />
            </div>
            <hr className="my-4 bg-gray-300 h-px" />
            <div className="flex justify-between">
              <div className="animate-pulse bg-gray-300 h-6 w-1/3 rounded" />
              <div className="animate-pulse bg-gray-300 h-6 w-1/4 rounded" />
            </div>
            <button className="mt-6 w-full rounded-md bg-gray-300 h-10 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 pt-20">
      <h1 className="mb-6 sm:mb-10 text-center text-xl sm:text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col lg:flex-row gap-6 sm:gap-8 xl:px-0">
        <div className="flex-1 flex flex-col gap-4 sm:gap-6 overflow-auto">
          {cart?.data?.products && cart.data.products.length > 0 ? (
            cart.data.products.map((item) => <CartItem item={item} />)
          ) : (
            <div className="flex justify-center items-center h-48 sm:h-64 w-full">
              <p className="text-center text-gray-500 text-xl sm:text-3xl font-bold">
                Cart is empty
              </p>
            </div>
          )}
        </div>
        {cart?.data?.products && cart.data.products.length > 0 && (
          <div className="flex flex-col items-center lg:items-end w-full lg:w-[350px] lg:min-w-[320px] mt-4 lg:mt-0">
            <button
              className="mb-4 flex items-center gap-1 bg-red-200 text-red-700 px-3 sm:px-4 py-2 rounded-md hover:bg-red-300 transition-all text-sm sm:text-base"
              onClick={() => clearCart()}
            >
              <span className="text-lg sm:text-xl">×</span>
              <span>Clear item</span>
            </button>
            <div className="rounded-lg border bg-white p-4 sm:p-6 shadow-md w-full">
              <CheckOut totalCartPrice={cart?.data?.totalCartPrice} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
