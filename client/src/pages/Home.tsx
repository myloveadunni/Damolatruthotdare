import { Link } from "wouter";
import { FaDice, FaHeart, FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-pacifico text-primary dark:text-accent mb-4">Welcome, Lovebirds!</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">Choose a fun game to play together and create unforgettable moments.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Truth or Dare Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
          <div className="h-40 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <FaDice className="text-white text-6xl" />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-pacifico text-primary dark:text-accent mb-3">Truth or Dare</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Spin the wheel and answer a truth or complete a dare. Get to know each other better!</p>
            <Link href="/truth-or-dare">
              <a className="w-full inline-block py-3 px-6 bg-primary hover:bg-opacity-90 text-white rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg text-center">
                Play Truth or Dare <FaArrowRight className="ml-2 inline-block" />
              </a>
            </Link>
          </div>
        </div>
        
        {/* Build-a-Date Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
          <div className="h-40 bg-gradient-to-r from-secondary to-accent flex items-center justify-center">
            <FaHeart className="text-white text-6xl" />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-pacifico text-secondary dark:text-accent mb-3">Build-a-Date</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Generate a unique date idea combining location, food, outfit, and activity. Ready for adventure?</p>
            <Link href="/build-a-date">
              <a className="w-full inline-block py-3 px-6 bg-secondary hover:bg-opacity-90 text-white rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg text-center">
                Build a Date <FaArrowRight className="ml-2 inline-block" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
