import { Link } from "react-router-dom";
import { blogs } from "../data/blogs";

export default function Blogs() {
  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">Blog</h1>
      <div className="row g-4">
        {blogs.map((b) => (
          <div className="col-md-6" key={b.slug}>
            <div className="card h-100 shadow-sm">
              <img src={b.imagen} className="card-img-top" alt={b.titulo} />
              <div className="card-body">
                <h3 className="card-title">{b.titulo}</h3>
                <p className="card-text">{b.resumen}</p>
                <Link to={`/blogs/${b.slug}`} className="btn btn-primary">
                  Leer más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}