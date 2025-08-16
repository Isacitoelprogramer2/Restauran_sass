"use client";

import { useEffect, useState } from "react";
import { getDocuments } from "@/lib/firebase/firestore";
import type { Receta } from "@/types/receta";

export default function RecetasPage() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecetas() {
      setLoading(true);
      const data = await getDocuments("Recetas");
      setRecetas(data as Receta[]);
      setLoading(false);
    }
    fetchRecetas();
  }, []);

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <h1 className="text-2xl font-bold">Recetas</h1>
          <p className="text-muted-foreground">Gestiona tus recetas aquí</p>
        </div>
        {loading ? (
          <p>Cargando recetas...</p>
        ) : (
          <ul className="px-4 lg:px-6">
            {recetas.map((receta) => (
              <li key={receta.id} className="border-b py-2">
                <strong>{receta.nombre}</strong> <br />
                Ingredientes: {receta.ingredientes.map(i => i.ingrediente_id).join(", ")}
                <br />Costo total: ${receta.costo_total}
                <br />Precio sugerido: ${receta.precio_sugerido}
                <br />Margen de ganancia: ${receta.margen_ganancia}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}