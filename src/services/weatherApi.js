import axios from "axios";

const API_KEY = "4ec48ffb1e2151b439eda4d3d1526d93";

export const getWeatherData = async (location) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&dt=1643803200&appid=${API_KEY}&units=metric`)
    return data;
} 