
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import InsultCard from '../components/InsultCard';
import { Insult, useInsultStore } from '../utils/data';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '../components/ui/pagination';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { 
  ArrowUpDown, 
  ArrowDown, 
  ArrowUp, 
  Search,
  RefreshCw 
} from 'lucide-react';

const ITEMS_PER_PAGE = 100;

const TopInsults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const sortBy = searchParams.get('sortBy') || 'votes';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const authorFilter = searchParams.get('author') || '';
  
  const [authorSearch, setAuthorSearch] = useState(authorFilter);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Get all insults
  const allInsults = useInsultStore(state => state.insults);
  
  // Apply filters and sorting
  const filteredInsults = React.useMemo(() => {
    let filtered = [...allInsults];
    
    // Filter by author if specified
    if (authorFilter) {
      filtered = filtered.filter(insult => 
        insult.author.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }
    
    // Sort the insults
    filtered.sort((a, b) => {
      if (sortBy === 'votes') {
        return sortOrder === 'desc' ? b.votes - a.votes : a.votes - b.votes;
      } else { // sortBy === 'date'
        return sortOrder === 'desc' 
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });
    
    return filtered;
  }, [allInsults, sortBy, sortOrder, authorFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredInsults.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const displayedInsults = filteredInsults.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };
  
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', value);
    if (page !== 1) params.set('page', '1');
    setSearchParams(params);
  };
  
  const handleOrderChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortOrder', value);
    if (page !== 1) params.set('page', '1');
    setSearchParams(params);
  };
  
  const handleAuthorSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (authorSearch) {
      params.set('author', authorSearch);
    } else {
      params.delete('author');
    }
    params.set('page', '1');
    setSearchParams(params);
  };
  
  const clearAuthorFilter = () => {
    setAuthorSearch('');
    const params = new URLSearchParams(searchParams);
    params.delete('author');
    params.set('page', '1');
    setSearchParams(params);
  };

  // Generate pagination links
  const getPaginationItems = () => {
    const items = [];
    
    // Always include first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          href={`?page=1&sortBy=${sortBy}&sortOrder=${sortOrder}${authorFilter ? `&author=${authorFilter}` : ''}`}
          isActive={page === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Add ellipsis if necessary
    if (page > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <span className="px-2">...</span>
        </PaginationItem>
      );
    }
    
    // Add pages around the current page
    for (let i = Math.max(2, page - 1); i <= Math.min(page + 1, totalPages - 1); i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            href={`?page=${i}&sortBy=${sortBy}&sortOrder=${sortOrder}${authorFilter ? `&author=${authorFilter}` : ''}`}
            isActive={page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Add ellipsis if necessary
    if (page < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <span className="px-2">...</span>
        </PaginationItem>
      );
    }
    
    // Always include last page if more than 1 page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            href={`?page=${totalPages}&sortBy=${sortBy}&sortOrder=${sortOrder}${authorFilter ? `&author=${authorFilter}` : ''}`}
            isActive={page === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };
  
  // Set medal colors for top 3 insultas based on their rank in the overall list
  const getMedalClassForInsult = (insult: Insult) => {
    const rankInAll = allInsults
      .sort((a, b) => b.votes - a.votes)
      .findIndex(i => i.id === insult.id);
      
    if (rankInAll === 0) return "gold-medal";
    if (rankInAll === 1) return "silver-medal";
    if (rankInAll === 2) return "bronze-medal";
    return "";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16 md:px-6">
        <section className="max-w-4xl mx-auto">
          <header className="text-center mb-12 animate-slide-down">
            <h1 className="text-4xl font-bold mb-3 text-shadow">Все Ругательства</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Полный список всех ругательств, отсортированных и с возможностью поиска.
            </p>
          </header>

          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
              {/* Left side filters */}
              <div className="flex gap-2 flex-wrap items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Сортировать по:</span>
                  <Select 
                    value={sortBy} 
                    onValueChange={handleSortChange}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Выбрать" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="votes">Голосам</SelectItem>
                      <SelectItem value="date">Дате</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Порядок:</span>
                  <Select 
                    value={sortOrder} 
                    onValueChange={handleOrderChange}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Выбрать" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">
                        <div className="flex items-center">
                          <ArrowDown className="mr-1 h-4 w-4" />
                          <span>По убыванию</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="asc">
                        <div className="flex items-center">
                          <ArrowUp className="mr-1 h-4 w-4" />
                          <span>По возрастанию</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Right side search */}
              <div className="flex w-full md:w-auto">
                <div className="flex items-center w-full md:w-auto">
                  <div className="relative flex-1 min-w-[200px]">
                    <Input
                      type="text"
                      placeholder="Поиск по автору"
                      value={authorSearch}
                      onChange={(e) => setAuthorSearch(e.target.value)}
                      className="pr-10"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAuthorSearch();
                      }}
                    />
                    {authorFilter && (
                      <button 
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={clearAuthorFilter}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <Button 
                    variant="default" 
                    size="icon" 
                    className="ml-2"
                    onClick={handleAuthorSearch}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <button 
                    onClick={handleRefresh} 
                    className="ml-2 flex items-center p-2 rounded-full hover:bg-secondary transition-all duration-200"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Results stats */}
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
              <div>
                Показано {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredInsults.length)} 
                из {filteredInsults.length} ругательств
              </div>
              {authorFilter && (
                <div>
                  Фильтр: автор содержит "{authorFilter}" 
                  <button 
                    className="ml-2 text-primary hover:underline"
                    onClick={clearAuthorFilter}
                  >
                    сбросить
                  </button>
                </div>
              )}
            </div>
            
            {/* Insults list */}
            <div className="space-y-4">
              {displayedInsults.length > 0 ? (
                displayedInsults.map((insult) => (
                  <div 
                    key={insult.id} 
                    className={`insult-list-item ${getMedalClassForInsult(insult)}`}
                  >
                    <InsultCard insult={insult} />
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Ругательства не найдены. 
                    {authorFilter && (
                      <span> Попробуйте изменить фильтр автора.</span>
                    )}
                  </p>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        href={`?page=${page-1}&sortBy=${sortBy}&sortOrder=${sortOrder}${authorFilter ? `&author=${authorFilter}` : ''}`} 
                      />
                    </PaginationItem>
                  )}
                  
                  {getPaginationItems()}
                  
                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        href={`?page=${page+1}&sortBy=${sortBy}&sortOrder=${sortOrder}${authorFilter ? `&author=${authorFilter}` : ''}`} 
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </div>
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
    </div>
  );
};

export default TopInsults;
