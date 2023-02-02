import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout";
import Home from "./pages/home";
import Channel from "./pages/channel";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/channel/:channelId" element={<Channel />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;