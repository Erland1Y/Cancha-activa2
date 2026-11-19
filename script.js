const precios = { futbol: 120, basquetbol: 70, voleibol: 60 };
const emojis = { futbol: "⚽", basquetbol: "🏀", voleibol: "🏐" };
const nombresDeportes = { futbol: "Fútbol", basquetbol: "Básquetbol", voleibol: "Voleibol" };

const f = document.getElementById("formulario");
const dCancha = document.getElementById("deporte");
const dDuracion = document.getElementById("duracion");
const pDetalle = document.getElementById("detalle");
const pPrecio = document.getElementById("precio");
const sResumen = document.getElementById("seccionResumen");
const tDuracion = document.getElementById("textoDuracion");
const burbuja = document.getElementById("burbujaDuracion");
let temporizadorBurbuja;

function calcular() {
  const precioHora = precios[dCancha.value];
  const horas = parseInt(dDuracion.value);
  const original = precioHora * horas;
  const descuento = horas >= 3 ? original * 0.1 : 0;
  const total = original - descuento;

  const textoHoras = `${horas} ${horas === 1 ? "hora" : "horas"}`;
  const porcentaje = ((horas - dDuracion.min) * 100) / (dDuracion.max - dDuracion.min);

  tDuracion.textContent = textoHoras;
  pDetalle.textContent = `${nombresDeportes[dCancha.value]} · ${textoHoras}`;
  pPrecio.textContent = `Bs ${original.toFixed(2)}`; // Muestra solo la multiplicación

  burbuja.textContent = `${horas} h`;
  burbuja.style.left = `calc(${porcentaje}% + (${10 - porcentaje * 0.2}px))`;

  return { original, descuento, total };
}

function reiniciarVista() {
  calcular();
  tDuracion.textContent = "A partir de una hora";
  sResumen.hidden = true;
}

dCancha.addEventListener("change", calcular);

dDuracion.addEventListener("input", () => {
  calcular();
  burbuja.classList.add("activa");
  clearTimeout(temporizadorBurbuja);
  temporizadorBurbuja = setTimeout(() => burbuja.classList.remove("activa"), 1000);
});

f.addEventListener("submit", (e) => {
  e.preventDefault();
  const { original, descuento, total } = calcular();

  document.getElementById("rEmoji").textContent = emojis[dCancha.value];
  document.getElementById("rDeporte").textContent = nombresDeportes[dCancha.value];
  document.getElementById("rNombre").textContent = document.getElementById("nombre").value;
  document.getElementById("rTelefono").textContent = document.getElementById("telefono").value;
  document.getElementById("rFecha").textContent = document.getElementById("fecha").value;
  document.getElementById("rHorario").textContent = document.getElementById("hora").value;
  document.getElementById("rDuracion").textContent = `${dDuracion.value} hrs`;

  document.getElementById("rOriginal").textContent = `Bs ${original.toFixed(2)}`;
  document.getElementById("rDescuento").textContent = `Bs ${descuento.toFixed(2)}`;
  document.getElementById("rTotal").textContent = `Bs ${total.toFixed(2)}`;

  document.getElementById("confirmacion").hidden = false;
  sResumen.hidden = false;
  sResumen.scrollIntoView({ behavior: "smooth" });
});

f.addEventListener("reset", () => setTimeout(reiniciarVista, 10));

document.getElementById("nuevaReserva").addEventListener("click", () => {
  f.reset();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

reiniciarVista();