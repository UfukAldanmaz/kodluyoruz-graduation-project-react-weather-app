import { useState, useEffect, useRef } from "react";
import { storeLocation, getLocations } from "../storage/cityStore";
import { getWeatherData } from "../services/weatherApi";
import CurrentWeather from "./CurrentWeather";

const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');
    const [previousSearches, setPreviousSearches] = useState([]);
    const inputRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false);
    const [removedCity, setRemovedCity] = useState(null);

    // Handle form submit to fetch weather data from API
    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true);
            const data = await getWeatherData(location);
            setWeatherData(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    // Load recent searches
    const loadPreviousSearches = () => {
        const fetchData = async (location) => {
            const data = await getWeatherData(location);
            setPreviousSearches(old => [...old, data]); console.log('fail', data);
        }


        // we read localStorage to get recently searched cities
        // iterate them and fetch current weather data for all recently searched cities. 
        getLocations().forEach(recentLocation => {
            try {
                fetchData(recentLocation);

            } catch (error) {
                // TODO: notification
            }
        });
    }

    useEffect(() => {
        // refresh previous search

        // if we have no weatherData, then do nothing.
        if (!weatherData) {
            return
        }

        // copy previousSearches state into local variable: 'refreshed'
        // we will manipulate this local variable later.
        const refreshed = [...previousSearches];

        if (refreshed.length < 3) {
            // If user has not searched more than 3 cities yet
            // then just push the latest weatherData to previousSearches state.
            setPreviousSearches(old => [weatherData, ...old])
            return;
        }


        // removedCity is the city name that lastly removed from the localStorage
        // we remove older cities when localStorage reaches 3 items.

        if (removedCity === null) {
            return;
        }

        const index = refreshed.findIndex(item => item.name.toUpperCase() === removedCity.toUpperCase());
        if (index > -1) {
            // if lastly removedCity is in the previously searched weather data list,
            // then simply remove it from the list
            // then push the last weather data to at the very beginning of the previously searched list.
            refreshed.splice(index, 1);
            refreshed.unshift(weatherData);

            // we set previousSearches state with the local variable: refreshed. 
            // because this is the best way to manipulate array of object states.
            setPreviousSearches(refreshed);
        }

        // we want to trigger this useEffect code block when weatherData or removedCity changed.
    }, [weatherData, removedCity])


    useEffect(() => {
        // when page is opened, just load previous search list for one time 
        loadPreviousSearches();

        return () => {
            // like componentUnmount event in class component, we want to empty the previous search list when user refreshes the page. 
            setPreviousSearches([]);
        }
    }, [])

    useEffect(() => {
        if (!isLoading) {
            inputRef.current.select();
            // loadPreviousSearches();
        }

    }, [isLoading])


    useEffect(() => {
        // if we have no weatherData, then do nothing.
        if (!weatherData) {
            return
        }

        // we want to run this code block when everytime weatherData changes.
        // we just store the city name of lastly searched weather data.
        // then get the removed city from the localStorage, if we reached 3 items in previous city names in localStorage.
        // then set this city name to use further operations above for updating the recent weather data array (previousSearches)
        const removedPreviousSearch = storeLocation(weatherData.name);
        setRemovedCity(removedPreviousSearch);
    }, [weatherData])


    return <div className="container">
        <div className="column">
            <form onSubmit={handleSearchSubmit} className="form">
                <input value={location} ref={inputRef} onChange={(e) => setLocation(e.target.value)} className="form-input" />
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

        {weatherData &&
            <CurrentWeather
                name={weatherData.name}
                icon={weatherData.weather
                    ? weatherData.weather[0].icon
                    : null}
                temp={weatherData.main ? weatherData.main.temp : ""} />}


    </div>
}

export default Home;