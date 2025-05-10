
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
  document.getElementById("cardIdVisual").textContent = currentCardId;

  imagenCapturada = false;
  document.getElementById("guardar").style.display = "none";
  document.getElementById("whatsapp").style.display = "none";
}

function validarMarcado() {
  const marcadas = document.querySelectorAll(".card .marked");
  if (marcadas.length === 9 && !imagenCapturada) {
    imagenCapturada = true;
    capturarCarton();
  }
}

function capturarCarton() {
  const contenedor = document.getElementById("capturable");
  html2canvas(contenedor).then(canvas => {
    contenedor.innerHTML = "";
    contenedor.appendChild(canvas);
canvas.style.width = "100%";
canvas.style.height = "auto";
canvas.style.display = "block";
canvas.style.borderRadius = "10px";
canvas.style.boxShadow = "0 0 30px 10px #ffcc00";

    canvas.toBlob(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const guardarBtn = document.getElementById("guardar");
      const whatsappBtn = document.getElementById("whatsapp");

      guardarBtn.href = blobUrl;
      guardarBtn.download = "carton_" + currentCardId + ".png";
      guardarBtn.style.display = "inline-block";

      whatsappBtn.href = "https://wa.me/56986532423?text=" + encodeURIComponent("¡Completé mi cartón! " + currentCardId + "\n(Adjunto la imagen del cartón)");
      whatsappBtn.style.display = "inline-block";
    });
  });
}

window.onload = generateCard;

function celebrar() {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 }
  });
  document.getElementById("aplausos").play();
document.getElementById("trompeta").play();
document.body.classList.add("flash");
setTimeout(() => document.body.classList.remove("flash"), 3000);
  document.getElementById("titulo-principal").textContent = "FELICITACIONES";
  document.getElementById("felicitaciones").style.display = "block";
}

function capturarCarton() {
  const contenedor = document.getElementById("capturable");
  html2canvas(contenedor).then(canvas => {
    contenedor.innerHTML = "";
    contenedor.appendChild(canvas);
canvas.style.width = "100%";
canvas.style.height = "auto";
canvas.style.display = "block";
canvas.style.borderRadius = "10px";
canvas.style.boxShadow = "0 0 30px 10px #ffcc00";

    celebrar(); // Añadido aquí

    canvas.toBlob(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const guardarBtn = document.getElementById("guardar");
      const whatsappBtn = document.getElementById("whatsapp");

      guardarBtn.href = blobUrl;
      guardarBtn.download = "carton_" + currentCardId + ".png";
      guardarBtn.style.display = "inline-block";

      whatsappBtn.href = "https://wa.me/56986532423?text=" + encodeURIComponent("¡Completé mi cartón! " + currentCardId + "\n(Adjunto la imagen del cartón)");
      whatsappBtn.style.display = "inline-block";
    });
  });
}

canvas.style.boxShadow = "0 0 30px 10px #ffcc00";
