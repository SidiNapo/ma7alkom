import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Phone, Mail, Send, Clock, MessageSquare } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

const Contact = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32"
      >
        {/* Background with parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          <div className="absolute inset-0 moroccan-pattern opacity-20" />
        </motion.div>

        {/* Animated Orbs */}
        <motion.div
          className="absolute top-1/3 left-[15%] w-64 h-64 rounded-full bg-primary/15 blur-3xl"
          animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[15%] w-80 h-80 rounded-full bg-primary/10 blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-primary text-sm font-medium uppercase tracking-wider mb-6 px-4 py-2 bg-primary/10 rounded-full"
            >
              Contactez-nous
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl text-foreground mb-6"
            >
              Nous sommes à votre{" "}
              <span className="text-gradient-gold">écoute</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-xl max-w-2xl mx-auto"
            >
              Une question, une suggestion ou besoin d'aide? Notre équipe est là
              pour vous accompagner.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: MapPin,
                title: "Adresse",
                content: "Casablanca, Maroc",
                subtext: "Siège social",
                color: "from-primary/20 to-primary/10",
              },
              {
                icon: Phone,
                title: "Téléphone",
                content: "+212 6 00 00 00 00",
                subtext: "Lun - Sam, 9h - 18h",
                color: "from-primary/20 to-primary/10",
              },
              {
                icon: Mail,
                title: "Email",
                content: "contact@ma7alkom.ma",
                subtext: "Réponse sous 24h",
                color: "from-primary/20 to-primary/10",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card rounded-3xl p-8 text-center group cursor-pointer"
              >
                <motion.div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 mx-auto`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon className="w-9 h-9 text-primary" />
                </motion.div>
                <h3 className="font-display text-xl text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-foreground font-medium mb-2">{item.content}</p>
                <p className="text-muted-foreground text-sm">{item.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                >
                  <MessageSquare className="w-7 h-7 text-primary" />
                </motion.div>
                <h2 className="font-display text-3xl text-foreground">
                  Envoyez-nous un message
                </h2>
              </div>

              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-3xl p-8 md:p-10"
              >
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-3">
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
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-foreground mb-3">
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
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-foreground mb-3">
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
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-3">
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
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold w-full flex items-center justify-center gap-3 py-5 text-lg"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⏳
                      </motion.span>
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-3xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center"
                    whileHover={{ rotate: 5 }}
                  >
                    <Clock className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-2xl text-foreground">
                    Horaires d'ouverture
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    { day: "Lundi - Vendredi", hours: "9h00 - 18h00" },
                    { day: "Samedi", hours: "9h00 - 14h00" },
                    { day: "Dimanche", hours: "Fermé" },
                  ].map((schedule, index) => (
                    <motion.div
                      key={schedule.day}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex justify-between items-center py-4 border-b border-border/30 last:border-0"
                    >
                      <span className="text-foreground">{schedule.day}</span>
                      <span className="text-primary font-medium">
                        {schedule.hours}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-3xl p-8"
              >
                <h3 className="font-display text-2xl text-foreground mb-4">
                  Besoin d'aide rapide?
                </h3>
                <p className="text-muted-foreground mb-8 text-lg">
                  Consultez notre FAQ ou appelez-nous directement pour une
                  assistance immédiate.
                </p>
                <motion.a
                  href="tel:+212600000000"
                  className="btn-outline-gold inline-flex items-center gap-3 text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  Appeler maintenant
                </motion.a>
              </motion.div>

              {/* Map or additional image could go here */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-3xl overflow-hidden shadow-xl"
              >
                <img
                  src="/images/about-team.jpg"
                  alt="Notre équipe"
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
