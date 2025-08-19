"use client";

import { motion } from "framer-motion";
import { BookOpen, Globe, Users, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary-foreground" />,
    title: "Metodologia Exclusiva",
    description: "Nossa abordagem única acelera seu aprendizado e foca na conversação desde o primeiro dia.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary-foreground" />,
    title: "Professores Certificados",
    description: "Aprenda com especialistas nativos e certificados, apaixonados por ensinar.",
  },
  {
    icon: <Globe className="h-8 w-8 text-primary-foreground" />,
    title: "Aulas Online e Presenciais",
    description: "Flexibilidade total para você estudar onde e quando quiser, no seu ritmo.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary-foreground" />,
    title: "Certificação Internacional",
    description: "Receba um certificado reconhecido que comprova sua fluência e abre portas no mercado.",
  },
];

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export default function Benefits() {
  return (
    <section id="beneficios" className="py-20 md:py-32 bg-zinc-950 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
            Por que escolher a Ovídio Academy?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Oferecemos uma experiência de aprendizado completa, desenhada para o seu sucesso.
          </p>
        </motion.div>
        <motion.div
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="futuristic-card h-full text-center bg-transparent border-0 shadow-none text-white">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                       {benefit.icon}
                    </div>
                  </div>
                  <CardTitle className="mt-4">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
