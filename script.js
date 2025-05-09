
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
  const marked = document.querySelectorAll(".card .marked");
  if (marked.length === 9) {
    document.getElementById("status").textContent = "¡Cartón completo! Toma un pantallazo con tu ID visible y mándalo al WhatsApp 😎";
  } else {
    document.getElementById("status").textContent = "Aún no completas el cartón. ¡Sigue jugando!";
  }
}

window.onload = generateCard;
