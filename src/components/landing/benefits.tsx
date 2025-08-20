"use client";

import { motion } from "framer-motion";
import { BookOpen, Globe, Users, Award } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Metodologia Imersiva",
    description: "Nossa abordagem foca na conversação em alemão desde o primeiro dia, acelerando seu aprendizado.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Professores Nativos",
    description: "Aprenda com especialistas nativos da Alemanha, certificados e apaixonados por ensinar.",
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Flexibilidade Total",
    description: "Estude no seu ritmo com aulas online ao vivo que se encaixam na sua rotina.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Preparatório para Certificados",
    description: "Oferecemos preparatório completo para exames de proficiência como o Goethe-Zertifikat.",
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-20 md:py-32 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
            Por que aprender alemão na Ovídio Academy?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos uma experiência de aprendizado completa, desenhada para a sua fluência em alemão.
          </p>
        </motion.div>
        
        <div className="mt-20 max-w-2xl mx-auto">
            <div className="relative group">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        style={{ zIndex: benefits.length - index }}
                        className={cn(
                            "sticky bg-card border rounded-2xl p-8 shadow-lg transition-all duration-500 ease-in-out",
                            "group-hover:opacity-60 hover:!opacity-100",
                        )}
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="flex-shrink-0">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                                    {benefit.icon}
                                </div>
                            </div>
                            <div className="flex-1">
                                <CardTitle>{benefit.title}</CardTitle>
                                <p className="text-muted-foreground mt-2">{benefit.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
       <style jsx>{`
        .relative.group > *:not(:first-child) {
            margin-top: -120px;
        }
        .relative.group:hover > * {
            transform: translateY(0);
        }
        .relative.group > *:hover {
            transform: translateY(-20px);
        }
        @media (max-width: 768px) {
            .relative.group > *:not(:first-child) {
                margin-top: -140px;
            }
        }
      `}</style>
    </section>
  );
}
