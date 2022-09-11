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
import withAuth from "../hocs/withAuth";
import { getLastLocation } from "../storage/cityStore";
import ErrorBoundary from "./ErrorBoundary";
import SunWithCloud from "../assets/images/sun-with-cloud.png";
import ThemeContext from "../Contexts/ThemeContext";

const Home = (props) => {
    const { weatherData, setWeatherData, setIsSearched } = useContext(DataContext);
    const { setTemp } = useContext(ThemeContext);
    const [location, setLocation] = useState('');
    const inputRef = useRef(null);

    // Handle form submit to fetch weather data from API
    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        setIsSearched(true);
        await loadWeatharData(location);
    }

    useEffect(() => {
        setTemp(weatherData?.main?.temp);
    }, [weatherData, setTemp])


    const loadWeatharData = async (location) => {
        try {
            props.setIsLoading(true);
            const data = await getWeatherData(location);
            setWeatherData(data);
        } catch (error) {
            console.log(error);
        } finally {
            props.setIsLoading(false);
        }
    }

    const handleChange = (e) => {
        setLocation(e.target.value);
    }

    const debouncedChangeHandler = useMemo(() => {
        return debounce(handleChange, 100);
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
        <Navbar />
        <div className="container">
            <div className="column">
                <form onSubmit={handleSearchSubmit} className="form">
                    <input
                        // value={location}
                        ref={inputRef}
                        onChange={debouncedChangeHandler}
                        className="form-input" />
                    <div className="form-btn-container">
                        <button className="form-btn">Search<img className="form-btn-img" src={SunWithCloud} alt="sun-with-cloud" /></button>
                    </div>
                </form>
                <ErrorBoundary>
                    <RecentSearches />
                </ErrorBoundary>

            </div>

            {weatherData ?
                <CurrentWeather />
                :
                <img className="temp-img"
                    src={Temperature}
                    alt="temperature" />
            }

        </div></div>}</>
}

export default compose(withAuth, withLoading)(Home);
