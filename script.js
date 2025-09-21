document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const quizSection = document.getElementById("quizSection");
  const quizForm = document.getElementById("quizForm");
  const resultSection = document.getElementById("resultSection");
  const submitBtn = document.getElementById("submitBtn");

  // ✅ QCM exclusif
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

  // ✅ Envoi du QCM
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Récupérer les réponses du QCM
    const q1 = document.querySelector('input[data-group="q1"]:checked')?.parentElement.textContent.trim() || "";
    const q2 = document.querySelector('input[data-group="q2"]:checked')?.parentElement.textContent.trim() || "";
    const q3 = document.querySelector('input[data-group="q3"]:checked')?.parentElement.textContent.trim() || "";
    const q4 = document.querySelector('input[data-group="q4"]:checked')?.parentElement.textContent.trim() || "";
    const q5 = document.querySelector('input[data-group="q5"]:checked')?.parentElement.textContent.trim() || "";

    const data = { q1, q2, q3, q4, q5 };

    fetch("https://script.google.com/macros/s/AKfycbwKaV8uPQITU6Ify4O_qZg3oBKIIDDECzyD4DKjWccKBz_Xf2orQwsyZWcxAys9gHujAg/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.text())
    .then(msg => {
      console.log("Réponses QCM envoyées :", msg);
      document.querySelector(".resume_vie").classList.add("hidden");
      submitBtn.style.display = "none";
      startBtn.classList.remove("hidden");
    })
    .catch(err => {
      alert("Erreur d’envoi QCM : " + err);
    });
  });

  // ✅ Démarrer le quiz
  startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    quizSection.classList.remove("hidden");
  });

  // ✅ Envoi du quiz
  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(quizForm);
    const answers = {};
    formData.forEach((value, key) => {
      answers[key] = value;
    });

    // Score fictif
    const sincerityScore = "98%";
    answers.sincerityScore = sincerityScore;

    // Affichage résultat
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    fetch("https://formspree.io/f/mzzjpeab", {
      method: "POST",
      body: JSON.stringify(answers),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.text())
    .then(data => console.log("Réponses quiz envoyées :", data))
    .catch(err => console.error("Erreur quiz :", err));
  });
});
