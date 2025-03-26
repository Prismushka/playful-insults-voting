
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { useWalletStore } from '../utils/wallet';
import { WalletModal } from './WalletModal';

const Navbar: React.FC = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { walletAddress, walletType } = useWalletStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-gray-200/20 py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img alt="Trollface" src="https://static.goodgame.ru/files/pics/227213_f3Te.jpg" className="w-30 h-10 rounded-0 object-cover" />
            <span className="text-xl font-bold text-primary animate-fade-in">ПрикольныеРугательства</span>
          </Link>
          
          <div className="flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary transition-all duration-200 ease-in-out">
              Главная
            </Link>
            <Link to="/top" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary transition-all duration-200 ease-in-out">
              Топ
            </Link>
            <button 
              onClick={() => setIsWalletModalOpen(true)}
              className="px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary transition-all duration-200 flex items-center space-x-2"
            >
              <Wallet className="w-4 h-4" />
              <span>{walletAddress ? "Кошелек подключен" : "Подключить кошелек"}</span>
            </button>
          </div>
        </div>
      </div>

      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
