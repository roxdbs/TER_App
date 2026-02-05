// Calcul des proportions d'intervalles de BEH2 et BEH3
export function calculateProportion(array) {
    if (array.length === 0) return 0;

    const trueCount = array.filter(value => value === true).length;
    return trueCount / array.length;
}