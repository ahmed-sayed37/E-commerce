import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoutes>
            {" "}
            <Products />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/category/:categoryId",
        element: (
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/brand/:brandId",
        element: (
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/productDetails/:id",
        element: (
          <ProtectedRoutes>
           
            <ProductDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/Categories",
        element: (
          <ProtectedRoutes>
            {" "}
            <Categories />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/Cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectedRoutes>
            <AllOrders />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/Brands",
        element: (
          <ProtectedRoutes>
            <Brands />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/Orders",
        element: (
          <ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/favorites",
        element: (
          <ProtectedRoutes>
            <Favorites />
          </ProtectedRoutes>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-code", element: <ResetCode /> },
      { path: "/new-password", element: <NewPassword /> },
    ],
  },
]);
function App() {
const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <FavoritesProvider>
              <RouterProvider router={routes} />
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
