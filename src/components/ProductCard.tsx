import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  // Calculate discount percentage if originalPrice exists
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group h-full"
    >
      <Link to={`/produit/${product.id}`} className="block h-full">
        <div className="glass-card rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden flex-shrink-0 bg-card">
            {/* Badges Container - Top of card */}
            <div className="absolute top-3 left-3 right-3 md:top-4 md:left-4 md:right-4 z-10 flex items-start justify-between">
              {/* Left Badge */}
              <motion.span
                className="bg-primary text-primary-foreground text-[10px] md:text-xs font-semibold px-2.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                {product.badge}
              </motion.span>

              {/* Discount Badge - Right side */}
              {discountPercentage && (
                <motion.div
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <div className="bg-discount text-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg shadow-lg font-bold text-xs md:text-sm flex flex-col items-center leading-tight">
                    <span className="text-sm md:text-lg">-{discountPercentage}%</span>
                  </div>
                  {/* Decorative shine effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              )}
            </div>

            {/* Product Image */}
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 flex flex-col flex-grow">
            {/* Category */}
            <span className="text-primary text-[10px] md:text-xs font-medium uppercase tracking-wider">
              {product.category}
            </span>

            {/* Title */}
            <h3 className="font-display text-base md:text-xl text-foreground mt-1.5 md:mt-2 mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 min-h-[2.5rem] md:min-h-[3.5rem]">
              {product.shortName}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-2 mb-3 md:mb-4 min-h-[2rem] md:min-h-[2.5rem]">
              {product.description}
            </p>

            {/* Price & CTA */}
            <div className="flex items-center justify-between mt-auto gap-2">
              <div className="flex items-baseline gap-1 md:gap-2 flex-wrap">
                <span className="text-lg md:text-2xl font-display text-primary font-bold">
                  {product.price}
                </span>
                <span className="text-muted-foreground text-xs md:text-sm">DH</span>
                {product.originalPrice && (
                  <span className="text-muted-foreground/60 text-xs md:text-sm line-through">
                    {product.originalPrice} DH
                  </span>
                )}
              </div>
              
              <motion.span
                className="text-primary text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2 group-hover:gap-2 md:group-hover:gap-3 transition-all duration-300 flex-shrink-0"
                whileHover={{ x: 5 }}
              >
                <span className="hidden sm:inline">Voir</span> détails
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
