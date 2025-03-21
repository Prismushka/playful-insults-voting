
import React, { useState } from 'react';
import { Insult } from '../utils/data';
import InsultCard from './InsultCard';
import { Crown, Medal, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface CascadingInsultsProps {
  insults: Insult[];
}

const CascadingInsults: React.FC<CascadingInsultsProps> = ({ insults }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!insults.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Пока нет ругательств. Создайте первое!</p>
      </div>
    );
  }

  // Clone and sort insults by votes in descending order
  const sortedInsults = [...insults].sort((a, b) => b.votes - a.votes);
  
  // Get the top 3 insults for the podium
  const topThreeInsults = sortedInsults.slice(0, 3);
  
  // Get the rest of the insults (4-10)
  const restInsults = sortedInsults.slice(3, 10);

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto">
      {/* Podium for top 3 insults */}
      <div className="w-full mb-12 mt-4">
        <div className="relative flex justify-center items-end h-[440px]">
          {/* Second place - left */}
          {topThreeInsults.length >= 2 && (
            <div className="absolute bottom-0 left-0 lg:left-[calc(50%-260px)] w-full max-w-[250px] z-10 transform transition-all duration-300 hover:scale-[1.03]">
              <div className="relative">
                <div 
                  className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-white px-3 py-1 rounded-full flex items-center z-10"
                  style={{ backgroundColor: '#C8C8C9' }}
                >
                  <Medal className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">2 место</span>
                </div>
                <div className="h-[70px] w-full bg-gradient-to-t from-gray-300 to-gray-100 rounded-t-lg shadow-inner"></div>
                <InsultCard insult={topThreeInsults[1]} featured={false} />
              </div>
            </div>
          )}

          {/* First place - center */}
          {topThreeInsults.length >= 1 && (
            <div className="w-full max-w-[300px] z-20 transform transition-all duration-300 hover:scale-[1.03]">
              <div className="relative">
                <div 
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white px-4 py-1.5 rounded-full flex items-center z-10"
                  style={{ backgroundColor: '#FFC107' }}
                >
                  <Crown className="w-5 h-5 mr-1" />
                  <span className="text-sm font-bold">1 место</span>
                </div>
                <div className="h-[100px] w-full bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-t-lg shadow-inner"></div>
                <InsultCard insult={topThreeInsults[0]} featured={true} />
              </div>
            </div>
          )}

          {/* Third place - right */}
          {topThreeInsults.length >= 3 && (
            <div className="absolute bottom-0 right-0 lg:right-[calc(50%-260px)] w-full max-w-[250px] z-10 transform transition-all duration-300 hover:scale-[1.03]">
              <div className="relative">
                <div 
                  className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-white px-3 py-1 rounded-full flex items-center z-10"
                  style={{ backgroundColor: '#CD7F32' }}
                >
                  <Medal className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">3 место</span>
                </div>
                <div className="h-[50px] w-full bg-gradient-to-t from-orange-400 to-orange-200 rounded-t-lg shadow-inner"></div>
                <InsultCard insult={topThreeInsults[2]} featured={false} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Collapsible section for the rest of the insults */}
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full px-4 mt-6"
      >
        <div className="flex justify-center mb-6">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {isOpen ? (
                <>
                  <span>Скрыть остальные</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Раскрыть остальные</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 animate-slide-down">
            {restInsults.map((insult, index) => (
              <div 
                key={insult.id} 
                className="w-full animate-scale-in"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <InsultCard insult={insult} />
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <div className="flex items-center mt-8 text-sm text-muted-foreground">
        <TrendingDown className="w-4 h-4 mr-1" />
        <span>По убыванию голосов</span>
      </div>
    </div>
  );
};

export default CascadingInsults;
