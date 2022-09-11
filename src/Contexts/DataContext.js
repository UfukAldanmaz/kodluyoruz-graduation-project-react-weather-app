import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [isSearched, setIsSearched] = useState(false);
    return (
        <DataContext.Provider value={{ weatherData, setWeatherData, isSearched, setIsSearched }}>
            {children}
        </DataContext.Provider>

    )
}

export default DataContext;