"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const OvidioLogo = ({ className }: { className?: string }) => (
  <svg width="150" height="40" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <text x="10" y="45" fontFamily="Poppins, sans-serif" fontSize="40" fontWeight="bold" className="fill-foreground">
      Ovídio
      <tspan className="fill-primary">.</tspan>
    </text>
    <text x="140" y="45" fontFamily="Poppins, sans-serif" fontSize="20" fontWeight="500" className="fill-foreground">
      Academy
    </text>
  </svg>
);


const navItems = [
  { name: "Início", href: "#inicio" },
  { name: "Benefícios", href: "#beneficios" },
  { name: "Depoimentos", href: "#depoimentos" },
  { name: "Planos", href: "#planos" },
  { name: "Contato", href: "#contato" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/50 border-b border-white/10 shadow-lg backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="#inicio" className="flex items-center gap-2">
          <OvidioLogo />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
            <Link href="#contato">Quero me inscrever</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-foreground" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <div className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                   <Link href="#inicio" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <OvidioLogo />
                    </Link>
                </div>
                <nav className="mt-8 flex flex-col gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto">
                    <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
                      <Link href="#contato" onClick={() => setIsMobileMenuOpen(false)}>Quero me inscrever</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
