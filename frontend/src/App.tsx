import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import { ThemeProvider } from "./components/layout/ThemeProvider/ThemeProvider";
import { Home } from "./components/pages/Home/Home";
import { Members } from "./components/pages/Members/Members";
import { Tree } from "./components/pages/Tree/Tree";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/tree" element={<Tree />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
