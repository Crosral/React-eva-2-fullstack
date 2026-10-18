import { useToast } from "../context/ToastContext";
import { useCart } from "../context/CartContext";
import { leerProductosEnOferta } from "../data/productos";

function Ofertas() {
  const productos = leerProductosEnOferta();
  const { agregarProducto } = useCart();
  const { mostrarToast } = useToast();

  function manejarAgregar(producto) {
    agregarProducto({ ...producto, precio: producto.precioOferta });
    mostrarToast(`¡${producto.nombre} agregado al carrito!`, "🛒");
  }

  return (
    <main className="container my-5">
      <h1 className="text-center mb-2">Ofertas</h1>
      <p className="text-center descripcion mb-4">
        Productos con descuento por tiempo limitado.
      </p>

      {productos.length === 0 ? (
        <p className="text-center">No hay ofertas disponibles en este momento.</p>
      ) : (
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {productos.map((p) => {
            const descuento = Math.round((1 - p.precioOferta / p.precio) * 100);
            return (
              <article key={p.codigo} className="producto" style={{ position: "relative" }}>
                <span
                  className="badge bg-danger"
                  style={{ position: "absolute", top: "10px", right: "10px" }}
                >
                  -{descuento}%
                </span>
                <img src={p.imagen} alt={p.nombre} className="producto-imagen" />
                <div className="producto-info">
                  <p className="categoria-producto">{p.categoria}</p>
                  <h3>{p.nombre}</h3>
                  <p className="m-0">
                    <span className="text-decoration-line-through text-muted me-2">
                      ${p.precio.toLocaleString("es-CL")}
                    </span>
                    <span className="precio text-danger fw-bold">
                      ${p.precioOferta.toLocaleString("es-CL")}
                    </span>
                  </p>
                  <button className="btn btn-light mt-2" onClick={() => manejarAgregar(p)}>
                    Agregar al carrito
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Ofertas