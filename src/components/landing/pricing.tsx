"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Básico",
    monthlyPrice: "R$ 99",
    yearlyPrice: "R$ 990",
    description: "Para quem está começando a jornada.",
    features: ["Acesso a 1 idioma", "Aulas em grupo", "Material didático digital", "Suporte via e-mail"],
    isFeatured: false,
  },
  {
    name: "Pro",
    monthlyPrice: "R$ 149",
    yearlyPrice: "R$ 1.490",
    description: "O plano mais popular para fluência.",
    features: ["Acesso a 2 idiomas", "Aulas em grupo e individuais", "Material didático completo", "Suporte prioritário", "Clube de conversação"],
    isFeatured: true,
  },
  {
    name: "Premium",
    monthlyPrice: "R$ 249",
    yearlyPrice: "R$ 2.490",
    description: "Experiência completa e personalizada.",
    features: ["Acesso a todos os idiomas", "Aulas ilimitadas", "Aulas particulares", "Preparatório para exames", "Mentoria individual"],
    isFeatured: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="planos" className="py-20 md:py-32 bg-zinc-950 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
            Planos flexíveis para você
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Escolha o plano ideal e comece a aprender hoje mesmo.
          </p>
        </div>
        <div className="flex justify-center items-center gap-4 my-8">
          <Label htmlFor="billing-cycle" className="text-white/80">Mensal</Label>
          <Switch id="billing-cycle" checked={isYearly} onCheckedChange={setIsYearly} />
          <Label htmlFor="billing-cycle" className="text-white/80">Anual <span className="text-primary font-semibold">(2 meses grátis)</span></Label>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12 items-start">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "futuristic-card flex flex-col h-full bg-transparent border-0 shadow-none text-white",
                plan.isFeatured && "scale-105 relative"
              )}
            >
              {plan.isFeatured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  MAIS POPULAR
                </div>
              )}
              <CardHeader className="p-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-white/70">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-8 pt-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-white/60">{isYearly ? "/ano" : "/mês"}</span>
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
                <Button size="lg" className={cn("w-full text-lg", plan.isFeatured ? "bg-primary hover:bg-primary/90" : "bg-accent hover:bg-accent/90")}>
                  Escolher Plano <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
