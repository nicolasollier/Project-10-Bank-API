import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Index from "./views/Index";
import Signin from "./views/Signin";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
