//dependencies
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//views
import Layout from "./layout/Layout";
import Index from "./views/Index";
import Signin from "./views/Signin";
import NotFound from "./views/NotFound";
import ProfilePage from "./views/ProfilePage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
