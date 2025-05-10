
let currentCardId = "";
let imagenCapturada = false;

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
      validarMarcado();
    });
    card.appendChild(div);
  });

  currentCardId = "ID-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  document.getElementById("cardId").textContent = currentCardId;
  document.getElementById("captura").innerHTML = "";
  document.getElementById("captura").style.display = "none";
  document.getElementById("guardar").style.display = "none";
  document.getElementById("whatsapp").style.display = "none";
  imagenCapturada = false;
}

function validarMarcado() {
  const marcadas = document.querySelectorAll(".card .marked");
  if (marcadas.length === 9 && !imagenCapturada) {
    imagenCapturada = true;
    capturarCarton();
  }
}

function capturarCarton() {
  html2canvas(document.getElementById("card")).then(canvas => {
    const imageDisplay = document.getElementById("captura");
    const guardarBtn = document.getElementById("guardar");
    const whatsappBtn = document.getElementById("whatsapp");

    imageDisplay.innerHTML = "";
    imageDisplay.style.display = "block";
    imageDisplay.appendChild(canvas);

    canvas.toBlob(blob => {
      const blobUrl = URL.createObjectURL(blob);
      guardarBtn.href = blobUrl;
      guardarBtn.download = "carton_" + currentCardId + ".png";
      guardarBtn.style.display = "inline-block";

      whatsappBtn.href = "https://wa.me/56986532423?text=" + encodeURIComponent("¡Completé mi cartón! " + currentCardId + "\n(Adjunto la imagen del cartón)");
      whatsappBtn.style.display = "inline-block";
    });
  });
}

window.onload = generateCard;
