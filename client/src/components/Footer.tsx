import { FaHeart } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 py-8 mt-16 shadow-inner border-t border-pink-100 dark:border-gray-700">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2">
            <FaHeart className="text-pink-400 dark:text-pink-500 animate-beat" />
            <FaHeart className="text-purple-400 dark:text-purple-500 animate-beat" style={{ animationDelay: '0.3s' }} />
            <FaHeart className="text-pink-400 dark:text-pink-500 animate-beat" style={{ animationDelay: '0.6s' }} />
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Ola and Adunni Forever
          </p>
          
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            © {year} Ola & Adunni | Made with love by Ola
          </p>
        </div>
      </div>
    </footer>
  );
}
