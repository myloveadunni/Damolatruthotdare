import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { FaArrowLeft, FaSync } from "react-icons/fa";
import ResultModal from "@/components/ResultModal";
import { truthQuestions, darePrompts } from "@/lib/gameData";
import { spinSound, successSound } from "@/lib/sounds";

export default function TruthOrDare() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultType, setResultType] = useState<"Truth 💬" | "Dare 😈" | null>(null);
  const [resultText, setResultText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rotation, setRotation] = useState(0);
  const spinnerRef = useRef<HTMLDivElement>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    spinSound.play();
    
    // Random rotation between 720 and 1440 degrees + offset to ensure it lands on a section
    const degrees = 720 + Math.floor(Math.random() * 720);
    setRotation(degrees);
    
    setTimeout(() => {
      setIsSpinning(false);
      
      // Determine if it landed on Truth or Dare based on final rotation
      const finalRotation = degrees % 360;
      const isTruth = (finalRotation >= 0 && finalRotation < 180);
      
      successSound.play();
      
      if (isTruth) {
        const randomTruth = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
        setResultType("Truth 💬");
        setResultText(randomTruth);
      } else {
        const randomDare = darePrompts[Math.floor(Math.random() * darePrompts.length)];
        setResultType("Dare 😈");
        setResultText(randomDare);
      }
      
      setShowModal(true);
    }, 4000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-pacifico text-primary dark:text-accent mb-2">Truth or Dare</h2>
        <p className="text-gray-600 dark:text-gray-300">Spin the wheel and see what fate has in store for you!</p>
      </div>
      
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
        <div className="relative mb-8">
          {/* Spinner Wheel */}
          <div 
            ref={spinnerRef}
            className="relative w-[300px] h-[300px] rounded-full mx-auto transition-transform duration-[4s] ease-[cubic-bezier(0.17,0.67,0.83,0.67)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Truth Section */}
            <div className="absolute w-1/2 h-1/2 bg-secondary [clip-path:polygon(0_0,100%_0,50%_100%)] [transform-origin:bottom_right] rotate-0"></div>
            
            {/* Dare Section */}
            <div className="absolute w-1/2 h-1/2 bg-primary [clip-path:polygon(0_0,100%_0,50%_100%)] [transform-origin:bottom_right] rotate-180deg"></div>
            
            {/* Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white rounded-full z-10 shadow-md flex items-center justify-center">
              <FaSync className="text-primary" />
            </div>
            
            {/* Pointer */}
            <div className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 w-0 h-0 border-l-[30px] border-l-accent border-y-[15px] border-y-transparent z-5"></div>
          </div>
          
          <div className="mt-4 text-center">
            <div className="flex justify-center gap-6 mb-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-secondary mr-2"></div>
                <span className="text-gray-700 dark:text-gray-300">Truth</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                <span className="text-gray-700 dark:text-gray-300">Dare</span>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full py-3 px-6 bg-primary hover:bg-opacity-90 text-white rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {isSpinning ? "Spinning..." : "Spin the Wheel"}
        </button>
      </div>
      
      <div className="text-center">
        <Link href="/">
          <a className="py-2 px-6 text-primary dark:text-accent hover:underline inline-flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Games
          </a>
        </Link>
      </div>
      
      {resultType && (
        <ResultModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={resultType}
          content={resultText}
          buttonText="Spin Again"
          onButtonClick={() => {
            setShowModal(false);
            setTimeout(() => handleSpin(), 300);
          }}
        />
      )}
    </div>
  );
}
