import axios, { AxiosHeaders } from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'
import toast from "react-hot-toast";


export let cartContext = createContext(null)


export default function CartContextProvider({children}) {

   const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(false)  
  const [disableBtn, setDisableBtn] = useState(false)
  const [cartCountItem, setCartCountItem] = useState(0)



   async function getLoggedUserCart(){
     setLoading(true);
    try{
        const {data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', 
            {headers:{
            token: localStorage.getItem("token")
            }});
            console.log(data);
            setCart(data)

    }catch(err){
      console.log(err)

    }finally{
       setLoading(false);
    }
   }


   async function addProductToCart(productId){
    setLoading(true);
    try{
        const {data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', 
          {
            productId
        },
            {headers:{
            token: localStorage.getItem("token")
            }});
            console.log(data);
            toast.success('تم اضافة المنتج بنجاح✅✅✅');
            setCart(data)

    }catch(err){
      console.log(err)

    }finally{
      setLoading(false);
    }
   }
   async function removeProductFromCart(cartId){
    try{
        const {data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${cartId}`, 
            {headers:{
            token: localStorage.getItem("token")
            }});
            console.log(data);
            toast.success('تم حذف المنتج بنجاح✅✅✅');
            setCart(data)

    }catch(err){
      console.log(err)}
   }
   async function clearCart(){
    try{
        const {data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, 
            {headers:{
            token: localStorage.getItem("token")
            }});
            console.log(data);
            toast.success('تم حذف جميع المنتجات بنجاح✅✅✅');
            setCart(data)

    }catch(err){
      console.log(err)}
   }

   async function updateProductCount(productId, count) {
    setDisableBtn(true);
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: { token: localStorage.getItem("token") } }
      );
      setCart(data);
      toast.success("تم تحديث عدد المنتج بنجاح✅✅✅");
    } catch (err) {
      console.log(err);
    } finally {
      setDisableBtn(false);
    }
  }


   useEffect(() => {
    getLoggedUserCart();

   }, []);

  return (
    <cartContext.Provider value={{loading,cart, clearCart,addProductToCart, getLoggedUserCart, removeProductFromCart, updateProductCount,disableBtn}}>
    {children}
    </cartContext.Provider>
  )
}
