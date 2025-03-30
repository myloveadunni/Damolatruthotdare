import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

interface FloatingHeart {
  id: number;
  left: string;
  size: number;
  color: string;
  delay: string;
  duration: string;
}

export default function HeartBackground() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    createFloatingHearts();
    
    // Refresh floating hearts periodically
    const interval = setInterval(createFloatingHearts, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const createFloatingHearts = () => {
    const heartColors = [
      '#FF6B9C', // pink
      '#FF85A1', // light pink
      '#F9A8D4', // softer pink
      '#9D4EDD', // purple
      '#C77DFF', // light purple
      '#FEC5E5', // pastel pink
      '#FF5F9E', // vibrant pink
    ];
    
    const heartSizes = [15, 20, 25, 30, 35];
    const newHearts: FloatingHeart[] = [];
    
    // Increase number of hearts for more romantic effect
    for (let i = 0; i < 25; i++) {
      const size = heartSizes[Math.floor(Math.random() * heartSizes.length)];
      const color = heartColors[Math.floor(Math.random() * heartColors.length)];
      
      newHearts.push({
        id: i,
        left: `${Math.random() * 100}%`,
        size,
        color,
        delay: `${Math.random() * 15}s`, // Longer range for more natural appearance
        duration: `${10 + Math.random() * 15}s` // Longer duration for a more gentle float
      });
    }
    
    setHearts(newHearts);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute opacity-0"
          style={{
            left: heart.left,
            animationName: 'float',
            animationDuration: heart.duration,
            animationDelay: heart.delay,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            filter: 'drop-shadow(0 0 2px rgba(255, 182, 193, 0.3))'
          }}
        >
          <FaHeart
            size={heart.size}
            color={heart.color}
            style={{ 
              opacity: Math.random() * 0.4 + 0.6, // Varied opacity for depth effect
              transform: `rotate(${Math.random() * 40 - 20}deg)` // Random slight rotation
            }}
          />
        </div>
      ))}

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(110vh) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
            transform: translateY(90vh) rotate(45deg) scale(1);
          }
          50% {
            transform: translateY(50vh) rotate(180deg) scale(0.9);
          }
          90% {
            opacity: 0.6;
            transform: translateY(10vh) rotate(315deg) scale(1);
          }
          100% {
            transform: translateY(-10vh) rotate(360deg) scale(0.8);
            opacity: 0;
          }
        }
        
        /* Add a subtle pulsing effect to the hearts */
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
