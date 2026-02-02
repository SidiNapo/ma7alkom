import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Truck,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import { getProductById, getRecommendedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import OrderForm from "@/components/OrderForm";
import { GetStartedButton } from "@/components/ui/get-started-button";

/**
 * iPhone/iOS “lite” product page:
 * - No framer-motion / whileInView observers
 * - No AnimatePresence
 * - Fewer animated transforms to avoid first-scroll freezes on iOS WebKit
 */
const ProductPageIOS = () => {
  const { id } = useParams<{ id: string }>();
  const product = useMemo(() => getProductById(id || ""), [id]);
  const recommendedProducts = useMemo(
    () => getRecommendedProducts(id || ""),
    [id]
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">
            Produit non trouvé
          </h1>
          <GetStartedButton to="/" icon={<Home className="w-4 h-4" />}>
            Retour à l'accueil
          </GetStartedButton>
        </div>
      </main>
    );
  }

  const gallery = product.gallery || [product.image];
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Back Button */}
        <div className="mb-10">
          <Link
            to="/produits"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour aux produits
          </Link>
        </div>

        {/* Product Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-24">
          {/* Product Gallery */}
          <div className="relative">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-card mb-4 bg-card">
              <img
                key={currentImageIndex}
                src={gallery[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-contain bg-card"
                loading="eager"
                decoding="async"
              />

              {/* Navigation Arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-lg"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-lg"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </>
              )}

              {/* Badge */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-wrap gap-2">
                <span className="bg-primary text-primary-foreground text-xs md:text-sm font-semibold px-3 py-1.5 md:px-5 md:py-2.5 rounded-full shadow-lg">
                  {product.badge}
                </span>
                {discountPercentage && (
                  <span className="bg-discount text-white text-xs md:text-sm font-bold px-3 py-1.5 md:px-4 md:py-2.5 rounded-full shadow-lg">
                    -{discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {gallery.length > 1 && (
              <div className="flex gap-2 md:gap-3 justify-center flex-wrap">
                {gallery.map((img, index) => {
                  const isActive = index === currentImageIndex;
                  return (
                    <button
                      type="button"
                      key={img}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden transition-all bg-card ${
                        isActive
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`Voir l'image ${index + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Price Badge */}
            <div className="mt-6 lg:mt-0 lg:absolute lg:-bottom-6 lg:-right-6 bg-gradient-to-br from-primary to-accent text-primary-foreground px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl shadow-xl text-center lg:text-left">
              <div className="flex items-baseline justify-center lg:justify-start gap-2">
                <span className="text-2xl md:text-3xl font-display font-bold">
                  {product.price} DH
                </span>
                {product.originalPrice && (
                  <span className="text-base md:text-lg line-through opacity-70">
                    {product.originalPrice} DH
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-8 lg:mt-0">
            <span className="inline-block text-primary text-xs md:text-sm font-medium uppercase tracking-wider mb-3 md:mb-4 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-full">
              {product.category}
            </span>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 md:mb-6 leading-tight">
              {product.name}
            </h1>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              {product.description}
            </p>

            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-10">
              {[
                { icon: Truck, label: "Livraison rapide" },
                { icon: Shield, label: "Qualité garantie" },
                { icon: Clock, label: "Support 24/7" },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="text-center p-3 md:p-4 glass-card rounded-xl md:rounded-2xl"
                >
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mx-auto mb-1.5 md:mb-2" />
                  <span className="text-[10px] md:text-xs text-muted-foreground leading-tight block">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-8 md:mb-10">
              <h2 className="font-display text-lg md:text-xl text-foreground mb-4 md:mb-5">
                Avantages clés
              </h2>
              <ul className="space-y-2 md:space-y-3">
                {product.benefits.slice(0, 4).map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 md:gap-3">
                    <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary-foreground" />
                    </span>
                    <span className="text-sm md:text-base text-foreground/80">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Full Description Section */}
        <section className="mb-16 md:mb-24 bg-card/50 rounded-2xl md:rounded-[3rem] p-6 md:p-12">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6 md:mb-8 text-center">
            Description <span className="text-gradient-gold">complète</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
              {product.fullDescription}
            </p>
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
            {product.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-2 md:gap-3 p-3 md:p-4 glass-card rounded-lg md:rounded-xl"
              >
                <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary-foreground" />
                </span>
                <span className="text-sm md:text-base text-foreground">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Order Form Section */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block text-primary text-xs md:text-sm font-medium uppercase tracking-wider mb-3 md:mb-4 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-full">
              Commander
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground">
              Passez votre <span className="text-gradient-gold">commande</span>
            </h2>
          </div>
          <OrderForm product={product} />
        </section>

        {/* Recommended Products */}
        <section>
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block text-primary text-xs md:text-sm font-medium uppercase tracking-wider mb-3 md:mb-4 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-full">
              Vous aimerez aussi
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground">
              Produits <span className="text-gradient-gold">recommandés</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recommendedProducts.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductPageIOS;
