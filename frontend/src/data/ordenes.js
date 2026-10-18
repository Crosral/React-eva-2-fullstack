export function obtenerOrdenes() {
  try {
    return JSON.parse(localStorage.getItem("ordenes")) || [];
  } catch {
    return [];
  }
}

export function guardarOrdenes(ordenes) {
  localStorage.setItem("ordenes", JSON.stringify(ordenes));
}