
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

interface VideoContent {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const CONTENT_ID = "presentationVideo";

export default function AdminVideoPage() {
  const [content, setContent] = useState<VideoContent>({ title: "", subtitle: "", imageUrl: "" });
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "siteContent", CONTENT_ID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data() as VideoContent);
        } else {
          setContent({ 
            title: "Sua jornada para a fluência começa aqui",
            subtitle: "Assista ao vídeo e veja como nossa metodologia pode transformar o seu aprendizado.",
            imageUrl: `https://placehold.co/1920x1080.png` 
          });
        }
      } catch (error) {
        console.error("Erro ao buscar conteúdo:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar",
          description: "Não foi possível carregar o conteúdo da seção.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [toast]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let imageUrl = content.imageUrl;
      if (newImageFile) {
          const storageRef = ref(storage, `site-images/${CONTENT_ID}-${newImageFile.name}`);
          const snapshot = await uploadBytes(storageRef, newImageFile);
          imageUrl = await getDownloadURL(snapshot.ref);
      }

      const contentToSave = { ...content, imageUrl };
      await setDoc(doc(db, "siteContent", CONTENT_ID), contentToSave);
      
      setContent(contentToSave);

      toast({
        title: "Sucesso!",
        description: `Conteúdo da seção 'Vídeo de Apresentação' atualizado.`,
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
      setNewImageFile(null);
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
      <h1 className="text-3xl font-bold mb-6">Gerenciar Vídeo de Apresentação</h1>
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo da Seção</CardTitle>
          <CardDescription>Atualize os textos e a imagem de fundo para a seção do vídeo de apresentação.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" value={content.title} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Textarea id="subtitle" name="subtitle" value={content.subtitle} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor={`image-${CONTENT_ID}`}>Imagem de Fundo</Label>
            <Input id={`image-${CONTENT_ID}`} type="file" onChange={handleImageChange} accept="image/*" />
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Pré-visualização da Imagem:</p>
            <div className="w-full max-w-sm aspect-video relative rounded-md overflow-hidden bg-gray-100">
                {newImageFile ? (
                    <Image src={URL.createObjectURL(newImageFile)} alt="Nova pré-visualização" fill className="object-cover" />
                ) : (
                    content.imageUrl && <Image src={content.imageUrl} alt="Imagem atual" fill className="object-cover" />
                )}
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
