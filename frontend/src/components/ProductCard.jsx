import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function ProductCard({ producto }) {
  const { agregarProducto } = useCart();
  const { mostrarToast } = useToast();

  function manejarAgregar() {
    agregarProducto(producto, 1);
    mostrarToast(`¡${producto.nombre} agregado al carrito!`, "🛒");
  }

  return (
    <article className="producto">
      <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />

      <div className="producto-info">
        <p className="categoria-producto">{producto.categoria}</p>

        <h3>{producto.nombre}</h3>

        <p className="precio">${producto.precio.toLocaleString("es-CL")}</p>

        <Link to={`/productos/${producto.codigo}`} className="btn btn-light mb-2">
          Ver detalle
        </Link>

        <button className="boton-carrito" onClick={manejarAgregar}>
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}