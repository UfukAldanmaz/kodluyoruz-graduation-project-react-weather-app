const key = 'cities';

export const storeLocation = (location) => {
    let removed = null;
    let locations = JSON.parse(localStorage.getItem(key)) ?? [];
    const index = locations.indexOf(location);
    if (index > -1) {
        const spliced = locations.splice(index, 1);
        if (spliced.length > 0) {
            removed = spliced[0];
        }
    }
    else if (locations.length === 3) {
        removed = locations.pop();
    }

    locations.unshift(location);

    localStorage.setItem(key, JSON.stringify(locations));

    return removed;
}

export const getLocations = () => {
    let locations = JSON.parse(localStorage.getItem(key)) ?? [];
    return locations;
}