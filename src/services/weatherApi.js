import axios from "axios";
import { getTodayEpoch } from '../utils/datetimeUtils'

const API_KEY = "4ec48ffb1e2151b439eda4d3d1526d93";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeatherData = async (location) => {
    const { data } = await axios.get(`${BASE_URL}?q=${location}&dt=${getTodayEpoch()}&appid=${API_KEY}&units=metric`)
    return data;
}