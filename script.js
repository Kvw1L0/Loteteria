
const carton = document.getElementById("carton");
const whatsappBtn = document.getElementById("whatsapp");
const cartonIdVisual = document.getElementById("carton-id");

const ID = "ID-" + Math.random().toString(36).substring(2, 8).toUpperCase();
cartonIdVisual.textContent = "ID del cartón: " + ID;

let numeros = Array.from({ length: 40 }, (_, i) => i + 1);
numeros = numeros.sort(() => Math.random() - 0.5).slice(0, 9);

numeros.forEach(num => {
  const div = document.createElement("div");
  div.className = "celda";
  div.textContent = num;
  div.onclick = () => {
    div.classList.toggle("marcada");
  };
  carton.appendChild(div);
});

whatsappBtn.onclick = () => {
  const celdas = document.querySelectorAll(".celda");
  const seleccionados = Array.from(celdas).map(c => c.textContent).join(", ");
  const mensaje = `¡Completé mi cartón!\nNúmeros: ${seleccionados}\n${ID}`;
  const link = "https://wa.me/56986532423?text=" + encodeURIComponent(mensaje);
  window.open(link, "_blank");
};
