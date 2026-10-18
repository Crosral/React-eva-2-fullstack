import { useLocation, Link, Navigate } from "react-router-dom";

export default function CompraFallida() {
  const { state } = useLocation();

  if (!state?.motivo) return <Navigate to="/" replace />;

  return (
    <main className="container my-5 text-center" style={{ maxWidth: "600px" }}>
      <div className="bg-white text-dark p-4 rounded shadow-sm">
        <h1 className="text-danger mb-3">No se pudo procesar el pago ❌</h1>
        <p>{state.motivo}</p>

        <div className="d-flex gap-2 justify-content-center mt-4">
          <Link to="/checkout" className="btn btn-primary">Reintentar</Link>
          <Link to="/carrito" className="btn btn-outline-secondary">Volver al carrito</Link>
        </div>
      </div>
    </main>
  );
}