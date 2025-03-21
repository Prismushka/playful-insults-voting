
import React, { useState } from 'react';
import { Insult, useInsultStore } from '../utils/data';
import VoteButton from './VoteButton';
import { PaymentModal } from './PaymentModal';

interface InsultCardProps {
  insult: Insult;
}

const InsultCard: React.FC<InsultCardProps> = ({ insult }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const addVote = useInsultStore((state) => state.addVote);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleVoteClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = () => {
    addVote(insult.id);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="w-full animate-scale-in">
      <div className="glassmorphism p-6 rounded-2xl hover:shadow-md transition-all duration-300 h-full">
        <div className="mb-4 flex justify-between items-start">
          <div className="flex items-center">
            <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-full">#{insult.id}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDate(insult.createdAt)}
          </div>
        </div>

        <p className="text-lg font-medium mb-4 text-foreground">{insult.text}</p>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            Автор: {insult.author}
          </div>
          <div className="flex items-center">
            <div className="mr-2 text-sm font-medium">
              {insult.votes} голос{insult.votes === 1 ? '' : insult.votes >= 2 && insult.votes <= 4 ? 'а' : 'ов'}
            </div>
            <VoteButton onClick={handleVoteClick} />
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentComplete={handlePaymentComplete}
        insult={insult}
      />
    </div>
  );
};

export default InsultCard;
