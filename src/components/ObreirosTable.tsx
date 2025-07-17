
import { useState, useMemo } from "react";
import { Search, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FielDetailsModal from "./FielDetailsModal";
import { FielData } from "./RegistrationForm";

interface ObreirosTableProps {
  fieis: FielData[];
}

const ObreirosTable = ({ fieis }: ObreirosTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarca, setSelectedMarca] = useState<string>("all");
  const [selectedFiel, setSelectedFiel] = useState<FielData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique car brands
  const marcas = useMemo(() => {
    const uniqueMarcas = Array.from(new Set(fieis.map(fiel => fiel.marcaCarro.toLowerCase())));
    return uniqueMarcas.sort();
  }, [fieis]);

  // Filter fieis based on search and brand filter
  const filteredFieis = useMemo(() => {
    return fieis.filter(fiel => {
      const matchesSearch = 
        fiel.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fiel.modeloCarro.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fiel.matricula.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBrand = 
        selectedMarca === "all" || 
        fiel.marcaCarro.toLowerCase() === selectedMarca;
      
      return matchesSearch && matchesBrand;
    });
  }, [fieis, searchTerm, selectedMarca]);

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
            Registro de Veículos
          </CardTitle>
          <CardDescription>
            Gerencie e visualize todos os veículos registrados
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Pesquisar por nome, modelo ou matrícula..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-white border-gray-300 focus:border-church-500 focus:ring-church-500"
                />
              </div>
            </div>
            
            <div className="sm:w-48">
              <Select value={selectedMarca} onValueChange={setSelectedMarca}>
                <SelectTrigger className="h-12 bg-white border-gray-300 focus:border-church-500 focus:ring-church-500">
                  <SelectValue placeholder="Filtrar por marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as marcas</SelectItem>
                  {marcas.map(marca => (
                    <SelectItem key={marca} value={marca}>
                      {marca.charAt(0).toUpperCase() + marca.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Mostrando {filteredFieis.length} de {fieis.length} registros
            </p>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Nome</TableHead>
                  <TableHead className="font-semibold">Telefone</TableHead>
                  <TableHead className="font-semibold">Marca</TableHead>
                  <TableHead className="font-semibold">Modelo</TableHead>
                  <TableHead className="font-semibold">Matrícula</TableHead>
                  <TableHead className="font-semibold">Registrado em</TableHead>
                  <TableHead className="font-semibold text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFieis.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {searchTerm || selectedMarca !== "all" 
                        ? "Nenhum registro encontrado com os filtros aplicados."
                        : "Nenhum veículo registrado ainda."
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFieis.map((fiel) => (
                    <TableRow key={fiel.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{fiel.nomeCompleto}</TableCell>
                      <TableCell>{fiel.telefone}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-church-100 text-church-800">
                          {fiel.marcaCarro}
                        </span>
                      </TableCell>
                      <TableCell>{fiel.modeloCarro}</TableCell>
                      <TableCell className="font-mono text-sm font-medium">
                        {fiel.matricula}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(fiel.registeredAt)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(fiel)}
                          className="h-8 px-3 border-church-300 text-church-600 hover:bg-church-50 hover:border-church-400"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver info
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <FielDetailsModal 
        fiel={selectedFiel}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ObreirosTable;
