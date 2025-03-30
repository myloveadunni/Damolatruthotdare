import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export default function ResultModal({
  isOpen,
  onClose,
  title,
  content,
  buttonText,
  onButtonClick
}: ResultModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      setTimeout(() => {
        modalContentRef.current?.classList.remove('scale-95', 'opacity-0');
        modalContentRef.current?.classList.add('scale-100', 'opacity-100');
      }, 10);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleButtonClick = () => {
    onClose();
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div 
        ref={modalContentRef}
        className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full mx-4 z-10 shadow-romantic transform transition-all duration-300 scale-95 opacity-0 border border-pink-200 dark:border-gray-700 relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-pink-100 dark:bg-pink-900 dark:bg-opacity-20 rounded-full opacity-30"></div>
        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20 rounded-full opacity-30"></div>
        
        <div className="text-center relative z-10">
          <div className="inline-block px-4 py-1 bg-pink-100 dark:bg-pink-900 dark:bg-opacity-30 rounded-full text-pink-600 dark:text-pink-300 mb-4 text-sm font-medium">
            Your {title}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-6 border border-pink-100 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 text-lg font-medium italic">"{content}"</p>
          </div>
          
          <button 
            onClick={handleButtonClick}
            className="py-3 px-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white rounded-full font-medium transition-all duration-300 shadow-romantic hover:shadow-lg font-romantic text-lg"
          >
            {buttonText} ✨
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
