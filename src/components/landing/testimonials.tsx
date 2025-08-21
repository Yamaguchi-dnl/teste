"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle } from "lucide-react";
import { cn } from '@/lib/utils';

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
];

const InteractiveTestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotationFactor = 4;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = (rotationFactor * (x - centerX)) / centerX;
      const rotateX = (-rotationFactor * (y - centerY)) / centerY;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.setProperty("--x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--y", `${(y / rect.height) * 100}%`);
    };

    const handleMouseLeave = () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="card-container relative rounded-2xl bg-card/5 border border-white/10 shadow-lg transition-transform duration-300 ease-out will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="p-6 md:p-8 flex flex-col h-full">
        <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
        </div>
        <p className="text-muted-foreground italic text-lg flex-1">"{testimonial.quote}"</p>
        <div className="mt-6">
            <p className="font-bold text-foreground text-xl">{testimonial.name}</p>
            <p className="text-primary font-medium">{testimonial.role}</p>
        </div>
      </div>
      <div className="card-glare absolute inset-0 rounded-2xl pointer-events-none" />

       <style jsx>{`
        .card-container {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .card-glare {
           background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .card-container:hover .card-glare {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 md:py-32 bg-background text-foreground">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {testimonials.map((testimonial, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
                >
                    <InteractiveTestimonialCard testimonial={testimonial} />
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
}
