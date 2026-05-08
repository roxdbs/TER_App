import { state } from "./state.js";

export function generateCSV() {
    if (state.condition === "TC") {
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
            "Condition (complexité tâche)",
            "Début passation",
            "Fin passation",
            "Durée totale (s)",
            "Nombre total d'intervalles",
            "C1 / Nombre d'occurrences", //Nombre d'occurrence de Se mordre
            "Type des données (C2 et C3)",
            "C2", //Stéréotypie : Proportion, %, Nb apparition cptmt, Nb total intervalles
            "C3", //Hors-Tâche : Proportion, %, Nb apparition cptmt, Nb total intervalles
            "C2VB", //Tableau Stéréotypie (valeurs brutes)
            "C3VB", //Tableau Hors-Tâche (valeurs brutes)
            "VB"
        ]);

        // Les valeurs principales (ligne 2 de rows)
        rows.push([
            state.participantId,
            state.sessionId,
            state.condition,
            state.startDateTime,
            state.endDateTime,
            state.elapsedTime,
            state.nInterval,
            state.BEH1Count,
            "Proportion",
            state.sampling.BEH2Prop.prop,
            state.sampling.BEH3Prop.prop,
            beh2Data[0] ?? "",
            beh3Data[0] ?? "",
            "0 = pas d'apparition du comportement"
        ]);

        // Lignes supplémentaire de rows pour les valeurs brutes de C2 et C3
        for (let i = 1; i < maxLength; i++) {
            rows.push([
                "", "", "", "", "", "", "", "",
                // Type de données (C2 et C3)
                i === 1 ? "Pourcentage" :
                    i === 2 ? "Nombre d'intervalles avec comportement" :
                        i === 3 ? "Nombre total d'intervalles" :
                            "",
                // C2
                i === 1 ? state.sampling.BEH2Prop.percent :
                    i === 2 ? state.sampling.BEH2Prop.trueCount :
                        i === 3 ? state.nInterval :
                            "",
                // C3
                i === 1 ? state.sampling.BEH3Prop.percent :
                    i === 2 ? state.sampling.BEH3Prop.trueCount :
                        i === 3 ? state.nInterval :
                            "",
                // C2VB
                beh2Data[i] ?? "",
                // C3VB
                beh3Data[i] ?? "",
                // VB
                i === 1 ? "1 = apparition du comportement" :
                    ""
            ]);
        }

        const csvContent = rows.map(r => r.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${state.participantId}-${state.sessionId}-${state.condition}.csv`;
        a.click();

        URL.revokeObjectURL(url);
    }
    else {
        const rows = []

        // Les noms de colonnes (ligne 1 de rows)
        rows.push([
            "Identifiant participant",
            "Numéro de session",
            "Condition (complexité tâche)",
            "Début passation",
            "Fin passation",
            "C1 / Nombre d'occurrences", //Nombre d'occurrence de Se mordre
        ]);

        // Les valeurs principales (ligne 2 de rows)
        rows.push([
            state.participantId,
            state.sessionId,
            state.condition,
            state.startDateTime,
            state.endDateTime,
            state.BEH1Count
        ]);

        const csvContent = rows.map(r => r.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${state.participantId}-${state.sessionId}-${state.condition}.csv`;
        a.click();

        URL.revokeObjectURL(url);
    }
}