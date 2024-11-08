import React from "react";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md absolute top-0 w-full">
      <div className="flex justify-between items-center w-full py-4 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">TreeLink</h1>
        </div>
        <nav>
          <ul className="flex gap-6 text-lg">
            <ThemeToggle />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
