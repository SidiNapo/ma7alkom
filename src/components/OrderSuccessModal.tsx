 import { motion, AnimatePresence } from "framer-motion";
 import { CheckCircle, Package, Phone, X, Sparkles } from "lucide-react";
 
 interface OrderSuccessModalProps {
   isOpen: boolean;
   onClose: () => void;
   customerName: string;
   orderRef: string;
   productName: string;
   total: number;
 }
 
 const OrderSuccessModal = ({
   isOpen,
   onClose,
   customerName,
   orderRef,
   productName,
   total,
 }: OrderSuccessModalProps) => {
   const firstName = customerName.split(" ")[0];
 
   return (
     <AnimatePresence>
       {isOpen && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center">
           {/* Backdrop */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="absolute inset-0 bg-background/80"
           />
 
           {/* Modal Container */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 10 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 10 }}
             transition={{ type: "spring", damping: 30, stiffness: 400 }}
             className="relative w-[calc(100%-2rem)] max-w-[420px] mx-4"
           >
             <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
               {/* Close Button */}
               <button
                 onClick={onClose}
                 className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 hover:bg-background border border-border transition-colors"
                 aria-label="Fermer"
               >
                 <X className="w-4 h-4 text-muted-foreground" />
               </button>
 
               {/* Header Section */}
               <div className="relative bg-gradient-to-b from-primary/15 to-transparent px-6 pt-8 pb-6 text-center">
                 {/* Success Icon */}
                 <motion.div
                   initial={{ scale: 0, rotate: -180 }}
                   animate={{ scale: 1, rotate: 0 }}
                   transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                   className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4"
                 >
                   <CheckCircle className="w-8 h-8" strokeWidth={2.5} />
                 </motion.div>
 
                 {/* Thank You Message */}
                 <motion.div
                   initial={{ opacity: 0, y: 8 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 }}
                 >
                   <div className="flex items-center justify-center gap-2 mb-2">
                     <Sparkles className="w-5 h-5 text-primary" />
                     <h2 className="font-display text-xl sm:text-2xl text-foreground">
                       Merci {firstName} !
                     </h2>
                     <Sparkles className="w-5 h-5 text-primary" />
                   </div>
                   <p className="text-sm text-muted-foreground">
                     Commande enregistrée avec succès
                   </p>
                 </motion.div>
               </div>
 
               {/* Content Section */}
               <div className="px-6 pb-6 space-y-3">
                 {/* Order Reference */}
                 <motion.div
                   initial={{ opacity: 0, y: 8 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3 }}
                   className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl"
                 >
                   <div className="w-10 h-10 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
                     <Package className="w-5 h-5 text-primary" />
                   </div>
                   <div className="min-w-0 flex-1">
                     <p className="text-xs text-muted-foreground">Référence</p>
                     <p className="font-mono text-sm font-semibold text-foreground truncate">
                       {orderRef}
                     </p>
                   </div>
                 </motion.div>
 
                 {/* Product Name */}
                 <motion.div
                   initial={{ opacity: 0, y: 8 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.35 }}
                   className="p-3 bg-muted/50 rounded-xl"
                 >
                   <p className="text-xs text-muted-foreground mb-1">Produit</p>
                   <p className="text-sm font-medium text-foreground line-clamp-2">
                     {productName}
                   </p>
                 </motion.div>
 
                 {/* Total Amount */}
                 <motion.div
                   initial={{ opacity: 0, y: 8 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4 }}
                   className="p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl text-center"
                 >
                   <p className="text-xs text-muted-foreground mb-1">Total à payer</p>
                   <p className="font-display text-2xl sm:text-3xl text-primary font-bold">
                     {total} DH
                   </p>
                   <p className="text-xs text-muted-foreground mt-1">
                     💵 Paiement à la livraison
                   </p>
                 </motion.div>
 
                 {/* Contact Notice */}
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.45 }}
                   className="flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground"
                 >
                   <Phone className="w-3.5 h-3.5" />
                   <span>Nous vous appellerons pour confirmer</span>
                 </motion.div>
 
                 {/* CTA Button */}
                 <motion.button
                   initial={{ opacity: 0, y: 8 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 }}
                   onClick={onClose}
                   className="w-full py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors text-sm"
                 >
                   Continuer mes achats
                 </motion.button>
               </div>
             </div>
           </motion.div>
         </div>
       )}
     </AnimatePresence>
   );
 };
 
 export default OrderSuccessModal;