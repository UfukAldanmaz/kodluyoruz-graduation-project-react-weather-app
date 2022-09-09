import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState(null);
    return (
        <DataContext.Provider value={{ weatherData, setWeatherData }}>
            {children}
        </DataContext.Provider>

    )
}

export default DataContext;