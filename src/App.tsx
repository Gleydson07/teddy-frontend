import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import { LayoutWithSidebar } from "./Layouts/LayoutWithSidebar";
import SelectedClients from "./pages/SelectedClients";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<LayoutWithSidebar />}>
          <Route path="/clientes/selecionados" element={<SelectedClients />} />
          <Route path="/clientes" element={<Clients />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
