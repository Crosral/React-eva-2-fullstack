import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";
import { esCorreoValido } from "../utils/validarCorreo";

 function InicioSesion() {
  const { iniciarSesion } = useUsuario();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [errores, setErrores] = useState({});

  function manejarEnvio(e) {
    e.preventDefault();

    const correoIngresado = correo.trim().toLowerCase();

    const nuevosErrores = {};
    if (correoIngresado === "" || correoIngresado.length > 100 || !esCorreoValido(correoIngresado)) {
      nuevosErrores.correo = true;
    }
    if (clave.length < 4 || clave.length > 10) {
      nuevosErrores.clave = true;
    }
    if (clave.length < 4 || clave.length > 10) {
      nuevosErrores.clave = true;
    }

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const resultado = iniciarSesion(correo, clave);
    if (!resultado.ok) {
      alert(resultado.error);
      return;
    }

    if (resultado.usuario.rol === "Administrador" || resultado.usuario.rol === "Vendedor") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }

  return (
    <main className="container my-5" style={{ maxWidth: "500px" }}>
      <h1 className="text-center mb-4">Iniciar Sesión</h1>

      <section className="bg-white text-dark p-4 rounded shadow-sm">
        <form id="form-inicioSesion" noValidate onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label htmlFor="loginCorreo" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              id="loginCorreo"
              className={`form-control ${errores.correo ? "is-invalid" : ""}`}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <div className="invalid-feedback">
              Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="loginClave" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="loginClave"
              className={`form-control ${errores.clave ? "is-invalid" : ""}`}
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
            <div className="invalid-feedback">
              La contraseña debe tener entre 4 y 10 caracteres.
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Iniciar sesión
          </button>

          <p className="text-center m-0">
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default InicioSesion