"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from 'embla-carousel-react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

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
    name: "Anna Schneider",
    role: "Aluna de Alemão",
    quote: "O suporte dos professores é incrível. Sempre dispostos a ajudar e tirar dúvidas, o que fez toda a diferença no meu aprendizado.",
  },
  {
    name: "Michael Wagner",
    role: "Aluno de Alemão",
    quote: "A flexibilidade das aulas online me permitiu conciliar os estudos com meu trabalho. Recomendo a todos!",
  },
];

const InteractiveTestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const content = card.querySelector(".card-content") as HTMLDivElement;
    if (!content) return;
    
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const rotationFactor = 2;

    if (!isTouchDevice) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = (rotationFactor * (x - centerX)) / centerX;
        const rotateX = (-rotationFactor * (y - centerY)) / centerY;

        content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.setProperty("--x", `${(x / rect.width) * 100}%`);
        card.style.setProperty("--y", `${(y / rect.height) * 100}%`);
      };

      const handleMouseLeave = () => {
        content.style.transform = "rotateX(0) rotateY(0)";
        content.style.transition = "transform 0.5s ease";
        setTimeout(() => {
          if(content) content.style.transition = "";
        }, 500);
      };
      
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="card relative h-[350px] rounded-2xl bg-card/5 border border-white/10 shadow-lg transition-transform duration-300 ease-out will-change-transform cursor-pointer overflow-hidden"
      style={{ 
        transformStyle: 'preserve-3d', 
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      <div className="card-content relative h-full p-6 md:p-8 flex flex-col" style={{ transformStyle: 'preserve-3d', transition: 'transform 0.5s ease' }}>
        <div className="flex items-center gap-1 mb-4" style={{ transform: 'translateZ(20px)' }}>
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
        </div>
        <p className="text-muted-foreground italic text-lg flex-1" style={{ transform: 'translateZ(15px)' }}>"{testimonial.quote}"</p>
        <div className="mt-6" style={{ transform: 'translateZ(15px)' }}>
            <p className="font-bold text-foreground text-xl">{testimonial.name}</p>
            <p className="text-primary font-medium">{testimonial.role}</p>
        </div>
      </div>
      <div className="card-glare absolute inset-0 rounded-2xl pointer-events-none" />

       <style jsx>{`
        .card {
          background: rgba(255, 255, 255, 0.03);
        }
        .card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .card:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  
  return (
    <section id="depoimentos" className="w-full py-20 md:py-32 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground shadow-md">
            <MessageCircle className="h-4 w-4 text-primary" />
            Vozes de Sucesso
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
            O que nossos alunos de alemão dizem
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Histórias de sucesso que nos inspiram todos os dias.
          </p>
        </motion.div>
        
        <div className="mt-16">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                   <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                      className="p-2"
                  >
                      <InteractiveTestimonialCard testimonial={testimonial} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

      </div>
    </section>
  );
}
