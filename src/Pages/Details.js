import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWeatherData } from "../services/weatherApi";
import '../Pages/detail.scss';
import BackArrow from '../assets/images/arrow-back-circle-outline-svgrepo-com.svg'
import withLoading from "../hocs/withLoading";
import Humidity from "../assets/images/humidity.png"
import Wind from "../assets/images/wind.png"
import Temp from "../assets/images/temp.png"
import Navbar from "../components/Navbar";
import { compose } from "ramda";
import withAuth from "../hocs/withAuth";
import ThemeContext from "../Contexts/ThemeContext";

const Details = (props) => {
    const { setTemp } = useContext(ThemeContext);
    const [weatherData, setWeatherData] = useState([]);
    const { name } = useParams();
    const navigate = useNavigate();
    const getData = async () => {
        try {
            props.setIsLoading(true);
            const data = await getWeatherData(name)
            setWeatherData(data);
        } catch (error) {
            console.log(error);
        } finally {
            props.setIsLoading(false);
        }
    }
    useEffect(() => {
        getData(name);
    }, []);

    useEffect(() => {
        setTemp(weatherData?.main?.temp);
    }, [weatherData, setTemp])

    return <div><Navbar />
        <div className="detail-weather-container">
            <img className="detail-back-svg" src={BackArrow} alt="BackArrow" onClick={() => navigate('/')} />
            <h1 className="detail-city-title">{weatherData.name}</h1>
            <p>{weatherData.weather ? weatherData.weather[0].main : ""}</p>
            <img className="detail-weather-img" src={`http://openweathermap.org/img/wn/${weatherData.weather ? weatherData.weather[0].icon : null}@2x.png`} alt={weatherData.name} />
            <h2 className="detail-temp">{Math.round(weatherData.main ? weatherData.main.temp : "")} °C</h2>
            <div className="other-info-container">
                <div className="humidity">
                    <p>Humidity: {weatherData.main ? weatherData.main.humidity : ""}%
                    </p> <img className="humidity-img" src={Humidity} alt="Humidity" />
                </div>
                <div className="wind">
                    <p>Wind: {weatherData.wind ? weatherData.wind.speed : ""} mph
                    </p><img className="wind-img" src={Wind} alt="Wind" /></div>
                <div className="temp"><p>Feels like: {Math.round(weatherData.main ? weatherData.main.feels_like : "")}°C</p>
                    <img className="temp-img" src={Temp} alt="temp" /></div>

            </div>
        </div></div>
}
export default compose(withAuth, withLoading)(Details);