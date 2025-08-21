
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
  id: string;
  name: string;
  url: string;
}

const editableImagesConfig = [
  { id: 'presentationVideo', name: 'Fundo do Vídeo de Apresentação' },
  { id: 'pricing', name: 'Fundo da Seção de Planos' },
];

export default function AdminImagesPage() {
  const [images, setImages] = useState<ImageContent[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<{ [key: string]: File }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchImageContent = async () => {
      setIsLoading(true);
      try {
        const imagePromises = editableImagesConfig.map(async (imgConfig) => {
          const docRef = doc(db, "siteContent", "images", imgConfig.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return { id: imgConfig.id, name: imgConfig.name, ...docSnap.data() } as ImageContent;
          }
          // If document doesn't exist, create a placeholder
          return { id: imgConfig.id, name: imgConfig.name, url: `https://placehold.co/1920x1080.png` };
        });

        const imagesData = await Promise.all(imagePromises);
        setImages(imagesData);

      } catch (error) {
        console.error("Erro ao buscar conteúdo das imagens:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar",
          description: "Não foi possível carregar as imagens do site.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchImageContent();
  }, [toast]);
  
  const handleImageChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFiles(prev => ({ ...prev, [id]: e.target.files[0] }));
    }
  };

  const handleSave = async (imageId: string) => {
    setIsSaving(true);
    try {
      const imageToUpdate = images.find(img => img.id === imageId);
      if (!imageToUpdate) throw new Error("Imagem não encontrada");

      let imageUrl = imageToUpdate.url;
      const newImageFile = newImageFiles[imageId];

      if (newImageFile) {
        const storageRef = ref(storage, `site-images/${imageId}-${newImageFile.name}`);
        const snapshot = await uploadBytes(storageRef, newImageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const contentToSave = { url: imageUrl };
      await setDoc(doc(db, "siteContent", "images", imageId), contentToSave);
      
      // Update state locally
      setImages(prevImages => prevImages.map(img => 
        img.id === imageId ? { ...img, url: imageUrl } : img
      ));

      toast({
        title: "Sucesso!",
        description: `Imagem "${imageToUpdate.name}" atualizada.`,
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
      setNewImageFiles(prev => {
        const newState = { ...prev };
        delete newState[imageId];
        return newState;
      });
    }
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-4 text-lg">Carregando imagens...</span>
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Imagens do Site</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {images.map(image => (
          <Card key={image.id}>
            <CardHeader>
              <CardTitle>{image.name}</CardTitle>
              <CardDescription>Atualize a imagem para esta seção.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor={`image-${image.id}`}>Nova Imagem</Label>
                <Input id={`image-${image.id}`} type="file" onChange={(e) => handleImageChange(image.id, e)} accept="image/*" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Pré-visualização:</p>
                <div className="w-full aspect-video relative rounded-md overflow-hidden bg-gray-100">
                    {newImageFiles[image.id] ? (
                        <Image src={URL.createObjectURL(newImageFiles[image.id])} alt="Nova pré-visualização" fill className="object-cover" />
                    ) : (
                        image.url && <Image src={image.url} alt="Imagem atual" fill className="object-cover" />
                    )}
                </div>
              </div>
              <Button onClick={() => handleSave(image.id)} disabled={isSaving}>
                {isSaving ? "Salvando..." : "Salvar Imagem"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
