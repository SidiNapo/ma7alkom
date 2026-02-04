import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useRef } from "react";
import { GetStartedButton } from "@/components/ui/get-started-button";
import SEOHead from "@/components/SEOHead";
import { pageSEO, organizationSchema, generateBreadcrumbSchema } from "@/data/seoData";

const About = () => {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "À Propos", url: "/a-propos" },
  ]);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      <SEOHead
        title={pageSEO.about.title}
        description={pageSEO.about.description}
        keywords={pageSEO.about.keywords}
        canonical={pageSEO.about.canonical}
        jsonLd={[organizationSchema, breadcrumbSchema]}
      />
      <main className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32"
      >
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src="/images/about-quality.jpg"
            alt="Ma7alkom boutique"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        </motion.div>

        {/* Animated Orbs */}
        <motion.div
          className="absolute top-1/4 left-[10%] w-72 h-72 rounded-full bg-primary/20 blur-3xl"
          animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
              À Propos
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-7xl text-foreground mb-6"
            >
              Découvrez{" "}
              <span className="text-gradient-gold">Ma7alkom</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto"
            >
              Votre partenaire de confiance pour des produits de qualité, livrés
              avec passion partout au Maroc.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section with Image */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Notre Histoire
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-8">
                Une passion pour{" "}
                <span className="text-gradient-gold">l'excellence</span>
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src="/images/about-team.jpg"
                  alt="Notre équipe"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </motion.div>
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-8 -left-8 glass-card rounded-2xl p-6 shadow-xl"
              >
                <span className="text-4xl font-display text-primary font-bold block">
                  1000+
                </span>
                <span className="text-muted-foreground">Clients Satisfaits</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-24 bg-card/50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Notre Engagement
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4">
              L'expérience <span className="text-gradient-gold">Ma7alkom</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                image: "/images/about-warehouse.jpg",
                title: "Préparation Soignée",
                desc: "Chaque commande est préparée avec soin",
              },
              {
                image: "/images/about-delivery.jpg",
                title: "Livraison Rapide",
                desc: "Partout au Maroc en 24h-48h",
              },
              {
                image: "/images/about-customers.jpg",
                title: "Clients Satisfaits",
                desc: "Votre bonheur est notre priorité",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl overflow-hidden shadow-xl cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 20, opacity: 0.8 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  <h3 className="font-display text-xl text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-8 glass-card rounded-3xl"
              >
                <motion.span
                  className="text-4xl md:text-5xl font-display text-primary font-bold block mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  {stat.number}
                </motion.span>
                <span className="text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card/50">
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
            <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4">
              Ce qui nous <span className="text-gradient-gold">définit</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                emoji: "❤️",
                title: "Passion",
                description:
                  "Nous aimons ce que nous faisons et cela se reflète dans chaque interaction.",
              },
              {
                emoji: "👥",
                title: "Client d'abord",
                description:
                  "Votre satisfaction est notre priorité absolue, toujours.",
              },
              {
                emoji: "🎯",
                title: "Qualité",
                description:
                  "Nous ne faisons aucun compromis sur la qualité de nos produits.",
              },
              {
                emoji: "🚀",
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
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card rounded-3xl p-8 text-center group"
              >
                <motion.span
                  className="text-5xl block mb-6"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {value.emoji}
                </motion.span>
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

      {/* Large Image Section */}
      <section className="py-24 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src="/images/about-quality.jpg"
            alt="Quality products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Pourquoi nous choisir
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-8">
                L'excellence au{" "}
                <span className="text-gradient-gold">quotidien</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Livraison Express",
                    desc: "Recevez vos produits en 24h-48h partout au Maroc",
                  },
                  {
                    title: "Paiement à la Livraison",
                    desc: "Payez en toute sérénité à la réception",
                  },
                  {
                    title: "Qualité Garantie",
                    desc: "Produits testés et approuvés par notre équipe",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-card/50 transition-colors"
                  >
                    <span className="w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-display text-lg text-foreground mb-1">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Témoignages
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4">
              Ce que disent nos{" "}
              <span className="text-gradient-gold">clients</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Fatima Z.",
                city: "Casablanca",
                text: "Service excellent! Ma commande est arrivée en moins de 24h. Je recommande vivement.",
                avatar: "F",
              },
              {
                name: "Ahmed M.",
                city: "Rabat",
                text: "Produits de qualité et prix très compétitifs. Ma7alkom est devenu ma boutique préférée.",
                avatar: "A",
              },
              {
                name: "Sara B.",
                city: "Marrakech",
                text: "Très satisfaite de mon achat. L'équipe est très réactive et professionnelle.",
                avatar: "S",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-3xl p-8"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary text-xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-foreground/80 mb-8 leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.city}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[3rem] overflow-hidden"
          >
            <img
              src="/images/about-warehouse.jpg"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
            
            <div className="relative z-10 p-12 md:p-20 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-display text-4xl md:text-5xl text-foreground mb-6"
              >
                Prêt à découvrir nos{" "}
                <span className="text-gradient-gold">produits</span> ?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg"
              >
                Explorez notre collection et trouvez les produits qui vous
                conviennent. Livraison rapide et paiement à la livraison.
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <GetStartedButton 
                  to="/produits" 
                  icon={<ShoppingBag className="w-5 h-5" />}
                  className="text-lg px-10 py-5"
                >
                  Voir nos produits
                </GetStartedButton>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
    </>
  );
};

export default About;
