import { state, resetState } from "./state.js";
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
    // En tâche simple, "Se mordre" n'est plus observé : bouton inactif
    document.getElementById("btn-BEH1").disabled = (state.condition === "TS");
    showPage(2);
    console.log(state);
}

// Entraînement : l'interface est celle de la condition TC (tous les boutons actifs)
document.getElementById("btn-training").onclick = () => {
    state.training = true;
    state.condition = "TC";

    document.getElementById("btn-BEH1").disabled = false;
    document.getElementById("page-2-title").textContent = "Entraînement";
    document.getElementById("btn-end").textContent = "Fin de l'entraînement";

    showPage(2);
}

// Fin de l'entraînement : remise à zéro des données ET de l'interface, retour à la page 1
function endTraining() {
    clearInterval(state.timerId);
    resetState();

    // Textes remis comme avant
    document.getElementById("page-2-title").textContent = "Observation de comportements";
    document.getElementById("btn-end").textContent = "Fin de l'observation";

    // Récapitulatifs en direct
    ["BEH1", "BEH2", "BEH3"].forEach(id => {
        document.getElementById(`recap-${id}-live`).textContent = "—";
    });

    // Boutons de comportement
    document.getElementById("btn-BEH1").disabled = false;
    document.getElementById("btn-BEH1").classList.remove("beh1-feedback");
    ["btn-BEH2", "btn-BEH3"].forEach(id => {
        const btn = document.getElementById(id);
        btn.disabled = true;
        btn.classList.remove("selected");
    });

    // Barre de progression
    const fill = document.getElementById("interval-progress-fill");
    fill.style.transition = "none";
    fill.style.width = "0%";
    fill.classList.remove("recording");
    document.getElementById("interval-progress").classList.remove("recording");

    // Signal sonore
    const signal = document.getElementById("signal");
    signal.pause();
    signal.currentTime = 0;

    showPage(1);
}

document.getElementById("btn-end").onclick = () => {
    // Fin de l'entrainement
    if (state.training) {
        endTraining();
        return;
    }

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

    else if (state.condition === "TS") {
        // Arrêt du chrono
        clearInterval(state.timerId);
        state.timerId = null;

        state.sampling.BEH3Prop = calculateProportion(state.sampling.BEH3);

        document.getElementById("recap-BEH3-percentage").textContent = state.sampling.BEH3Prop.percent + " %";
        document.getElementById("recap-BEH3").textContent = state.sampling.BEH3Prop.trueCount + "/" + state.nInterval;
    }

    if (state.condition !== "TS") {
        document.getElementById("recap-BEH1").textContent = state.BEH1Count;
    }

    generateCSV();
    showPage(4);
    console.log(state);
}