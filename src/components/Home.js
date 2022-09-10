import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { getWeatherData } from "../services/weatherApi";
import CurrentWeather from "./CurrentWeather";
import Temperature from '../assets/images/temperature.png';
import withLoading from "../hocs/withLoading";
import '../styles/main.scss';
import RecentSearches from "./RecentSearches";
import DataContext from "../Contexts/DataContext";
import debounce from 'lodash.debounce';
import Navbar from "../components/Navbar";
import { compose } from "ramda";
import withAuth from "../hocs/withAuth"
import { getLastLocation } from "../storage/cityStore"

const Home = (props) => {
    const { weatherData, setWeatherData } = useContext(DataContext);
    const [location, setLocation] = useState('');
    const inputRef = useRef(null);

    // Handle form submit to fetch weather data from API
    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        await loadWeatharData(location);
    }

    const loadWeatharData = async (location) => {
        try {
            props.setIsLoading(true)
            const data = await getWeatherData(location);
            setWeatherData(data);
        } catch (error) {
            console.log(error);
        } finally {
            props.setIsLoading(false);
        }
    }

    const handleChange = (e) => {
        setLocation(e.target.value)
    }

    const debouncedChangeHandler = useMemo(() => {
        return debounce(handleChange, 250)
    }, []);

    useEffect(() => {
        const lastLocation = getLastLocation();
        if (lastLocation) {
            loadWeatharData(lastLocation);
        }

        return () => {
            debouncedChangeHandler.cancel();
        }
    }, []);

    useEffect(() => {
        if (!props.isLoading) {
            inputRef.current.select();
        }
    }, [props.isLoading])

    return <> {<div>
        <div className={(typeof weatherData?.main != "undefined")
            ? ((weatherData?.main?.temp > 18)
                ? 'app' : (weatherData?.main?.temp < 1)
                    ? 'app winter' : 'app autumn') : 'app'}>
            <Navbar />
            <div className="container">
                <div className="column">
                    <form onSubmit={handleSearchSubmit} className="form">
                        <input
                            //value={location}
                            ref={inputRef}
                            onChange={debouncedChangeHandler}
                            className="form-input" />
                        <button className="form-btn">Search</button>
                    </form>
                    <RecentSearches />
                </div>

                {weatherData ?
                    <CurrentWeather />
                    :
                    <img className="temp-img"
                        src={Temperature}
                        alt="temperature" />
                }

            </div></div></div>}</>
}

export default compose(withAuth, withLoading)(Home);
