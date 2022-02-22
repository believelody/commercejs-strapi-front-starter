export function toggleFilterSelection(mapArray, key, value) {
    if (mapArray.has(key) && mapArray.get(key) === value) {
        let updatedFilters = mapArray;
        updatedFilters.delete(key);
        return updatedFilters;
    } else {
        return mapArray.set(key, value);
    }
}