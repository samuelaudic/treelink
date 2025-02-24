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
import Home from "./components/pages/Home/Home";
import Members from "./components/pages/Members/Members";
import Tree from "./components/pages/Tree/Tree";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <div className="flex flex-col h-screen w-[100vw]">
      <Header />
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
