import { state } from "./state.js";

export function generateCSV() {
    const beh2Data = state.sampling.BEH2.map(value => value ? 1 : 0);
    const beh3Data = state.sampling.BEH3.map(value => value ? 1 : 0);

    const csvLines = [
        `Identifiant participant, ${state.participantId}`,
        `Numéro de session, ${state.sessionId}`,
        `Début passation, ${state.startDateTime}`,
        `Fin passation, ${state.endDateTime}`,
        `Durée totale (s), ${state.elapsedTime}`,
        `Nombre total d'intervalles, ${state.nInterval}`,
        ``,
        `Nombre d'occurences BEH1, ${state.BEH1Count}`,
        `Proportion d'intervalles BEH2, ${state.sampling.BEH2Prop}`,
        `Proportion d'intervalles BEH3, ${state.sampling.BEH3Prop}`,
        ``,
        `Données BEH2, ${beh2Data.join(",")}`,
        `Données BEH3, ${beh3Data.join(",")}`
    ];

    const csvContent = csvLines.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.participantId}-${state.sessionId}.csv`;
    a.click();

    URL.revokeObjectURL(url);
}