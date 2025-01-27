import React from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "./components/layout/Header/Header";
import { ThemeProvider } from "./components/layout/ThemeProvider/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import { SidebarProvider } from "./components/ui/sidebar";
import { useSidebarState } from "./hooks/useSidebarState";
import { AppSidebar } from "./components/layout/AppSidebar/AppSidebar";
import { cn } from "./lib/utils";
import Home from "./components/pages/Home/Home";
import Members from "./components/pages/Members/Members";
import Tree from "./components/pages/Tree/Tree";

const Layout = () => {
  const [defaultOpen] = useSidebarState();

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex h-screen overflow-hidden">
        <div className="h-full shrink-0">
          <AppSidebar />
        </div>
        <div
          className={cn(
            "flex flex-col flex-1 transition-all duration-300 ease-in-out",
            defaultOpen ? "w-[calc(100%-16rem)]" : "w-[calc(100%-3rem)]"
          )}
        >
          <Header />
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/members" element={<Members />} />
            <Route path="/tree" element={<Tree />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
