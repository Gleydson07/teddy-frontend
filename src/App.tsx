import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Clients from "./pages/Clients";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clients />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
