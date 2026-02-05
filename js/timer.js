import { state } from "./state.js";
import { enableSamplingButtons, disableSamplingButtons, updateSamplingButtonVisual, beh2Btn, beh3Btn } from "./behaviors.js"
import { showPage } from "./interface.js";

// Constantes temporelles des intervalles
const INTERVAL_DURATION = 10;
const SIGNAL_TIME = 8;
const RECORDING_WINDOW = 3000;

const signal = document.getElementById("signal");

document.getElementById("btn-start").onclick = () => {
    // Enregistrement du début de la passation
    const start = new Date();

    state.startTime = start.getTime();
    state.startDateTime = start.toISOString();
    state.elapsedTime = 0;

    console.log("Passation lancée");

    // Lancement du chrono
    state.timerId = setInterval(() => {
        state.elapsedTime += 1;

        const timeInInterval = state.elapsedTime % INTERVAL_DURATION;

        /*console.log(
            `Temps écoulé: ${state.elapsedTime} 
            | Intervalle: ${intervalIndex} 
            | Temps dans intervalle: ${timeInInterval}`
        );*/

        // Signal sonore
        if (timeInInterval === SIGNAL_TIME) {
            signal.currentTime = 0;
            signal.play();

            console.log("signal");
        }

        // Enregistrement pendant la fenêtre et nouvel intervalle
        if (state.elapsedTime % INTERVAL_DURATION === 0) {

            state.sampling.BEH2[state.nInterval] = false;
            state.sampling.BEH3[state.nInterval] = false;

            updateSamplingButtonVisual(beh2Btn, false);
            updateSamplingButtonVisual(beh3Btn, false);

            state.nInterval += 1;

            //console.log("Nouvel intervalle :", state.currentInterval+1);
        }

        if (timeInInterval === 0 && state.elapsedTime !== 0) {
            state.recordingOpen = true;
            enableSamplingButtons();

            setTimeout(() => {
                state.recordingOpen = false;
                disableSamplingButtons();
                //console.log("Fenêtre d'enregistrement fermée");
            }, RECORDING_WINDOW);
        }

    }, 1000); //1000ms

    showPage(3);
    console.log(state);
}