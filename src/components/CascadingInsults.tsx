
import React from 'react';
import { Insult } from '../utils/data';
import InsultCard from './InsultCard';
import { Crown, Flame, TrendingDown } from 'lucide-react';

interface CascadingInsultsProps {
  insults: Insult[];
}

const CascadingInsults: React.FC<CascadingInsultsProps> = ({ insults }) => {
  if (!insults.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Пока нет ругательств. Создайте первое!</p>
      </div>
    );
  }

  // Clone and sort insults by votes in descending order
  const sortedInsults = [...insults].sort((a, b) => b.votes - a.votes);
  
  // Get the top insult
  const topInsult = sortedInsults[0];
  
  // Get the rest of the insults
  const restInsults = sortedInsults.slice(1);

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto">
      {/* Top insult - featured prominently */}
      <div className="w-full max-w-2xl mb-8 animate-scale-in">
        <div className="relative">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full flex items-center z-10">
            <Crown className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Топ #1</span>
          </div>
          <InsultCard insult={topInsult} featured={true} />
        </div>
      </div>

      {/* Cascading layout for the rest of the insults */}
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 px-4">
        {restInsults.map((insult, index) => (
          <div 
            key={insult.id} 
            className={`w-full ${index % 2 === 0 ? 'md:transform md:translate-y-6' : ''} animate-scale-in`}
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
          >
            <div className="relative">
              {index < 2 && (
                <div className="absolute -top-3 left-4 bg-secondary text-foreground px-2 py-0.5 rounded-full flex items-center z-10">
                  <Flame className={`w-3 h-3 mr-1 ${index === 0 ? 'text-orange-500' : 'text-orange-300'}`} />
                  <span className="text-xs font-medium">Топ #{index + 2}</span>
                </div>
              )}
              <InsultCard insult={insult} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center mt-8 text-sm text-muted-foreground">
        <TrendingDown className="w-4 h-4 mr-1" />
        <span>По убыванию голосов</span>
      </div>
    </div>
  );
};

export default CascadingInsults;
