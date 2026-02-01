import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="product-card group"
    >
      <Link to={`/produit/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          {/* Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
              {product.badge}
            </span>
          </div>

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <span className="text-primary text-xs font-medium uppercase tracking-wider">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="font-display text-xl text-foreground mt-2 mb-3 group-hover:text-primary transition-colors duration-300">
            {product.shortName}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-display text-primary font-bold">
                {product.price}
              </span>
              <span className="text-muted-foreground text-sm">DH</span>
            </div>
            
            <motion.span
              className="text-primary text-sm font-medium flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Voir détails
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
