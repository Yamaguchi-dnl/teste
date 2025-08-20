"use client";

import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plan = {
  name: "Curso Completo de Alemão",
  price: "R$ 1.997",
  description: "Acesso vitalício ao nosso curso completo, do básico ao avançado.",
  features: [
    "Acesso a todos os módulos (A1 ao C1)",
    "Aulas em grupo e individuais",
    "Material didático completo e exclusivo",
    "Suporte prioritário com professores nativos",
    "Clube de conversação semanal",
    "Preparatório para exames de proficiência",
    "Certificado de conclusão",
  ],
};

export default function Pricing() {
  return (
    <section id="planos" className="py-20 md:py-32 bg-zinc-950 text-white dark-section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
            Um investimento único na sua fluência
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Tudo o que você precisa para dominar o alemão, em um só lugar.
          </p>
        </div>
        <div className="flex justify-center mt-12">
          <Card
            className={cn(
              "futuristic-card flex flex-col h-full bg-transparent border-0 shadow-none text-white w-full max-w-lg",
              "scale-105 relative"
            )}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
              OFERTA ÚNICA
            </div>
            <CardHeader className="p-8">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-white/70">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-8 pt-0">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">
                  {plan.price}
                </span>
                <span className="text-white/60">pagamento único</span>
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-white/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-8">
              <Button size="lg" className="w-full text-lg bg-primary hover:bg-primary/90">
                Garantir minha vaga <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
