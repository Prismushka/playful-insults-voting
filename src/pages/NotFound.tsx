
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glassmorphism p-10 rounded-2xl text-center max-w-md animate-scale-in">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-foreground mb-8">Упс! Страница не найдена</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
