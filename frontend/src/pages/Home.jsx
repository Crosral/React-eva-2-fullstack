import { Link } from "react-router-dom";
import { productosFijos, leerProductosEnOferta } from "../data/productos";

export default function Home() {
  const productosDestacados = productosFijos.slice(0, 4);
  const ofertas = leerProductosEnOferta().slice(0, 3);

  return (
    <>
      <main className="container my-4">
        <section id="inicio" className="p-5 mb-4 bg-light rounded-3 text-center text-dark">
          <h1 className="display-5 fw-bold text-dark">Bienvenido a FerreMarket</h1>
          <p className="fs-4 text-dark">
            Encuentra los mejores materiales y herramientas para tus proyectos agrícolas y del hogar.
          </p>
          <Link to="/productos" className="btn btn-primary btn-lg">
            Ver catálogo
          </Link>
        </section>

        {/* PRODUCTOS DESTACADOS */}
        <section className="productos-inicio">
          <h2 className="text-center mb-4">Productos destacados</h2>

          <div className="contenedor-productos">
            {productosDestacados.map((p) => (
              <article key={p.codigo} className="producto">
                <img src={p.imagen} alt={p.nombre} className="producto-imagen" />
                <div className="producto-info">
                  <p className="categoria-producto">{p.categoria}</p>
                  <h3>{p.nombre}</h3>
                  <p className="precio">${p.precio.toLocaleString("es-CL")}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/productos" className="btn btn-light">
              Ver todos los productos
            </Link>
          </div>
        </section>

        {/* OFERTAS DESTACADAS */}
        {ofertas.length > 0 && (
          <section className="productos-inicio my-5">
            <h2 className="text-center mb-4">Ofertas destacadas</h2>

            <div className="contenedor-productos">
              {ofertas.map((p) => {
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
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="text-center mt-4">
              <Link to="/ofertas" className="btn btn-light">
                Ver todas las ofertas
              </Link>
            </div>
          </section>
        )}

        <article className="my-5">
          <h2 className="text-center mb-4 text-white">¿Por qué FerreMarket es tu sitio de compra ideal?</h2>
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="card h-100 p-3 shadow-sm text-dark">
                <h5 className="card-title fw-bold text-dark">Calidad</h5>
                <p className="card-text text-dark">
                  Trabajamos directamente con marcas de renombre para garantizar la durabilidad de tus herramientas.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 p-3 shadow-sm text-dark">
                <h5 className="card-title fw-bold text-dark">Reembolso Garantizado</h5>
                <p className="card-text text-dark">
                  Procesamos reembolsos rápidos si tu producto presenta defectos de fábrica o no llega en buen estado.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 p-3 shadow-sm text-dark">
                <h5 className="card-title fw-bold text-dark">Seguridad</h5>
                <p className="card-text text-dark">
                  Nuestra pasarela de pagos se rige bajo los estrictos estándares de seguridad PCI DSS.
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer id="datosPlaceholder" className="bg-dark text-white p-4 mt-5">
        <div className="container text-center text-md-start">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5 className="text-uppercase fw-bold">FerreMarket™</h5>
              <address className="mb-0">
                Vicuña Mackenna 1420, Ñuñoa
                <br />
                Teléfono: +56 9 3757 1248
                <br />
                Correo:{" "}
                <a href="mailto:Tomas.villegas@totaltools.cl" className="text-white">
                  Tomas.villegas@totaltools.cl
                </a>
              </address>
            </div>
            <div className="col-md-6 text-md-end align-self-end">
              <p className="mb-0">FerreMarket. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}