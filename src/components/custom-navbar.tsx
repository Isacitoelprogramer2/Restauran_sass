"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomNavbarProps {
  className?: string;
}

const CustomNavbar: React.FC<CustomNavbarProps> = ({ className }) => {
  return (
    <nav className={cn("bg-background border-b border-border w-full py-4", className)}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-primary w-8 h-8 rounded-md"></div>
          <span className="text-xl font-bold text-foreground">Restauran_sass</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">
            Características
          </a>
          <a href="#testimonials" className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">
            Testimonios
          </a>
          <a href="#pricing" className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">
            Precios
          </a>
          <a href="#faq" className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">
            FAQ
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:inline-flex focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">
            Iniciar sesión
          </Button>
          <Button variant="default" className="focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">
            Registrarse
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;