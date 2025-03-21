
import React, { useState } from 'react';
import { Insult, useInsultStore } from '../utils/data';
import VoteButton from './VoteButton';
import { PaymentModal } from './PaymentModal';
import { cn } from '../lib/utils';

interface InsultCardProps {
  insult: Insult;
  featured?: boolean;
}

const InsultCard: React.FC<InsultCardProps> = ({ insult, featured = false }) => {
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
    <div className={cn(
      "w-full animate-scale-in",
      featured && "transform transition-all duration-300 hover:scale-[1.02]"
    )}>
      <div className={cn(
        "glassmorphism p-6 rounded-2xl hover:shadow-md transition-all duration-300 h-full",
        featured && "border-primary/30 bg-white/70 shadow-lg"
      )}>
        <div className="mb-4 flex justify-between items-start">
          <div className="flex items-center">
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              featured ? "bg-primary/10 text-primary" : "bg-secondary"
            )}>
              #{insult.id}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDate(insult.createdAt)}
          </div>
        </div>

        <p className={cn(
          "mb-4 text-foreground",
          featured ? "text-xl font-medium" : "text-lg font-medium"
        )}>
          {insult.text}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            Автор: {insult.author}
          </div>
          <div className="flex items-center">
            <div className={cn(
              "mr-2 font-medium",
              featured ? "text-base" : "text-sm"
            )}>
              {insult.votes} голос{insult.votes === 1 ? '' : insult.votes >= 2 && insult.votes <= 4 ? 'а' : 'ов'}
            </div>
            <VoteButton onClick={handleVoteClick} featured={featured} />
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
