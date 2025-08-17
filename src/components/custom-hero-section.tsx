"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const CustomHeroSection = () => {
  return (
    <section className="relative bg-background py-16 lg:flex lg:min-h-180 lg:items-center lg:py-24">
      <div className="mx-auto flex w-full max-w-container items-center px-4 md:px-8">
        <div className="flex flex-col items-start md:max-w-3xl lg:w-1/2 lg:pr-8">
          <Badge variant="secondary" className="mb-4">
            Nueva versión disponible
          </Badge>

          <h1 className="mt-4 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Optimiza los costos de tu restaurante
          </h1>
          
          <p className="mt-4 text-lg text-muted-foreground md:mt-6 md:max-w-lg md:text-xl">
            Restauran_sass es la solución profesional para calcular costos operativos y proyectar el flujo de caja en restaurantes. 
            Toma decisiones informadas y mejora la rentabilidad de tu negocio gastronómico.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">
              Comenzar ahora
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">
              Ver demo
            </Button>
          </div>
        </div>
      </div>
      
      <div className="relative mt-16 h-60 w-full px-4 md:h-95 md:px-8 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-full lg:w-1/2 lg:px-0">
        <div className="inset-0 size-full rounded-lg bg-muted flex items-center justify-center">
          <div className="text-center">
            <div className="bg-primary w-16 h-16 rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Imagen de dashboard</p>
          </div>
        </div>
      </div>
    </section>
  );
};