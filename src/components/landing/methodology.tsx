"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, BookUser, MessageSquareHeart, GraduationCap } from "lucide-react";

const steps = [
  {
    icon: <ClipboardCheck className="h-8 w-8" />,
    title: "Diagnóstico",
    description: "Avaliamos seu nível e definimos metas personalizadas.",
  },
  {
    icon: <BookUser className="h-8 w-8" />,
    title: "Aulas",
    description: "Aulas dinâmicas com foco em situações reais de comunicação.",
  },
  {
    icon: <MessageSquareHeart className="h-8 w-8" />,
    title: "Prática",
    description: "Clubes de conversação e atividades para praticar a fluência.",
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Certificação",
    description: "Receba seu certificado e comprove suas novas habilidades.",
  },
];

export default function Methodology() {
  return (
    <section id="metodologia" className="py-20 md:py-32 bg-card text-card-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
            Nossa Metodologia em 4 Passos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Um caminho claro e eficiente para a sua fluência.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="hidden md:block">
            <div className="absolute left-0 right-0 top-8 -translate-y-1/2 h-1 bg-primary/20 rounded-full" />
            <div className="relative grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative flex flex-col items-center text-center p-4"
                >
                  <div className="absolute top-8 -translate-y-1/2 h-4 w-4 rounded-full bg-primary ring-4 ring-card" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
           <div className="md:hidden relative flex flex-col gap-12">
             <div className="absolute left-8 top-0 bottom-0 w-1 bg-primary/20" />
             {steps.map((step, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.2 }}
                 className="relative pl-20"
               >
                 <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-primary ring-4 ring-card" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground mb-4">
                    {step.icon}
                  </div>
                 <h3 className="text-xl font-bold">{step.title}</h3>
                 <p className="mt-2 text-muted-foreground">{step.description}</p>
               </motion.div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
