
import React from 'react';
import { ArrowUp, DollarSign } from 'lucide-react';
import { cn } from '../lib/utils';

interface VoteButtonProps {
  onClick: () => void;
  featured?: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({ onClick, featured = false }) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "relative group flex items-center justify-center rounded-full bg-primary text-white shadow-sm hover:bg-primary/90 active:scale-95 transition-all duration-200 vote-animation",
        featured ? "w-12 h-12" : "w-10 h-10"
      )}
      aria-label="Vote for this insult"
    >
      <ArrowUp className={cn(
        "group-hover:scale-110 transition-transform duration-200",
        featured ? "w-6 h-6" : "w-5 h-5"
      )} />
      <span className={cn(
        "absolute -top-1 -right-1 flex items-center justify-center bg-white text-primary rounded-full text-xs shadow-sm border border-primary/10",
        featured ? "w-6 h-6" : "w-5 h-5"
      )}>
        <DollarSign className={featured ? "w-4 h-4" : "w-3 h-3"} />
      </span>
    </button>
  );
};

export default VoteButton;
