import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";

const queryClient = new QueryClient();

// ScrollToTop component inline to ensure it's within Router context
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1) Reset scroll position (Safari may throw on invalid behavior values)
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch {
      window.scrollTo(0, 0);
    }

    // 2) Defensive: release any leftover scroll-lock styles on navigation
    // (e.g. if a menu/dialog briefly locked body scroll on mobile)
    const root = document.documentElement;
    const body = document.body;

    root.style.overflow = "";
    root.style.position = "";
    root.style.touchAction = "";

    body.style.overflow = "";
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";
    body.style.touchAction = "";
  }, [pathname]);

  return null;
};

const AppContent = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <WhatsAppFloatingButton />
        <div className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produits" element={<Products />} />
            <Route path="/produit/:id" element={<ProductPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;