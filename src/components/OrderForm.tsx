import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { cityPrices, CityPrice } from "@/data/cities";
import { Check, Loader2, Send, MapPin, Truck } from "lucide-react";
import { toast } from "sonner";

interface OrderFormProps {
  product: Product;
}

const OrderForm = ({ product }: OrderFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    quantity: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityPrice | null>(null);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    setFormData({ ...formData, city: cityName });
    const city = cityPrices.find((c) => c.city === cityName);
    setSelectedCity(city || null);
  };

  const calculateTotal = () => {
    const productTotal = product.price * formData.quantity;
    const shipping = selectedCity?.price || 0;
    return productTotal + shipping;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.city || !formData.address) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Here you would send to admin email
    const orderDetails = {
      ...formData,
      product: product.name,
      productPrice: product.price,
      shippingPrice: selectedCity?.price,
      total: calculateTotal(),
      deliveryTime: selectedCity?.delay,
    };

    console.log("Order submitted:", orderDetails);
    
    toast.success("Commande envoyée avec succès! Nous vous contacterons bientôt.");
    
    setFormData({
      name: "",
      phone: "",
      city: "",
      address: "",
      quantity: 1,
    });
    setSelectedCity(null);
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 md:p-10">
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-luxury w-full"
              placeholder="Votre nom complet"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Numéro de téléphone *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-luxury w-full"
              placeholder="06 XX XX XX XX"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Ville *
            </label>
            <select
              value={formData.city}
              onChange={handleCityChange}
              className="input-luxury w-full"
              required
            >
              <option value="">Sélectionnez votre ville</option>
              {cityPrices.map((city) => (
                <option key={city.city} value={city.city}>
                  {city.city} - {city.price} DH ({city.delay})
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Adresse complète *
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="input-luxury w-full min-h-[100px] resize-none"
              placeholder="Votre adresse de livraison"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Quantité
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    quantity: Math.max(1, formData.quantity - 1),
                  })
                }
                className="w-12 h-12 rounded-xl bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center text-xl font-bold"
              >
                -
              </button>
              <span className="text-2xl font-display text-foreground w-16 text-center">
                {formData.quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, quantity: formData.quantity + 1 })
                }
                className="w-12 h-12 rounded-xl bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center text-xl font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-border/50 pt-6 mt-8">
            <h3 className="font-display text-xl text-foreground mb-4">
              Récapitulatif
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {product.shortName} x{formData.quantity}
                </span>
                <span className="text-foreground">
                  {product.price * formData.quantity} DH
                </span>
              </div>
              
              {selectedCity && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Livraison ({selectedCity.city})
                  </span>
                  <span className="text-foreground">{selectedCity.price} DH</span>
                </div>
              )}

              {selectedCity && (
                <div className="flex items-center gap-2 text-xs text-primary">
                  <MapPin className="w-4 h-4" />
                  Délai de livraison: {selectedCity.delay}
                </div>
              )}

              <div className="border-t border-border/50 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-display text-lg text-foreground">
                    Total
                  </span>
                  <span className="font-display text-2xl text-primary font-bold">
                    {calculateTotal()} DH
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto sm:min-w-[280px] mx-auto flex items-center justify-center gap-2.5 text-sm sm:text-base font-semibold px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl sm:rounded-2xl text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35"
            style={{
              background: 'linear-gradient(135deg, hsl(43 74% 52%) 0%, hsl(43 74% 42%) 50%, hsl(43 60% 35%) 100%)',
            }}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Confirmer la commande</span>
              </>
            )}
          </motion.button>

          {/* Payment Info */}
          <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            Paiement à la livraison
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default OrderForm;
