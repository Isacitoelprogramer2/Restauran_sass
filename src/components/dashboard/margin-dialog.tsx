import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Edit } from "lucide-react";

interface MarginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tempMargin: number;
  setTempMargin: (val: number) => void;
  marginPercent: number;
  recetaId: string | null;
  updatingMargin: boolean;
  setUpdatingMargin: (val: boolean) => void;
  setMarginPercent: (val: number) => void;
  setOpenMarginDialog: (open: boolean) => void;
  calculatePricing: (customMargin?: number) => {
    costoPlato: number;
    ganancia: number;
    precioFinal: number;
  };
  updateReceta: (
    recetaId: string,
    data: {
      margen_ganancia: number;
      precio_sugerido: number;
      costo_total: number;
    }
  ) => Promise<void>;
}

export const MarginDialog: React.FC<MarginDialogProps> = ({
  open,
  onOpenChange,
  tempMargin,
  setTempMargin,
  marginPercent,
  recetaId,
  updatingMargin,
  setUpdatingMargin,
  setMarginPercent,
  setOpenMarginDialog,
  calculatePricing,
  updateReceta,
}) => (
  <Dialog open={open} onOpenChange={(open) => {
    onOpenChange(open);
    if (open) setTempMargin(marginPercent);
  }}>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm">
        <Edit className="mr-2 h-4 w-4" />
        Modificar margen
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-md bg-black text-white border-neutral-700">
      <DialogHeader>
        <DialogTitle className="text-2xl mb-2">Modificar margen</DialogTitle>
        <DialogDescription className="mb-4 text-sm text-gray-300 ">
          Mueve la barra para modificar el porcentaje de ganancia
        </DialogDescription>
      </DialogHeader>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold">Margen de ganancia: {tempMargin}%</span>
          {tempMargin < 30 && (
            <span className="text-orange-500 font-bold">¡Margen muy bajo!</span>
          )}
        </div>
        <Slider
          min={0}
          max={200}
          value={[tempMargin]}
          onValueChange={([val]) => setTempMargin(val)}
          className={`mt-4 ${tempMargin < 30 ? 'text-orange-500' : ''}`}
        />
        {/* Vista previa de ganancia y precio final con el margen seleccionado */}
        <div className="mt-6">
          <span className="block text-lg">Ganancia: <span className="font-bold">S/ {calculatePricing(tempMargin).ganancia.toFixed(2)}</span></span>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={async () => {
            setUpdatingMargin(true);
            const newPricing = calculatePricing(tempMargin);
            
            // Si hay recetaId, actualizar la receta en la base de datos
            if (recetaId) {
              await updateReceta(recetaId, {
                margen_ganancia: tempMargin,
                precio_sugerido: newPricing.precioFinal,
                costo_total: newPricing.costoPlato,
              });
            }
            
            // Actualizar el estado local en cualquier caso
            setMarginPercent(tempMargin);
            setUpdatingMargin(false);
            setOpenMarginDialog(false);
          }}
          disabled={updatingMargin}
          className="bg-white text-black px-6 py-2 rounded-md"
        >
          {updatingMargin ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
