import { useParams, Link } from "react-router-dom";
import { leerTodosLosProductos } from "../data/productos";
import ProductCard from "../components/ProductCard";

export default function CategoriaDetalle() {
  const { categoria } = useParams();
  const productos = leerTodosLosProductos().filter(
    (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
  );

  return (
    <main className="container my-5">
      <h1 className="text-center mb-4 text-capitalize">{categoria}</h1>

      {productos.length === 0 ? (
        <p className="text-center">No hay productos en esta categoría.</p>
      ) : (
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {productos.map((p) => (
            <ProductCard key={p.codigo} producto={p} />
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <Link to="/categorias" className="btn btn-outline-secondary">Volver a categorías</Link>
      </div>
    </main>
  );
}