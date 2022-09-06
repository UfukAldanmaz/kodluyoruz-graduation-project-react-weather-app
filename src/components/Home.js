import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { storeLocation, getLocations } from "../storage/cityStore";
import { getWeatherData } from "../services/weatherApi";
import PlusCircle from '../assets/images/plus-circle-svgrepo-com.svg';

const Home = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [location, setLocation] = useState('');
    const [previousSearches, setPreviousSearches] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await getWeatherData(location);
            storeLocation(location);
            setWeatherData(data);
            setLoaded(true);
            console.log('weatherData:', data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        console.log("ufuk")
        loadPreviousSearches();

        return () => {
            setPreviousSearches([]);
        }
    }, [loaded])

    const loadPreviousSearches = () => {
        const fetchData = async (location) => {
            const data = await getWeatherData(location);
            setPreviousSearches(old => [...old, data]);
        }

        const locations = getLocations();

        locations.forEach(l => {

            console.log('ugur', l, location)
            if (l === location) {

                return;
            }
            try {
                fetchData(l);

            } catch (error) {
                // TODO: notification
            }
        });
    }

    useEffect(() => {
        if (previousSearches.length === 3) {
            setLocation("");
        }

    }, [previousSearches])


    return <div className="container">
        <div className="column">
            <form onSubmit={handleSearchSubmit} className="form">
                <input value={location} onChange={(e) => setLocation(e.target.value)} className="form-input" />
                <button className="form-btn">Search</button>
            </form>
            <div className="recent-searches-container">
                <div className="recent-column">
                    <h1 className="recent-searches">Recent Searches</h1>
                    {
                        previousSearches.map((item, index) => {

                            return (
                                <div className="recent-weather-column" key={index}>
                                    <h1 className="recent-country-name">{item.name}</h1>
                                    <img className="recent-weather-img" src={`http://openweathermap.org/img/wn/${item.weather ? item.weather[0].icon : null}@2x.png`} alt={item.name} />
                                    <h2 className="recent-temp">{item.main ? item.main.temp : ""} °C</h2>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        <div className="current-weather-container">
            <h1 className="current-city-title">{weatherData.name}</h1>
            <img className="current-weather-img" src={`http://openweathermap.org/img/wn/${weatherData.weather ? weatherData.weather[0].icon : null}@2x.png`} alt={weatherData.name} />
            <h2 className="current-temp">{weatherData.main ? weatherData.main.temp : ""} °C</h2>
            <span className="current-details" onClick={() => navigate(
                `${weatherData.name}`
                // `https://api.openweathermap.org/data/2.5/weather?id=${weatherData.id}&dt=1643803200&appid=${API_KEY}`
            )}>Details <img src={PlusCircle} alt="PlusCircle" /> </span>
        </div>

    </div>
}

export default Home;