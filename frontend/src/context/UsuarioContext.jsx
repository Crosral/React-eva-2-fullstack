import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { obtenerUsuarios, guardarUsuarios, crearAdminInicial } from "../data/usuarios";

const UsuarioContext = createContext(null);

export function UsuarioProvider({ children }) {
  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("usuarioActivo")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    crearAdminInicial();
  }, []);

  useEffect(() => {
    if (usuarioActivo) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
    } else {
      localStorage.removeItem("usuarioActivo");
    }
  }, [usuarioActivo]);

  const iniciarSesion = useCallback((correo, clave) => {
    const correoIngresado = correo.trim().toLowerCase();
    const usuarios = obtenerUsuarios();

    const usuarioEncontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correoIngresado && u.clave === clave
    );

    if (!usuarioEncontrado) return { ok: false, error: "Correo o contraseña incorrectos." };

    setUsuarioActivo(usuarioEncontrado);
    return { ok: true, usuario: usuarioEncontrado };
  }, []);

  const registrarUsuario = useCallback((nuevoUsuario) => {
    const usuarios = obtenerUsuarios();
    const correoExiste = usuarios.some(
      (u) => u.correo.toLowerCase() === nuevoUsuario.correo.toLowerCase()
    );

    if (correoExiste) return { ok: false, error: "Este correo ya está registrado." };

    const runExiste = usuarios.some((u) => u.run === nuevoUsuario.run);
    if (runExiste) return { ok: false, error: "El RUN ya está registrado." };

    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    return { ok: true };
  }, []);

  const cerrarSesion = useCallback(() => {
    setUsuarioActivo(null);
  }, []);

  return (
    <UsuarioContext.Provider
      value={{ usuarioActivo, iniciarSesion, registrarUsuario, cerrarSesion }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  return useContext(UsuarioContext);
}