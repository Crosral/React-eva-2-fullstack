import { useLocation, Link, Navigate } from "react-router-dom";

export default function CompraExitosa() {
  const { state } = useLocation();
  const orden = state?.orden;

  if (!orden) return <Navigate to="/" replace />;

  return (
    <main className="container my-5 text-center" style={{ maxWidth: "600px" }}>
      <div className="bg-white text-dark p-4 rounded shadow-sm">
        <h1 className="text-success mb-3">¡Compra exitosa! 🎉</h1>
        <p>Gracias por tu compra. Tu pedido ha sido registrado correctamente.</p>

        <div className="text-start border-top pt-3 mt-3">
          <p><strong>Número de orden:</strong> {orden.id}</p>
          <p><strong>Fecha:</strong> {orden.fecha}</p>
          <p><strong>Enviado a:</strong> {orden.envio.direccion}, {orden.envio.comuna}</p>
          <p><strong>Total:</strong> ${orden.total.toLocaleString("es-CL")}</p>
        </div>

        <Link to="/productos" className="btn btn-primary mt-3">
          Seguir comprando
        </Link>
      </div>
    </main>
  );
}