import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WHATSAPP_PHONE_E164 = "212780712169";
const DISPLAY_PHONE = "+212 7 80 71 21 69";

const DEFAULT_MESSAGE = "Bonjour, je souhaite passer une commande.";

function buildWhatsAppUrl(phoneE164: string, message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${phoneE164}?text=${text}`;
}

export default function WhatsAppFloatingButton() {
  const reduceMotion = useReducedMotion();
  const href = buildWhatsAppUrl(WHATSAPP_PHONE_E164, DEFAULT_MESSAGE);

  return (
    <div
      className="fixed right-5 md:right-8 z-50"
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${DISPLAY_PHONE}`}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="group relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-xl shadow-black/20 ring-1 ring-black/10"
          >
            {!reduceMotion && (
              <motion.span
                aria-hidden="true"
                className="absolute -inset-4 rounded-[1.5rem] bg-[#25D366]/25 blur-2xl"
                animate={{ opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <FaWhatsapp className="relative h-7 w-7" />

            <span className="sr-only">Ouvrir WhatsApp</span>
          </motion.a>
        </TooltipTrigger>

        <TooltipContent side="left" sideOffset={10} className="px-3 py-2">
          <div className="text-sm font-medium">WhatsApp</div>
          <div className="text-xs text-muted-foreground">{DISPLAY_PHONE}</div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
