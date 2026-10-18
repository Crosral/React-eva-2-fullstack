function esCorreoValido(correo) {
  const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  return regex.test(correo.trim().toLowerCase());
}

export default esCorreoValido;