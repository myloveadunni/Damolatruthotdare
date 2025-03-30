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

  // Function to get a more realistic physical spin with slowing effect
  const getSpinAnimation = () => {
    // Initial speed (high)
    let initialSpeed = 30 + Math.random() * 20; // Between 30-50 degrees per frame
    const frames = [];
    let currentRotation = 0;
    
    // Generate 120 frames of spinning animation with slowing down effect
    for (let i = 0; i < 120; i++) {
      // Calculate slowdown factor that increases over time (easeOut)
      // This creates a realistic physical slowdown effect
      const slowdown = 1 - Math.pow(i / 120, 2);
      
      // Apply slowdown to speed
      const frameSpeed = initialSpeed * slowdown;
      
      // Add rotation for this frame
      currentRotation += frameSpeed;
      
      // Store the calculated rotation for this frame
      frames.push(currentRotation);
    }
    
    // Ensure we rotate at least 3 full spins (1080 degrees) to make it exciting
    const minRotation = 1080;
    if (frames[frames.length - 1] < minRotation) {
      const extraNeeded = minRotation - frames[frames.length - 1];
      for (let i = 0; i < frames.length; i++) {
        frames[i] += extraNeeded;
      }
    }
    
    return frames;
  };

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    spinSound.play();
    
    // Generate realistic spinning animation
    const spinFrames = getSpinAnimation();
    const finalDegrees = spinFrames[spinFrames.length - 1];
    
    // Start animation loop
    let frameIndex = 0;
    const animateFrame = () => {
      if (frameIndex < spinFrames.length) {
        setRotation(spinFrames[frameIndex]);
        frameIndex++;
        requestAnimationFrame(animateFrame);
      } else {
        // Animation complete
        onSpinComplete(finalDegrees);
      }
    };
    
    // Kick off the animation
    requestAnimationFrame(animateFrame);
  };
  
  const onSpinComplete = (finalDegrees: number) => {
    // Determine if it landed on Truth or Dare based on final rotation
    const finalRotation = finalDegrees % 360;
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
    
    setIsSpinning(false);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-heart-pattern pointer-events-none"></div>
        <h2 className="text-4xl font-romantic text-primary dark:text-accent mb-3 text-gradient">Truth or Dare</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Spin the wheel of love and open your heart to each other!</p>
        
        <div className="mt-5 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-2xl p-5 max-w-lg mx-auto text-gray-700 dark:text-gray-300 text-sm border border-pink-200 dark:border-gray-700 shadow-romantic">
          <p className="font-medium text-lg mb-2 font-romantic">💞 Long-Distance Tips:</p>
          <ul className="list-disc pl-5 mt-2 text-left">
            <li>Take screenshots of your results to share with your partner</li>
            <li>Play together while on a video call for extra fun</li>
            <li>If a dare isn't possible, choose another or save it for your next meetup!</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-romantic p-8 mb-8 border border-pink-100 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-heart-pattern pointer-events-none"></div>
        
        <div className="relative mb-8">
          {/* Spinner Wheel */}
          <div 
            ref={spinnerRef}
            className="relative w-[300px] h-[300px] rounded-full mx-auto spin-wheel"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Truth Section */}
            <div className="absolute w-1/2 h-1/2 bg-gradient-to-br from-purple-400 to-purple-600 [clip-path:polygon(0_0,100%_0,50%_100%)] [transform-origin:bottom_right] rotate-0 shadow-lg"></div>
            
            {/* Dare Section */}
            <div className="absolute w-1/2 h-1/2 bg-gradient-to-br from-pink-400 to-rose-600 [clip-path:polygon(0_0,100%_0,50%_100%)] [transform-origin:bottom_right] rotate-180deg shadow-lg"></div>
            
            {/* Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-white rounded-full z-10 shadow-lg flex items-center justify-center border-2 border-pink-200">
              <FaSync className="text-pink-500 text-xl" />
            </div>
            
            {/* Pointer */}
            <div className="absolute top-1/2 right-[-25px] transform -translate-y-1/2 w-0 h-0 border-l-[35px] border-l-pink-500 border-y-[20px] border-y-transparent z-5 filter drop-shadow"></div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="flex justify-center gap-8 mb-4">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 mr-2 shadow-sm"></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Truth 💬</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 mr-2 shadow-sm"></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Dare 😈</span>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white rounded-full font-medium transition-all duration-300 shadow-romantic hover:shadow-lg disabled:opacity-50 font-romantic text-lg"
        >
          {isSpinning ? "Spinning..." : "Spin the Wheel of Love"}
        </button>
      </div>
      
      <div className="text-center">
        <Link href="/" className="py-2 px-6 text-pink-500 dark:text-pink-300 hover:underline inline-flex items-center font-medium">
          <FaArrowLeft className="mr-2" /> Back to Games
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
