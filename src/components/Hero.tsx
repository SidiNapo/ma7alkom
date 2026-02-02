import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Truck, Shield, Clock, ShoppingBag } from "lucide-react";
import { GLSLHills } from "@/components/ui/glsl-hills";
import { GetStartedButton } from "@/components/ui/get-started-button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-36 md:pt-40">
      {/* GLSL Hills Background */}
      <GLSLHills speed={0.3} cameraZ={130} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 md:px-8 relative z-10"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-8 sm:mb-10"
          >
            <motion.span
              className="w-2.5 h-2.5 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-foreground/90 font-medium">
              Livraison rapide partout au Maroc
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8 leading-[1.1]"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block"
            >
              Bienvenue chez
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gradient-gold block mt-2"
            >
              Ma7alkom
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Votre boutique en ligne de confiance au Maroc. Découvrez notre sélection
            exclusive de produits de qualité, livrés directement chez vous.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-16 md:mb-20 px-4"
          >
            <GetStartedButton 
              to="/produits" 
              icon={<ShoppingBag className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Découvrir nos produits
            </GetStartedButton>
            
            <GetStartedButton 
              to="/contact" 
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Nous contacter
            </GetStartedButton>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Truck,
                title: "Livraison Rapide",
                description: "24h - 48h partout au Maroc",
              },
              {
                icon: Shield,
                title: "Paiement Sécurisé",
                description: "Paiement à la livraison",
              },
              {
                icon: Clock,
                title: "Support 24/7",
                description: "Service client disponible",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative glass-card rounded-3xl p-8 overflow-hidden backdrop-blur-md"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <div className="relative z-10">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-5 mx-auto"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-xl text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Modern Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Défiler</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
