"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface HeroContent {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function AdminPage() {
  const [heroContent, setHeroContent] = useState<HeroContent>({ title: "", subtitle: "", imageUrl: "" });
  const [newImage, setNewImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHeroContent = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "siteContent", "hero");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHeroContent(docSnap.data() as HeroContent);
        } else {
          setHeroContent({
            title: "Fale Alemão com Confiança e Fluidez",
            subtitle: "Professores nativos, metodologia imersiva e aulas focadas em conversação.",
            imageUrl: "https://placehold.co/1000x1200.png"
          });
        }
      } catch (error) {
        console.error("Erro ao buscar conteúdo:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar",
          description: "Não foi possível carregar o conteúdo da seção Hero.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroContent();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHeroContent(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let imageUrl = heroContent.imageUrl;
      if (newImage) {
        const storageRef = ref(storage, `hero/${newImage.name}`);
        const snapshot = await uploadBytes(storageRef, newImage);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const contentToSave = { ...heroContent, imageUrl };
      await setDoc(doc(db, "siteContent", "hero"), contentToSave);
      setHeroContent(contentToSave);

      toast({
        title: "Sucesso!",
        description: "Conteúdo da seção Hero atualizado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
      });
    } finally {
      setIsSaving(false);
      setNewImage(null);
    }
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-4 text-lg">Carregando conteúdo...</span>
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Seção Hero</h1>
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo da Seção Hero</CardTitle>
          <CardDescription>Edite o título, subtítulo e a imagem de fundo da principal seção do site.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" value={heroContent.title} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Textarea id="subtitle" name="subtitle" value={heroContent.subtitle} onChange={handleInputChange} rows={3} />
          </div>
          <div>
            <Label htmlFor="image">Imagem de Fundo</Label>
            <Input id="image" type="file" onChange={handleImageChange} accept="image/*" />
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Pré-visualização:</p>
              <div className="w-full max-w-sm aspect-video relative rounded-md overflow-hidden bg-gray-100">
                {newImage ? (
                  <Image src={URL.createObjectURL(newImage)} alt="Nova pré-visualização" fill className="object-cover" />
                ) : (
                  heroContent.imageUrl && <Image src={heroContent.imageUrl} alt="Imagem atual" fill className="object-cover" />
                )}
              </div>
            </div>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</> : "Salvar Alterações"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
