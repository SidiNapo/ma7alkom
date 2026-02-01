import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowRight } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-card border-t border-border/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <Link to="/" className="inline-block mb-8">
              <motion.img alt="Ma7alkom" className="h-20 w-auto" whileHover={{
              scale: 1.05
            }} src="/lovable-uploads/d755354b-f3dc-4161-b54a-f6e46d822de9.png" />
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Votre boutique en ligne de confiance au Maroc. Des produits de qualité
              livrés rapidement partout au Maroc.
            </p>
            <div className="flex gap-4">
              <motion.a href="#" className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label="Instagram" whileHover={{
              scale: 1.1,
              rotate: 5
            }} whileTap={{
              scale: 0.9
            }}>
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a href="#" className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label="Facebook" whileHover={{
              scale: 1.1,
              rotate: -5
            }} whileTap={{
              scale: 0.9
            }}>
                <Facebook className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }}>
            <h4 className="font-display text-xl text-foreground mb-8">Navigation</h4>
            <ul className="space-y-4">
              {[{
              name: "Accueil",
              path: "/"
            }, {
              name: "Nos Produits",
              path: "/#produits"
            }, {
              name: "À Propos",
              path: "/a-propos"
            }, {
              name: "Contact",
              path: "/contact"
            }].map((link, index) => <motion.li key={link.name} initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: 0.2 + index * 0.1
            }}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </motion.li>)}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <h4 className="font-display text-xl text-foreground mb-8">Nos Produits</h4>
            <ul className="space-y-4">
              {[{
              name: "Fil Dentaire",
              path: "/produit/fil-dentaire"
            }, {
              name: "Spray Buccal",
              path: "/produit/spray-buccal"
            }, {
              name: "Tondeuse Nez & Oreilles",
              path: "/produit/tondeuse-nez"
            }, {
              name: "Protège-Brûleurs",
              path: "/produit/protege-bruleurs"
            }].map((link, index) => <motion.li key={link.name} initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: 0.3 + index * 0.1
            }}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </motion.li>)}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }}>
            <h4 className="font-display text-xl text-foreground mb-8">Contact</h4>
            <ul className="space-y-5">
              <motion.li className="flex items-start gap-4" whileHover={{
              x: 5
            }} transition={{
              duration: 0.2
            }}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="text-muted-foreground">
                  Casablanca, Maroc
                </span>
              </motion.li>
              <motion.li className="flex items-center gap-4" whileHover={{
              x: 5
            }} transition={{
              duration: 0.2
            }}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <a href="tel:+212600000000" className="text-muted-foreground hover:text-primary transition-colors">
                  +212 6 00 00 00 00
                </a>
              </motion.li>
              <motion.li className="flex items-center gap-4" whileHover={{
              x: 5
            }} transition={{
              duration: 0.2
            }}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <a href="mailto:contact@ma7alkom.ma" className="text-muted-foreground hover:text-primary transition-colors">
                  contact@ma7alkom.ma
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} className="text-muted-foreground text-sm text-center md:text-left">
              © {currentYear} Ma7alkom. Tous droits réservés.
            </motion.p>
            
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;