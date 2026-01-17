
const start = document.getElementById('start');
const hit = document.getElementById('hit');
const msg = document.getElementById('msg');

let t0 = 0;
let armed = false;
let timer = null;

function reset(){
  armed = false;
  hit.disabled = true;
  hit.textContent = "Warte…";
  msg.textContent = "Klicke auf Start und warte, bis der Button aktiv wird.";
  if(timer) clearTimeout(timer);
}

start.addEventListener('click', ()=>{
  reset();
  const delay = 900 + Math.random()*2200;
  timer = setTimeout(()=>{
    armed = true;
    t0 = performance.now();
    hit.disabled = false;
    hit.textContent = "JETZT!";
    msg.textContent = "Jetzt klicken!";
  }, delay);
});

hit.addEventListener('click', ()=>{
  if(!armed){
    msg.textContent = "Zu früh 😄 Versuch nochmal.";
    reset();
    return;
  }
  const t = Math.round(performance.now() - t0);
  msg.textContent = `Reaktionszeit: ${t} ms. (Schnell ≠ moralisch.)`;
  armed = false;
  hit.disabled = true;
});

reset();

const biasHost = document.getElementById('bias');
const nextBtn = document.getElementById('next');

const cards = [
  {t:"KI ist immer neutral.", a:"Mythos – Trainingsdaten und Ziele beeinflussen Entscheidungen." , c:"Mythos"},
  {t:"Transparenz kann Vertrauen stärken.", a:"Fakt – aber technisch oft schwer." , c:"Fakt"},
  {t:"KI kann Gruppen benachteiligen.", a:"Fakt – durch Bias in Daten/Modellen." , c:"Fakt"},
  {t:"Wer Regeln setzt, setzt Werte.", a:"Fakt – darum ist Ethik so wichtig." , c:"Fakt"},
];

let i=0;
function renderBias(){
  const item = cards[i%cards.length];
  biasHost.innerHTML = `
    <div class="card" style="margin-top:10px">
      <div style="font-weight:900;margin-bottom:8px">${item.t}</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn" data-a="Fakt" type="button">Fakt</button>
        <button class="btn" data-a="Mythos" type="button">Mythos</button>
      </div>
      <div class="muted" id="ans" style="margin-top:10px;display:none"></div>
    </div>
  `;
  const ans = document.getElementById('ans');
  biasHost.querySelectorAll('button[data-a]').forEach(b=>{
    b.addEventListener('click', ()=>{
      ans.style.display = "block";
      const ok = b.dataset.a === item.c;
      ans.textContent = (ok ? "Richtig. " : "Nicht ganz. ") + item.a;
    });
  });
}
nextBtn.addEventListener('click', ()=>{i++; renderBias();});
renderBias();
