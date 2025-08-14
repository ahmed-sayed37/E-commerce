import React from 'react';
import { Link } from 'react-router-dom';
import useGetApis from '../../Hooks/useGetApis';
import Loader from '../../component/Loading/Loading';

export default function AllOrders() {
  const userId = localStorage.getItem("userId");
  
  // Use useGetApis hook instead of axios directly
  const { data: orders, isLoading, isError, error, refetch } = useGetApis(`orders/user/${userId}`);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl py-8">
        <div className="animate-pulse bg-gray-200 h-10 w-1/2 mb-8 rounded shadow-2xl" />
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 mb-8 border border-green-200">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-32 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {[...Array(5)].map((_, k) => (
                <div key={k} className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto max-w-4xl py-8">
        <div className="text-center">
          <h3 className="text-2xl text-red-500 mb-4">Error loading orders</h3>
          <button 
            onClick={() => refetch()}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Check if orders data exists and has the expected structure
  const ordersData = orders?.data || [];
  
  if (!ordersData || ordersData.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-8">
            <span>Track your orders</span>
            <span role="img" aria-label="truck">🚚</span>
          </h2>
          <p className="text-gray-500 text-lg">No orders found. Start shopping to see your orders here!</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-8">
        <span>Track your orders</span>
        <span role="img" aria-label="truck">🚚</span>
      </h2>
      {ordersData.map(order => (
        <div key={order.id || order._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 border border-green-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
            <div className="flex flex-wrap gap-4">
              <span className="font-bold text-green-700 dark:text-green-400">Transaction Number: #{order.id || order._id}</span>
              <span className="font-semibold text-gray-500 dark:text-gray-400">Placed on: {order.createdAt?.slice(0,10)}</span>
              <span className="font-semibold text-gray-500 dark:text-gray-400">Payment: {order.paymentMethodType}</span>
            </div>
            <button className="bg-green-100 dark:bg-green-700 text-green-700 dark:text-white px-4 py-1 rounded font-bold border border-green-400 dark:border-green-700 hover:bg-green-200 dark:hover:bg-green-800 transition-colors">Add New Items</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {order.cartItems?.map(item => (
              <div key={item._id} className="flex flex-col items-center border rounded p-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <Link to={`/productdetails/${item.product._id}`} className="w-full flex flex-col items-center group">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-24 h-24 object-contain mb-2 group-hover:scale-105 transition"
                  />
                  <div className="text-green-800 dark:text-green-300 font-bold text-center truncate w-full group-hover:underline">
                    {item.product.title}
                  </div>
                </Link>
                <div className="text-green-700 dark:text-green-400">Price: EGP {item.price}</div>
                <div className="text-green-700 dark:text-green-400">Quantity: {item.count}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">{item.product.category?.name}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {["Ordered", "Confirmed", "Out for delivery", "Delivered", "Paid"].map((status, idx) => (
              <div key={status} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full border-2 ${
                  status === "Delivered"
                    ? 'bg-red-500 border-red-500'
                    : idx < 3
                      ? 'bg-green-500 border-green-500'
                      : 'bg-white border-green-500'
                }`}></span>
                <span className={
                  idx < 3
                    ? "text-green-700 font-bold"
                    : "text-gray-400"
                }>{status}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
