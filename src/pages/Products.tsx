import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Package, Truck, Shield, MessageSquare } from "lucide-react";
import { GetStartedButton } from "@/components/ui/get-started-button";
const Products = () => {
  const features = [{
    icon: Package,
    title: "Produits Sélectionnés",
    description: "Qualité premium garantie"
  }, {
    icon: Truck,
    title: "Livraison Rapide",
    description: "Partout au Maroc"
  }, {
    icon: Shield,
    title: "Paiement à la Livraison",
    description: "Sécurisé et pratique"
  }];
  return <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-32">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          <div className="absolute inset-0 mesh-gradient opacity-60" />
        </div>

        {/* Animated Orbs */}
        <motion.div className="pointer-events-none absolute top-20 right-1/4 w-72 h-72 rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl" animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.5, 0.3]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="pointer-events-none absolute bottom-20 left-1/4 w-96 h-96 rounded-full bg-gradient-radial from-accent/15 via-accent/5 to-transparent blur-3xl" animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.2, 0.4, 0.2]
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }} />

        {/* Content */}
        <motion.div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.5
        }} className="inline-flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-wider mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            
            Collection Exclusive
          </motion.div>

          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.1
        }} className="font-display text-4xl sm:text-5xl md:text-7xl text-foreground mb-6">
            Nos <span className="text-gradient-gold">Produits</span>
          </motion.h1>

          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.2
        }} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Découvrez notre sélection soigneusement choisie de produits de qualité,
            conçus pour améliorer votre quotidien.
          </motion.p>

          {/* Feature Pills */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.3
        }} className="flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => <motion.div key={feature.title} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.4 + index * 0.1
          }} whileHover={{
            y: -3,
            scale: 1.02
          }} className="glass-card px-5 py-3 rounded-full flex items-center gap-3">
                <feature.icon className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-foreground text-sm font-medium">{feature.title}</p>
                  <p className="text-muted-foreground text-xs">{feature.description}</p>
                </div>
              </motion.div>)}
          </motion.div>
        </motion.div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" animate={{
          opacity: [0.3, 0.5, 0.3]
        }} transition={{
          duration: 8,
          repeat: Infinity
        }} />
          <motion.div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" animate={{
          opacity: [0.2, 0.4, 0.2]
        }} transition={{
          duration: 10,
          repeat: Infinity
        }} />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Section Header */}
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
        }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
              Tous Nos <span className="text-gradient-gold">Articles</span>
            </h2>
            <div className="decorative-line mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              {products.length} produits disponibles avec livraison gratuite au Maroc
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.7
        }} className="glass-card rounded-3xl p-12 text-center max-w-3xl mx-auto">
            <motion.span initial={{
            opacity: 0,
            scale: 0.8
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} className="text-5xl mb-6 block">
              🎁
            </motion.span>
            <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Besoin d'aide pour <span className="text-gradient-gold">choisir</span> ?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Notre équipe est à votre disposition pour vous guider vers le produit
              qui correspond parfaitement à vos besoins.
            </p>
            <GetStartedButton 
              to="/contact" 
              icon={<MessageSquare className="w-5 h-5" />}
              className="text-lg px-8 py-4"
            >
              Contactez-nous
            </GetStartedButton>
          </motion.div>
        </div>
      </section>
    </main>;
};
export default Products;