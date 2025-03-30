import { useState } from "react";
import { Link } from "wouter";
import { FaArrowLeft, FaHeart, FaRandom } from "react-icons/fa";
import ResultModal from "@/components/ResultModal";
import { truthQuestions, darePrompts } from "@/lib/gameData";
import { successSound } from "@/lib/sounds";

type Player = "Ola" | "Adunni";
type TurnType = "Truth" | "Dare";

export default function TruthOrDare() {
  const [currentPlayer, setCurrentPlayer] = useState<Player>("Ola");
  const [selectedType, setSelectedType] = useState<TurnType | null>(null);
  const [resultText, setResultText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [processingSelection, setProcessingSelection] = useState(false);

  const handleTypeSelect = (type: TurnType) => {
    if (processingSelection) return;
    
    setProcessingSelection(true);
    setSelectedType(type);
    
    // Get random question based on selected type
    if (type === "Truth") {
      const randomTruth = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
      setResultText(randomTruth);
    } else {
      const randomDare = darePrompts[Math.floor(Math.random() * darePrompts.length)];
      setResultText(randomDare);
    }
    
    // Play sound effect
    successSound.play();
    
    // Show modal with result
    setShowModal(true);
    setProcessingSelection(false);
  };
  
  const switchTurn = () => {
    setCurrentPlayer(currentPlayer === "Ola" ? "Adunni" : "Ola");
    setSelectedType(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-heart-pattern pointer-events-none"></div>
        <h2 className="text-4xl font-romantic text-primary dark:text-accent mb-3 text-gradient">Truth or Dare</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Take turns asking each other and deepen your connection!</p>
        
        <div className="mt-5 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-2xl p-5 max-w-lg mx-auto text-gray-700 dark:text-gray-300 text-sm border border-pink-200 dark:border-gray-700 shadow-romantic">
          <p className="font-medium text-lg mb-2 font-romantic">💞 How to Play:</p>
          <ul className="list-disc pl-5 mt-2 text-left">
            <li>Take turns asking "Truth or Dare"</li>
            <li>When it's your turn, ask your partner to choose</li>
            <li>After they choose, click on Truth or Dare button to get a random question</li>
            <li>After completing the truth/dare, click "Next Turn" to switch</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-romantic p-8 mb-8 border border-pink-100 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-heart-pattern pointer-events-none"></div>
        
        {/* Current Player Display */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 dark:bg-opacity-20 px-5 py-3 rounded-full">
            <FaHeart className={`text-${currentPlayer === "Ola" ? "blue" : "pink"}-500 mr-2 animate-beat`} />
            <span className="font-romantic text-2xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {currentPlayer === "Ola" ? 
                "Ola's Turn (Ask Adunni)" : 
                "Adunni's Turn (Ask Ola)"}
            </span>
            <FaHeart className={`text-${currentPlayer === "Ola" ? "blue" : "pink"}-500 ml-2 animate-beat`} />
          </div>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-3">
            {currentPlayer === "Ola" ? 
              "Ola, ask Adunni to choose 'Truth' or 'Dare'" : 
              "Adunni, ask Ola to choose 'Truth' or 'Dare'"}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
            After they've chosen, click the corresponding button below:
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => handleTypeSelect("Truth")}
            className="py-4 px-6 bg-gradient-to-r from-purple-400 to-purple-600 hover:opacity-90 text-white rounded-xl font-medium transition-all duration-300 shadow-romantic hover:shadow-lg font-romantic text-xl flex items-center justify-center"
          >
            <span>Truth 💬</span>
          </button>
          
          <button 
            onClick={() => handleTypeSelect("Dare")}
            className="py-4 px-6 bg-gradient-to-r from-pink-400 to-rose-600 hover:opacity-90 text-white rounded-xl font-medium transition-all duration-300 shadow-romantic hover:shadow-lg font-romantic text-xl flex items-center justify-center"
          >
            <span>Dare 😈</span>
          </button>
        </div>
        
        <button 
          onClick={switchTurn}
          className="w-full py-3 px-6 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center"
        >
          <FaRandom className="mr-2" />
          <span>Next Turn</span>
        </button>
      </div>
      
      <div className="text-center">
        <Link href="/" className="py-2 px-6 text-pink-500 dark:text-pink-300 hover:underline inline-flex items-center font-medium">
          <FaArrowLeft className="mr-2" /> Back to Games
        </Link>
      </div>
      
      {selectedType && (
        <ResultModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`${selectedType} 💕`}
          content={resultText}
          buttonText="Continue"
          onButtonClick={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
