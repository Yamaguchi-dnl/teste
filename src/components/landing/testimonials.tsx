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
    name: "Ana Silva",
    role: "Aluna de Inglês",
    quote: "A Ovídio Academy transformou minha forma de aprender. As aulas são super dinâmicas e os professores incríveis!",
  },
  {
    name: "João Pereira",
    role: "Aluno de Espanhol",
    quote: "Finalmente perdi o medo de falar. A metodologia focada em conversação faz toda a diferença.",
  },
  {
    name: "Mariana Costa",
    role: "Aluna de Francês",
    quote: "Estudei para uma viagem e foi a melhor decisão! Cheguei lá super confiante para me comunicar.",
  },
  {
    name: "Carlos Andrade",
    role: "Aluno Corporativo",
    quote: "A flexibilidade das aulas online foi perfeita para minha rotina. Qualidade de ensino nota 10!",
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 md:py-32 bg-zinc-950 text-white dark-section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
            O que nossos alunos dizem
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
