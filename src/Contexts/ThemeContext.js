import { createContext, useState, useLayoutEffect } from "react";
import summer from "../assets/images/sunny-day.png"
import winter from "../assets/images/winter.png"
import fall from "../assets/images/autumn.png"

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [temp, setTemp] = useState(null);
    const [bgImage, setBgImage] = useState(summer);

    useLayoutEffect(() => {
        if (!temp) {
            return
        }

        switch (true) {
            case (temp > 18):
                setBgImage(summer);
                break;
            case (temp < 1):
                setBgImage(winter);
                break;
            default:
                setBgImage(fall);
                break;
        }
    }, [temp]);

    useLayoutEffect(() => {
        document.body.style.backgroundImage = `url(${bgImage})`
    }, [bgImage])

    return (
        <ThemeContext.Provider value={{ setTemp }}>
            {children}
        </ThemeContext.Provider>

    )
}

export default ThemeContext;