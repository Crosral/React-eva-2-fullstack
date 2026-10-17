export function validarRunChile(run) {
  const runLimpio = run.trim().toUpperCase();

  if (!/^[0-9]{6,8}[0-9K]$/.test(runLimpio)) {
    return false;
  }

  const cuerpo = runLimpio.slice(0, -1);
  const dvIngresado = runLimpio.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador++;
    if (multiplicador > 7) multiplicador = 2;
  }

  const resto = suma % 11;
  const resultado = 11 - resto;

  let dvCalculado;
  if (resultado === 11) dvCalculado = "0";
  else if (resultado === 10) dvCalculado = "K";
  else dvCalculado = resultado.toString();

  return dvIngresado === dvCalculado;
}