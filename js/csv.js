import { state } from "./state.js";

export function generateCSV() {
    const beh2Data = state.sampling.BEH2.map(value => value ? 1 : 0);
    const beh3Data = state.sampling.BEH3.map(value => value ? 1 : 0);

    // Longueur maximale (nb de lignes)
    const maxLength = Math.max(
        beh2Data.length,
        beh3Data.length,
        4 // Nb de lignes fixes pour C2 et C3
    )

    const rows = []

    // Les noms de colonnes (ligne 1 de rows)
    rows.push([
        "Identifiant participant",
        "Numéro de session",
        "Début passation",
        "Fin passation",
        "Durée totale (s)",
        "Nombre total d'intervalles",
        "C1", //Nombre d'occurrence de Se mordre
        "C2", //Stéréotypie : %, Nb apparition cptmt, Nb total intervalles
        "C2VB", //Tableau Stéréotypie (valeurs brutes)
        "C3", //Hors-Tâche : %, Nb apparition cptmt, Nb total intervalles
        "C3VB" //Tableau Hors-Tâche (valeurs brutes)
    ]);

    // Les valeurs principales (ligne 2 de rows)
    rows.push([
        state.participantId,
        state.sessionId,
        state.startDateTime,
        state.endDateTime,
        state.elapsedTime,
        state.nInterval,
        state.BEH1Count,
        state.sampling.BEH2Prop.prop,
        beh2Data[0] ?? "",
        state.sampling.BEH3Prop.prop,
        beh3Data[0] ?? ""
    ]);

    // Lignes supplémentaire de rows pour les valeurs brutes de C2 et C3
    for (let i = 1; i < maxLength; i++) {
        rows.push([
            "", "", "", "", "", "", "",
            // C2
            i === 1 ? state.sampling.BEH2Prop.percent :
                i === 2 ? state.sampling.BEH2Prop.trueCount :
                    i === 3 ? state.nInterval :
                        "",
            // C2VB
            beh2Data[i] ?? "",
            // C3
            i === 1 ? state.sampling.BEH3Prop.percent :
                i === 2 ? state.sampling.BEH3Prop.trueCount :
                    i === 3 ? state.nInterval :
                        "",
            // C3VB
            beh3Data[i] ?? ""
        ]);
    }

    const csvContent = rows.map(r => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.participantId}-${state.sessionId}.csv`;
    a.click();

    URL.revokeObjectURL(url);
}