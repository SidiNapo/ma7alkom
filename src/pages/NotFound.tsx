import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg mx-auto"
        >
          <motion.span
            className="text-9xl font-display text-primary block mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            404
          </motion.span>
          <h1 className="font-display text-3xl text-foreground mb-4">
            Page non trouvée
          </h1>
          <p className="text-muted-foreground mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-gold flex items-center gap-2">
              <Home className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-outline-gold flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Page précédente
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;
