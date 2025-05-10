
function generateCard() {
  const numbers = Array.from({length: 40}, (_, i) => i + 1);
  const cardNumbers = [];
  const card = document.getElementById("card");

  while (cardNumbers.length < 9) {
    const randIndex = Math.floor(Math.random() * numbers.length);
    const num = numbers.splice(randIndex, 1)[0];
    cardNumbers.push(num);
  }

  card.innerHTML = "";
  cardNumbers.forEach(num => {
    const div = document.createElement("div");
    div.textContent = num;
    div.addEventListener("click", () => {
      div.classList.toggle("marked");
    });
    card.appendChild(div);
  });

  const cardId = "ID-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  document.getElementById("cardId").textContent = cardId;
}

function checkWin() {
  const cardId = document.getElementById("cardId").textContent;
  const mensaje = encodeURIComponent("¡Completé mi cartón! " + cardId + "\n(Adjunto la imagen del cartón)");

  // Abrir WhatsApp primero para evitar bloqueo de popup en iOS
  window.open("https://wa.me/56986532423?text=" + mensaje, "_blank");

  // Luego generar y descargar imagen del cartón
  setTimeout(() => {
    html2canvas(document.getElementById("card")).then(canvas => {
      canvas.toBlob(blob => {
        const link = document.createElement("a");
        link.download = "carton_" + cardId + ".png";
        link.href = URL.createObjectURL(blob);
        link.click();
      });
    });
  }, 500);
}

window.onload = generateCard;
