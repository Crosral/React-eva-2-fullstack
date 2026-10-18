import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";
import AdminProductos from "./admin/AdminProductos";
import AdminUsuarios from "./admin/AdminUsuarios";
import AdminOrdenes from "./admin/AdminOrdenes";

export default function Admin() {
  const { usuarioActivo, cerrarSesion } = useUsuario();
  const navigate = useNavigate();
  const [seccion, setSeccion] = useState(null);

  useEffect(() => {
    if (!usuarioActivo) {
      navigate("/inicio-sesion");
      return;
    }
    if (!["Administrador", "Vendedor"].includes(usuarioActivo.rol)) {
      alert("No tienes permisos para acceder a esta página.");
      navigate("/");
      return;
    }
    setSeccion(usuarioActivo.rol === "Vendedor" ? "productos" : "productos");
  }, [usuarioActivo, navigate]);

  if (!usuarioActivo || !seccion) return null; // evita parpadeo mientras redirige

  const esAdministrador = usuarioActivo.rol === "Administrador";

  function manejarCerrarSesion() {
    cerrarSesion();
    navigate("/inicio-sesion");
  }

  return (
    <main className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="m-0">Panel de administración</h1>
          <small className="text-muted">{usuarioActivo.nombre} ({usuarioActivo.rol})</small>
        </div>
        <button className="btn btn-outline-secondary" onClick={manejarCerrarSesion}>Cerrar sesión</button>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${seccion === "productos" ? "active" : ""}`} onClick={() => setSeccion("productos")}>
            Productos
          </button>
        </li>
        {esAdministrador && (
          <li className="nav-item">
            <button className={`nav-link ${seccion === "usuarios" ? "active" : ""}`} onClick={() => setSeccion("usuarios")}>
              Usuarios
            </button>
          </li>
        )}
        <li className="nav-item">
          <button className={`nav-link ${seccion === "ordenes" ? "active" : ""}`} onClick={() => setSeccion("ordenes")}>
            Órdenes
          </button>
        </li>
      </ul>

      {seccion === "productos" && <AdminProductos />}
      {seccion === "usuarios" && esAdministrador && <AdminUsuarios />}
      {seccion === "ordenes" && <AdminOrdenes />}
    </main>
  );
}