import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";
import { validarRunChile } from "../utils/validarRunChile";
import { DOMINIOS_PERMITIDOS } from "../data/usuarios";
import { comunasPorRegion } from "../data/productos";

const estadoInicial = {
  run: "",
  nombre: "",
  apellidos: "",
  correo: "",
  telefono: "",
  region: "",
  comuna: "",
  direccion: "",
  fechaNacimiento: "",
  clave: "",
  confirmarClave: "",
};

export default function Registro() {
  const { registrarUsuario } = useUsuario();
  const navigate = useNavigate();

  const [valores, setValores] = useState(estadoInicial);
  const [errores, setErrores] = useState({});

  function actualizarCampo(campo, valor) {
    setValores((prev) => {
      // si cambia la región, limpiamos la comuna seleccionada
      if (campo === "region") return { ...prev, region: valor, comuna: "" };
      return { ...prev, [campo]: valor };
    });
  }

  function validar() {
    const nuevosErrores = {};

    const run = valores.run.trim().toUpperCase();
    if (!validarRunChile(run)) nuevosErrores.run = true;

    if (!valores.nombre.trim() || valores.nombre.length > 50) nuevosErrores.nombre = true;

    if (!valores.apellidos.trim() || valores.apellidos.length > 100) {
      nuevosErrores.apellidos = true;
    }

    const correo = valores.correo.trim().toLowerCase();
    const dominioValido = DOMINIOS_PERMITIDOS.some((d) => correo.endsWith(d));
    if (!correo || correo.length > 100 || !dominioValido) nuevosErrores.correo = true;

    if (valores.telefono.trim() !== "" && valores.telefono.trim().length < 9) {
      nuevosErrores.telefono = true;
    }

    if (!valores.region) nuevosErrores.region = true;
    if (!valores.comuna) nuevosErrores.comuna = true;

    if (!valores.direccion.trim() || valores.direccion.length > 300) {
      nuevosErrores.direccion = true;
    }

    if (valores.clave.length < 4 || valores.clave.length > 10) nuevosErrores.clave = true;

    if (!valores.confirmarClave.trim() || valores.confirmarClave !== valores.clave) {
      nuevosErrores.confirmarClave = true;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function manejarEnvio(e) {
    e.preventDefault();
    if (!validar()) return;

    const resultado = registrarUsuario({
      run: valores.run.trim().toUpperCase(),
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
      correo: valores.correo.trim().toLowerCase(),
      telefono: valores.telefono.trim(),
      region: valores.region,
      comuna: valores.comuna,
      direccion: valores.direccion.trim(),
      fechaNacimiento: valores.fechaNacimiento,
      clave: valores.clave,
      rol: "Cliente",
    });

    if (!resultado.ok) {
      alert(resultado.error);
      return;
    }

    alert("Registro completado con éxito.");
    setValores(estadoInicial);
    setErrores({});
    navigate("/inicio-sesion");
  }

  const comunasDisponibles = comunasPorRegion[valores.region] || [];

  return (
    <main className="container my-5" style={{ maxWidth: "650px" }}>
      <h1 className="text-center mb-4">Crear cuenta</h1>

      <section className="bg-white text-dark p-4 rounded shadow-sm">
        <form id="form-Registrarse" noValidate onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label htmlFor="run" className="form-label">RUN *</label>
            <input
              type="text"
              id="run"
              placeholder="12345678K"
              className={`form-control ${errores.run ? "is-invalid" : ""}`}
              value={valores.run}
              onChange={(e) => actualizarCampo("run", e.target.value)}
            />
            <div className="invalid-feedback">RUN inválido.</div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="RegistrarNombre" className="form-label">Nombre *</label>
              <input
                type="text"
                id="RegistrarNombre"
                className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                value={valores.nombre}
                onChange={(e) => actualizarCampo("nombre", e.target.value)}
              />
              <div className="invalid-feedback">
                Nombre obligatorio, máximo 50 caracteres.
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="RegistrarApellidos" className="form-label">Apellidos *</label>
              <input
                type="text"
                id="RegistrarApellidos"
                className={`form-control ${errores.apellidos ? "is-invalid" : ""}`}
                value={valores.apellidos}
                onChange={(e) => actualizarCampo("apellidos", e.target.value)}
              />
              <div className="invalid-feedback">
                Apellidos obligatorios, máximo 100 caracteres.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="RegistrarCorreo" className="form-label">Correo electrónico *</label>
            <input
              type="email"
              id="RegistrarCorreo"
              className={`form-control ${errores.correo ? "is-invalid" : ""}`}
              value={valores.correo}
              onChange={(e) => actualizarCampo("correo", e.target.value)}
            />
            <div className="invalid-feedback">
              Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input
              type="text"
              id="telefono"
              className={`form-control ${errores.telefono ? "is-invalid" : ""}`}
              value={valores.telefono}
              onChange={(e) => actualizarCampo("telefono", e.target.value)}
            />
            <div className="invalid-feedback">
              El teléfono debe tener al menos 9 caracteres.
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="region" className="form-label">Región *</label>
              <select
                id="region"
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
              <label htmlFor="comuna" className="form-label">Comuna *</label>
              <select
                id="comuna"
                className={`form-select ${errores.comuna ? "is-invalid" : ""}`}
                value={valores.comuna}
                onChange={(e) => actualizarCampo("comuna", e.target.value)}
                disabled={comunasDisponibles.length === 0}
              >
                <option value="">-- Seleccione comuna --</option>
                {comunasDisponibles.map((nombre) => (
                  <option key={nombre} value={nombre.toLowerCase()}>
                    {nombre}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Selecciona una comuna.</div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">Dirección *</label>
            <input
              type="text"
              id="direccion"
              className={`form-control ${errores.direccion ? "is-invalid" : ""}`}
              value={valores.direccion}
              onChange={(e) => actualizarCampo("direccion", e.target.value)}
            />
            <div className="invalid-feedback">
              Dirección obligatoria, máximo 300 caracteres.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="fechaNacimiento" className="form-label">Fecha de nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              className="form-control"
              value={valores.fechaNacimiento}
              onChange={(e) => actualizarCampo("fechaNacimiento", e.target.value)}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="RegistrarClave" className="form-label">Contraseña *</label>
              <input
                type="password"
                id="RegistrarClave"
                className={`form-control ${errores.clave ? "is-invalid" : ""}`}
                value={valores.clave}
                onChange={(e) => actualizarCampo("clave", e.target.value)}
              />
              <div className="invalid-feedback">
                La contraseña debe tener entre 4 y 10 caracteres.
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="confirmarClave" className="form-label">Confirmar contraseña *</label>
              <input
                type="password"
                id="confirmarClave"
                className={`form-control ${errores.confirmarClave ? "is-invalid" : ""}`}
                value={valores.confirmarClave}
                onChange={(e) => actualizarCampo("confirmarClave", e.target.value)}
              />
              <div className="invalid-feedback">Las contraseñas no coinciden.</div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Registrarse
          </button>

          <p className="text-center m-0">
            ¿Ya tienes cuenta? <Link to="/inicio-sesion">Inicia sesión</Link>
          </p>
        </form>
      </section>
    </main>
  );
}