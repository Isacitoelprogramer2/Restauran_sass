"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Edit, Trash2, Pen, Save } from "lucide-react";
import { MarginDialog } from "@/components/dashboard/margin-dialog";
import { AddIngredientDialog } from "@/components/dashboard/add-ingredient-dialog";
import { SelectIngredientDialog } from "@/components/dashboard/select-ingredient-dialog";
import { updateReceta } from "@/lib/firebase/firestore";
import { createReceta } from "@/lib/firebase/firestore";
import { useRouter } from "next/navigation";

export default function NuevaRecetaPage() {
  // Estado para el dialog de margen
  const [openMarginDialog, setOpenMarginDialog] = useState(false);
  // Estado para el dialog de agregar ingrediente
  const [openAddIngredientDialog, setOpenAddIngredientDialog] = useState(false);
  // Estado para el dialog de seleccionar ingrediente
  const [openSelectIngredientDialog, setOpenSelectIngredientDialog] = useState(false);
  // El margen guardado en la receta
  const [marginPercent, setMarginPercent] = useState(50); // valor global guardado
  // El valor temporal del slider en el dialog
  const [tempMargin, setTempMargin] = useState(marginPercent);
  const [updatingMargin, setUpdatingMargin] = useState(false);
  // Si tienes el id de la receta, úsalo aquí. Si no, deberás obtenerlo tras crearla.
  const [recetaId, setRecetaId] = useState<string | null>(null);
  const router = useRouter();
  const [recipeName, setRecipeName] = useState("");
  // Mock data for ingredients
  const [ingredients, setIngredients] = useState<
    { id: number; name: string; quantity: number; unit: string; cost: number; unitPrice: number; ingrediente_id?: string }[]
  >([]);
  const [saving, setSaving] = useState(false);
  // Contador para forzar el refresco del SelectIngredientDialog
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  // Estado para editar ingrediente
  const [editingIngredient, setEditingIngredient] = useState<any>(null);

  // Calcular precios dinámicamente según ingredientes y margen
  const calculatePricing = (customMargin?: number) => {
    const costoPlato = ingredients.reduce(
      (total, ingredient) => total + ingredient.cost,
      0
    );
    // Margen como porcentaje
    const margen = typeof customMargin === "number" ? customMargin : marginPercent;
    const ganancia = costoPlato > 0 ? (costoPlato * margen) / 100 : 0;
    const precioFinal = costoPlato + ganancia;
    return {
      costoPlato,
      ganancia,
      precioFinal,
    };
  };
  // Usar margen guardado para mostrar en la interfaz
  const pricingData = calculatePricing(marginPercent);

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now(), name: "", quantity: 0, unit: "kg", cost: 0, unitPrice: 0 },
    ]);
  };

  const handleRemoveIngredient = (id: number) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const handleAddIngredientFromDialog = (ingredient: {
    name: string;
    quantity: number;
    unit: string;
    unitPrice: number;
  }) => {
    // Calcular el costo total del ingrediente
    const cost = ingredient.quantity * ingredient.unitPrice;
    
    setIngredients([
      ...ingredients,
      {
        id: Date.now(),
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        cost: cost,
        unitPrice: ingredient.unitPrice
      },
    ]);
  };

  const handleSaveRecipe = async () => {
    // Validate recipe name
    if (!recipeName.trim()) {
      alert("Por favor, ingrese un nombre para la receta");
      return;
    }

    // Validate at least one ingredient
    if (ingredients.length === 0) {
      alert("Por favor, agregue al menos un ingrediente");
      return;
    }

    // Validate all ingredients have names
    if (ingredients.some(ing => !ing.name.trim())) {
      alert("Por favor, complete el nombre de todos los ingredientes");
      return;
    }

    setSaving(true);
    
    try {
      // Transform ingredients to match RecetaIngrediente type
      const recetaIngredientes = ingredients.map(ing => ({
        ingrediente_id: ing.name,
        cantidad_utilizada: ing.quantity,
        unidad: ing.unit,
        costo: ing.cost
      }));

      // Create recipe object matching Receta type
      const newReceta = {
        nombre: recipeName,
        ingredientes: recetaIngredientes,
        costo_total: pricingData.costoPlato,
        precio_sugerido: pricingData.precioFinal,
        margen_ganancia: marginPercent
      };

      // Save to Firestore
      const id = await createReceta(newReceta);
      setRecetaId(id);
      // Redirect to recipes page
      router.push("/dashboard/recetas");
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Error al guardar la receta. Por favor, intente nuevamente.");
    } finally {
      setSaving(false);
    }
  };


  const handleAddIngredientFromCommand = (ingredient: {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    cost: number;
    unitPrice: number;
    ingrediente_id: string;
  }) => {
    setIngredients([
      ...ingredients,
      ingredient,
    ]);
  };

  const handleIngredientCreated = () => {
    // Incrementar el contador para forzar el refresco del SelectIngredientDialog
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEditIngredient = (ingredient: any) => {
    setEditingIngredient(ingredient);
    setOpenAddIngredientDialog(true);
  };

  const handleCloseAddIngredientDialog = (open: boolean) => {
    setOpenAddIngredientDialog(open);
    if (!open) {
      setEditingIngredient(null);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Nueva receta</h1>
        {/* Top bar with Save button */}
              <div className="flex items-center justify-start mb-2">
                <Button onClick={handleSaveRecipe} disabled={saving} className="">
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Guardando..." : "Guardar receta"}
                </Button>
              </div>         
        </div>

        {/* Pricing Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Costo del plato</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">S/ {pricingData.costoPlato.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Ganancia
                  
                </CardTitle>
                
                <MarginDialog
                  open={openMarginDialog}
                  onOpenChange={setOpenMarginDialog}
                  tempMargin={tempMargin}
                  setTempMargin={setTempMargin}
                  marginPercent={marginPercent}
                  recetaId={recetaId}
                  updatingMargin={updatingMargin}
                  setUpdatingMargin={setUpdatingMargin}
                  setMarginPercent={setMarginPercent}
                  setOpenMarginDialog={setOpenMarginDialog}
                  calculatePricing={calculatePricing}
                  updateReceta={updateReceta}
                />
                
              </div>
            </CardHeader>
            <CardContent>
              
              <p className={`text-2xl font-bold ${marginPercent < 30 ? 'text-orange-500' : 'text-green-600'}`}>
                S/ {pricingData.ganancia.toFixed(2)}
              </p>
              <p className={`text-sm w-fit font-bold mt-2 border p-2 rounded-2xl bg-green-950 border-green-600 ${marginPercent < 0 ? 'text-red-500' : 'text-green-600'}`}>
                {marginPercent >= 0 ? '+' : ''}{marginPercent.toFixed(2)}%
              </p>
              {marginPercent < 30 && (
                <p className="text-orange-500 font-bold mt-2">¡Margen muy bajo!</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Precio final de venta</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">S/ {pricingData.precioFinal.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        {/* New Recipe Section */}
        <Card>
          <CardHeader>
            <CardTitle>Nueva receta</CardTitle>
            <CardDescription>
              Agrega cada ingrediente de tu receta y analiza su costo por unidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Recipe Name Input */}
              <div className="space-y-2">
                <Label htmlFor="recipe-name">Nombre de la receta</Label>
                <Input
                  id="recipe-name"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  placeholder="Ingrese el nombre de la receta"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Ingredientes del plato</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setOpenSelectIngredientDialog(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar ingrediente
                  </Button>
                  <Button onClick={() => setOpenAddIngredientDialog(true)}>
                    <Pen className="mr-2 h-4 w-4" />
                    Crear ingredientes
                  </Button>
                </div>
              </div>

              {/* Ingredients Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ingrediente</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Unidad</TableHead>
                    <TableHead>Precio unitario</TableHead>
                    <TableHead>Costo por ingrediente</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ingredients.map((ingredient) => (
                    <TableRow key={ingredient.id}>
                      <TableCell>
                        {ingredient.ingrediente_id ? (
                          // Si el ingrediente fue agregado desde el Command, mostrar como solo lectura
                          <span className="block w-full p-2">{ingredient.name}</span>
                        ) : (
                          // Si el ingrediente fue agregado manualmente, permitir edición
                          <Input
                            value={ingredient.name}
                            onChange={(e) => {
                              const newIngredients = [...ingredients];
                              const index = newIngredients.findIndex(
                                (ing) => ing.id === ingredient.id
                              );
                              newIngredients[index].name = e.target.value;
                              setIngredients(newIngredients);
                            }}
                            placeholder="Nombre del ingrediente"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={ingredient.quantity}
                          onChange={(e) => {
                            const newIngredients = [...ingredients];
                            const index = newIngredients.findIndex(
                              (ing) => ing.id === ingredient.id
                            );
                            newIngredients[index].quantity = parseFloat(
                              e.target.value
                            );
                            // Update cost based on quantity and unit price
                            newIngredients[index].cost =
                              newIngredients[index].quantity * newIngredients[index].unitPrice;
                            setIngredients(newIngredients);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {ingredient.ingrediente_id ? (
                          // Si el ingrediente fue agregado desde el Command, mantener unidad en gramos y no permitir edición
                          <span className="block w-full p-2">g</span>
                        ) : (
                          // Si el ingrediente fue agregado manualmente, permitir edición
                          <Select
                            value={ingredient.unit}
                            onValueChange={(value) => {
                              const newIngredients = [...ingredients];
                              const index = newIngredients.findIndex(
                                (ing) => ing.id === ingredient.id
                              );
                              newIngredients[index].unit = value;
                              setIngredients(newIngredients);
                            }}
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="g">g</SelectItem>
                              <SelectItem value="l">l</SelectItem>
                              <SelectItem value="ml">ml</SelectItem>
                              <SelectItem value="unidad">unidad</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </TableCell>
                      <TableCell>
                        {ingredient.ingrediente_id ? (
                          // Si el ingrediente fue agregado desde el Command, mostrar precio unitario como solo lectura
                          <span className="block w-full p-2">{ingredient.unitPrice.toFixed(4)}</span>
                        ) : (
                          // Si el ingrediente fue agregado manualmente, permitir edición
                          <Input
                            type="number"
                            value={ingredient.unitPrice}
                            onChange={(e) => {
                              const newIngredients = [...ingredients];
                              const index = newIngredients.findIndex(
                                (ing) => ing.id === ingredient.id
                              );
                              newIngredients[index].unitPrice = parseFloat(
                                e.target.value
                              );
                              // Update cost based on quantity and unit price
                              newIngredients[index].cost =
                                newIngredients[index].quantity * newIngredients[index].unitPrice;
                              setIngredients(newIngredients);
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell>S/ {ingredient.cost.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveIngredient(ingredient.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <AddIngredientDialog
        open={openAddIngredientDialog}
        onOpenChange={handleCloseAddIngredientDialog}
        onAddIngredient={handleAddIngredientFromDialog}
        onIngredientCreated={handleIngredientCreated}
        editingIngredient={editingIngredient}
      />
      <SelectIngredientDialog
        open={openSelectIngredientDialog}
        onOpenChange={setOpenSelectIngredientDialog}
        onAddIngredient={handleAddIngredientFromCommand}
        onEditIngredient={handleEditIngredient}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
}