"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jonas Becker",
    role: "Aluno de Alemão",
    quote: "A Ovídio Academy tem os melhores professores! Aprender alemão se tornou uma experiência divertida e muito eficaz.",
  },
  {
    name: "Sofia Müller",
    role: "Aluna de Alemão",
    quote: "Finalmente estou confiante para conversar em alemão. A metodologia focada na prática é sensacional.",
  },
  {
    name: "Lucas Schmidt",
    role: "Aluno de Alemão",
    quote: "Estudei para um intercâmbio na Alemanha e foi a melhor decisão! Cheguei lá preparado para qualquer situação.",
  },
  {
    name: "Lena Fischer",
    role: "Aluna Corporativa",
    quote: "As aulas online se encaixaram perfeitamente na minha rotina. O ensino é de altíssima qualidade. Recomendo!",
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 md:py-32 bg-zinc-950 text-white dark-section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
            O que nossos alunos de alemão dizem
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Histórias de sucesso que nos inspiram todos os dias.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto mt-16"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-4 h-full">
                  <Card className="futuristic-card h-full text-white bg-transparent border-0 shadow-none p-6 flex flex-col justify-between">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
                    </div>
                    <CardContent className="p-0 flex-1">
                      <p className="text-white/80 italic text-lg">"{testimonial.quote}"</p>
                    </CardContent>
                    <div className="mt-6">
                      <p className="font-bold text-white text-xl">{testimonial.name}</p>
                      <p className="text-primary font-medium">{testimonial.role}</p>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex text-white border-white/20 hover:bg-white/10" />
          <CarouselNext className="hidden md:flex text-white border-white/20 hover:bg-white/10" />
        </Carousel>
      </div>
    </section>
  );
}
