
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Phone, 
  Car, 
  FileText, 
  Calendar, 
  Send,
  MapPin 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FielData } from "./RegistrationForm";

interface FielDetailsModalProps {
  fiel: FielData | null;
  isOpen: boolean;
  onClose: () => void;
}

const FielDetailsModal = ({ fiel, isOpen, onClose }: FielDetailsModalProps) => {
  const { toast } = useToast();

  if (!fiel) return null;

  const handleSendInfo = () => {
    toast({
      title: "Informações enviadas!",
      description: `As informações de ${fiel.nomeCompleto} foram enviadas com sucesso.`,
    });
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Car className="h-5 w-5 text-church-600" />
            Detalhes do Veículo
          </DialogTitle>
          <DialogDescription>
            Informações completas do registro de {fiel.nomeCompleto}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-church-100 rounded-lg">
                <User className="h-5 w-5 text-church-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Nome Completo</p>
                <p className="text-lg font-semibold text-gray-900">{fiel.nomeCompleto}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Telefone</p>
                <p className="text-lg font-semibold text-gray-900">{fiel.telefone}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Vehicle Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Car className="h-4 w-4" />
              Informações do Veículo
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Marca</p>
                <Badge variant="secondary" className="bg-church-100 text-church-800">
                  {fiel.marcaCarro}
                </Badge>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Modelo</p>
                <p className="text-sm font-semibold text-gray-900">{fiel.modeloCarro}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Matrícula</p>
                <p className="text-lg font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded">
                  {fiel.matricula}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Registration Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Registrado em</p>
                <p className="text-sm font-semibold text-gray-900">{formatDate(fiel.registeredAt)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Fechar
            </Button>
            <Button 
              onClick={handleSendInfo}
              className="flex-1 bg-church-600 hover:bg-church-700 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Enviar informações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FielDetailsModal;
