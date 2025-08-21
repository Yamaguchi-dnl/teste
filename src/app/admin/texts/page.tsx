
"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Benefit {
  id: string;
  icon: string; // We'll just store the name, not the component
  title: string;
  description: string;
}

export default function AdminTextsPage() {
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
        
        // Sort benefits by a potential order field or ID if necessary
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
      // Using Promise.all to save all documents concurrently
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
    return <div>Carregando conteúdo...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Textos do Site</h1>
      <Card>
        <CardHeader>
          <CardTitle>Seção de Benefícios</CardTitle>
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
            {isSaving ? "Salvando..." : "Salvar Alterações nos Benefícios"}
          </Button>
        </CardContent>
      </Card>
       {/* Outras seções de texto podem ser adicionadas aqui em outros Cards */}
    </div>
  );
}
