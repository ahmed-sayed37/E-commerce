import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { X } from "lucide-react";
import Home from "./pages/Home/Home";
import Footer from "./component/Footer/Footer";
import Navbar from "./component/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetCode from "./pages/ResetCode/ResetCode";
import NewPassword from "./pages/NewPassword/NewPassword";
import Layout from "./component/Layout/Layout";
import { Toaster } from "react-hot-toast";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Cart from "./pages/Cart/Cart";
import Brands from "./pages/Brands/Brands";
import Orders from "./pages/AllOrders/AllOrders";
import ProtectedRoutes from "./Protected/ProtectedRoutes";
import AuthContextProvider from "./Context/AuthContext";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import AllOrders from "./pages/AllOrders/AllOrders";
import FavoritesProvider from "./Context/FavoritesContext";
import Favorites from "./pages/Favorites/Favorites";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


function App() {
const queryClient = new QueryClient();
const [isRedirecting, setIsRedirecting] = useState(false);

useEffect(() => {
  // Check if we need to redirect after payment
  if (window.location.href.includes("ahmed-sayed37.github.io/E-commerce") && !isRedirecting) {
    setIsRedirecting(true);
    window.location.href = "https://ahmed-sayed37.github.io/E-commerce/#/allorders";
  }
}, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <FavoritesProvider>
              <HashRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
                    <Route path="/home" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
                    <Route path="/products" element={<ProtectedRoutes><Products /></ProtectedRoutes>} />
                    <Route path="/category/:categoryId" element={<ProtectedRoutes><Products /></ProtectedRoutes>} />
                    <Route path="/brand/:brandId" element={<ProtectedRoutes><Products /></ProtectedRoutes>} />
                    <Route path="/productDetails/:id" element={<ProtectedRoutes><ProductDetails /></ProtectedRoutes>} />
                    <Route path="/Categories" element={<ProtectedRoutes><Categories /></ProtectedRoutes>} />
                    <Route path="/Cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />
                    <Route path="/allorders" element={<ProtectedRoutes><AllOrders /></ProtectedRoutes>} />
                    <Route path="/Brands" element={<ProtectedRoutes><Brands /></ProtectedRoutes>} />
                    <Route path="/Orders" element={<ProtectedRoutes><AllOrders /></ProtectedRoutes>} />
                    <Route path="/favorites" element={<ProtectedRoutes><Favorites /></ProtectedRoutes>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-code" element={<ResetCode />} />
                    <Route path="/new-password" element={<NewPassword />} />
                  </Route>
                </Routes>
              </HashRouter>
              <Toaster />
            </FavoritesProvider>
          </CartContextProvider>
        </AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
