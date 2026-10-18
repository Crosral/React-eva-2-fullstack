import { useState } from "react";
import { obtenerUsuarios, guardarUsuarios} from "../../data/usuarios";
import { validarRunChile } from "../../utils/validarRunChile";
import { comunasPorRegion } from "../../data/productos";
import { useUsuario } from "../../context/UsuarioContext";
import { esCorreoValido } from "../utils/validarCorreo";

const estadoInicial = {
  run: "", nombre: "", apellidos: "", correo: "", fechaNacimiento: "",
  region: "", comuna: "", direccion: "", clave: "", rol: "",
};

export default function AdminUsuarios() {
  const { usuarioActivo } = useUsuario();
  const [usuarios, setUsuarios] = useState(obtenerUsuarios());
  const [editandoIndice, setEditandoIndice] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [valores, setValores] = useState(estadoInicial);
  const [errores, setErrores] = useState({});

  function actualizarCampo(campo, valor) {
    setValores((prev) => (campo === "region" ? { ...prev, region: valor, comuna: "" } : { ...prev, [campo]: valor }));
  }

  function nuevoUsuario() {
    setEditandoIndice(null);
    setValores(estadoInicial);
    setErrores({});
    setMostrarForm(true);
  }

  function editarUsuario(i) {
    const u = usuarios[i];
    setEditandoIndice(i);
    setValores({
      run: u.run || "", nombre: u.nombre || "", apellidos: u.apellidos || "",
      correo: u.correo || "", fechaNacimiento: u.fechaNacimiento || "",
      region: u.region || "", comuna: u.comuna || "", direccion: u.direccion || "",
      clave: u.clave || "", rol: u.rol || "",
    });
    setErrores({});
    setMostrarForm(true);
  }

  function borrarUsuario(i) {
    if (usuarios[i].correo === usuarioActivo?.correo) {
      alert("No puedes eliminar tu propio usuario.");
      return;
    }
    if (!window.confirm("¿Eliminar este usuario?")) return;

    const nuevos = usuarios.filter((_, idx) => idx !== i);
    guardarUsuarios(nuevos);
    setUsuarios(nuevos);
  }

  function validar() {
    const e = {};
    const run = valores.run.trim().toUpperCase();
    const correo = valores.correo.trim().toLowerCase();

    if (!validarRunChile(run)) e.run = "RUN inválido.";
    if (valores.nombre.trim() === "" || valores.nombre.length > 50) e.nombre = "Nombre obligatorio, máximo 50 caracteres.";
    if (valores.apellidos.trim() === "" || valores.apellidos.length > 100) e.apellidos = "Apellidos obligatorios, máximo 100 caracteres.";

    if (correo === "" || correo.length > 100 || !esCorreoValido(correo)) e.correo = "Correo inválido.";

    if (valores.region === "" || valores.comuna === "") e.region = "Selecciona región y comuna.";
    if (valores.direccion.trim() === "" || valores.direccion.length > 300) e.direccion = "Dirección obligatoria, máximo 300 caracteres.";
    if (valores.clave.length < 4 || valores.clave.length > 10) e.clave = "La contraseña debe tener entre 4 y 10 caracteres.";
    if (valores.rol === "") e.rol = "Selecciona un rol.";

    const existe = usuarios.some(
      (u, i) => i !== editandoIndice && (u.correo.toLowerCase() === correo || u.run === run)
    );
    if (existe) e.duplicado = "El RUN o correo ya está registrado.";

    setErrores(e);
    return Object.keys(e).length === 0;
  }

  function manejarEnvio(e) {
    e.preventDefault();
    if (!validar()) return;

    const nuevoUsuarioObj = {
      run: valores.run.trim().toUpperCase(),
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
      correo: valores.correo.trim().toLowerCase(),
      fechaNacimiento: valores.fechaNacimiento,
      region: valores.region,
      comuna: valores.comuna,
      direccion: valores.direccion.trim(),
      clave: valores.clave,
      rol: valores.rol,
    };

    const copia = [...usuarios];
    const esEdicion = editandoIndice !== null;

    if (esEdicion) copia[editandoIndice] = nuevoUsuarioObj;
    else copia.push(nuevoUsuarioObj);

    guardarUsuarios(copia);
    setUsuarios(copia);

    alert(esEdicion ? "Usuario actualizado correctamente." : "Usuario agregado correctamente.");
    setMostrarForm(false);
  }

  const comunasDisponibles = comunasPorRegion[valores.region] || [];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Usuarios</h3>
        {!mostrarForm && (
          <button className="btn btn-primary" onClick={nuevoUsuario}>Agregar usuario</button>
        )}
      </div>

      {mostrarForm ? (
        <form noValidate onSubmit={manejarEnvio} className="bg-white text-dark p-4 rounded shadow-sm">
          {errores.duplicado && <div className="alert alert-danger">{errores.duplicado}</div>}

          <div className="row">
            <div className="col-md-6 mb-2">
              <label className="form-label">RUN *</label>
              <input className={`form-control ${errores.run ? "is-invalid" : ""}`} value={valores.run} onChange={(e) => actualizarCampo("run", e.target.value)} />
              {errores.run && <div className="invalid-feedback d-block">{errores.run}</div>}
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">Rol *</label>
              <select className={`form-select ${errores.rol ? "is-invalid" : ""}`} value={valores.rol} onChange={(e) => actualizarCampo("rol", e.target.value)}>
                <option value="">-- Seleccione rol --</option>
                <option value="Administrador">Administrador</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Cliente">Cliente</option>
              </select>
              {errores.rol && <div className="invalid-feedback d-block">{errores.rol}</div>}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-2">
              <label className="form-label">Nombre *</label>
              <input className={`form-control ${errores.nombre ? "is-invalid" : ""}`} value={valores.nombre} onChange={(e) => actualizarCampo("nombre", e.target.value)} />
              {errores.nombre && <div className="invalid-feedback d-block">{errores.nombre}</div>}
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">Apellidos *</label>
              <input className={`form-control ${errores.apellidos ? "is-invalid" : ""}`} value={valores.apellidos} onChange={(e) => actualizarCampo("apellidos", e.target.value)} />
              {errores.apellidos && <div className="invalid-feedback d-block">{errores.apellidos}</div>}
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label">Correo *</label>
            <input type="email" className={`form-control ${errores.correo ? "is-invalid" : ""}`} value={valores.correo} onChange={(e) => actualizarCampo("correo", e.target.value)} />
            {errores.correo && <div className="invalid-feedback d-block">{errores.correo}</div>}
          </div>

          <div className="row">
            <div className="col-md-6 mb-2">
              <label className="form-label">Región *</label>
              <select className={`form-select ${errores.region ? "is-invalid" : ""}`} value={valores.region} onChange={(e) => actualizarCampo("region", e.target.value)}>
                <option value="">-- Seleccione región --</option>
                <option value="RM">Región Metropolitana</option>
                <option value="ARAUCANIA">Araucanía</option>
                <option value="NUBLE">Ñuble</option>
              </select>
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">Comuna *</label>
              <select className="form-select" value={valores.comuna} onChange={(e) => actualizarCampo("comuna", e.target.value)} disabled={comunasDisponibles.length === 0}>
                <option value="">-- Seleccione comuna --</option>
                {comunasDisponibles.map((n) => <option key={n} value={n.toLowerCase()}>{n}</option>)}
              </select>
            </div>
          </div>
          {errores.region && <div className="text-danger small mb-2">{errores.region}</div>}

          <div className="mb-2">
            <label className="form-label">Dirección *</label>
            <input className={`form-control ${errores.direccion ? "is-invalid" : ""}`} value={valores.direccion} onChange={(e) => actualizarCampo("direccion", e.target.value)} />
            {errores.direccion && <div className="invalid-feedback d-block">{errores.direccion}</div>}
          </div>

          <div className="mb-2">
            <label className="form-label">Fecha de nacimiento</label>
            <input type="date" className="form-control" value={valores.fechaNacimiento} onChange={(e) => actualizarCampo("fechaNacimiento", e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña *</label>
            <input type="password" className={`form-control ${errores.clave ? "is-invalid" : ""}`} value={valores.clave} onChange={(e) => actualizarCampo("clave", e.target.value)} />
            {errores.clave && <div className="invalid-feedback d-block">{errores.clave}</div>}
          </div>

          <button type="submit" className="btn btn-success me-2">{editandoIndice !== null ? "Guardar cambios" : "Guardar usuario"}</button>
          <button type="button" className="btn btn-secondary" onClick={() => setMostrarForm(false)}>Cancelar</button>
        </form>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr><th>RUN</th><th>Nombre</th><th>Correo</th><th>Rol</th><th>Región/Comuna</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {usuarios.map((u, i) => (
                <tr key={u.correo}>
                  <td>{u.run || "-"}</td>
                  <td>{u.nombre} {u.apellidos}</td>
                  <td>{u.correo}</td>
                  <td>{u.rol}</td>
                  <td>{u.region ? `${u.region} / ${u.comuna}` : "-"}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-1" onClick={() => editarUsuario(i)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => borrarUsuario(i)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}