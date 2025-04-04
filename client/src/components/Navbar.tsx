import { Link } from "wouter";
import { FaMoon, FaSun, FaHeart } from "react-icons/fa";
import useTheme from "@/hooks/useTheme";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-romantic py-4 sticky top-0 z-50 transition-colors duration-300 border-b border-pink-100 dark:border-gray-700">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <span className="text-2xl md:text-3xl font-romantic text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text group-hover:opacity-90 transition-opacity duration-300">
            <span className="inline-block transform group-hover:scale-110 transition-transform duration-300">O</span>
            <span className="inline-block transform group-hover:rotate-3 transition-transform duration-300">l</span>
            <span className="inline-block transform group-hover:scale-110 transition-transform duration-300">a</span>
            <span className="inline-block"> & </span>
            <span className="inline-block transform group-hover:rotate-6 transition-transform duration-300">A</span>
            <span className="inline-block transform group-hover:scale-110 transition-transform duration-300">d</span>
            <span className="inline-block transform group-hover:rotate-3 transition-transform duration-300">u</span>
            <span className="inline-block transform group-hover:rotate-6 transition-transform duration-300">n</span>
            <span className="inline-block transform group-hover:scale-110 transition-transform duration-300">n</span>
            <span className="inline-block transform group-hover:rotate-3 transition-transform duration-300">i</span>
          </span>
          
          <span className="ml-2 mt-1 flex">
            <FaHeart className="text-blue-500 animate-beat" size={16} />
            <FaHeart className="text-pink-500 animate-beat" style={{ animationDelay: '0.3s' }} size={16} />
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 text-pink-500 dark:text-yellow-300 focus:outline-none shadow-sm hover:shadow transition-shadow duration-300"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-pink-500" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
