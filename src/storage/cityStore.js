const key = 'cities';

export const storeLocation = (location) => {
    let locations = JSON.parse(localStorage.getItem(key)) ?? [];
    const index = locations.indexOf(location);
    if (index > -1) {
        locations.splice(index, 1);
    }
    else if (locations.length === 3) {
        locations.pop();
    }

    locations.unshift(location);

    localStorage.setItem(key, JSON.stringify(locations));
}

export const getLocations = () => {
    let locations = JSON.parse(localStorage.getItem(key)) ?? [];
    return locations;
}