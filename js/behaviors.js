import { state } from "./state.js";
import { calculateProportion } from "./stats.js";

//Mise à jour des récap de comportements
export function updateLiveRecap() {
    document.getElementById("recap-BEH1-live").textContent = state.BEH1Count;

    const beh2Stats = calculateProportion(state.sampling.BEH2);
    document.getElementById("recap-BEH2-live").textContent = beh2Stats.trueCount + "/" + state.nInterval;

    const beh3Stats = calculateProportion(state.sampling.BEH3);
    document.getElementById("recap-BEH3-live").textContent = beh3Stats.trueCount + "/" + state.nInterval;
}

// Enregistrement occurences BEH1
const beh1Btn = document.getElementById("btn-BEH1");

beh1Btn.onclick = () => {
    state.BEH1Count += 1;
    //console.log("BEH1+1");

    updateLiveRecap();

    beh1Btn.classList.add("beh1-feedback");

    setTimeout(() => {
        beh1Btn.classList.remove("beh1-feedback");
    }, 300);
};

// Gestion des fenêtres d'enregistrement pour l'échantillonnage temporel
export const beh2Btn = document.getElementById("btn-BEH2");
export const beh3Btn = document.getElementById("btn-BEH3");

beh2Btn.onclick = () => {
    if (!state.recordingOpen) return;

    const newValue = !state.sampling.BEH2[state.nInterval - 1];
    state.sampling.BEH2[state.nInterval - 1] = newValue;

    updateSamplingButtonVisual(beh2Btn, newValue);

    updateLiveRecap();

    //console.log("BEH2, intervalle :", state.nInterval, "→", newValue);
};

beh3Btn.onclick = () => {
    if (!state.recordingOpen) return;

    const newValue = !state.sampling.BEH3[state.nInterval - 1];
    state.sampling.BEH3[state.nInterval - 1] = newValue;

    updateSamplingButtonVisual(beh3Btn, newValue);

    updateLiveRecap();

    //console.log("BEH3, intervalle :", state.nInterval, "→", newValue);
};

export function enableSamplingButtons() {
    beh2Btn.disabled = false;
    beh3Btn.disabled = false;
}

export function disableSamplingButtons() {
    beh2Btn.disabled = true;
    beh3Btn.disabled = true;
}

export function updateSamplingButtonVisual(button, value) {
    if (value) {
        button.classList.add("selected");
    } else {
        button.classList.remove("selected")
    }
}