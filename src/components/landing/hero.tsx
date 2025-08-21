"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface HeroContent {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function Hero() {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "siteContent", "hero");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data() as HeroContent);
        } else {
           // Fallback content if nothing in Firestore
           setContent({
            title: "Fale Alemão com Confiança e Fluidez",
            subtitle: "Professores nativos, metodologia imersiva e aulas focadas em conversação.",
            imageUrl: "https://placehold.co/1000x1200.png"
          });
        }
      } catch (error) {
        console.error("Error fetching hero content:", error);
         // Fallback content on error
         setContent({
            title: "Fale Alemão com Confiança e Fluidez",
            subtitle: "Professores nativos, metodologia imersiva e aulas focadas em conversação.",
            imageUrl: "https://placehold.co/1000x1200.png"
          });
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  if (isLoading || !content) {
    return <section id="inicio" className="relative w-full h-screen overflow-hidden bg-background flex items-center justify-center"><div>Carregando...</div></section>;
  }

  return (
    <section id="inicio" ref={targetRef} className="relative w-full h-screen overflow-hidden bg-background">
      <div className="container mx-auto grid md:grid-cols-2 h-full items-center px-4 md:px-6 gap-8">
        <div className="z-10 text-foreground">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl font-headline"
          >
            {content.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            className="mt-6 text-lg md:text-xl text-muted-foreground"
          >
            {content.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            className="mt-10"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full font-bold shadow-lg transition-transform duration-300 hover:scale-105">
              Comece sua jornada
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 h-full w-full md:w-1/2">
          <motion.div className="relative h-full w-full" style={{ y: imageY }}>
            <Image
              src={content.imageUrl}
              alt="Estudantes felizes aprendendo alemão"
              fill
              style={{ objectFit: 'cover' }}
              className="clip-path-hero"
              priority
              data-ai-hint="happy students germany"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent md:bg-gradient-to-r md:from-background md:via-background/50 md:to-transparent"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:hidden"></div>
          </motion.div>
        </div>
      </div>
       <style jsx>{`
        .clip-path-hero {
          clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
        @media (max-width: 768px) {
          .clip-path-hero {
            clip-path: none;
          }
           .md\\:grid-cols-2 {
              grid-template-columns: 1fr;
            }
            .md\\:w-1\\/2 {
              width: 100%;
              opacity: 0.3;
            }
            .z-10 {
              text-align: center;
            }
            .mt-10 {
              display: flex;
              justify-content: center;
            }
        }
      `}</style>
    </section>
  );
}

