import PlusCircle from '../assets/images/plus-circle-svgrepo-com.svg';
import { useNavigate } from "react-router-dom";

const CurrentWeather = ({ name, icon, temp }) => {
    const navigate = useNavigate();

    return <div className="current-weather-container">
        <h1 className="current-city-title">{name}</h1>
        <img className="current-weather-img" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={name} />
        <h2 className="current-temp">{temp} °C</h2>
        <span className="current-details" onClick={() => navigate(
            `${name}`
        )}>Details <img src={PlusCircle} alt="PlusCircle" /> </span>
    </div>
}

export default CurrentWeather;