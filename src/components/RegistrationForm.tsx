
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Car, Phone, User, FileText } from "lucide-react";

export interface FielData {
  registradoEm: string;
  nomeCompleto: string;
  telefone: string;
  marcaCarro: string;
  modeloCarro: string;
  matricula: string;
}

const RegistrationForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    telefone: "",
    marcaCarro: "",
    modeloCarro: "",
    matricula: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbxWOkRjJ2Tne3Xv0-3QOW3t5O0QKgOkjaLWp6n6bSC8P6dfzan9aocg2LLZk07rbLu8dA/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      toast({
        title: "Registro realizado com sucesso!",
        description: "Seus dados foram enviados para a planilha. Tenha um culto abençoado!",
      });

      setFormData({
        nomeCompleto: "",
        telefone: "",
        marcaCarro: "",
        modeloCarro: "",
        matricula: ""
      });
    } catch (error) {
      toast({
        title: "Erro ao registrar",
        description: "Verifique sua conexão ou tente mais tarde.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm shadow-xl border-church-200">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-church-700 flex items-center justify-center gap-2">
          <Car className="h-6 w-6" />
          Registro de Veículo
        </CardTitle>
        <CardDescription className="text-gray-600">
          Preencha os dados abaixo para registrar seu veículo
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome Completo */}
          <div className="space-y-2">
            <Label htmlFor="nomeCompleto" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="h-4 w-4" />
              Nome Completo
            </Label>
            <Input
              id="nomeCompleto"
              type="text"
              placeholder="Digite seu nome completo"
              value={formData.nomeCompleto}
              onChange={(e) => handleChange("nomeCompleto", e.target.value)}
              required
              className="h-12 bg-white border-gray-300 focus:border-church-500 focus:ring-church-500"
            />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="telefone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Número de Telefone
            </Label>
            <Input
              id="telefone"
              type="tel"
              placeholder="(+351) 000 000 000"
              value={formData.telefone}
              onChange={(e) => handleChange("telefone", e.target.value)}
              required
              className="h-12 bg-white border-gray-300 focus:border-church-500 focus:ring-church-500"
            />
          </div>

          {/* Marca e Modelo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="marcaCarro" className="text-sm font-medium text-gray-700">
                Marca do Carro
              </Label>
              <Input
                id="marcaCarro"
                type="text"
                placeholder="Ex: Toyota, BMW, Renault"
                value={formData.marcaCarro}
                onChange={(e) => handleChange("marcaCarro", e.target.value)}
                required
                className="h-12 bg-white border-gray-300 focus:border-church-500 focus:ring-church-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modeloCarro" className="text-sm font-medium text-gray-700">
                Modelo do Carro
              </Label>
              <Input
                id="modeloCarro"
                type="text"
                placeholder="Ex: Corolla, X3, Clio"
                value={formData.modeloCarro}
                onChange={(e) => handleChange("modeloCarro", e.target.value)}
                required
                className="h-12 bg-white border-gray-300 focus:border-church-500 focus:ring-church-500"
              />
            </div>
          </div>

          {/* Matrícula */}
          <div className="space-y-2">
            <Label htmlFor="matricula" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Matrícula
            </Label>
            <Input
              id="matricula"
              type="text"
              placeholder="Ex: 00-AA-00"
              value={formData.matricula}
              onChange={(e) => handleChange("matricula", e.target.value.toUpperCase())}
              required
              className="h-12 bg-white border-gray-300 focus:border-church-500 focus:ring-church-500"
            />
          </div>

          {/* Botão */}
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 bg-church-600 hover:bg-church-700 text-white font-semibold transition-colors"
          >
            {isLoading ? "Registrando..." : "Registrar Veículo"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
