import { Menu, Moon, ShoppingCart, Sun } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { FavoritesContext } from "../../Context/FavoritesContext";
import logo from '../../assets/images/favicon.png'


export default function Navbar({ toggletheme, theme }) {


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  let { cart } = useContext(cartContext);
  let { token, setToken } = useContext(authContext);
  const { favorites } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const [counter, setCounter] = useState(cart?.numOfCartItems || 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/Login");
  };

  useEffect(() => {
    setCounter(cart?.numOfCartItems || 0);
  }, [cart]);


  return (
    <div className="bg-gray-300 dark:bg-gray-900 shadow-xl py-6 fixed top-0 w-full left-0 z-50 text-black dark:text-gray-100 transition-colors duration-300">
      <div className="container flex justify-between items-center -red-300">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10 text-5xl" />
          <h1 className="font-primary text-2xl">FreshCart</h1>
        </div>
       

        {/* links pages */}
        {token ? (
          <ul className="hidden lg:flex justify-between items-center gap-5">
            <li className="text-lg nav-link hover-effect">
              <Link to={"home"}>Home</Link>
            </li>
            <li className="text-lg nav-link hover-effect">
              <Link to={"/Products"}>Products</Link>
            </li>
            <li className="text-lg nav-link hover-effect">
              <Link to={"/Categories"}>Categories</Link>
            </li>
            <li className="text-lg nav-link hover-effect">
              <Link to={"/Brands"}>Brands</Link>
            </li>
            <li className="text-lg nav-link hover-effect">
              <Link to={"/AllOrders"}>All Orders</Link>
            </li>
          </ul>
        ) : null}



        {/* auth links */}

        <ul className="hidden lg:flex justify-between items-center gap-x-5">
          {token ? (
            <>
              <li className="text-lg nav-link hover-effect relative">
                <Link to={"Cart"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-shopping-cart-icon lucide-shopping-cart">
                    <circle cx={8} cy={21} r={1} /> <circle cx={19} cy={21} r={1} />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                </Link>
                {counter > 0 &&
                  <div className="bg-red-300 size-5 text-center text-sm rounded-full absolute -top-3 -left-3">
                    {cart?.numOfCartItems}
                  </div>
                }
              </li>
              {/* أيقونة المفضلة */}
              <li className="text-lg nav-link hover-effect relative">
                <Link to={"/favorites"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-heart-icon">
                    <path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" />
                  </svg>
                </Link>
                {favorites.length > 0 && (
                  <div className="bg-red-300 size-5 text-center text-sm rounded-full absolute -top-3 -left-3">
                    {favorites.length}
                  </div>
                )}
              </li>
              
              {/* Social Media Icons */}
              <li className="text-lg nav-link hover-effect">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </li>
              <li className="text-lg nav-link hover-effect">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors duration-300">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </li>
              <li className="text-lg nav-link hover-effect">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </li>
              <li className="text-lg nav-link hover-effect">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </li>
            </>
          ) : null}

          {!token ? (
            <>
              <li className="text-lg peer/login">
                <Link to={"Login"}>Login</Link>
              </li>
              <li className="text-lg peer-hover/l:bg-amber-400">
                <Link to={"Register"}>Register</Link>
              </li>
            </>
          ) : (
            <li className="text-lg cursor-pointer hover-effect nav-btn" onClick={logout}>
              <span>Logout</span>
            </li>
          )}

          <li className="btn" onClick={toggletheme}>
            {theme == "light" ? <Moon /> : <Sun />}
          </li>
        </ul>
        <div className="ml-auto lg:hidden pt-2 order-2" onClick={toggleMobileMenu}>
          <Menu />
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="container px-4 py-6 transform transition-transform duration-300 ease-in-out">
          {token ? (
            <ul>
              <li className="text-lg nav-link hover-effect transition-all duration-200 hover:translate-x-2">
                <Link to={"home"}>Home</Link>
              </li>
              <li className="text-lg nav-link hover-effect transition-all duration-200 hover:translate-x-2">
                <Link to={"/Products"}>Products</Link>
              </li>
              <li className="text-lg nav-link hover-effect transition-all duration-200 hover:translate-x-2">
                <Link to={"/Categories"}>Categories</Link>
              </li>
              <li className="text-lg nav-link hover-effect transition-all duration-200 hover:translate-x-2">
                <Link to={"/Brands"}>Brands</Link>
              </li>
              <li className="text-lg nav-link hover-effect transition-all duration-200 hover:translate-x-2">
                <Link to={"/AllOrders"}>All Orders</Link>
              </li>
            </ul>
          ) : null}
          <ul className="flex flex-col gap-4">
            {!token ? (
              <>
                <li className="text-lg transition-all duration-200 hover:translate-x-2">
                  <Link to={"Login"}>Login</Link>
                </li>
                <li className="text-lg transition-all duration-200 hover:translate-x-2">
                  <Link to={"Register"}>Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-lg transition-all duration-200 hover:translate-x-2">
                  <button
                    onClick={logout}
                    className="text-red-600 hover:text-red-500"
                  >
                    Logout
                  </button>
                </li>
                
                {/* Social Media Icons for Mobile */}
                {token && (
                  <li className="flex gap-4 mt-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244z"/>
                      </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 transition-colors duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 transition-colors duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </li>
                )}
              </>
            )}
            <li
              className="btn w-fit transition-all duration-200 hover:scale-105"
              onClick={toggletheme}
            >
              {theme == "light" ? <Moon /> : <Sun />}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
