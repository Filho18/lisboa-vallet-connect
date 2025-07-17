
import { useState } from "react";
import { Eye, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FielDetailsModal from "@/components/FielDetailsModal";
import { FielData } from "@/components/RegistrationForm";

interface ObreirosTableProps {
  fieis: FielData[];
}

const ObreirosTable = ({ fieis }: ObreirosTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedFiel, setSelectedFiel] = useState<FielData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtros
  const filteredFieis = fieis.filter(fiel => {
    const matchesSearch = searchTerm === "" || 
      fiel.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fiel.modeloCarro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fiel.matricula.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrand = selectedBrand === "all" || 
      fiel.marcaCarro.toLowerCase() === selectedBrand.toLowerCase();
    
    return matchesSearch && matchesBrand;
  });

  // Marcas únicas para o dropdown
  const uniqueBrands = Array.from(new Set(fieis.map(fiel => fiel.marcaCarro)));

  const handleViewDetails = (fiel: FielData) => {
    setSelectedFiel(fiel);
    setIsModalOpen(true);
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
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Registros de Veículos
          </CardTitle>
          <CardDescription>
            Lista completa dos veículos registrados pelos fiéis
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar por nome, modelo ou matrícula..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-full sm:w-48">
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as marcas</SelectItem>
                  {uniqueBrands.map(brand => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabela */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Matrícula</TableHead>
                  <TableHead>Registrado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFieis.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {fieis.length === 0 
                        ? "Nenhum registro encontrado" 
                        : "Nenhum resultado para os filtros aplicados"
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFieis.map((fiel, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{fiel.nomeCompleto}</TableCell>
                      <TableCell>{fiel.telefone}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-church-100 text-church-800">
                          {fiel.marcaCarro}
                        </Badge>
                      </TableCell>
                      <TableCell>{fiel.modeloCarro}</TableCell>
                      <TableCell className="font-mono font-bold bg-gray-100 px-2 py-1 rounded">
                        {fiel.matricula}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(fiel.registradoEm)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(fiel)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Ver info
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Estatísticas */}
          {filteredFieis.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Mostrando {filteredFieis.length} de {fieis.length} registros
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      <FielDetailsModal
        fiel={selectedFiel}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFiel(null);
        }}
      />
    </>
  );
};

export default ObreirosTable;
