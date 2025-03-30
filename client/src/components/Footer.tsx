import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 py-6 mt-12 shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Made with <FaHeart className="inline-block text-primary mx-1" /> for couples everywhere
        </p>
      </div>
    </footer>
  );
}
