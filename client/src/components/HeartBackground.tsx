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
    const heartColors = ['#FF6B9C', '#9D4EDD', '#F9A8D4'];
    const heartSizes = [20, 30, 40];
    const newHearts: FloatingHeart[] = [];
    
    for (let i = 0; i < 15; i++) {
      const size = heartSizes[Math.floor(Math.random() * heartSizes.length)];
      const color = heartColors[Math.floor(Math.random() * heartColors.length)];
      
      newHearts.push({
        id: i,
        left: `${Math.random() * 100}%`,
        size,
        color,
        delay: `${Math.random() * 10}s`,
        duration: `${6 + Math.random() * 10}s`
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
            animationIterationCount: 'infinite'
          }}
        >
          <FaHeart
            size={heart.size}
            color={heart.color}
          />
        </div>
      ))}

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
