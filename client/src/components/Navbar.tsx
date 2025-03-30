import { Link } from "wouter";
import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "@/hooks/useTheme";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl md:text-3xl font-pacifico text-primary dark:text-accent">
            Couple's Game Night
        </Link>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}
