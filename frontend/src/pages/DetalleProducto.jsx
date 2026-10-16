import { useParams, Link } from "react-router-dom";
import { leerProductoPorCodigo } from "../data/productos.js";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function DetalleProducto() {
  const { codigo } = useParams();
  const producto = leerProductoPorCodigo(codigo);
  const { agregarProducto } = useCart();
  const { mostrarToast } = useToast();

  if (!codigo) {
    return (
      <main className="container my-5">
        <div className="alert alert-warning text-center">
          <p className="m-0">No se especificó ningún producto.</p>
          <Link to="/productos" className="btn btn-primary mt-2">
            Ir al catálogo
          </Link>
        </div>
      </main>
    );
  }

  if (!producto) {
    return (
      <main className="container my-5">
        <div className="alert alert-danger text-center">
          <p className="m-0">
            Producto con código "<strong>{codigo}</strong>" no encontrado.
          </p>
          <Link to="/productos" className="btn btn-secondary mt-2">
            Volver a productos
          </Link>
        </div>
      </main>
    );
  }

  const stockCritico = producto.stock <= producto.stockCritico;

  function manejarAgregar() {
    agregarProducto(producto, 1);
    mostrarToast(`¡${producto.nombre} agregado al carrito!`, "🛒");
  }

  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">Detalle del producto</h1>

      <article className="producto detalle-producto card p-4 shadow-sm">
        <div className="row g-4 align-items-center">
          <div className="col-md-5 text-center">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded producto-imagen"
              style={{ maxHeight: "350px", objectFit: "contain" }}
            />
          </div>
          <div className="col-md-7 producto-info">
            <span className="badge bg-secondary mb-2">{producto.categoria}</span>
            <h3 className="fw-bold">{producto.nombre}</h3>
            <p className="text-muted">{producto.descripcion}</p>
            <p className="precio text-success fw-bold fs-3">
              ${producto.precio.toLocaleString("es-CL")}
            </p>
            <p className="mb-2">
              <strong>Stock disponible:</strong> {producto.stock} unidades
            </p>

            {stockCritico && (
              <p id="stockwarning" className="text-danger fw-bold">
                Alerta, el stock de este producto está en punto crítico
              </p>
            )}

            <div className="d-flex gap-2">
              <button
                className="btn btn-success boton-carrito"
                onClick={manejarAgregar}
                disabled={producto.stock === 0}
              >
                Agregar al carrito
              </button>
              <Link to="/productos" className="btn btn-outline-secondary">
                Volver a productos
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}