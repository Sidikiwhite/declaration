document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const quizSection = document.getElementById("quizSection");
  const quizForm = document.getElementById("quizForm");
  const resultSection = document.getElementById("resultSection");

  startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    quizSection.classList.remove("hidden");
  });

  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(quizForm);
    const answers = {};
    formData.forEach((value, key) => {
      answers[key] = value;
    });

    // Simuler un score fictif
    const sincerityScore = "98%";

    // Afficher le résultat
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    fetch("https://script.google.com/macros/s/TON_URL/exec", {
  method: "POST",
  body: JSON.stringify(answers),
  headers: {
    "Content-Type": "application/json"
  }
})
.then(res => res.text())
.then(data => console.log("Réponse envoyée :", data))
.catch(err => console.error("Erreur :", err));

  });
});



document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault(); // Empêche le rechargement de la page

  // Masquer la section résumé de vie
  document.querySelector(".resume_vie").classList.add("hidden");

  // Masquer le bouton envoyer
  this.style.display = "none";

  // Afficher le bouton "Commencer le test"
  document.getElementById("startBtn").classList.remove("hidden");
});

document.querySelectorAll(".exclusive").forEach(checkbox => {
  checkbox.addEventListener("change", function () {
    const group = this.dataset.group;
    if (this.checked) {
      document.querySelectorAll(`.exclusive[data-group="${group}"]`).forEach(cb => {
        if (cb !== this) cb.checked = false;
      });
    }
  });
});



document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault();

  // Récupérer les réponses du QCM
  const q1 = document.querySelector('input[data-group="q1"]:checked')?.parentElement.textContent.trim() || "";
  const q2 = document.querySelector('input[data-group="q2"]:checked')?.parentElement.textContent.trim() || "";
  const q3 = document.querySelector('input[data-group="q3"]:checked')?.parentElement.textContent.trim() || "";
  const q4 = document.querySelector('input[data-group="q4"]:checked')?.parentElement.textContent.trim() || "";
  const q5 = document.querySelector('input[data-group="q5"]:checked')?.parentElement.textContent.trim() || "";

  // Récupérer les réponses du quiz
  const quiz1 = document.querySelector('input[name="q1"]')?.value || "";
  const quiz2 = document.querySelector('input[name="q2"]')?.value || "";
  const quiz3 = document.querySelector('input[name="q3"]')?.value || "";
  const quiz4 = document.querySelector('select[name="q4"]')?.value || "";

  const data = { q1, q2, q3, q4, q5, quiz1, quiz2, quiz3, quiz4 };

  fetch("https://script.google.com/macros/s/AKfycbwKaV8uPQITU6Ify4O_qZg3oBKIIDDECzyD4DKjWccKBz_Xf2orQwsyZWcxAys9gHujAg/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(msg => {
    console.log("Réponses envoyées :", msg);
    document.getElementById("resumeSection").classList.add("hidden");
    document.getElementById("startTestSection").classList.remove("hidden");
  })
  .catch(err => {
    alert("Erreur d’envoi : " + err);
  });
});
