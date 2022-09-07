import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWeatherData } from "../services/weatherApi";
import '../Pages/detail.scss';
import BackArrow from '../assets/images/arrow-back-circle-outline-svgrepo-com.svg'

const Details = () => {
    const [weatherData, setWeatherData] = useState([]);
    const { name } = useParams();
    const navigate = useNavigate();
    const getData = async () => {
        try {
            const data = await getWeatherData(name)
            setWeatherData(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData(name);
    });
    return <div className="detail-weather-container">
        <img className="detail-back-svg" src={BackArrow} alt="BackArrow" onClick={() => navigate(-1)} />
        <h1 className="detail-city-title">{weatherData.name}</h1>
        <p>{weatherData.weather ? weatherData.weather[0].main : ""}</p>
        <img className="detail-weather-img" src={`http://openweathermap.org/img/wn/${weatherData.weather ? weatherData.weather[0].icon : null}@2x.png`} alt={weatherData.name} />
        <h2 className="detail-temp">{weatherData.main ? weatherData.main.temp : ""} °C</h2>
        <p>Humidity: {weatherData.main ? weatherData.main.humidity : ""}</p>
        <p>Wind: {weatherData.wind ? weatherData.wind.speed : ""}</p>
        <p>Feels like: {weatherData.main ? weatherData.main.feels_like : ""}</p>
    </div>
}
export default Details;