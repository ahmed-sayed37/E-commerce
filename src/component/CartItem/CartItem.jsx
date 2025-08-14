import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext';

export default function CartItem({item}) {
    console.log('item', item);
    const { removeProductFromCart, updateProductCount, disableBtn } = useContext(cartContext);
    const [count, setCount] = useState(item?.count);

    useEffect(() => {
      if(count == item?.count) {
        return;
      }
      updateProductCount(item.product._id, Number(count));
    }, [count]);



  return (
    <div className="justify-between mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md sm:flex sm:justify-start transition-colors duration-300 border border-gray-200 dark:border-gray-700">
        <img 
        className="max-h-80 object-contain mx-auto"
        src={item?.product.imageCover} alt="product" />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white font-['Encode_Sans_Expanded']">{item?.product.title}</h2>
            <p className="mt-1 text-xs text-gray-700 dark:text-gray-300">{item?.product.category?.name}</p>
          </div>


          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <button
               className="disabled:cursor-not-allowed cursor-pointer rounded-l bg-gray-100 dark:bg-gray-600 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500" 
               disabled={disableBtn}
               type="button"
               onClick={() => count > 1 && setCount(count - 1)}> - 
               </button>

              <input className="h-8 w-28 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-700 text-center text-xs outline-none text-gray-900 dark:text-white" 
              type="number" 
              onChange={(e) => {
                const value = Math.max(1, Number(e.target.value));
                setCount(value);
              }}
              value={count} 
              min={1} />

              <button className="disabled:cursor-not-allowed cursor-pointer rounded-r bg-gray-100 dark:bg-gray-600 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500" 
              disabled={disableBtn}
              type="button"
              onClick={() => setCount(count + 1)}> + 
               </button>
            </div>



            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-900 dark:text-white font-semibold">${item?.price * item.count}</p>
              <button 
              onClick={() => removeProductFromCart(item.product._id)}
              className="btn bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-xl p-4 flex items-center gap-2 transition-all duration-300 border border-red-300 dark:border-red-700 font-['Encode_Sans_Expanded']">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>
                delete
              </span>
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
