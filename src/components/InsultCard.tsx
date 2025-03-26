
import React, { useState } from 'react';
import { Insult, useInsultStore } from '../utils/data';
import VoteButton from './VoteButton';
import { PaymentModal } from './PaymentModal';
import { cn } from '../lib/utils';

interface InsultCardProps {
  insult: Insult;
  featured?: boolean;
  rank?: number; // Added rank prop for display
}

const InsultCard: React.FC<InsultCardProps> = ({ insult, featured = false, rank }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const addVote = useInsultStore((state) => state.addVote);
  const allInsults = useInsultStore((state) => state.insults);

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

  // Get the sequential order of the insult by creation date
  const getInsultSequenceNumber = () => {
    const sortedInsults = [...allInsults].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    return sortedInsults.findIndex(i => i.id === insult.id) + 1;
  };

  return (
    <div className={cn(
      "w-full animate-scale-in",
      featured && "transform transition-all duration-300 hover:scale-[1.02]"
    )}>
      <div className={cn(
        "glassmorphism p-6 rounded-2xl hover:shadow-md transition-all duration-300 h-full",
        featured && "border-primary/30 bg-white/70 shadow-lg",
        rank === 1 && "border-yellow-400/50 bg-yellow-50/80 shadow-lg",
        rank === 2 && "border-gray-300/50 bg-gray-50/80 shadow-md",
        rank === 3 && "border-amber-600/40 bg-amber-50/80 shadow-md"
      )}>
        <div className="mb-4 flex justify-between items-start">
          <div className="flex items-center">
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              featured ? "bg-primary/10 text-primary" : "bg-secondary",
              rank === 1 && "bg-yellow-100 text-yellow-800 border border-yellow-300",
              rank === 2 && "bg-gray-100 text-gray-800 border border-gray-300", 
              rank === 3 && "bg-amber-100 text-amber-800 border border-amber-300"
            )}>
              #{getInsultSequenceNumber()}
            </span>
            
            {rank && rank <= 3 && (
              <span className={cn(
                "ml-2 px-2 py-1 text-xs font-bold rounded-full",
                rank === 1 && "bg-yellow-400/70 text-yellow-900",
                rank === 2 && "bg-gray-300/70 text-gray-900",
                rank === 3 && "bg-amber-500/70 text-amber-900"
              )}>
                {rank === 1 ? "🥇 1 место" : rank === 2 ? "🥈 2 место" : "🥉 3 место"}
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDate(insult.createdAt)}
          </div>
        </div>

        <p className={cn(
          "mb-4 text-foreground",
          featured ? "text-xl font-medium" : "text-lg font-medium",
          rank === 1 && "text-xl font-bold"
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
              featured ? "text-base" : "text-sm",
              rank === 1 && "text-yellow-700 font-bold",
              rank === 2 && "text-gray-700 font-semibold",
              rank === 3 && "text-amber-700 font-semibold"
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
