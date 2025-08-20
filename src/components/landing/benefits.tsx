"use client";

import { motion } from "framer-motion";
import { BookOpen, Globe, Users, Award, Zap } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: () => <BookOpen className="h-8 w-8 text-primary" />,
    title: "Metodologia Imersiva",
    description: "Nossa abordagem foca na conversação em alemão desde o primeiro dia, acelerando seu aprendizado.",
  },
  {
    icon: () => <Users className="h-8 w-8 text-primary" />,
    title: "Professores Nativos",
    description: "Aprenda com especialistas nativos da Alemanha, certificados e apaixonados por ensinar.",
  },
  {
    icon: () => <Globe className="h-8 w-8 text-primary" />,
    title: "Flexibilidade Total",
    description: "Estude no seu ritmo com aulas online ao vivo que se encaixam na sua rotina.",
  },
  {
    icon: () => <Award className="h-8 w-8 text-primary" />,
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
          className="text-center flex flex-col items-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground shadow-md">
            <Zap className="h-4 w-4 text-primary" />
            Nossa Abordagem
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Por que aprender alemão na Ovídio Academy?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos uma experiência de aprendizado completa, desenhada para a sua fluência em alemão.
          </p>
        </motion.div>
        
        <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 group">
                {benefits.map((benefit, index) => {
                    const isDark = index % 2 !== 0;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                "border rounded-2xl p-8 shadow-lg transition-all duration-300 ease-in-out relative z-10",
                                isDark ? "bg-black text-white" : "bg-card text-card-foreground",
                                "hover:!opacity-100 hover:scale-105 hover:-translate-y-4 hover:!z-50",
                                "lg:[&:not(:first-child)]:-ml-12",
                                "group-hover:opacity-60"
                            )}
                        >
                            <div className="flex flex-col items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className={cn(
                                        "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl",
                                        isDark ? "bg-white/10" : "bg-primary/10"
                                    )}>
                                        {benefit.icon()}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CardTitle className={cn(isDark ? "text-white" : "text-foreground")}>{benefit.title}</CardTitle>
                                    <p className={cn("mt-2", isDark ? "text-white/80" : "text-muted-foreground")}>{benefit.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
      </div>
    </section>
  );
}
