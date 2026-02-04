import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { ShoppingBag } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { pageSEO, organizationSchema, websiteSchema, localBusinessSchema } from "@/data/seoData";

const Index = () => {
  return (
    <>
      <SEOHead
        title={pageSEO.home.title}
        description={pageSEO.home.description}
        keywords={pageSEO.home.keywords}
        canonical={pageSEO.home.canonical}
        jsonLd={[organizationSchema, websiteSchema, localBusinessSchema]}
      />
      <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Products Section */}
      <section id="produits" className="py-16 md:py-24 scroll-mt-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-primary text-xs md:text-sm font-medium uppercase tracking-wider mb-3 md:mb-4 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-full"
            >
              Notre Collection
            </motion.span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-6xl text-foreground mb-4 md:mb-6">
              Nos Produits <span className="text-gradient-gold">Exclusifs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg px-4">
              Découvrez notre sélection soigneusement choisie de produits de qualité,
              conçus pour améliorer votre quotidien.
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

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-card/50 relative overflow-hidden">
        {/* Background decoration - constrained */}
        <motion.div
          className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-primary text-xs md:text-sm font-medium uppercase tracking-wider mb-3 md:mb-4 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-full"
            >
              Pourquoi nous choisir
            </motion.span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-6xl text-foreground mb-4 md:mb-6">
              L'Excellence au <span className="text-gradient-gold">Service</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
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
                className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-8 text-center group cursor-pointer"
              >
                <motion.span
                  className="text-3xl md:text-5xl block mb-3 md:mb-6"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.emoji}
                </motion.span>
                <h3 className="font-display text-sm md:text-xl text-foreground mb-2 md:mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 mesh-gradient opacity-40" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl"
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
              className="font-display text-2xl sm:text-4xl md:text-6xl text-foreground mb-6 md:mb-8"
            >
              Prêt à <span className="text-gradient-gold">Commander</span> ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-sm md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto px-4"
            >
              Passez votre commande maintenant et recevez vos produits dans les
              plus brefs délais. Livraison rapide et paiement à la livraison.
            </motion.p>
            <GetStartedButton 
              to="/produits" 
              icon={<ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />}
              className="px-8 py-4 md:px-10 md:py-5 text-base md:text-lg"
            >
              Découvrir nos produits
            </GetStartedButton>
          </motion.div>
        </div>
      </section>
      </main>
    </>
  );
};

export default Index;
