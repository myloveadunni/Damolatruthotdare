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
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      <div 
        ref={modalContentRef}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 z-10 shadow-2xl transform transition-all duration-300 scale-95 opacity-0"
      >
        <div className="text-center">
          <h3 className="text-2xl font-pacifico text-primary dark:text-accent mb-4">{title}</h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">{content}</p>
          <button 
            onClick={handleButtonClick}
            className="py-3 px-6 bg-primary hover:bg-opacity-90 text-white rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
