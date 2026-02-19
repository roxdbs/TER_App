// Stockage des données
export const state = {
    participantId: "",
    sessionId: "",

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