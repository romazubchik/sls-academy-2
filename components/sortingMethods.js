function sortAZ(list) {
    return list
        .filter((i) => isNaN(i))
        .sort((a, b) => a.localeCompare(b));
}

function sortIncreasing(list) {
    return list.filter((i) => !isNaN(i)).sort((a, b) => a - b);
}

function sortDecreasing(list) {
    return list.filter((i) => !isNaN(i)).sort((a, b) => b - a);
}

function sortWordsByLength(list) {
    return list
        .filter((i) => isNaN(i))
        .sort((a, b) => a.length - b.length);
}

function showUniqueWords(list) {
    return Array.from(new Set(list.filter((i) => isNaN(i))));
}

function showUniqueElements(list) {
    return Array.from(new Set(list));
}

module.exports = {
    sortAZ,
    sortIncreasing,
    sortDecreasing,
    sortWordsByLength,
    showUniqueWords,
    showUniqueElements
}