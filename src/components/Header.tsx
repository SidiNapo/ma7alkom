import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  const navItems = [{
    name: "Accueil",
    path: "/"
  }, {
    name: "Produits",
    path: "/#produits"
  }, {
    name: "À Propos",
    path: "/a-propos"
  }, {
    name: "Contact",
    path: "/contact"
  }];
  return <motion.header initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6,
    ease: "easeOut"
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-background/95 backdrop-blur-xl shadow-2xl border-b border-primary/20" : "bg-background/80 backdrop-blur-sm"}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div className="relative" whileHover={{
            scale: 1.05
          }} transition={{
            duration: 0.3
          }}>
              <motion.img alt="Ma7alkom" className="h-20 w-auto drop-shadow-lg" src="/lovable-uploads/bb29e4ea-2915-4b35-9d5f-cfc5950f3a37.png" />
              <motion.div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item, index) => <motion.div key={item.name} initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: index * 0.1
          }}>
                <Link to={item.path} className="relative text-foreground/80 hover:text-primary transition-colors duration-300 font-medium text-sm uppercase tracking-wider group py-2">
                  {item.name}
                  <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/50 origin-left" initial={{
                scaleX: 0
              }} whileHover={{
                scaleX: 1
              }} transition={{
                duration: 0.3
              }} />
                </Link>
              </motion.div>)}
          </nav>

          {/* CTA Button - Desktop */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.4,
          delay: 0.4
        }} className="hidden md:block">
            <Link to="/#produits" className="btn-gold flex items-center gap-2 text-sm">
              <ShoppingBag className="w-4 h-4" />
              Commander
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-3 text-foreground hover:text-primary transition-colors rounded-xl hover:bg-primary/10" aria-label="Toggle menu" whileTap={{
          scale: 0.9
        }}>
            <motion.div animate={{
            rotate: isMenuOpen ? 90 : 0
          }} transition={{
            duration: 0.2
          }}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div initial={false} animate={{
      height: isMenuOpen ? "auto" : 0,
      opacity: isMenuOpen ? 1 : 0
    }} transition={{
      duration: 0.4,
      ease: "easeInOut"
    }} className="md:hidden overflow-hidden bg-background/98 backdrop-blur-xl border-b border-primary/20">
        <nav className="container mx-auto px-4 py-8 flex flex-col gap-2">
          {navItems.map((item, index) => <motion.div key={item.name} initial={{
          opacity: 0,
          x: -30
        }} animate={{
          opacity: isMenuOpen ? 1 : 0,
          x: isMenuOpen ? 0 : -30
        }} transition={{
          duration: 0.3,
          delay: index * 0.1
        }}>
              <Link to={item.path} className="text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium text-lg py-4 px-4 block rounded-xl">
                {item.name}
              </Link>
            </motion.div>)}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={{
          opacity: isMenuOpen ? 1 : 0,
          x: isMenuOpen ? 0 : -30
        }} transition={{
          duration: 0.3,
          delay: 0.4
        }}>
            <Link to="/#produits" className="btn-gold flex items-center justify-center gap-2 mt-4">
              <ShoppingBag className="w-4 h-4" />
              Commander
            </Link>
          </motion.div>
        </nav>
      </motion.div>
    </motion.header>;
};
export default Header;