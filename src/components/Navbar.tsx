
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-gray-200/20 py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://source.unsplash.com/photo-1501286353178-1ec881214838?w=48&h=48" 
              alt="Trollface" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-xl font-bold text-primary animate-fade-in">ПрикольныеРугательства</span>
          </Link>
          
          <div className="flex items-center space-x-1">
            <Link 
              to="/" 
              className="px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary transition-all duration-200 ease-in-out"
            >
              Главная
            </Link>
            <Link 
              to="/" 
              className="px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary transition-all duration-200 ease-in-out"
            >
              Топ
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
