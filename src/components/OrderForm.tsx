import { useState } from "react";
import { motion } from "framer-motion";
import { Product, FlavorSelection } from "@/types/product";
import { cityPrices, CityPrice } from "@/data/cities";
import { Check, Send, MapPin, Truck } from "lucide-react";
import { toast } from "sonner";
import { GetStartedButton } from "@/components/ui/get-started-button";
import FlavorSelector from "@/components/FlavorSelector";
 import { supabase } from "@/integrations/supabase/client";
 import OrderSuccessModal from "@/components/OrderSuccessModal";

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
  const [flavorSelections, setFlavorSelections] = useState<FlavorSelection[]>([]);
  const [totalFlavorQuantity, setTotalFlavorQuantity] = useState(0);
   const [successModalOpen, setSuccessModalOpen] = useState(false);
   const [orderSuccess, setOrderSuccess] = useState<{
     orderRef: string;
     customerName: string;
     total: number;
   } | null>(null);

  const hasFlavors = product.flavors && product.flavors.length > 0;

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    setFormData({ ...formData, city: cityName });
    const city = cityPrices.find((c) => c.city === cityName);
    setSelectedCity(city || null);
  };

  const handleFlavorChange = (selections: FlavorSelection[], total: number) => {
    setFlavorSelections(selections);
    setTotalFlavorQuantity(total);
  };

  const getQuantity = () => {
    return hasFlavors ? totalFlavorQuantity : formData.quantity;
  };

  const calculateTotal = () => {
    const qty = getQuantity();
    const productTotal = product.price * qty;
    const shipping = selectedCity?.price || 0;
    return productTotal + shipping;
  };

  const getFlavorSummary = () => {
    if (!product.flavors) return "";
    return flavorSelections
      .filter(s => s.quantity > 0)
      .map(s => {
        const flavor = product.flavors?.find(f => f.id === s.flavorId);
        return flavor ? `${flavor.emoji} ${flavor.name} x${s.quantity}` : "";
      })
      .filter(Boolean)
      .join(", ");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.city || !formData.address) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (hasFlavors && totalFlavorQuantity === 0) {
      toast.error("Veuillez sélectionner au moins une saveur");
      return;
    }

    setIsSubmitting(true);

     try {
       const orderData = {
         customerName: formData.name.trim(),
         phone: formData.phone.trim(),
         city: formData.city,
         address: formData.address.trim(),
         productName: product.name,
         productPrice: product.price,
         quantity: getQuantity(),
         flavorSelections: hasFlavors ? getFlavorSummary() : undefined,
         shippingPrice: selectedCity?.price || 0,
         deliveryTime: selectedCity?.delay || "À confirmer",
         total: calculateTotal(),
       };
 
       const { data, error } = await supabase.functions.invoke("send-order-email", {
         body: orderData,
       });
 
       if (error) {
         console.error("Error sending order:", error);
         toast.error("Une erreur s'est produite. Veuillez réessayer ou nous contacter par téléphone.");
         return;
       }
 
       console.log("Order sent successfully:", data);
       
       // Store success data for modal
       setOrderSuccess({
         orderRef: data.orderRef,
         customerName: formData.name.trim(),
         total: calculateTotal(),
       });
       setSuccessModalOpen(true);
       
       setFormData({
         name: "",
         phone: "",
         city: "",
         address: "",
         quantity: 1,
       });
       setSelectedCity(null);
       setFlavorSelections([]);
       setTotalFlavorQuantity(0);
     } catch (err) {
       console.error("Unexpected error:", err);
       toast.error("Une erreur s'est produite. Veuillez réessayer.");
     } finally {
       setIsSubmitting(false);
     }
  };

  const currentQuantity = getQuantity();

  return (
     <>
       <OrderSuccessModal
         isOpen={successModalOpen}
         onClose={() => setSuccessModalOpen(false)}
         customerName={orderSuccess?.customerName || ""}
         orderRef={orderSuccess?.orderRef || ""}
         productName={product.name}
         total={orderSuccess?.total || 0}
       />
       
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

          {/* Flavor Selector (for products with flavors) */}
          {hasFlavors && product.flavors && (
            <div className="border border-primary/30 rounded-2xl p-6 bg-primary/5">
              <FlavorSelector 
                flavors={product.flavors} 
                onChange={handleFlavorChange}
                unitName={product.unitName}
              />
            </div>
          )}

          {/* Standard Quantity (for products without flavors) */}
          {!hasFlavors && (
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
          )}

          {/* Order Summary */}
          <div className="border-t border-border/50 pt-6 mt-8">
            <h3 className="font-display text-xl text-foreground mb-4">
              Récapitulatif
            </h3>
            <div className="space-y-3">
              {/* Flavor selections summary */}
              {hasFlavors && flavorSelections.length > 0 && (
                <div className="flex flex-col gap-1 text-sm">
                  <span className="text-muted-foreground font-medium">Saveurs sélectionnées:</span>
                  <span className="text-foreground">{getFlavorSummary()}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {product.shortName} x{currentQuantity} {hasFlavors ? product.unitName || 'unité' : ''}
                </span>
                <span className="text-foreground">
                  {product.price * currentQuantity} DH
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
          <GetStartedButton
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            loadingText="Envoi en cours..."
            icon={<Send className="w-4 h-4 sm:w-5 sm:h-5" />}
            className="w-full sm:w-auto sm:min-w-[280px] mx-auto text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5"
          >
            Confirmer la commande
          </GetStartedButton>

          {/* Payment Info */}
          <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            Paiement à la livraison
          </p>
        </div>
      </form>
       </motion.div>
     </>
  );
};

export default OrderForm;
