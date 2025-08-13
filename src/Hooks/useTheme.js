import { useState, useEffect } from "react";

export default function useTheme() {
  // Initialize theme state with a function to prevent flash
  const [theme, setTheme] = useState(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Get theme from localStorage or default to light
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || "light";
    }
    return "light"; // Default for SSR
  });

  // Prevent flash by applying theme immediately
  useEffect(() => {
    // Apply theme to body class immediately
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  // Initialize theme on mount to prevent flash
  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && savedTheme !== theme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
}
