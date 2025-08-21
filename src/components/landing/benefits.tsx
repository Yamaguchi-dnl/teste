"use client";

import { motion } from "framer-motion";
import { BookOpen, Globe, Users, Award, Zap } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: (className?: string) => <BookOpen className={cn("h-8 w-8", className)} />,
    title: "Metodologia Imersiva",
    description: "Nossa abordagem foca na conversação em alemão desde o primeiro dia, acelerando seu aprendizado.",
  },
  {
    icon: (className?: string) => <Users className={cn("h-8 w-8", className)} />,
    title: "Professores Nativos",
    description: "Aprenda com especialistas nativos da Alemanha, certificados e apaixonados por ensinar.",
  },
  {
    icon: (className?: string) => <Globe className={cn("h-8 w-8", className)} />,
    title: "Flexibilidade Total",
    description: "Estude no seu ritmo com aulas online ao vivo que se encaixam na sua rotina.",
  },
  {
    icon: (className?: string) => <Award className={cn("h-8 w-8", className)} />,
    title: "Preparatório para Certificados",
    description: "Oferecemos preparatório completo para exames de proficiência como o Goethe-Zertifikat.",
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="w-full py-20 md:py-32 bg-background text-foreground">
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
                                "border rounded-2xl p-6 shadow-md transition-all duration-300 relative transform",
                                isDark ? "bg-black text-white" : "bg-card text-card-foreground",
                                "hover:shadow-2xl hover:-translate-y-6 hover:scale-105 hover:z-10",
                                "lg:[&:not(:first-child)]:-ml-12"
                            )}
                        >
                            <div className="flex flex-col items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className={cn(
                                        "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl",
                                        "bg-primary/10"
                                    )}>
                                        {benefit.icon(isDark ? "text-primary" : "text-foreground")}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className={cn("text-xl font-bold mb-2", isDark ? "text-white" : "text-black")}>{benefit.title}</h3>
                                    <p className={cn(isDark ? "text-gray-300" : "text-gray-600")}>{benefit.description}</p>
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
