import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import MemberList from "./components/pages/MemberList/MemberList";
import Settings from "./components/pages/Settings/Settings";
import { Home } from "./components/pages/Home/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<MemberList />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
