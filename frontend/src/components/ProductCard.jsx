import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function ProductCard({ producto }) {
  const { agregarProducto } = useCart();
  const { mostrarToast } = useToast();

  const agotado = producto.stock <= 0;
  const stockCritico = !agotado && producto.stock <= producto.stockCritico;

  function manejarAgregar() {
    if (agotado) return;
    agregarProducto(producto);
    mostrarToast(`¡${producto.nombre} agregado al carrito!`, "🛒");
  }

  return (
    <article className="producto" style={{ position: "relative" }}>
      {agotado && (
        <span
          className="badge bg-secondary"
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          Agotado
        </span>
      )}
      {stockCritico && (
        <span
          className="badge bg-warning text-dark"
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          ¡Últimas unidades!
        </span>
      )}

      <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />

      <div className="producto-info">
        <p className="categoria-producto">{producto.categoria}</p>

        <h3>{producto.nombre}</h3>

        <p className="precio">${producto.precio.toLocaleString("es-CL")}</p>

        <Link to={`/productos/${producto.codigo}`} className="btn btn-light mb-2">
          Ver detalle
        </Link>

        <button
          className="boton-carrito"
          onClick={manejarAgregar}
          disabled={agotado}
          style={agotado ? { opacity: 0.6, cursor: "not-allowed" } : undefined}
        >
          {agotado ? "Sin stock" : "Agregar al carrito"}
        </button>
      </div>
    </article>
  );
}