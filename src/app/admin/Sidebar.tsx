"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, LogOut, Star, Video, CircleDollarSign, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Seção Hero', icon: Home },
  { href: '/admin/benefits', label: 'Benefícios', icon: Star },
  { href: '/admin/video', label: 'Vídeo de Apresentação', icon: Video },
  { href: '/admin/pricing', label: 'Planos', icon: CircleDollarSign },
  { href: '/admin/settings', label: 'Configurações', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-8">Ovídio Admin</div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                pathname === item.href
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <Link 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-gray-300 hover:bg-gray-700 hover:text-white mb-2"
        >
          <ExternalLink className="h-5 w-5" />
          <span>Voltar para o Site</span>
        </Link>
        <div className="p-4 border-t border-gray-700">
          <p className="text-sm font-medium">{user?.email}</p>
        </div>
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-left text-gray-300 hover:bg-red-500 hover:text-white"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sair
        </Button>
      </div>
    </aside>
  );
}
