import { useState } from "react";
import { Link } from "wouter";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { dateLocations, dateFoods, dateOutfits, dateActivities } from "@/lib/gameData";
import { successSound } from "@/lib/sounds";

export default function BuildADate() {
  const [dateResult, setDateResult] = useState<string | null>(null);
  const [isPulsing, setIsPulsing] = useState(false);

  const buildDate = () => {
    const location = dateLocations[Math.floor(Math.random() * dateLocations.length)];
    const food = dateFoods[Math.floor(Math.random() * dateFoods.length)];
    const outfit = dateOutfits[Math.floor(Math.random() * dateOutfits.length)];
    const activity = dateActivities[Math.floor(Math.random() * dateActivities.length)];
    
    successSound.play();
    
    setDateResult(`Tonight, we're going to the <span class="font-medium text-secondary dark:text-accent">${location}</span>, eating <span class="font-medium text-primary dark:text-accent">${food}</span>, wearing <span class="font-medium text-secondary dark:text-accent">${outfit}</span>, and <span class="font-medium text-primary dark:text-accent">${activity}</span> together.`);
    
    setIsPulsing(true);
    setTimeout(() => {
      setIsPulsing(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-heart-pattern pointer-events-none"></div>
        <h2 className="text-4xl font-romantic text-secondary dark:text-accent mb-3 text-gradient">Build-a-Date</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Design your perfect virtual date night together!</p>
        
        <div className="mt-5 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-2xl p-5 max-w-lg mx-auto text-gray-700 dark:text-gray-300 text-sm border border-pink-200 dark:border-gray-700 shadow-romantic">
          <p className="font-medium text-lg mb-2 font-romantic">💖 Long-Distance Date Ideas:</p>
          <ul className="list-disc pl-5 mt-2 text-left">
            <li>Virtual version: Recreate the date on a video call (e.g., cook the same meal)</li>
            <li>Plan for your next meetup or save ideas for future in-person dates</li>
            <li>Have your partner build a date too, then compare ideas!</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-romantic p-8 mb-8 border border-pink-100 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-heart-pattern pointer-events-none"></div>
        
        <div 
          className={`mb-8 text-center min-h-[120px] flex items-center justify-center p-6 rounded-xl ${isPulsing ? 'animate-pulse' : ''} 
          ${dateResult ? 'bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-inner border border-pink-100 dark:border-gray-600' : 
          'bg-white dark:bg-gray-700 border border-dashed border-pink-200 dark:border-gray-600'}`}
        >
          {dateResult ? (
            <p 
              className="text-gray-700 dark:text-gray-300 text-lg" 
              dangerouslySetInnerHTML={{ __html: dateResult }}
            />
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-gray-500 dark:text-gray-400 italic">Generate your perfect date night with just one click!</p>
              <div className="mt-2 flex">
                {[...Array(3)].map((_, i) => (
                  <FaHeart key={i} className="text-pink-300 dark:text-pink-800 mx-1 animate-pulse" style={{animationDelay: `${i * 0.3}s`}} />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button 
          onClick={buildDate}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white rounded-full font-medium transition-all duration-300 shadow-romantic hover:shadow-lg flex items-center justify-center font-romantic text-lg"
        >
          Create Our Perfect Date <FaHeart className="ml-2 animate-beat" />
        </button>
      </div>
      
      <div className="text-center">
        <Link href="/" className="py-2 px-6 text-purple-500 dark:text-purple-300 hover:underline inline-flex items-center font-medium">
          <FaArrowLeft className="mr-2" /> Back to Games
        </Link>
      </div>
    </div>
  );
}
