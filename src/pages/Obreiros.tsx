
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Mail, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ObreirosTable from "@/components/ObreirosTable";
import { FielData } from "@/components/RegistrationForm";

const Obreiros = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    codigo: ""
  });
  const [fieis, setFieis] = useState<FielData[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const data = JSON.parse(localStorage.getItem("fieis") || "[]");
    setFieis(data);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication (in real app, this would be handled by backend)
    if (loginData.email && loginData.codigo) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ email: "", codigo: "" });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              asChild 
              variant="ghost" 
              className="mb-6 text-gray-600 hover:text-gray-800"
            >
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Início
              </Link>
            </Button>
            
            <div className="text-center">
              <div className="flex justify-center items-center gap-3 mb-4">
                <Shield className="h-10 w-10 text-church-600" />
                <h1 className="text-3xl font-bold text-gray-800">
                  Área dos Obreiros
                </h1>
              </div>
              <p className="text-gray-600">
                Acesso restrito para administração do vallet parking
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Fazer Login
                </CardTitle>
                <CardDescription>
                  Insira suas credenciais para acessar o painel administrativo
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="h-12 bg-white border-gray-300 focus:border-church-500 focus:ring-church-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="codigo" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Código de Acesso
                    </Label>
                    <Input
                      id="codigo"
                      type="password"
                      placeholder="Digite o código"
                      value={loginData.codigo}
                      onChange={(e) => setLoginData(prev => ({ ...prev, codigo: e.target.value }))}
                      required
                      className="h-12 bg-white border-gray-300 focus:border-church-500 focus:ring-church-500"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-church-600 hover:bg-church-700 text-white font-semibold"
                  >
                    Entrar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-8 w-8 text-church-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                Dashboard - Vallet Parking
              </h1>
            </div>
            <p className="text-gray-600">
              Gerencie os registros de veículos dos fiéis
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              asChild 
              variant="outline"
              className="border-gray-300"
            >
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Início
              </Link>
            </Button>
            
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Sair
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Veículos</p>
                  <p className="text-3xl font-bold text-church-600">{fieis.length}</p>
                </div>
                <div className="h-12 w-12 bg-church-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-church-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hoje</p>
                  <p className="text-3xl font-bold text-green-600">
                    {fieis.filter(fiel => {
                      const today = new Date().toDateString();
                      const fielDate = new Date(fiel.registeredAt).toDateString();
                      return today === fielDate;
                    }).length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Marcas Únicas</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {new Set(fieis.map(fiel => fiel.marcaCarro.toLowerCase())).size}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <ObreirosTable fieis={fieis} />
      </div>
    </div>
  );
};

export default Obreiros;
