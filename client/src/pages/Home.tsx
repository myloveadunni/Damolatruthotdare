import { Link } from "wouter";
import { FaDice, FaHeart, FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-16 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-heart-pattern pointer-events-none"></div>
        
        {/* Decorative hearts */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-70">
          <FaHeart className="text-pink-300 dark:text-pink-500 text-3xl mx-auto" />
        </div>
        
        <h2 className="text-5xl md:text-6xl font-romantic text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text mb-6">Welcome, Lovebirds!</h2>
        
        <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto text-xl leading-relaxed">
          Across the miles, our hearts remain connected. 
          Let these games bring joy to your long-distance love story!
        </p>
        
        <div className="mt-8 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 rounded-3xl p-6 max-w-xl mx-auto text-gray-700 dark:text-gray-300 border border-pink-200 dark:border-gray-700 shadow-romantic relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-20 h-20 bg-pink-100 dark:bg-pink-900 dark:bg-opacity-20 rounded-full opacity-50"></div>
          <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20 rounded-full opacity-50"></div>
          
          <p className="font-romantic text-xl mb-3 text-pink-600 dark:text-pink-400">💌 Long-Distance Love Mode</p>
          <p className="relative z-10">Play together on your favorite video call app, or take screenshots to share your results. Feel the magic of being together even when you're apart!</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {/* Truth or Dare Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-romantic overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-lg border border-pink-100 dark:border-gray-700 group">
          <div className="h-56 bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-heart-pattern"></div>
            <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <FaDice className="text-white text-8xl drop-shadow-lg transform group-hover:rotate-12 transition-transform duration-500" />
          </div>
          <div className="p-8">
            <h3 className="text-3xl font-romantic bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">Truth or Dare</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">Spin the wheel of romance and discover the depths of your connection across the distance. Perfect for video call dates!</p>
            <Link href="/truth-or-dare" className="w-full inline-flex justify-center items-center py-4 px-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-90 text-white rounded-full font-medium transition-all duration-300 shadow-romantic hover:shadow-lg text-center text-lg">
              Play Truth or Dare <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
        
        {/* Build-a-Date Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-romantic overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-lg border border-pink-100 dark:border-gray-700 group">
          <div className="h-56 bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-heart-pattern"></div>
            <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <FaHeart className="text-white text-8xl drop-shadow-lg animate-pulse transform group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-8">
            <h3 className="text-3xl font-romantic bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">Build-a-Date</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">Create magical virtual date nights with our romantic combination generator. Experience togetherness despite the distance!</p>
            <Link href="/build-a-date" className="w-full inline-flex justify-center items-center py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white rounded-full font-medium transition-all duration-300 shadow-romantic hover:shadow-lg text-center text-lg">
              Build a Date <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <div className="inline-flex items-center px-6 py-2 rounded-full bg-white dark:bg-gray-800 shadow-romantic border border-pink-100 dark:border-gray-700">
          <FaHeart className="text-pink-400 mr-2" />
          <p className="text-pink-500 dark:text-pink-300 font-romantic text-xl">Created with love for long-distance couples</p>
          <FaHeart className="text-pink-400 ml-2" />
        </div>
      </div>
    </div>
  );
}
