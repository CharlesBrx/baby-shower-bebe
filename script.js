// Configuración provisional: 29 de noviembre de 2026, 2:00 PM.
// Cuando tengamos la fecha definitiva, solo cambia esta línea.
const eventDate = new Date("2026-11-29T14:00:00-06:00");

function updateCountdown(){
  const diff = eventDate - new Date();
  if(diff <= 0){
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent="00");
    return;
  }
  const days=Math.floor(diff/86400000);
  const hours=Math.floor(diff/3600000)%24;
  const minutes=Math.floor(diff/60000)%60;
  const seconds=Math.floor(diff/1000)%60;
  document.getElementById("days").textContent=String(days).padStart(2,"0");
  document.getElementById("hours").textContent=String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent=String(minutes).padStart(2,"0");
  document.getElementById("seconds").textContent=String(seconds).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

// Sustituiremos este número cuando tengan el teléfono de RSVP.
document.getElementById("whatsapp").addEventListener("click",e=>{
  e.preventDefault();
  alert("Aquí colocaremos el WhatsApp de confirmación cuando me compartas el número.");
});
