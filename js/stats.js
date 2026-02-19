// Calcul des proportions d'intervalles de BEH2 et BEH3
export function calculateProportion(array) {
    if (array.length === 0) return { trueCount: 0, prop: 0, percent: 0 };

    const trueCount = array.filter(value => value === true).length;
    const prop = trueCount / array.length;
    return {
        trueCount,
        prop,
        percent: Math.round(prop * 100)
    };
}