import { useState } from "react";
import { esCorreoValido } from "../utils/validarCorreo";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [comentario, setComentario] = useState("");
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function validar() {
    const nuevosErrores = {};

    if (nombre.trim() === "" || nombre.length > 100) {
      nuevosErrores.nombre = true;
    }

    const correoIngresado = correo.trim().toLowerCase();
    if (correoIngresado !== "" && (correoIngresado.length > 100 || !esCorreoValido(correoIngresado))) {
      nuevosErrores.correo = true;
    }

    if (comentario.trim() === "" || comentario.length > 500) {
      nuevosErrores.comentario = true;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function manejarEnvio(e) {
    e.preventDefault();

    if (!validar()) {
      setEnviado(false);
      return;
    }

    alert("Mensaje enviado correctamente.");
    setNombre("");
    setCorreo("");
    setComentario("");
    setErrores({});
    setEnviado(true);
  }

  return (
    <main className="container my-5" style={{ maxWidth: "700px" }}>
      <h1 className="text-center mb-4">Contacto</h1>

      <section className="bg-white text-dark p-4 rounded shadow-sm">
        <form id="form-contacto" noValidate onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label htmlFor="contactoNombre" className="form-label">
              Nombre *
            </label>
            <input
              type="text"
              className={`form-control ${errores.nombre ? "is-invalid" : enviado ? "is-valid" : ""}`}
              id="contactoNombre"
              maxLength={100}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <div className="invalid-feedback">
              El nombre es obligatorio y debe tener máximo 100 caracteres.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="contactoCorreo" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className={`form-control ${errores.correo ? "is-invalid" : ""}`}
              id="contactoCorreo"
              maxLength={100}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <div className="invalid-feedback">
              Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="contactoComentario" className="form-label">
              Comentario *
            </label>
            <textarea
              className={`form-control ${errores.comentario ? "is-invalid" : enviado ? "is-valid" : ""}`}
              id="contactoComentario"
              rows={5}
              maxLength={500}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
            <div className="invalid-feedback">
              El comentario es obligatorio y debe tener máximo 500 caracteres.
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Enviar mensaje
          </button>
        </form>
      </section>
    </main>
  );
}