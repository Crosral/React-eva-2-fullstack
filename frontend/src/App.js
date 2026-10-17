import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Carrito from "./pages/Carrito.jsx";
import InicioSesion from "./pages/InicioSesion.jsx";

 function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:codigo" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
      </Routes>
    </>
  );
}

export default App;
