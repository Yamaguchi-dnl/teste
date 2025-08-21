import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const OvidioLogoWhite = () => (
  <svg width="150" height="40" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="45" fontFamily="Poppins, sans-serif" fontSize="40" fontWeight="bold" fill="#FFFFFF">
      Ovídio
      <tspan fill="#FFFFFF" opacity="0.7">.</tspan>
    </text>
    <text x="140" y="45" fontFamily="Poppins, sans-serif" fontSize="20" fontWeight="500" fill="#FFFFFF">
      Academy
    </text>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <OvidioLogoWhite />
            <p className="text-sm text-primary-foreground/80 max-w-xs">
              Sua jornada para a fluência começa aqui. Idiomas para o mundo.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li><Link href="#inicio" className="hover:underline text-sm text-primary-foreground/80 hover:text-primary-foreground">Início</Link></li>
              <li><Link href="#beneficios" className="hover:underline text-sm text-primary-foreground/80 hover:text-primary-foreground">Benefícios</Link></li>
              <li><Link href="#depoimentos" className="hover:underline text-sm text-primary-foreground/80 hover:text-primary-foreground">Depoimentos</Link></li>
              <li><Link href="#planos" className="hover:underline text-sm text-primary-foreground/80 hover:text-primary-foreground">Planos</Link></li>
              <li><Link href="#contato" className="hover:underline text-sm text-primary-foreground/80 hover:text-primary-foreground">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Siga-nos</h4>
            <div className="flex gap-4">
              <Link href="#" aria-label="Facebook" className="bg-accent p-2 rounded-full text-accent-foreground hover:bg-accent/80 transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" aria-label="Instagram" className="bg-accent p-2 rounded-full text-accent-foreground hover:bg-accent/80 transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" aria-label="Twitter" className="bg-accent p-2 rounded-full text-accent-foreground hover:bg-accent/80 transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" aria-label="LinkedIn" className="bg-accent p-2 rounded-full text-accent-foreground hover:bg-accent/80 transition-colors"><Linkedin className="h-5 w-5" /></Link>
            </div>
            <div className="mt-6">
              <h4 className="font-bold text-lg mb-2">Contato</h4>
              <p className="text-sm text-primary-foreground/80">contato@ovidio.academy</p>
              <p className="text-sm text-primary-foreground/80">+55 (11) 99999-8888</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Ovídio Academy. Todos os direitos reservados.</p>
          <div className="mt-2">
            <Link href="/admin/login" className="hover:underline text-xs text-primary-foreground/50 hover:text-primary-foreground">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
