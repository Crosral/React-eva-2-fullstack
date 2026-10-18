import { useState } from "react";
import { obtenerOrdenes } from "../../data/ordenes";

export default function AdminOrdenes() {
  const [ordenes] = useState(obtenerOrdenes());
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  if (ordenSeleccionada) {
    const orden = ordenSeleccionada;
    return (
      <div>
        <h3>Orden {orden.id}</h3>
        <p><strong>Fecha:</strong> {orden.fecha}</p>
        <p><strong>Cliente:</strong> {orden.cliente} ({orden.correo})</p>
        <p><strong>Estado:</strong> {orden.estado}</p>

        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead>
            <tbody>
              {orden.productos.map((p) => (
                <tr key={p.codigo || p.nombre}>
                  <td>{p.nombre}</td>
                  <td>${p.precio.toLocaleString("es-CL")}</td>
                  <td>{p.cantidad}</td>
                  <td>${(p.precio * p.cantidad).toLocaleString("es-CL")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5 className="text-end">Total: ${orden.total.toLocaleString("es-CL")}</h5>
        <button className="btn btn-secondary" onClick={() => setOrdenSeleccionada(null)}>Volver</button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-3">Órdenes</h3>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead><tr><th>ID</th><th>Fecha</th><th>Cliente</th><th>Total</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {ordenes.length === 0 ? (
              <tr><td colSpan={6} className="text-center">Aún no hay órdenes registradas.</td></tr>
            ) : (
              ordenes.slice().reverse().map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.fecha}</td>
                  <td>{o.cliente}</td>
                  <td>${o.total.toLocaleString("es-CL")}</td>
                  <td><span className="badge bg-warning text-dark">{o.estado}</span></td>
                  <td><button className="btn btn-sm btn-primary" onClick={() => setOrdenSeleccionada(o)}>Ver detalle</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}