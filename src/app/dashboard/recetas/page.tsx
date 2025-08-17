"use client";

import { useEffect, useState } from "react";
import { getDocuments, deleteReceta } from "@/lib/firebase/firestore";
import type { Receta } from "@/types/receta";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RecetasPage() {
  const router = useRouter();
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recetaToDelete, setRecetaToDelete] = useState<{ id: string; nombre: string } | null>(null);

  useEffect(() => {
    async function fetchRecetas() {
      setLoading(true);
      const data = await getDocuments("Recetas");
      setRecetas(data as Receta[]);
      setLoading(false);
    }
    fetchRecetas();
  }, []);

  const handleDelete = async (id: string, nombre: string) => {
    try {
      await deleteReceta(id);
      setRecetas(recetas.filter((receta) => receta.id !== id));
      toast.success(`Receta "${nombre}" eliminada correctamente`);
      setDeleteDialogOpen(false);
      setRecetaToDelete(null);
    } catch (error) {
      console.error("Error eliminando receta:", error);
      toast.error("Error al eliminar la receta");
    }
  };

  const openDeleteDialog = (id: string, nombre: string) => {
    setRecetaToDelete({ id, nombre });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (recetaToDelete) {
      handleDelete(recetaToDelete.id, recetaToDelete.nombre);
    }
  };

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <h1 className="text-2xl font-bold">Recetas</h1>
          <p className="text-muted-foreground mt-2">
            Calcula el costo de tus platos y determina el precio de venta óptimo
            para tu restaurante. Gestiona tus recetas, visualiza costos y márgenes
            de ganancia.
          </p>
        </div>

        <div className="px-4 lg:px-6">
          <Button className="w-full sm:w-auto" onClick={() => router.push("/dashboard/recetas/nueva-receta")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Nueva Receta
          </Button>
        </div>

        {loading ? (
          <p className="px-4 lg:px-6">Cargando recetas...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-6">
            {recetas.map((receta) => (
              <Card key={receta.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{receta.nombre}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-medium">Ingredientes:</h3>
                      <ul className="text-sm text-muted-foreground">
                        {receta.ingredientes.map((ing, index) => (
                          <li key={index}>
                            {ing.ingrediente_id}: {ing.cantidad_utilizada}{ing.unidad}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="font-medium">Costo Total:</p>
                        <p>${receta.costo_total}</p>
                      </div>
                      <div>
                        <p className="font-medium">Precio Sugerido:</p>
                        <p>${receta.precio_sugerido}</p>
                      </div>
                      <div>
                        <p className="font-medium">Costo por Unidad:</p>
                        <p>${receta.costo_total}</p>
                      </div>
                      <div>
                        <p className="font-medium">Margen de Ganancia:</p>
                        <p>${receta.margen_ganancia}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteDialog(receta.id, receta.nombre)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Dialog de confirmación para eliminar */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Eliminar receta?</DialogTitle>
              <DialogDescription>
                ¿Estás seguro que deseas eliminar la receta &quot;{recetaToDelete?.nombre}&quot;? 
                Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
              >
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}