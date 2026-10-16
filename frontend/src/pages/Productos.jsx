import { useMemo, useState } from "react";
import { leerTodosLosProductos } from "../data/productos.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Productos() {
  const [filtro, setFiltro] = useState("");
  const todosLosProductos = useMemo(() => leerTodosLosProductos(), []);

  const productosFiltrados = todosLosProductos.filter((producto) =>
    producto.nombre.toUpperCase().includes(filtro.toUpperCase())
  );

  return (
    <main className="container my-4">
      <form className="d-flex mb-4" role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Buscar..."
          aria-label="Search"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Buscar
        </button>
      </form>

      <h2>Catálogo de productos</h2>

      <section className="contenedor-productos">
        {productosFiltrados.map((producto) => (
          <ProductCard key={producto.codigo} producto={producto} />
        ))}

        {productosFiltrados.length === 0 && (
          <p className="text-center w-100">No se encontraron productos.</p>
        )}
      </section>
    </main>
  );
}