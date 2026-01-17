const host = document.getElementById('quiz');

const questions = [
  {q:"KI kann aus Beispielen lernen, ohne dass jede Regel einzeln programmiert wird.", a:["Fakt","Mythos"], c:0, e:"Fakt: Viele KI-Modelle lernen Muster aus Daten (Machine Learning)."},
  {q:"Eine KI hat ein eigenes Gewissen und kann moralische Schuld tragen.", a:["Fakt","Mythos"], c:1, e:"Mythos: KI trifft Entscheidungen, aber Verantwortung liegt bei Menschen/Organisationen."},
  {q:"Autonome Fahrzeuge nutzen Sensoren (Kamera/LiDAR/Radar), um die Umgebung zu erkennen.", a:["Fakt","Mythos"], c:0, e:"Fakt: Sensorfusion ist zentral für Wahrnehmung im Verkehr."},
  {q:"Wenn ein System sehr genau ist, ist es automatisch fair.", a:["Fakt","Mythos"], c:1, e:"Mythos: Hohe Genauigkeit schließt Bias/Benachteiligung nicht aus (Daten, Messung, Gruppen)."},
  {q:"Transparenz bedeutet: Man kann zumindest grob erklären, warum eine Entscheidung so ausfiel.", a:["Fakt","Mythos"], c:0, e:"Fakt: Erklärbarkeit/Transparenz ist ein wichtiges Prinzip digitaler Ethik."},
  {q:"Mehr Daten lösen jedes Problem – Qualität ist egal.", a:["Fakt","Mythos"], c:1, e:"Mythos: Schlechte oder einseitige Daten führen zu schlechten Ergebnissen."},
  {q:"Pflichtenethik bewertet Handlungen nach Regeln/Pflichten (nicht nach Folgen).", a:["Fakt","Mythos"], c:0, e:"Fakt: Deontologie fragt: Welche Handlung ist richtig, unabhängig von der Konsequenz?"},
  {q:"Utilitarismus bewertet Handlungen nach Folgen (Gesamtschaden minimieren).", a:["Fakt","Mythos"], c:0, e:"Fakt: Ziel ist größtes Gesamtwohl/kleinster Gesamtschaden."},
  {q:"Im Straßenverkehr kann eine KI nie in ein Dilemma geraten, weil es immer eine perfekte Lösung gibt.", a:["Fakt","Mythos"], c:1, e:"Mythos: Es gibt Zielkonflikte, Unsicherheit und Situationen ohne perfekte Lösung (Regeln vs. Schaden vs. Risiko)."},
  {q:"Ein Notfall-Fallback (z. B. sicheres Stoppen) ist Teil verantwortungsvoller KI im Verkehr.", a:["Fakt","Mythos"], c:0, e:"Fakt: Sicherheit braucht robuste Systeme plus Notfallstrategien."},
  {q:"KI trifft Entscheidungen immer objektiv, weil sie nur Mathematik nutzt.", a:["Fakt","Mythos"], c:1, e:"Mythos: Ziele, Daten und Messgrößen kommen von Menschen – dadurch kann Bias entstehen."},
  {q:"Verantwortung kann bei mehreren liegen: Hersteller, Betreiber, Gesetzgeber und Nutzer.", a:["Fakt","Mythos"], c:0, e:"Fakt: Verantwortung verteilt sich über den Lebenszyklus (Design, Betrieb, Kontrolle, Regeln)."},
  {q:"Fairness heißt: Gleiche Behandlung in jeder Situation – unabhängig vom Kontext.", a:["Fakt","Mythos"], c:1, e:"Mythos: Fairness kann verschiedene Kriterien haben (Gleichheit, Bedarf, Risiko, Rechte)."},
  {q:"Eine KI kann halluzinieren und falsche Informationen ausgeben.", a:["Fakt","Mythos"], c:0, e:"Fakt: Manche KI-Systeme können plausibel klingende Fehler erzeugen."},
  {q:"Ethik ist nur für Philosophen – Technikteams brauchen das nicht.", a:["Fakt","Mythos"], c:1, e:"Mythos: Ethik hilft, Ziele/Regeln zu klären und Risiken zu verhindern."},

  // Erweiterung: mehr Aufklärung (passt zu eurem Projekt)
  {q:"Bei einem Unfall mit autonomem Fahren ist immer nur der Mensch am Steuer schuld.", a:["Fakt","Mythos"], c:1, e:"Mythos: Je nach Modus/System können Hersteller, Betreiber oder Halter mitverantwortlich sein."},
  {q:"Eine KI darf Menschen nach Alter oder Status sortieren, um Schaden zu minimieren.", a:["Fakt","Mythos"], c:1, e:"Mythos: Das wäre hochproblematisch (Menschenwürde, Gleichheit, Diskriminierung)."},
  {q:"Mehr Sensoren bedeuten automatisch: perfektes Sehen bei jedem Wetter.", a:["Fakt","Mythos"], c:1, e:"Mythos: Mehr Sensoren helfen, aber Regen/Nebel/Blendung bleiben schwierig; Sensorfusion hat Grenzen."},
  {q:"Wenn eine KI eine Entscheidung trifft, braucht man trotzdem Protokolle/Logs.", a:["Fakt","Mythos"], c:0, e:"Fakt: Logs helfen bei Nachvollziehbarkeit, Fehleranalyse und Verantwortungsfragen."},
  {q:"Ein System kann sicher sein und trotzdem unethische Entscheidungen treffen.", a:["Fakt","Mythos"], c:0, e:"Fakt: Technik kann stabil laufen, aber die gewählten Prioritäten/Werte können unfair sein."},
  {q:"Aufklärung heißt auch: Grenzen kennen und nicht blind vertrauen.", a:["Fakt","Mythos"], c:0, e:"Fakt: Kritisches Verständnis verhindert falsche Sicherheit und fördert verantwortliche Nutzung."},
  {q:"Pflichtenethik würde eher sagen: Regeln gelten auch im Notfall.", a:["Fakt","Mythos"], c:0, e:"Fakt: Deontologische Ansätze betonen Prinzipien/Pflichten – nicht nur Folgen."},
  {q:"Utilitarismus kann in Dilemmata zu harten Abwägungen führen.", a:["Fakt","Mythos"], c:0, e:"Fakt: Schadensminimierung kann dazu führen, dass Einzelne geopfert werden – das ist ethisch umstritten."},
  {q:"Ein autonomes System sollte immer eine sichere Notfall-Strategie haben.", a:["Fakt","Mythos"], c:0, e:"Fakt: Verantwortungsvolle Systeme planen Fallbacks (z. B. kontrolliert stoppen) und Grenzen."}
];

