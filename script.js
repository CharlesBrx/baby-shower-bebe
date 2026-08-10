const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((el) => observer.observe(el));

document.getElementById("rsvpBtn")?.addEventListener("click", (event) => {
  event.preventDefault();
  alert("¡Gracias! Aquí conectaremos la confirmación de asistencia.");
});

const musicButton = document.getElementById("music");
let audio;

musicButton?.addEventListener("click", async () => {
  if (!audio) {
    audio = new Audio("assets/music.mp3");
    audio.loop = true;
  }

  try {
    await audio.play();
    musicButton.textContent = "🔊";
  } catch (error) {
    musicButton.textContent = "♫";
    alert("Agrega tu archivo de música como assets/music.mp3 para activar la música.");
  }
});
