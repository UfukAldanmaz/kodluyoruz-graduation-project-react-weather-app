import { useState, useEffect, useContext } from "react";
import { storeLocation, getLocations } from "../storage/cityStore";
import { getWeatherData } from "../services/weatherApi";
import { useNavigate } from "react-router-dom";
import More from '../assets/images/more.png';
import DataContext from "../Contexts/DataContext";
import Cloud from "../assets/images/cloud.png"

const RecentSearches = () => {
    const { weatherData, isSearched, setIsSearched } = useContext(DataContext);
    const [previousSearches, setPreviousSearches] = useState([]);
    const [removedCity, setRemovedCity] = useState(null);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const navigate = useNavigate();



    // Load recent searches
    const loadPreviousSearches = () => {
        // we read localStorage to get recently searched cities
        // iterate them and create promises for them to fetch current weather data for all recently searched cities. 
        let promises = [];
        getLocations().forEach(recentLocation => {
            promises.push(getWeatherData(recentLocation));
        });

        // in order to keep search results ordered, we use promise.all
        Promise.all(promises)
            .then((responses) => {
                setPreviousSearches(responses);
            })
    }

    const updateLastSearch = () => {
        // if we have no weatherData, then do nothing.
        if (!weatherData) {
            return
        }

        // copy previousSearches state into local variable: 'refreshed'
        // we will manipulate this local variable later.
        const refreshed = [...previousSearches];

        if (refreshed.length < 3) {
            console.log("rererere", refreshed);
            const index = refreshed.findIndex(item => item.name.toUpperCase() === weatherData.name.toUpperCase());
            if (index > -1) {
                refreshed.splice(index, 1);
                refreshed.unshift(weatherData);
                setPreviousSearches(refreshed);
            } else {
                // If user has not searched more than 3 cities yet
                // then just push the latest weatherData to previousSearches state.
                setPreviousSearches(old => [weatherData, ...old])
            }
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
    }

    useEffect(() => {
        // refresh previous search
        console.log("rem", removedCity, needsUpdate);
        if (!needsUpdate) {
            return
        }
        updateLastSearch();
        setNeedsUpdate(false);
        // we want to trigger this useEffect code block when removedCity changed.
    }, [needsUpdate])



    useEffect(() => {
        // when page is opened, just load previous search list for one time 
        loadPreviousSearches();

        return () => {
            // like componentUnmount event in class component, we want to empty the previous search list when user refreshes the page. 
            setPreviousSearches([]);
        }
    }, [])

    useEffect(() => {
        console.log("deneme", weatherData?.name);

        // if we have no weatherData, then do nothing.
        if (!weatherData || !isSearched) {
            return
        }


        // we want to run this code block when everytime weatherData changes.
        // we just store the city name of lastly searched weather data.
        // then get the removed city from the localStorage, if we reached 3 items in previous city names in localStorage.
        // then set this city name to use further operations above for updating the recent weather data array (previousSearches)
        const removedPreviousSearch = storeLocation(weatherData.name);

        console.log("deneme2", removedPreviousSearch);


        setRemovedCity(removedPreviousSearch);
        setNeedsUpdate(true);
    }, [weatherData, isSearched])

    return <div className="recent-searches-container">
        <div className="recent-column">
            <h1 className="recent-searches">Recent Searches</h1>
            {previousSearches && previousSearches.length > 0 ?
                previousSearches.map((item, index) => {
                    return (
                        <div className="recent-weather-column" key={index}>
                            <h1 className="recent-country-name">{item.name}</h1>
                            <div className="recent-detail-container">
                                <span onClick={() => {
                                    setIsSearched(false);
                                    navigate(
                                        `${item.name}`
                                    )
                                }} className="recent-detail" >
                                    <img className="recent-plus-circle" src={More} alt="More" />
                                </span>

                            </div>
                            <img className="recent-weather-img"
                                src={`http://openweathermap.org/img/wn/${item.weather ? item.weather[0].icon : null}@2x.png`}
                                alt={item.name} />
                            <h2 className="recent-temp">{Math.round(item.main ? item.main.temp : "")} °C</h2>

                        </div>
                    )
                })
                : <img className="recent-cloud-img" src={Cloud} alt="cloud" />}
        </div>
    </div>

}

export default RecentSearches;