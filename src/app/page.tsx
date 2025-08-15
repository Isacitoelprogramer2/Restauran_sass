import Image from "next/image";
import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center 
min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Posicionar el componente NavBar en la parte superior de la página */}
      <NavBar brand="Mi Restaurante" />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Resto del contenido de la página */}
      </main>
      {/* Posicionar el footer en la parte inferior de la página */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* Contenido del footer */}
      </footer>
    </div>
  );
}
