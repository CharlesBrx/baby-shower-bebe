// Baby Shower V2 — fecha local CDMX: 29 de noviembre de 2026, 13:00.
const eventDate = new Date('2026-11-29T13:00:00-06:00');
const byId = (id) => document.getElementById(id);

// Animaciones al aparecer en pantalla; respaldo para navegadores sin IntersectionObserver.
const reveals = document.querySelectorAll('.reveal:not(.visible)');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('visible'));
}

// Cuenta regresiva.
function updateCountdown() {
  const remaining = eventDate.getTime() - Date.now();
  if (remaining <= 0) {
    ['days', 'hours', 'minutes', 'seconds'].forEach((id) => { if (byId(id)) byId(id).textContent = '00'; });
    if (byId('countdownNote')) byId('countdownNote').textContent = '¡Hoy celebramos! Gracias por acompañarnos ♡';
    return;
  }
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  [['days', days], ['hours', hours], ['minutes', minutes], ['seconds', seconds]].forEach(([id, value]) => {
    if (byId(id)) byId(id).textContent = String(value).padStart(2, '0');
  });
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

// Música original muy suave generada en el navegador (no necesita un MP3 ni archivos extra).
// En iPhone/Safari comienza únicamente después de tocar el botón, por política del navegador.
const musicButton = byId('music');
let audioContext = null;
let musicTimer = null;
let musicOn = false;
let noteIndex = 0;
const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 783.99, 698.46];
function playNote() {
  if (!audioContext || !musicOn) return;
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = 'sine';
  osc.frequency.value = melody[noteIndex % melody.length];
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
  osc.connect(gain); gain.connect(audioContext.destination);
  osc.start(now); osc.stop(now + 0.76);
  noteIndex += 1;
}
async function toggleMusic() {
  try {
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) throw new Error('Audio no disponible');
      audioContext = new AudioContextClass();
    }
    if (audioContext.state === 'suspended') await audioContext.resume();
    musicOn = !musicOn;
    if (musicOn) {
      playNote();
      musicTimer = window.setInterval(playNote, 820);
      musicButton.innerHTML = '<span>♫</span><small>Activada</small>';
      musicButton.setAttribute('aria-label', 'Desactivar música');
      musicButton.setAttribute('aria-pressed', 'true');
    } else {
      window.clearInterval(musicTimer);
      musicButton.innerHTML = '<span>♫</span><small>Música</small>';
      musicButton.setAttribute('aria-label', 'Activar música');
      musicButton.setAttribute('aria-pressed', 'false');
    }
  } catch (error) {
    alert('Tu navegador no pudo iniciar el audio. Intenta de nuevo tocando el botón de música.');
  }
}
musicButton?.addEventListener('click', toggleMusic);

// DATOS POR COMPLETAR: agrega el enlace de regalos y el número de WhatsApp cuando estén listos.
const REGISTRY_URL = ''; // Ejemplo: https://www.amazon.com.mx/baby-reg/...
const WHATSAPP_NUMBER = ''; // Código de país + número, solo dígitos. Ejemplo México: 5215512345678
const registryButton = byId('registryBtn');
const registryNote = byId('registryNote');
if (REGISTRY_URL) {
  registryButton.href = REGISTRY_URL;
  registryButton.target = '_blank';
  registryButton.rel = 'noopener noreferrer';
  registryButton.textContent = 'Ver mesa de regalos';
  registryNote.hidden = true;
} else {
  registryButton.href = '#regalos';
  registryButton.addEventListener('click', (event) => {
    event.preventDefault();
    alert('La información de la mesa de regalos se agregará próximamente.');
  });
}
const rsvpButton = byId('rsvpBtn');
const rsvpNote = byId('rsvpNote');
if (WHATSAPP_NUMBER) {
  const message = encodeURIComponent('¡Hola! Confirmo mi asistencia al Baby Shower del 29 de noviembre de 2026 a la 1:00 p. m.');
  rsvpButton.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  rsvpButton.target = '_blank';
  rsvpButton.rel = 'noopener noreferrer';
  rsvpNote.hidden = true;
} else {
  rsvpButton.href = '#confirmacion';
  rsvpButton.addEventListener('click', (event) => {
    event.preventDefault();
    alert('En cuanto agreguemos el número de WhatsApp, podrás confirmar tu asistencia desde aquí.');
  });
}
