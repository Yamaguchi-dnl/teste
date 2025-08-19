"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Ana Silva",
    image: "https://placehold.co/100x100.png",
    quote: "A Ovídio Academy transformou minha forma de aprender inglês. As aulas são super dinâmicas e os professores incríveis!",
  },
  {
    name: "João Pereira",
    image: "https://placehold.co/100x100.png",
    quote: "Finalmente perdi o medo de falar espanhol. A metodologia focada em conversação faz toda a diferença.",
  },
  {
    name: "Mariana Costa",
    image: "https://placehold.co/100x100.png",
    quote: "Estudei francês para uma viagem e foi a melhor decisão! Cheguei lá super confiante para me comunicar.",
  },
  {
    name: "Carlos Andrade",
    image: "https://placehold.co/100x100.png",
    quote: "A flexibilidade das aulas online foi perfeita para minha rotina. Qualidade de ensino nota 10!",
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 md:py-32 bg-zinc-950 text-white">
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
          className="w-full max-w-4xl mx-auto mt-12"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="bg-white/5 backdrop-blur-sm border-primary/20 shadow-lg h-full text-white">
                    <CardContent className="flex flex-col items-center text-center p-6 h-full justify-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="rounded-full mb-4 border-2 border-primary"
                        data-ai-hint="person"
                      />
                      <p className="text-white/70 italic flex-1">"{testimonial.quote}"</p>
                      <p className="mt-4 font-bold text-white">{testimonial.name}</p>
                    </CardContent>
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
