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
    const inputSessId = document.querySelector('input[name="session"]:checked')?.value;
    const inputCondId = document.querySelector('input[name="condition"]:checked')?.value;

    if (!inputPartId.value.trim() || !inputSessId || !inputCondId) {
        alert("Veuillez renseigner l'identifiant du participant, le numéro de session et la complexité de la tâche.");
        return;
    }

    state.participantId = inputPartId.value.trim();
    state.sessionId = inputSessId;
    state.condition = inputCondId;
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

    if (state.condition === "TC") {
        // Arrêt du chrono
        clearInterval(state.timerId);
        state.timerId = null;

        state.sampling.BEH2Prop = calculateProportion(state.sampling.BEH2);
        state.sampling.BEH3Prop = calculateProportion(state.sampling.BEH3);

        document.getElementById("recap-BEH2-percentage").textContent = state.sampling.BEH2Prop.percent + " %";
        document.getElementById("recap-BEH2").textContent = state.sampling.BEH2Prop.trueCount + "/" + state.nInterval;

        document.getElementById("recap-BEH3-percentage").textContent = state.sampling.BEH3Prop.percent + " %";
        document.getElementById("recap-BEH3").textContent = state.sampling.BEH3Prop.trueCount + "/" + state.nInterval;
    }

    document.getElementById("recap-BEH1").textContent = state.BEH1Count;

    generateCSV();
    showPage(4);
    console.log(state);
}