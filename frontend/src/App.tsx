import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import { Home } from "./components/pages/Home/Home";
import { Members } from "./components/pages/Members/Members";
import Settings from "./components/pages/Settings/Settings";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
