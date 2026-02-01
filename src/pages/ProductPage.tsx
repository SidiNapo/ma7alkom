import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Truck, Shield, Clock } from "lucide-react";
import { getProductById, getRecommendedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import OrderForm from "@/components/OrderForm";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const recommendedProducts = getRecommendedProducts(id || "");

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">
            Produit non trouvé
          </h1>
          <Link to="/" className="btn-gold">
            Retour à l'accueil
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            to="/#produits"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour aux produits
          </Link>
        </motion.div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-6 left-6"
            >
              <span className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg">
                {product.badge}
              </span>
            </motion.div>

            {/* Floating Price Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-2xl shadow-xl"
            >
              <span className="text-3xl font-display font-bold">
                {product.price} DH
              </span>
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Category */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-primary text-sm font-medium uppercase tracking-wider mb-4 px-4 py-2 bg-primary/10 rounded-full"
            >
              {product.category}
            </motion.span>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Short Description */}
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { icon: Truck, label: "Livraison rapide" },
                { icon: Shield, label: "Qualité garantie" },
                { icon: Clock, label: "Support 24/7" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="text-center p-4 glass-card rounded-2xl"
                >
                  <feature.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-10"
            >
              <h3 className="font-display text-xl text-foreground mb-5">
                Avantages clés
              </h3>
              <ul className="space-y-3">
                {product.benefits.slice(0, 4).map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    </span>
                    <span className="text-foreground/80">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Full Description Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24 bg-card/50 rounded-[3rem] p-12"
        >
          <h2 className="font-display text-3xl text-foreground mb-8 text-center">
            Description <span className="text-gradient-gold">complète</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
              {product.fullDescription}
            </p>
          </div>

          {/* All Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {product.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-3 p-4 glass-card rounded-xl"
              >
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-primary-foreground" />
                </span>
                <span className="text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Order Form Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block text-primary text-sm font-medium uppercase tracking-wider mb-4 px-4 py-2 bg-primary/10 rounded-full"
            >
              Commander
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Passez votre <span className="text-gradient-gold">commande</span>
            </h2>
          </div>
          <OrderForm product={product} />
        </motion.section>

        {/* Recommended Products */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block text-primary text-sm font-medium uppercase tracking-wider mb-4 px-4 py-2 bg-primary/10 rounded-full"
            >
              Vous aimerez aussi
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Produits <span className="text-gradient-gold">recommandés</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default ProductPage;
