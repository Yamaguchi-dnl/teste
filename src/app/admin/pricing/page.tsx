
"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ImageContent {
  url: string;
}

const IMAGE_ID = "pricing";

export default function AdminPricingPage() {
  const [content, setContent] = useState<ImageContent>({ url: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchImageContent = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "siteContent", "images", "items", IMAGE_ID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data() as ImageContent);
        } else {
          setContent({ url: `https://placehold.co/1920x1080.png` });
        }
      } catch (error) {
        console.error("Erro ao buscar conteúdo:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar",
          description: "Não foi possível carregar a imagem da seção.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchImageContent();
  }, [toast]);
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent({ url: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "siteContent", "images", "items", IMAGE_ID), content);
      
      toast({
        title: "Sucesso!",
        description: `Imagem da seção de Planos atualizada.`,
      });

    } catch (error) {
      console.error("Erro ao salvar imagem:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar a alteração da imagem.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-4 text-lg">Carregando imagem...</span>
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Seção de Planos</h1>
       <Card>
        <CardHeader>
          <CardTitle>Imagem de Fundo</CardTitle>
          <CardDescription>Atualize a imagem de fundo para a seção de planos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor={`imageUrl-${IMAGE_ID}`}>URL da Nova Imagem</Label>
            <Input id={`imageUrl-${IMAGE_ID}`} type="text" value={content.url} onChange={handleUrlChange} placeholder="https://exemplo.com/imagem.png" />
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Pré-visualização:</p>
            <div className="w-full max-w-sm aspect-video relative rounded-md overflow-hidden bg-gray-100">
                {content.url && <Image src={content.url} alt="Imagem atual" fill className="object-cover" />}
            </div>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</> : "Salvar Imagem"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
