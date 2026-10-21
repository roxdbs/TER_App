// Stockage des données
export const state = {
    participantId: "",
    sessionId: "",
    condition: "",
    training: false,

    // Chrono
    startTime: null,
    endTime: null,
    startDateTime: "", // Format lisible pour csv
    endDateTime: "", // Format lisible pour csv
    elapsedTime: 0, // en secondes
    timerId: null,

    // Intervalles
    nInterval: 0,
    recordingOpen: false, // fenêtre d'enregistrement de 2 secondes

    // Données comportementales
    BEH1Count: 0,
    sampling: {
        BEH2: [],
        BEH3: [],
        BEH2Prop: {
            trueCount: 0,
            prop: 0,
            percent: 0
        },
        BEH3Prop: {
            trueCount: 0,
            prop: 0,
            percent: 0
        }
    }
};

// Remise à zéro de toutes les données (utilisée à la fin de l'entraînement)
export function resetState() {
    state.participantId = "";
    state.sessionId = "";
    state.condition = "";
    state.training = false;

    state.startTime = null;
    state.endTime = null;
    state.startDateTime = "";
    state.endDateTime = "";
    state.elapsedTime = 0;
    state.timerId = null;

    state.nInterval = 0;
    state.recordingOpen = false;

    state.BEH1Count = 0;
    state.sampling.BEH2 = [];
    state.sampling.BEH3 = [];
    state.sampling.BEH2Prop = { trueCount: 0, prop: 0, percent: 0 };
    state.sampling.BEH3Prop = { trueCount: 0, prop: 0, percent: 0 };
}