import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Carrito() {
  const { carrito, cambiarCantidad, eliminarProducto, vaciarCarrito, total } = useCart();
  const navigate = useNavigate();

  if (carrito.length === 0) {
    return (
      <main className="container my-4">
        <section className="carrito">
          <h2>🛒 Tu Carrito de Compras</h2>
          <div className="carrito-vacio my-4">
            <h3>Tu carrito está vacío.</h3>
            <p>Agrega productos desde nuestro catálogo para continuar.</p>
            <Link to="/productos" className="btn btn-primary">
              Ver productos
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="container my-4">
      <section className="carrito">
        <h2>🛒 Tu Carrito de Compras</h2>

        <div id="lista-carrito">
          {carrito.map((prod) => (
            <article
              key={prod.codigo}
              className="producto-carrito d-flex align-items-center mb-3 p-2 border rounded"
            >
              <img
                src={prod.imagen}
                alt={prod.nombre}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  background: "#fff",
                  borderRadius: "4px",
                }}
              />
              <div className="informacion-carrito ms-3 me-auto text-start">
                <h4 className="m-0">{prod.nombre}</h4>
                <p className="m-0">${prod.precio.toLocaleString("es-CL")}</p>
                <div className="cantidad d-flex align-items-center gap-2 mt-1">
                  <button
                    className="btn btn-sm btn-outline-light"
                    onClick={() => cambiarCantidad(prod.codigo, -1)}
                  >
                    -
                  </button>
                  <span>{prod.cantidad}</span>
                  <button
                    className="btn btn-sm btn-outline-light"
                    onClick={() => cambiarCantidad(prod.codigo, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => eliminarProducto(prod.codigo)}
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>

        <div id="resumen-carrito">
          <div className="total-carrito border-top pt-3 mt-3">
            <h3>Total: ${total.toLocaleString("es-CL")}</h3>
            <button className="btn btn-secondary me-2" onClick={vaciarCarrito}>
              Vaciar carrito
            </button>
            <button
              className="btn btn-success"
              disabled={carrito.length === 0}
              onClick={() => navigate("/checkout")}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Carrito;