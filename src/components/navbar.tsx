import React from 'react';

interface NavBarProps {
  brand: string;
}

const NavBar: React.FC<NavBarProps> = ({ brand }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{brand}</h1>
        <ul className="flex space-x-4">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Acerca de</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;