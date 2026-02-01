import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Link to={`/produit/${product.id}`} className="block">
        <div className="glass-card rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            {/* Badge */}
            <div className="absolute top-4 left-4 z-10">
              <motion.span
                className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                {product.badge}
              </motion.span>
            </div>

            {/* Product Image */}
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Hover Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Price Badge on hover */}
            <motion.div
              className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ y: 20 }}
              whileHover={{ scale: 1.05 }}
            >
              {product.price} DH
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category */}
            <span className="text-primary text-xs font-medium uppercase tracking-wider">
              {product.category}
            </span>

            {/* Title */}
            <h3 className="font-display text-xl text-foreground mt-2 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
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
                className="text-primary text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                Voir détails
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
