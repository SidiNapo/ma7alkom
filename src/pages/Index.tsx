import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Products Section */}
      <section id="produits" className="py-24 scroll-mt-32">
        <div className="container mx-auto px-4 md:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-primary text-sm font-medium uppercase tracking-wider mb-4 px-4 py-2 bg-primary/10 rounded-full"
            >
              Notre Collection
            </motion.span>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
              Nos Produits <span className="text-gradient-gold">Exclusifs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
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
      <section className="py-24 bg-card/50 relative overflow-hidden">
        {/* Background decoration */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-primary text-sm font-medium uppercase tracking-wider mb-4 px-4 py-2 bg-primary/10 rounded-full"
            >
              Pourquoi nous choisir
            </motion.span>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
              L'Excellence au <span className="text-gradient-gold">Service</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                emoji: "💎",
                title: "Qualité Premium",
                description:
                  "Tous nos produits sont sélectionnés avec soin pour garantir une qualité exceptionnelle.",
              },
              {
                emoji: "⭐",
                title: "Satisfaction Client",
                description:
                  "Plus de 1000 clients satisfaits nous font confiance chaque mois.",
              },
              {
                emoji: "📈",
                title: "Prix Compétitifs",
                description:
                  "Profitez des meilleurs prix du marché sans compromis sur la qualité.",
              },
              {
                emoji: "🏆",
                title: "Service Exceptionnel",
                description:
                  "Notre équipe est à votre écoute pour vous offrir une expérience unique.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card rounded-3xl p-8 text-center group cursor-pointer"
              >
                <motion.span
                  className="text-5xl block mb-6"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.emoji}
                </motion.span>
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 moroccan-pattern opacity-10" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl md:text-6xl text-foreground mb-8"
            >
              Prêt à <span className="text-gradient-gold">Commander</span> ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto"
            >
              Passez votre commande maintenant et recevez vos produits dans les
              plus brefs délais. Livraison rapide et paiement à la livraison.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/#produits"
                className="btn-gold inline-flex items-center gap-3 text-lg px-12 py-6 shadow-xl shadow-primary/20"
              >
                Découvrir nos produits
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
