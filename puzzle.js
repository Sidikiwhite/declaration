const canvas = document.getElementById("puzzleCanvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "amour/heart.png"; // Ton image de cœur

const rows = 3;
const cols = 3;
const pieceSize = canvas.width / cols;
let pieces = [];
let draggingPiece = null;
let offsetX, offsetY;

img.onload = () => {
  initPuzzle();
  drawPuzzle();
};

function initPuzzle() {
  pieces = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      pieces.push({
        sx: x * pieceSize,
        sy: y * pieceSize,
        x: Math.random() * (canvas.width - pieceSize),
        y: Math.random() * (canvas.height - pieceSize),
      });
    }
  }
}

function drawPuzzle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => {
    ctx.drawImage(img, p.sx, p.sy, pieceSize, pieceSize, p.x, p.y, pieceSize, pieceSize);
  });
}

canvas.addEventListener("mousedown", e => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;
  draggingPiece = pieces.find(p =>
    mouseX > p.x && mouseX < p.x + pieceSize &&
    mouseY > p.y && mouseY < p.y + pieceSize
  );
  if (draggingPiece) {
    offsetX = mouseX - draggingPiece.x;
    offsetY = mouseY - draggingPiece.y;
  }
});

canvas.addEventListener("mousemove", e => {
  if (draggingPiece) {
    draggingPiece.x = e.offsetX - offsetX;
    draggingPiece.y = e.offsetY - offsetY;
    drawPuzzle();
  }
});

canvas.addEventListener("mouseup", () => {
  draggingPiece = null;
  if (checkCompletion()) {
    document.getElementById("completionMessage").classList.remove("hidden");
    document.getElementById("declarationSection").classList.remove("hidden");
  }
});

function checkCompletion() {
  return pieces.every(p =>
    Math.abs(p.x - p.sx) < 10 && Math.abs(p.y - p.sy) < 10
  );
}
function sendResponse(choice) {
   fetch("https://formspree.io/f/mzzjpeab", {
    method: "POST",
    body: JSON.stringify({ réponse: choice }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(data => {
    const messageEl = document.getElementById("responseMessage");
    messageEl.classList.remove("hidden");

    if (choice === "oui") {
      messageEl.textContent = "💖 Je suis tellement heureux que tu veuilles vivre cette histoire avec moi.";
    } else {
      messageEl.textContent = "😢 Même si tu dis non, ce site est une preuve de ce que je ressens pour toi.";
    }
  })
  .catch(err => {
    alert("Erreur d’envoi : " + err);
  });
}
