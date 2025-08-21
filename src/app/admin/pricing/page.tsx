
"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
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
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
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
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!newImageFile) {
        toast({
            variant: "destructive",
            title: "Nenhuma imagem selecionada",
            description: "Por favor, selecione uma imagem para fazer o upload.",
        });
        return;
    }
    setIsSaving(true);
    try {
      const storageRef = ref(storage, `site-images/${IMAGE_ID}-${newImageFile.name}`);
      const snapshot = await uploadBytes(storageRef, newImageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);

      const contentToSave = { url: imageUrl };
      await setDoc(doc(db, "siteContent", "images", "items", IMAGE_ID), contentToSave);
      
      setContent(contentToSave);

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
      setNewImageFile(null);
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
            <Label htmlFor={`image-${IMAGE_ID}`}>Nova Imagem</Label>
            <Input id={`image-${IMAGE_ID}`} type="file" onChange={handleImageChange} accept="image/*" />
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Pré-visualização:</p>
            <div className="w-full max-w-sm aspect-video relative rounded-md overflow-hidden bg-gray-100">
                {newImageFile ? (
                    <Image src={URL.createObjectURL(newImageFile)} alt="Nova pré-visualização" fill className="object-cover" />
                ) : (
                    content.url && <Image src={content.url} alt="Imagem atual" fill className="object-cover" />
                )}
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
