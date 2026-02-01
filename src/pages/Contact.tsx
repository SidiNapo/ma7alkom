import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Clock, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message envoyé avec succès! Nous vous répondrons bientôt.");
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 moroccan-pattern opacity-20" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Contactez-nous
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-foreground mt-4 mb-6">
              Nous sommes à votre <span className="text-gradient-gold">écoute</span>
            </h1>
            <div className="decorative-line mb-6" />
            <p className="text-muted-foreground text-lg">
              Une question, une suggestion ou besoin d'aide? Notre équipe est là
              pour vous accompagner.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: MapPin,
                title: "Adresse",
                content: "Casablanca, Maroc",
                subtext: "Siège social",
              },
              {
                icon: Phone,
                title: "Téléphone",
                content: "+212 6 00 00 00 00",
                subtext: "Lun - Sam, 9h - 18h",
              },
              {
                icon: Mail,
                title: "Email",
                content: "contact@ma7alkom.ma",
                subtext: "Réponse sous 24h",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center hover-lift"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground font-medium mb-1">{item.content}</p>
                <p className="text-muted-foreground text-sm">{item.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl text-foreground">
                  Envoyez-nous un message
                </h2>
              </div>

              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-3xl p-8"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="input-luxury w-full"
                      placeholder="Votre nom"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input-luxury w-full"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="input-luxury w-full"
                        placeholder="06 XX XX XX XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="input-luxury w-full min-h-[150px] resize-none"
                      placeholder="Comment pouvons-nous vous aider?"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold w-full flex items-center justify-center gap-3 py-4"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer le message
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Info Side */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="glass-card rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-primary" />
                  <h3 className="font-display text-xl text-foreground">
                    Horaires d'ouverture
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    { day: "Lundi - Vendredi", hours: "9h00 - 18h00" },
                    { day: "Samedi", hours: "9h00 - 14h00" },
                    { day: "Dimanche", hours: "Fermé" },
                  ].map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex justify-between items-center py-3 border-b border-border/30 last:border-0"
                    >
                      <span className="text-foreground">{schedule.day}</span>
                      <span className="text-primary font-medium">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-3xl p-8">
                <h3 className="font-display text-xl text-foreground mb-4">
                  Besoin d'aide rapide?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Consultez notre FAQ ou appelez-nous directement pour une
                  assistance immédiate.
                </p>
                <a
                  href="tel:+212600000000"
                  className="btn-outline-gold inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Appeler maintenant
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
