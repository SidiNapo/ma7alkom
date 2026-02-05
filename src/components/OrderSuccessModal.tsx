 import { motion, AnimatePresence } from "framer-motion";
 import { CheckCircle, Package, Truck, Phone, X } from "lucide-react";
 import { GetStartedButton } from "@/components/ui/get-started-button";
 
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
         <>
           {/* Backdrop */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
           />
 
           {/* Modal */}
           <motion.div
             initial={{ opacity: 0, scale: 0.9, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.9, y: 20 }}
             transition={{ type: "spring", damping: 25, stiffness: 300 }}
             className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
           >
             <div className="bg-card border border-border/50 rounded-3xl shadow-2xl max-w-md w-full pointer-events-auto overflow-hidden">
               {/* Close button */}
               <button
                 onClick={onClose}
                 className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors z-10"
               >
                 <X className="w-5 h-5 text-muted-foreground" />
               </button>
 
               {/* Success Header */}
               <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 text-center relative overflow-hidden">
                 {/* Decorative circles */}
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
                 <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/15 rounded-full blur-2xl" />
                 
                 <motion.div
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                   className="relative"
                 >
                   <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                     <CheckCircle className="w-10 h-10 text-primary-foreground" />
                   </div>
                 </motion.div>
 
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3 }}
                 >
                   <h2 className="font-display text-2xl md:text-3xl text-foreground mt-6 mb-2">
                     Merci {firstName} ! 🎉
                   </h2>
                   <p className="text-muted-foreground">
                     Votre commande a été enregistrée avec succès
                   </p>
                 </motion.div>
               </div>
 
               {/* Order Details */}
               <div className="p-6 space-y-4">
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.4 }}
                   className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl"
                 >
                   <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                     <Package className="w-6 h-6 text-primary" />
                   </div>
                   <div className="flex-1">
                     <p className="text-sm text-muted-foreground">Réf. commande</p>
                     <p className="font-display text-foreground font-semibold">{orderRef}</p>
                   </div>
                 </motion.div>
 
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.5 }}
                   className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl"
                 >
                   <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                     <Truck className="w-6 h-6 text-primary" />
                   </div>
                   <div className="flex-1">
                     <p className="text-sm text-muted-foreground">Produit</p>
                     <p className="font-display text-foreground font-semibold">{productName}</p>
                   </div>
                 </motion.div>
 
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.6 }}
                   className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-4 text-center"
                 >
                   <p className="text-sm text-muted-foreground mb-1">Total à payer</p>
                   <p className="font-display text-3xl text-primary font-bold">{total} DH</p>
                   <p className="text-xs text-muted-foreground mt-1">💵 Paiement à la livraison</p>
                 </motion.div>
 
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.7 }}
                   className="flex items-center gap-2 justify-center text-sm text-muted-foreground pt-2"
                 >
                   <Phone className="w-4 h-4" />
                   <span>Nous vous contacterons bientôt pour confirmer</span>
                 </motion.div>
 
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.8 }}
                   className="pt-4"
                 >
                   <GetStartedButton
                     onClick={onClose}
                     className="w-full justify-center"
                     size="lg"
                   >
                     Continuer mes achats
                   </GetStartedButton>
                 </motion.div>
               </div>
             </div>
           </motion.div>
         </>
       )}
     </AnimatePresence>
   );
 };
 
 export default OrderSuccessModal;