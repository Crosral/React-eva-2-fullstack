import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUsuario } from "../context/UsuarioContext";
import { comunasPorRegion } from "../data/productos";
import { esCorreoValido } from "../utils/validarCorreo";

export default function Checkout() {
  const { carrito, total, crearOrden, vaciarCarrito } = useCart();
  const { usuarioActivo } = useUsuario();
  const navigate = useNavigate();

  const [valores, setValores] = useState({
    nombre: usuarioActivo ? `${usuarioActivo.nombre} ${usuarioActivo.apellidos || ""}`.trim() : "",
    correo: usuarioActivo ? usuarioActivo.correo : "",
    region: usuarioActivo ? usuarioActivo.region || "" : "",
    comuna: usuarioActivo ? usuarioActivo.comuna || "" : "",
    direccion: usuarioActivo ? usuarioActivo.direccion || "" : "",
    metodoEntrega: "despacho",
    metodoPago: "tarjeta",
    numeroTarjeta: "",
  });
  const [errores, setErrores] = useState({});

  function actualizarCampo(campo, valor) {
    setValores((prev) => (campo === "region" ? { ...prev, region: valor, comuna: "" } : { ...prev, [campo]: valor }));
  }

  if (carrito.length === 0) {
    return (
      <main className="container my-5 text-center">
        <h1 className="mb-3">Checkout</h1>
        <p>Tu carrito está vacío, no hay nada que pagar.</p>
        <Link to="/productos" className="btn btn-primary">Ver productos</Link>
      </main>
    );
  }

  function validar() {
    const nuevosErrores = {};

    if (!valores.nombre.trim()) nuevosErrores.nombre = true;
    if (!valores.correo.trim() || !esCorreoValido(valores.correo)) nuevosErrores.correo = true;
    if (!valores.region) nuevosErrores.region = true;
    if (!valores.comuna) nuevosErrores.comuna = true;
    if (!valores.direccion.trim() || valores.direccion.length > 300) nuevosErrores.direccion = true;

    if (valores.metodoPago === "tarjeta") {
      const soloNumeros = valores.numeroTarjeta.replace(/\s/g, "");
      if (!/^\d{16}$/.test(soloNumeros)) nuevosErrores.numeroTarjeta = true;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function manejarEnvio(e) {
    e.preventDefault();
    if (!validar()) return;

    const datosEnvio = {
      nombre: valores.nombre.trim(),
      correo: valores.correo.trim(),
      region: valores.region,
      comuna: valores.comuna,
      direccion: valores.direccion.trim(),
      metodoEntrega: valores.metodoEntrega,
      metodoPago: valores.metodoPago,
    };

    // Simulación de rechazo de pago: cualquier tarjeta que empiece en "0000"
    const tarjetaRechazada =
      valores.metodoPago === "tarjeta" && valores.numeroTarjeta.replace(/\s/g, "").startsWith("0000");

    if (tarjetaRechazada) {
      navigate("/compra-fallida", {
        state: { motivo: "El banco rechazó el pago. Verifica los datos de tu tarjeta e intenta nuevamente." },
      });
      return;
    }

    const orden = crearOrden(usuarioActivo, datosEnvio);
    vaciarCarrito();
    navigate("/compra-exitosa", { state: { orden } });
  }

  const comunasDisponibles = comunasPorRegion[valores.region] || [];

  return (
    <main className="container my-5" style={{ maxWidth: "700px" }}>
      <h1 className="text-center mb-4">Checkout</h1>

      <section className="bg-white text-dark p-4 rounded shadow-sm mb-4">
        <h5>Resumen</h5>
        {carrito.map((p) => (
          <div key={p.codigo} className="d-flex justify-content-between">
            <span>{p.nombre} x{p.cantidad}</span>
            <span>${(p.precio * p.cantidad).toLocaleString("es-CL")}</span>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>${total.toLocaleString("es-CL")}</span>
        </div>
      </section>

      <section className="bg-white text-dark p-4 rounded shadow-sm">
        <form noValidate onSubmit={manejarEnvio}>
          <h5 className="mb-3">Dirección de envío</h5>

          <div className="mb-3">
            <label className="form-label">Nombre completo *</label>
            <input
              type="text"
              className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
              value={valores.nombre}
              onChange={(e) => actualizarCampo("nombre", e.target.value)}
            />
            <div className="invalid-feedback">El nombre es obligatorio.</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Correo *</label>
            <input
              type="email"
              className={`form-control ${errores.correo ? "is-invalid" : ""}`}
              value={valores.correo}
              onChange={(e) => actualizarCampo("correo", e.target.value)}
            />
            <div className="invalid-feedback">El correo es obligatorio.</div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Región *</label>
              <select
                className={`form-select ${errores.region ? "is-invalid" : ""}`}
                value={valores.region}
                onChange={(e) => actualizarCampo("region", e.target.value)}
              >
                <option value="">-- Seleccione región --</option>
                <option value="RM">Región Metropolitana</option>
                <option value="ARAUCANIA">Araucanía</option>
                <option value="NUBLE">Ñuble</option>
              </select>
              <div className="invalid-feedback">Selecciona una región.</div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Comuna *</label>
              <select
                className={`form-select ${errores.comuna ? "is-invalid" : ""}`}
                value={valores.comuna}
                onChange={(e) => actualizarCampo("comuna", e.target.value)}
                disabled={comunasDisponibles.length === 0}
              >
                <option value="">-- Seleccione comuna --</option>
                {comunasDisponibles.map((nombre) => (
                  <option key={nombre} value={nombre.toLowerCase()}>{nombre}</option>
                ))}
              </select>
              <div className="invalid-feedback">Selecciona una comuna.</div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Dirección *</label>
            <input
              type="text"
              className={`form-control ${errores.direccion ? "is-invalid" : ""}`}
              value={valores.direccion}
              onChange={(e) => actualizarCampo("direccion", e.target.value)}
            />
            <div className="invalid-feedback">Dirección obligatoria, máximo 300 caracteres.</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Opción de entrega</label>
            <select
              className="form-select"
              value={valores.metodoEntrega}
              onChange={(e) => actualizarCampo("metodoEntrega", e.target.value)}
            >
              <option value="despacho">Despacho a domicilio</option>
              <option value="retiro">Retiro en tienda</option>
            </select>
          </div>

          <hr />
          <h5 className="mb-3">Método de pago</h5>

          <div className="mb-3">
            <select
              className="form-select"
              value={valores.metodoPago}
              onChange={(e) => actualizarCampo("metodoPago", e.target.value)}
            >
              <option value="tarjeta">Tarjeta de crédito / débito</option>
              <option value="transferencia">Transferencia bancaria</option>
            </select>
          </div>

          {valores.metodoPago === "tarjeta" && (
            <div className="mb-3">
              <label className="form-label">Número de tarjeta *</label>
              <input
                type="text"
                placeholder="4111 1111 1111 1111"
                className={`form-control ${errores.numeroTarjeta ? "is-invalid" : ""}`}
                value={valores.numeroTarjeta}
                onChange={(e) => actualizarCampo("numeroTarjeta", e.target.value)}
              />
              <div className="invalid-feedback">Ingresa 16 dígitos válidos.</div>
              <small className="text-muted">
                Para probar un pago rechazado, usa un número que empiece en 0000.
              </small>
            </div>
          )}

          <button type="submit" className="btn btn-success w-100 mt-3">
            Pagar ${total.toLocaleString("es-CL")}
          </button>
        </form>
      </section>
    </main>
  );
}