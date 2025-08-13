import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import useTheme from "../../Hooks/useTheme";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <Navbar theme={theme} toggletheme={toggleTheme} />
        <main className="container pt-24 mx-auto flex-grow text-black dark:text-gray-100">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
