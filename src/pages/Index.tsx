import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Sparkles, Star, TrendingUp, Award } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Products Section */}
      <section id="produits" className="section-padding scroll-mt-24">
        <div className="container mx-auto px-4 md:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Notre Collection
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mt-4 mb-6">
              Nos Produits <span className="text-gradient-gold">Exclusifs</span>
            </h2>
            <div className="decorative-line mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre sélection soigneusement choisie de produits de qualité,
              conçus pour améliorer votre quotidien.
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Pourquoi nous choisir
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mt-4 mb-6">
              L'Excellence au <span className="text-gradient-gold">Service</span>
            </h2>
            <div className="decorative-line" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Qualité Premium",
                description:
                  "Tous nos produits sont sélectionnés avec soin pour garantir une qualité exceptionnelle.",
              },
              {
                icon: Star,
                title: "Satisfaction Client",
                description:
                  "Plus de 1000 clients satisfaits nous font confiance chaque mois.",
              },
              {
                icon: TrendingUp,
                title: "Prix Compétitifs",
                description:
                  "Profitez des meilleurs prix du marché sans compromis sur la qualité.",
              },
              {
                icon: Award,
                title: "Service Exceptionnel",
                description:
                  "Notre équipe est à votre écoute pour vous offrir une expérience unique.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center hover-lift"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 moroccan-pattern opacity-20" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6">
              Prêt à <span className="text-gradient-gold">Commander</span> ?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Passez votre commande maintenant et recevez vos produits dans les
              plus brefs délais. Livraison rapide et paiement à la livraison.
            </p>
            <motion.a
              href="#produits"
              className="btn-gold inline-flex items-center gap-3 text-lg px-10 py-5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-5 h-5" />
              Découvrir nos produits
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
