import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  Target,
  Sparkles,
  Award,
  Truck,
  Shield,
  Star,
} from "lucide-react";

const About = () => {
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
              À Propos
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-foreground mt-4 mb-6">
              Découvrez <span className="text-gradient-gold">Ma7alkom</span>
            </h1>
            <div className="decorative-line mb-6" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Votre partenaire de confiance pour des produits de qualité, livrés
              avec passion partout au Maroc.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Notre Histoire
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mt-4 mb-6">
                Une passion pour <span className="text-gradient-gold">l'excellence</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Ma7alkom est né d'une vision simple : offrir aux Marocains des
                  produits de qualité à des prix accessibles, avec un service
                  client exceptionnel.
                </p>
                <p>
                  Nous sélectionnons soigneusement chaque produit pour garantir
                  qu'il répond à nos standards élevés de qualité. Notre équipe
                  passionnée travaille sans relâche pour vous offrir la meilleure
                  expérience d'achat en ligne.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers de servir des milliers de clients
                  satisfaits dans tout le Maroc, et nous continuons à grandir
                  chaque jour.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { number: "1000+", label: "Clients Satisfaits" },
                { number: "4", label: "Produits Premium" },
                { number: "60+", label: "Villes Desservies" },
                { number: "24h", label: "Livraison Express" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center hover-lift"
                >
                  <span className="text-3xl md:text-4xl font-display text-primary font-bold block mb-2">
                    {stat.number}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Nos Valeurs
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mt-4 mb-6">
              Ce qui nous <span className="text-gradient-gold">définit</span>
            </h2>
            <div className="decorative-line" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Passion",
                description:
                  "Nous aimons ce que nous faisons et cela se reflète dans chaque interaction.",
              },
              {
                icon: Users,
                title: "Client d'abord",
                description:
                  "Votre satisfaction est notre priorité absolue, toujours.",
              },
              {
                icon: Target,
                title: "Qualité",
                description:
                  "Nous ne faisons aucun compromis sur la qualité de nos produits.",
              },
              {
                icon: Sparkles,
                title: "Innovation",
                description:
                  "Nous cherchons constamment à améliorer votre expérience.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center hover-lift"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Pourquoi nous choisir
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mt-4 mb-6">
              L'expérience <span className="text-gradient-gold">Ma7alkom</span>
            </h2>
            <div className="decorative-line" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Livraison Rapide",
                description:
                  "Recevez vos produits en 24h-48h partout au Maroc. Notre réseau de livraison couvre plus de 60 villes.",
              },
              {
                icon: Shield,
                title: "Paiement Sécurisé",
                description:
                  "Payez à la livraison en toute sérénité. Aucun risque, satisfaction garantie.",
              },
              {
                icon: Award,
                title: "Qualité Garantie",
                description:
                  "Tous nos produits sont testés et approuvés. Votre satisfaction est notre engagement.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative glass-card rounded-3xl p-8 overflow-hidden hover-lift"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Témoignages
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mt-4">
              Ce que disent nos <span className="text-gradient-gold">clients</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Fatima Z.",
                city: "Casablanca",
                text: "Service excellent! Ma commande est arrivée en moins de 24h. Je recommande vivement.",
              },
              {
                name: "Ahmed M.",
                city: "Rabat",
                text: "Produits de qualité et prix très compétitifs. Ma7alkom est devenu ma boutique préférée.",
              },
              {
                name: "Sara B.",
                city: "Marrakech",
                text: "Très satisfaite de mon achat. L'équipe est très réactive et professionnelle.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-primary fill-primary"
                    />
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="text-foreground font-medium">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.city}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 moroccan-pattern opacity-10" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Prêt à découvrir nos{" "}
                <span className="text-gradient-gold">produits</span> ?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Explorez notre collection et trouvez les produits qui vous
                conviennent. Livraison rapide et paiement à la livraison.
              </p>
              <Link
                to="/#produits"
                className="btn-gold inline-flex items-center gap-2 text-lg px-8 py-4"
              >
                <Sparkles className="w-5 h-5" />
                Voir nos produits
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
