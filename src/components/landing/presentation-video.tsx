"use client";

import Image from "next/image";
import { Play, PlayCircle, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FuturistLine = ({ reverse = false, className }: { reverse?: boolean, className?: string }) => (
  <svg
    width="100%"
    height="40"
    viewBox="0 0 300 40"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(`absolute ${reverse ? 'right-0 -scale-x-100' : 'left-0'}`, className)}
  >
    <path
      d="M0 20 L80 20 L100 5 L220 5 L240 20 L300 20"
      stroke="url(#grad)"
      strokeWidth="2"
      strokeOpacity="0.5"
    />
     <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 0}} />
        <stop offset="100%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
      </linearGradient>
    </defs>
  </svg>
);


export default function PresentationVideo({
  backgroundImageUrl = "https://placehold.co/1920x1080.png"
}: {
  backgroundImageUrl?: string;
}) {
  return (
    <section id="apresentacao" className="relative w-full py-20 md:py-32 bg-zinc-950 text-white overflow-hidden">
      <Image
        src={backgroundImageUrl}
        alt="Imagem de fundo da apresentação"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-20"
        data-ai-hint="abstract background"
      />
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
            Sua jornada para a fluência começa aqui
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Assista ao vídeo e veja como nossa metodologia pode transformar o seu aprendizado.
          </p>
        </motion.div>
        
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-12 items-center gap-4 md:gap-8">
            
            {/* Left Decor */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:flex col-span-2 flex-col items-center text-center relative h-full justify-around"
            >
               <FuturistLine reverse={true} className="top-8" />
               <div className="flex flex-col items-center">
                <SkipForward className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-white/70">Descubra o método que vai acelerar seu aprendizado.</p>
               </div>
              <FuturistLine reverse={true} className="bottom-8" />
            </motion.div>

            {/* Video Player */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ type: "spring", duration: 1, bounce: 0.3 }}
              className="col-span-12 md:col-span-8"
            >
              <div 
                className="relative aspect-video rounded-xl shadow-2xl shadow-primary/20 overflow-hidden cursor-pointer group border-2 border-primary/30"
              >
                 <div className="absolute -inset-4 blur-[150px] bg-primary/50 animate-pulse" />
                <Image
                  src="https://placehold.co/1280x720.png"
                  alt="Apresentação da Ovídio Academy"
                  fill
                  style={{ objectFit: "cover" }}
                  className="relative z-10"
                  data-ai-hint="teacher presentation"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center z-20">
                  <PlayCircle className="h-20 w-20 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
            
            {/* Right Decor */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:flex col-span-2 flex-col items-center text-center relative h-full justify-around"
            >
              <FuturistLine className="top-8" />
              <div className="flex flex-col items-center">
                <SkipBack className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-white/70">Um passo importante para sua nova carreira.</p>
              </div>
              <FuturistLine className="bottom-8" />
            </motion.div>

          </div>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="mt-12"
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full font-bold shadow-lg shadow-primary/30 transition-transform duration-300 hover:scale-105">
            Quero ser fluente
            <Play className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
