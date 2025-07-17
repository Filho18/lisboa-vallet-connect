
import { Link } from "react-router-dom";
import { Church, Users } from "lucide-react";
import RegistrationForm from "@/components/RegistrationForm";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-church-50 via-white to-church-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Church className="h-12 w-12 text-church-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-church-600 to-church-800 bg-clip-text text-transparent">
              MIF Lisboa
            </h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Vallet Parking
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Bem-vindo ao sistema de registro de estacionamento da MIF Lisboa. 
            Registre seus dados para que possamos cuidar do seu veículo durante o culto.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Registration Form */}
          <div className="order-2 lg:order-1">
            <RegistrationForm />
          </div>

          {/* Info Section */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-church-200">
              <h3 className="text-2xl font-semibold text-church-700 mb-6">
                Como funciona?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-church-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    1
                  </div>
                  <p className="text-gray-700">
                    Preencha o formulário com seus dados e informações do veículo
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-church-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    2
                  </div>
                  <p className="text-gray-700">
                    Nossos obreiros receberão suas informações
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-church-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    3
                  </div>
                  <p className="text-gray-700">
                    Concentre-se no culto enquanto cuidamos do seu carro
                  </p>
                </div>
              </div>
            </div>

            {/* Obreiros Access */}
            <div className="bg-church-600 text-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Área Administrativa
              </h3>
              <p className="text-church-100 mb-6">
                Acesso exclusivo para obreiros e líderes responsáveis pelo vallet parking.
              </p>
              <Button 
                asChild 
                variant="secondary" 
                className="w-full bg-white text-church-600 hover:bg-church-50 font-semibold"
              >
                <Link to="/obreiros">
                  Área dos Obreiros
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
