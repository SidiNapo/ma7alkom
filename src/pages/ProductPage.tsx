import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ShoppingBag, Truck, Shield } from "lucide-react";
import { getProductById, getRecommendedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import OrderForm from "@/components/OrderForm";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const recommendedProducts = getRecommendedProducts(id || "");

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20">
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
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/#produits"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux produits
          </Link>
        </motion.div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-card border border-border/30 overflow-hidden shadow-glow">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>
            
            {/* Badge */}
            <div className="absolute top-6 left-6">
              <span className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full">
                {product.badge}
              </span>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Category */}
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-6">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-display text-primary font-bold">
                {product.price}
              </span>
              <span className="text-muted-foreground text-lg">DH</span>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.fullDescription}
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="font-display text-lg text-foreground mb-4">
                ✅ Avantages clés :
              </h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground/80">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground/80">
                  Livraison rapide
                </span>
              </div>
              <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground/80">
                  Paiement à la livraison
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Order Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-foreground mb-4">
              <ShoppingBag className="w-8 h-8 inline-block mr-3 text-primary" />
              Commander ce produit
            </h2>
            <p className="text-muted-foreground">
              Remplissez le formulaire ci-dessous pour passer votre commande
            </p>
          </div>
          <OrderForm product={product} />
        </motion.div>

        {/* Recommended Products */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Vous pourriez aussi aimer
            </span>
            <h2 className="font-display text-3xl text-foreground mt-4">
              Produits Recommandés
            </h2>
            <div className="decorative-line mt-6" />
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
