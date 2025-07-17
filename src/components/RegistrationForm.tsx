
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Car, Phone, User, FileText } from "lucide-react";

export interface FielData {
  id: string;
  nomeCompleto: string;
  telefone: string;
  marcaCarro: string;
  modeloCarro: string;
  matricula: string;
  registeredAt: string;
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

    // Simulate API call
    setTimeout(() => {
      // Save to localStorage for demo purposes
      const existingData = JSON.parse(localStorage.getItem("fieis") || "[]");
      const newFiel: FielData = {
        id: Date.now().toString(),
        ...formData,
        registeredAt: new Date().toISOString()
      };
      
      existingData.push(newFiel);
      localStorage.setItem("fieis", JSON.stringify(existingData));

      toast({
        title: "Registro realizado com sucesso!",
        description: "Seus dados foram salvos. Tenha um culto abençoado!",
      });

      // Reset form
      setFormData({
        nomeCompleto: "",
        telefone: "",
        marcaCarro: "",
        modeloCarro: "",
        matricula: ""
      });

      setIsLoading(false);
    }, 1000);
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

          {/* Marca do Carro */}
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

            {/* Modelo do Carro */}
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

          {/* Submit Button */}
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
