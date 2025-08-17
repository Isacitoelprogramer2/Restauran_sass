import React, { useState, useEffect } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getDocuments, deleteDocument } from "@/lib/firebase/firestore";
import { Edit, Trash2 } from "lucide-react";
import type { Ingrediente } from "@/types/ingrediente";

interface SelectIngredientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddIngredient: (ingredient: {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    cost: number;
    unitPrice: number;
    ingrediente_id: string;
  }) => void;
  onEditIngredient?: (ingredient: Ingrediente) => void; // Nueva prop para editar
  refreshTrigger?: number; // Nueva prop para forzar el refresco
}

export const SelectIngredientDialog: React.FC<SelectIngredientDialogProps> = ({
  open,
  onOpenChange,
  onAddIngredient,
  onEditIngredient,
  refreshTrigger,
}) => {
  const [ingredients, setIngredients] = useState<Ingrediente[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] = useState<Ingrediente | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchIngredients = async () => {
    setLoading(true);
    try {
      const data = await getDocuments("Ingredientes");
      setIngredients(data as Ingrediente[]);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchIngredients();
    }
  }, [open, refreshTrigger]); // Agregar refreshTrigger como dependencia

  const handleSelectIngredient = (ingredient: Ingrediente) => {
    // Crear un nuevo ingrediente para la receta con cantidad inicial de 0
    const newIngredient = {
      id: Date.now(),
      name: ingredient.nombre,
      quantity: 0, // Cantidad inicial, el usuario la editará
      unit: "g", // Unidad fija en gramos
      cost: 0, // Costo inicial, se calculará cuando el usuario cambie la cantidad
      unitPrice: ingredient.costo_por_gramo, // Precio por gramo del ingrediente
      ingrediente_id: ingredient.id, // ID del ingrediente original
    };
    
    onAddIngredient(newIngredient);
    onOpenChange(false);
  };

  const handleEditIngredient = (ingredient: Ingrediente, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEditIngredient) {
      onEditIngredient(ingredient);
      onOpenChange(false);
    }
  };

  const handleDeleteIngredient = (ingredient: Ingrediente, e: React.MouseEvent) => {
    e.stopPropagation();
    setIngredientToDelete(ingredient);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!ingredientToDelete) return;
    
    setDeleting(true);
    try {
      await deleteDocument("Ingredientes", ingredientToDelete.id);
      setIngredients(ingredients.filter(ing => ing.id !== ingredientToDelete.id));
      setDeleteDialogOpen(false);
      setIngredientToDelete(null);
    } catch (error) {
      console.error("Error deleting ingredient:", error);
      alert("Error al eliminar el ingrediente. Por favor, intente nuevamente.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={onOpenChange}>
        <CommandInput placeholder="Buscar ingrediente..." />
        <CommandList>
          <CommandEmpty>
            {loading ? (
              <p className="py-6 text-center text-sm">Cargando ingredientes...</p>
            ) : (
              <p className="py-6 text-center text-sm">No hay ingredientes disponibles</p>
            )}
          </CommandEmpty>
          {!loading && ingredients.length > 0 && (
            <CommandGroup heading="Ingredientes">
              {ingredients.map((ingredient) => (
                <CommandItem
                  key={ingredient.id}
                  onSelect={() => handleSelectIngredient(ingredient)}
                  className="flex justify-between items-center p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="font-medium text-neutral-200">{ingredient.nombre}</div>
                    <div className="text-sm text-gray-500">
                      S/{ingredient.costo_por_gramo.toFixed(4)}/g
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleEditIngredient(ingredient, e)}
                      className="p-2 h-8 w-8 rounded-md border border-neutral-700 hover:bg-neutral-700"
                    >
                      <Edit className="h-4 w-4 text-neutral-100" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDeleteIngredient(ingredient, e)}
                      className="p-2 h-8 w-8 hover:bg-red-950 border border-neutral-700 rounded-md"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            ¿Estás seguro de que deseas eliminar el ingrediente "{ingredientToDelete?.nombre}"? 
            Esta acción no se puede deshacer.
          </p>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleting}
            >
              {deleting ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};