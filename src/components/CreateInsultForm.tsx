
import React, { useState } from 'react';
import { useInsultStore } from '../utils/data';
import { Loader2 } from 'lucide-react';

const CreateInsultForm: React.FC = () => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addInsult = useInsultStore((state) => state.addInsult);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate a slight delay for better UX
    setTimeout(() => {
      addInsult(text, author);
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
            Ваше имя (необязательно)
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Аноним"
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
