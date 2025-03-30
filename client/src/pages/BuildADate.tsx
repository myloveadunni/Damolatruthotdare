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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-pacifico text-secondary dark:text-accent mb-2">Build-a-Date</h2>
        <p className="text-gray-600 dark:text-gray-300">Create your perfect date with a click!</p>
        <div className="mt-4 bg-pink-50 dark:bg-gray-700 rounded-lg p-4 max-w-lg mx-auto text-gray-700 dark:text-gray-300 text-sm">
          <p className="font-medium">🌟 Long-Distance Date Ideas:</p>
          <ul className="list-disc pl-5 mt-2 text-left">
            <li>Virtual version: Recreate the date on a video call (e.g., cook the same meal)</li>
            <li>Plan for your next meetup or save ideas for future in-person dates</li>
            <li>Have your partner build a date too, then compare ideas!</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
        <div 
          className={`mb-8 text-center min-h-[100px] flex items-center justify-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 ${isPulsing ? 'animate-pulse' : ''}`}
        >
          {dateResult ? (
            <p 
              className="text-gray-700 dark:text-gray-300" 
              dangerouslySetInnerHTML={{ __html: dateResult }}
            />
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">Click the button below to build your perfect date!</p>
          )}
        </div>
        
        <button 
          onClick={buildDate}
          className="w-full py-3 px-6 bg-secondary hover:bg-opacity-90 text-white rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
        >
          Build Our Date <FaHeart className="ml-2" />
        </button>
      </div>
      
      <div className="text-center">
        <Link href="/" className="py-2 px-6 text-secondary dark:text-accent hover:underline inline-flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Games
        </Link>
      </div>
    </div>
  );
}
