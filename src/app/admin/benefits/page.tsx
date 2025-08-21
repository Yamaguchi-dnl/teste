"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";

interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export default function AdminBenefitsPage() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const benefitsCollectionRef = collection(db, "siteContent", "benefits", "items");
        const querySnapshot = await getDocs(benefitsCollectionRef);
        const benefitsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Benefit));
        benefitsData.sort((a, b) => a.id.localeCompare(b.id));
        setBenefits(benefitsData);
      } catch (error) {
        console.error("Erro ao buscar conteúdo dos benefícios:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar",
          description: "Não foi possível carregar o conteúdo da seção Benefícios.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [toast]);

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newBenefits = [...benefits];
    (newBenefits[index] as any)[name] = value;
    setBenefits(newBenefits);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await Promise.all(benefits.map(benefit => {
        const { id, ...data } = benefit;
        const docRef = doc(db, "siteContent", "benefits", "items", id);
        return setDoc(docRef, data, { merge: true });
      }));

      toast({
        title: "Sucesso!",
        description: "Conteúdo da seção Benefícios atualizado com sucesso.",
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
    }
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-4 text-lg">Carregando benefícios...</span>
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Seção de Benefícios</h1>
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo dos Benefícios</CardTitle>
          <CardDescription>Edite o título e a descrição de cada benefício que aparece no site.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {benefits.map((benefit, index) => (
              <AccordionItem key={benefit.id} value={benefit.id}>
                <AccordionTrigger>
                  <span className="font-semibold">{`Benefício ${index + 1}: ${benefit.title}`}</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                   <div>
                      <Label htmlFor={`title-${benefit.id}`}>Título</Label>
                      <Input 
                        id={`title-${benefit.id}`} 
                        name="title" 
                        value={benefit.title} 
                        onChange={(e) => handleInputChange(index, e)} 
                      />
                    </div>
                    <div>
                      <Label htmlFor={`description-${benefit.id}`}>Descrição</Label>
                      <Textarea 
                        id={`description-${benefit.id}`} 
                        name="description" 
                        value={benefit.description} 
                        onChange={(e) => handleInputChange(index, e)} 
                      />
                    </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Button onClick={handleSave} disabled={isSaving} className="mt-6">
            {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</> : "Salvar Alterações nos Benefícios"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
