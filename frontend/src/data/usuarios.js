const CLAVE_STORAGE = "usuarios";

export function obtenerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_STORAGE)) || [];
  } catch {
    return [];
  }
}

export function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(usuarios));
}

export function crearAdminInicial() {
  const usuarios = obtenerUsuarios();
  const existeAdmin = usuarios.some((u) => u.correo === "admin@duoc.cl");

  if (!existeAdmin) {
    usuarios.push({
      nombre: "Administrador",
      apellidos: "Sistema",
      correo: "admin@duoc.cl",
      clave: "admin123",
      rol: "Administrador",
    });
    guardarUsuarios(usuarios);
  }
}

export const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];