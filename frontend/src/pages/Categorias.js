import { Link } from "react-router-dom";
import { leerTodosLosProductos } from "../data/productos";

export default function Categorias() {
  const productos = leerTodosLosProductos();

  const categorias = Array.from(
    productos.reduce((mapa, p) => {
      mapa.set(p.categoria, (mapa.get(p.categoria) || 0) + 1);
      return mapa;
    }, new Map())
  );

  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">Categorías</h1>

      <div className="row g-3">
        {categorias.map(([categoria, cantidad]) => (
          <div key={categoria} className="col-md-4">
            <Link
              to={`/categorias/${encodeURIComponent(categoria.toLowerCase())}`}
              className="card p-4 text-center text-decoration-none"
            >
              <h3 className="text-dark">{categoria}</h3>
              <p className="text-muted m-0">{cantidad} producto(s)</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}