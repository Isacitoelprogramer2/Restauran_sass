import { Ingrediente } from "./ingrediente";

export interface RecetaIngrediente {
  ingrediente_id: string; // Referencia al ingrediente
  cantidad_utilizada: number;
  unidad: string;
  costo: number;
}

export interface Receta {
  id: string; // ID de la receta
  nombre: string;
  ingredientes: RecetaIngrediente[];
  costo_total: number;
  precio_sugerido: number;
  margen_ganancia: number;
}
