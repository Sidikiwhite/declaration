document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const quizSection = document.getElementById("quizSection");
  const quizForm = document.getElementById("quizForm");
  const resultSection = document.getElementById("resultSection");
  const submitBtn = document.getElementById("submitBtn");

  // ✅ Exclusivité des cases à cocher
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

  // ✅ Préparer les réponses du QCM avant envoi
  submitBtn.addEventListener("click", () => {
    const q1 = document.querySelector('input[data-group="q1"]:checked')?.parentElement.textContent.trim() || "";
    const q2 = document.querySelector('input[data-group="q2"]:checked')?.parentElement.textContent.trim() || "";
    const q3 = document.querySelector('input[data-group="q3"]:checked')?.parentElement.textContent.trim() || "";
    const q4 = document.querySelector('input[data-group="q4"]:checked')?.parentElement.textContent.trim() || "";
    const q5 = document.querySelector('input[data-group="q5"]:checked')?.parentElement.textContent.trim() || "";

    document.getElementById("q1Input").value = q1;
    document.getElementById("q2Input").value = q2;
    document.getElementById("q3Input").value = q3;
    document.getElementById("q4Input").value = q4;
    document.getElementById("q5Input").value = q5;
  });

  // ✅ Démarrer le quiz après QCM
  startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    quizSection.classList.remove("hidden");
  });

  // ✅ Préparer les réponses du quiz avant envoi
  quizForm.addEventListener("submit", () => {
    document.getElementById("scoreInput").value = "98%";
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
  });
});
