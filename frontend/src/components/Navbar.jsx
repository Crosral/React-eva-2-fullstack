import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useUsuario } from "../context/UsuarioContext";

export default function Navbar() {
  const { carrito } = useCart();
  const totalUnidades = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const { usuarioActivo, cerrarSesion } = useUsuario();
  const navigate = useNavigate();

  function manejarCerrarSesion() {
    cerrarSesion();
    navigate("/inicio-sesion");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          FerreMarket
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                Productos
              </Link>
            </li>
            {usuarioActivo ? (
              <li className="nav-item dropdown">
                <span className="nav-link">
                  {usuarioActivo.nombre} ({usuarioActivo.rol})
                </span>
                <button className="btn btn-sm btn-outline-secondary ms-2" onClick={manejarCerrarSesion}>
                  Cerrar sesión
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/inicio-sesion">
                  Iniciar Sesión
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                🛒 Carrito ({totalUnidades})
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categorias">Categorías</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ofertas">Ofertas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs">Blogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactos">Contactos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}