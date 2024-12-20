import { GitFork } from "lucide-react";
import React from "react";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md absolute top-0 w-[100vw]">
      <div
        className="flex justify-between items-center w-full py-4 px-6 max-w-7xl mx-auto"
        style={{ maxWidth: "1440px" }}
      >
        <div className="flex items-center gap-3">
          <GitFork className="h-8 w-8 text-green-500" />
          <h1 className="text-2xl font-bold text-gray-800">TreeLink</h1>
        </div>
        <nav>
          <ul className="flex gap-6 text-lg">
            <a href="/" className="flex items-center gap-2">
              Accueil
            </a>
            <a href="/members" className="flex items-center gap-2">
              Membres
            </a>
            <ThemeToggle />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
