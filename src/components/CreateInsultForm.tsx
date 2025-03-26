
import React, { useState, useEffect } from 'react';
import { useInsultStore } from '../utils/data';
import { useWalletStore } from '../utils/wallet';
import { Loader2 } from 'lucide-react';

const CreateInsultForm: React.FC = () => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addInsult = useInsultStore((state) => state.addInsult);
  const { walletType, getWalletUsername } = useWalletStore();
  
  // Set author based on wallet type
  useEffect(() => {
    const walletUsername = getWalletUsername();
    if (walletType === 'phantom' && walletUsername) {
      setAuthor(walletUsername);
    } else if (walletType === 'metamask') {
      setAuthor('');
    }
  }, [walletType, getWalletUsername]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    setIsSubmitting(true);
    
    // Use author if provided, otherwise use wallet username or 'Аноним'
    const finalAuthor = author.trim() || (walletType === 'phantom' ? getWalletUsername() : 'Аноним');
    
    // Simulate a slight delay for better UX
    setTimeout(() => {
      addInsult(text, finalAuthor);
      setText('');
      setAuthor('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="glassmorphism p-6 rounded-2xl animate-fade-in">
      <h2 className="text-xl font-bold mb-4">Создать новое ругательство</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium mb-1">
            Текст ругательства
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите ваше креативное ругательство..."
            className="w-full p-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            rows={3}
            required
          />
        </div>
        
        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-1">
            Ваше имя {walletType === 'phantom' ? '(автозаполнено из кошелька)' : '(необязательно)'}
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder={walletType === 'phantom' ? getWalletUsername() : 'Аноним'}
            className="w-full p-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || !text.trim()}
          className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 disabled:opacity-70 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Создание...</span>
            </>
          ) : (
            <span>Создать ругательство</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateInsultForm;
