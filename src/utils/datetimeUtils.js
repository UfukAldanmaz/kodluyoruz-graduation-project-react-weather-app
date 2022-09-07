export const getTodayEpoch = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime() / 1000
}