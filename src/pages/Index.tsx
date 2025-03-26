import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CascadingInsults from '../components/CascadingInsults';
import CreateInsultForm from '../components/CreateInsultForm';
import { useInsultStore } from '../utils/data';
import { ChevronDown, TrendingUp, Plus, RefreshCw } from 'lucide-react';
const Index = () => {
  const [activeTab, setActiveTab] = useState<'top' | 'create'>('top');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const insults = useInsultStore(state => state.getTopInsults(50));
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };
  return <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16 md:px-6">
        <section className="max-w-4xl mx-auto">
          <header className="text-center mb-12 animate-slide-down">
            <h1 className="text-4xl font-bold mb-3 text-shadow">Прикольные Ругательства</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Создавайте уникальные ругательства и голосуйте за лучшие. Каждый голос стоит $1 и помогает определить самые лучшие оскорбления.</p>

            <div className="flex items-center justify-center mt-8 space-x-2">
              <button onClick={() => setActiveTab('top')} className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === 'top' ? 'bg-primary text-white' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Топ ругательств
              </button>
              <button onClick={() => setActiveTab('create')} className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === 'create' ? 'bg-primary text-white' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}>
                <Plus className="w-4 h-4 mr-2" />
                Создать ругательство
              </button>
            </div>
          </header>

          {activeTab === 'top' && <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Топ ругательств
                </h2>
                <button onClick={handleRefresh} className="flex items-center p-2 rounded-full hover:bg-secondary transition-all duration-200">
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              <CascadingInsults insults={insults} />
              
              {insults.length > 10 && <div className="text-center mt-8">
                  <button className="flex items-center mx-auto px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
                    <span>Загрузить еще</span>
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                </div>}
            </div>}

          {activeTab === 'create' && <div className="max-w-xl mx-auto animate-fade-in">
              <CreateInsultForm />
            </div>}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Прикольные Ругательства. Все права защищены.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-muted-foreground">
                Создано с любовью в России
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;