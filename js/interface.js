import { state } from "./state.js";
import { calculateProportion } from "./stats.js"
import { generateCSV } from "./csv.js";

// Navigation SPA

const pages = {
    1: document.getElementById("page-1"),
    2: document.getElementById("page-2"),
    3: document.getElementById("page-3"),
    4: document.getElementById("page-4")
}

export function showPage(pageNumber) {
    Object.values(pages).forEach(page => page.hidden = true);
    pages[pageNumber].hidden = false;
}

// Gestion des boutons de navigation
document.getElementById("btn-expe").onclick = () => {
    const inputPartId = document.getElementById("participant-id");
    const inputSessIdd = document.querySelector('input[name="session"]:checked')?.value;

    if (!inputPartId.value.trim() && !inputSessIdd) {
        alert("Veuillez renseigner l'identifiant du participant et le numéro de session.");
        return;
    }
    else if (!inputPartId.value.trim()) {
        alert("Veuillez renseigner l'identifiant du participant.");
        return;
    }
    else if (!inputSessIdd) {
        alert("Veuillez sélectionner un numéro de session.");
        return;
    }

    state.participantId = inputPartId.value.trim();
    state.sessionId = inputSessIdd;
    showPage(2);
    console.log(state);
}

document.getElementById("btn-end").onclick = () => {
    // Enregistrement de la fin de la passation
    const end = new Date();

    state.endTime = end.getTime();
    state.endDateTime = end.toISOString();

    console.log("Passation terminée");
    console.log("Durée totale :", state.elapsedTime);

    // Arrêt du chrono
    clearInterval(state.timerId);
    state.timerId = null;

    const beh2Stats = calculateProportion(state.sampling.BEH2);
    const beh3Stats = calculateProportion(state.sampling.BEH3);

    state.sampling.BEH2Prop = beh2Stats.prop.toFixed(2);
    state.sampling.BEH3Prop = beh3Stats.prop.toFixed(2);

    document.getElementById("recap-BEH1").textContent = state.BEH1Count;

    document.getElementById("recap-BEH2-percentage").textContent = beh2Stats.percent + " %";
    document.getElementById("recap-BEH2").textContent = beh2Stats.trueCount + "/" + state.nInterval;

    document.getElementById("recap-BEH3-percentage").textContent = beh3Stats.percent + " %";
    document.getElementById("recap-BEH3").textContent = beh3Stats.trueCount + "/" + state.nInterval;

    generateCSV();
    showPage(4);
    console.log(state);
}