import PlusCircle from '../assets/images/plus-circle-svgrepo-com.svg';
import { useContext } from 'react';
import DataContext from '../Contexts/DataContext';
import { useNavigate } from "react-router-dom";

const CurrentWeather = () => {
    const { weatherData, setIsSearched } = useContext(DataContext);
    const navigate = useNavigate();

    return <div className="current-weather-container">
        <h1 className="current-city-title">{weatherData.name}</h1>
        <img className="current-weather-img" src={`http://openweathermap.org/img/wn/${weatherData.weather
            ? weatherData.weather[0].icon
            : null}@2x.png`} alt={weatherData.name} />
        <h2 className="current-temp">{Math.round(weatherData.main
            ? weatherData.main.temp
            : "")} °C</h2>
        <span className="current-details" onClick={() => {
            setIsSearched(false)
            navigate(
                `${weatherData.name}`
            )
        }}>Details <img className='detail-plus-circle' src={PlusCircle} alt="PlusCircle" /> </span>
    </div>
}

export default CurrentWeather;