
import React from 'react';
import { ArrowUp, DollarSign } from 'lucide-react';

interface VoteButtonProps {
  onClick: () => void;
}

const VoteButton: React.FC<VoteButtonProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="relative group flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-sm hover:bg-primary/90 active:scale-95 transition-all duration-200 vote-animation"
      aria-label="Vote for this insult"
    >
      <ArrowUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
      <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-white text-primary rounded-full text-xs shadow-sm border border-primary/10">
        <DollarSign className="w-3 h-3" />
      </span>
    </button>
  );
};

export default VoteButton;
