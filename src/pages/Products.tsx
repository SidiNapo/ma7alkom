import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Sparkles, Package, Truck, Shield } from "lucide-react";

const Products = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      icon: Package,
      title: "Produits Sélectionnés",
      description: "Qualité premium garantie",
    },
    {
      icon: Truck,
      title: "Livraison Rapide",
      description: "Partout au Maroc",
    },
    {
      icon: Shield,
      title: "Paiement à la Livraison",
      description: "Sécurisé et pratique",
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-8"
      >
        {/* Background */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          <div className="absolute inset-0 mesh-gradient opacity-60" />
        </motion.div>

        {/* Animated Orbs - Constrained to prevent overflow */}
        <motion.div
          className="absolute top-20 right-[10%] w-48 md:w-72 h-48 md:h-72 rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-[10%] w-64 md:w-96 h-64 md:h-96 rounded-full bg-gradient-radial from-accent/15 via-accent/5 to-transparent blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Content */}
        <motion.div
          className="container mx-auto px-4 md:px-8 relative z-10 text-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-primary text-xs md:text-sm font-medium uppercase tracking-wider mb-4 md:mb-6 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-full border border-primary/20"
          >
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            Collection Exclusive
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl md:text-7xl text-foreground mb-4 md:mb-6"
          >
            Nos <span className="text-gradient-gold">Produits</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground text-sm md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 md:mb-12 px-4"
          >
            Découvrez notre sélection soigneusement choisie de produits de qualité,
            conçus pour améliorer votre quotidien.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 md:gap-4 px-2"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="glass-card px-3 py-2 md:px-5 md:py-3 rounded-full flex items-center gap-2 md:gap-3"
              >
                <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <div className="text-left">
                  <p className="text-foreground text-xs md:text-sm font-medium">{feature.title}</p>
                  <p className="text-muted-foreground text-[10px] md:text-xs hidden sm:block">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Products Grid Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        {/* Background decoration - constrained */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/2"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-accent/5 rounded-full blur-3xl -translate-x-1/2"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-foreground mb-3 md:mb-4">
              Tous Nos <span className="text-gradient-gold">Articles</span>
            </h2>
            <div className="decorative-line mb-4 md:mb-6" />
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              {products.length} produits disponibles avec livraison gratuite au Maroc
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-12 text-center max-w-3xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl mb-4 md:mb-6 block"
            >
              🎁
            </motion.span>
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 md:mb-4">
              Besoin d'aide pour <span className="text-gradient-gold">choisir</span> ?
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8 max-w-lg mx-auto">
              Notre équipe est à votre disposition pour vous guider vers le produit
              qui correspond parfaitement à vos besoins.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 text-sm md:text-lg font-semibold text-primary-foreground bg-gradient-to-r from-primary via-primary to-accent rounded-xl overflow-hidden transition-all duration-300 shadow-lg shadow-primary/25"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative">Contactez-nous</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Products;