let state = {i:0, score:0, done:false};

function render(){
  if(!host) return;
  host.innerHTML = "";
  const card = document.createElement("div");
  card.className = "card";

  if(state.done){
    card.innerHTML = `
      <h2>Ergebnis</h2>
      <p class="muted">Du hast <b>${state.score}</b> von <b>${questions.length}</b> richtig.</p>
      <div class="actions">
        <button class="btn btn--primary" id="restart">Nochmal spielen</button>
        <a class="btn" href="fazit.html">Zum Fazit</a>
      </div>
    `;
    host.appendChild(card);
    document.getElementById("restart").onclick = ()=>{ state={i:0,score:0,done:false}; render(); };
    return;
  }

  const item = questions[state.i];
  card.innerHTML = `
    <div class="quiz__top">
      <div class="quiz__progress">Frage ${state.i+1} / ${questions.length}</div>
      <div class="quiz__score">Punkte: ${state.score}</div>
    </div>
    <h2 class="quiz__q">${item.q}</h2>
    <div class="quiz__answers">
      ${item.a.map((txt,idx)=>`<button class="btn quiz__btn" data-i="${idx}">${txt}</button>`).join("")}
    </div>
    <div class="quiz__feedback" id="fb" hidden></div>
    <div class="actions" id="nextWrap" hidden>
      <button class="btn btn--primary" id="nextBtn">Weiter</button>
    </div>
  `;
  host.appendChild(card);

  const buttons = card.querySelectorAll(".quiz__btn");
  const fb = card.querySelector("#fb");
  const nextWrap = card.querySelector("#nextWrap");
  const nextBtn = card.querySelector("#nextBtn");

  buttons.forEach(b=>{
    b.onclick = ()=>{
      const choice = parseInt(b.getAttribute("data-i"),10);
      buttons.forEach(x=>x.disabled=true);
      const correct = choice===item.c;
      if(correct) state.score += 1;

      fb.hidden = false;
      fb.className = "quiz__feedback " + (correct ? "ok" : "bad");
      fb.innerHTML = `<b>${correct ? "Richtig" : "Nicht ganz"}</b> – ${item.e}`;
      nextWrap.hidden = false;
    };
  });

  nextBtn.onclick = ()=>{
    state.i += 1;
    if(state.i >= questions.length) state.done = true;
    render();
  };
}

render();
