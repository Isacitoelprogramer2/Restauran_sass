import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDocument, updateDocument } from "@/lib/firebase/firestore";
import type { Ingrediente } from "@/types/ingrediente";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface AddIngredientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddIngredient: (ingredient: {
    name: string;
    quantity: number;
    unit: string;
    unitPrice: number;
  }) => void;
  onIngredientCreated?: () => void; // Nueva prop para notificar que se creó un ingrediente
  editingIngredient?: Ingrediente | null; // Nueva prop para editar ingrediente
}

export const AddIngredientDialog: React.FC<AddIngredientDialogProps> = ({
  open,
  onOpenChange,
  onAddIngredient,
  onIngredientCreated,
  editingIngredient,
}) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("kg");
  const [totalPrice, setTotalPrice] = useState(0);
  const [saving, setSaving] = useState(false);

  // Cargar datos cuando se está editando
  useEffect(() => {
    if (editingIngredient) {
      setName(editingIngredient.nombre);
      setQuantity(editingIngredient.cantidad);
      setUnit(editingIngredient.unidad);
      setTotalPrice(editingIngredient.precio);
    } else {
      // Limpiar campos cuando no se está editando
      setName("");
      setQuantity(0);
      setUnit("kg");
      setTotalPrice(0);
    }
  }, [editingIngredient, open]);

  const handleAdd = async () => {
    if (!name || quantity <= 0 || totalPrice <= 0) {
      return;
    }

    setSaving(true);
    
    try {
      // Calcular el precio unitario (calculamos pero no se usa directamente)
      const _unitPrice = quantity > 0 ? totalPrice / quantity : 0;
      
      // Calcular el costo por gramo para guardar en Firestore
      const costPerGram = quantity > 0 ? (totalPrice / (unit === "kg" ? quantity * 1000 : unit === "g" ? quantity : unit === "l" ? quantity * 1000 : unit === "ml" ? quantity : quantity)) : 0;
      
      // Datos del ingrediente
      const ingredienteData: Omit<Ingrediente, "id"> = {
        nombre: name,
        precio: totalPrice,
        cantidad: quantity,
        unidad: unit,
        costo_por_gramo: costPerGram
      };
      
      if (editingIngredient) {
        // Actualizar el ingrediente existente
        await updateDocument("Ingredientes", editingIngredient.id, ingredienteData);
      } else {
        // Crear un nuevo ingrediente en Firestore
        await createDocument("Ingredientes", ingredienteData);
      }
      
      // Notificar que se creó/actualizó un ingrediente para refrescar la lista
      if (onIngredientCreated) {
        onIngredientCreated();
      }
      
      // Limpiar los campos
      setName("");
      setQuantity(0);
      setUnit("kg");
      setTotalPrice(0);
      
      // Cerrar el diálogo
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving ingredient:", error);
      alert(`Error al ${editingIngredient ? 'actualizar' : 'crear'} el ingrediente. Por favor, intente nuevamente.`);
    } finally {
      setSaving(false);
    }
  };

  // Calcular el costo por gramo
  const costPerGram = quantity > 0 ? (totalPrice / (unit === "kg" ? quantity * 1000 : unit === "g" ? quantity : unit === "l" ? quantity * 1000 : unit === "ml" ? quantity : quantity)) : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-black text-white border-neutral-700">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>
              {editingIngredient ? "Editar ingrediente" : "Agregar ingrediente"}
            </DialogTitle>
          </VisuallyHidden>
          <p className="mb-4 text-sm text-gray-300">
            {editingIngredient ? "Modifica los datos del ingrediente" : "Agrega los ingrediente necesarios"}
          </p>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ingredient-name">Nombre del ingrediente</Label>
            <Input
              id="ingredient-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Harina"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Cantidad</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
              placeholder="1000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="unit">Unidad</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">kilos</SelectItem>
                <SelectItem value="g">gramos</SelectItem>
                <SelectItem value="l">litros</SelectItem>
                <SelectItem value="ml">mililitros</SelectItem>
                <SelectItem value="unidad">unidad</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="total-price">Precio total</Label>
            <Input
              id="total-price"
              type="number"
              value={totalPrice}
              onChange={(e) => setTotalPrice(parseFloat(e.target.value) || 0)}
              placeholder="5.50"
            />
          </div>
          
          <div className="p-3 bg-gray-800 rounded-md">
            <p className="text-sm">
              Costo por {unit === "kg" || unit === "g" ? "gramo" : unit === "l" || unit === "ml" ? "mililitro" : "unidad"}: S/{costPerGram.toFixed(4)}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-neutral-700 text-white"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!name || quantity <= 0 || totalPrice <= 0 || saving}
            className="bg-white text-black px-6 py-2 rounded-md"
          >
            {saving ? "Guardando..." : editingIngredient ? "Guardar cambios" : "Agregar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};