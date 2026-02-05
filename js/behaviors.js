import { state } from "./state.js";

// Enregistrement occurences BEH1
const beh1Btn = document.getElementById("btn-BEH1");

beh1Btn.onclick = () => {
    state.BEH1Count += 1;
    //console.log("BEH1+1");

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

    console.log("BEH2, intervalle :", state.nInterval, "→", newValue);
};

beh3Btn.onclick = () => {
    if (!state.recordingOpen) return;

    const newValue = !state.sampling.BEH3[state.nInterval - 1];
    state.sampling.BEH3[state.nInterval - 1] = newValue;

    updateSamplingButtonVisual(beh3Btn, newValue);

    console.log("BEH3, intervalle :", state.nInterval, "→", newValue);
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