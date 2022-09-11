import { useState, useContext, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import DataContext from "../Contexts/DataContext";
import ThemeContext from "../Contexts/ThemeContext";


const withLoading = WrappedComponent => {
    return (props) => {
        const { weatherData } = useContext(DataContext);
        const { setTemp } = useContext(ThemeContext);

        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            setTemp(weatherData?.main?.temp);
        }, [weatherData, setTemp])

        return (<>{isLoading && <div className="loading"><ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#C8E9E9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        /></div>}
            <WrappedComponent isLoading={isLoading} setIsLoading={setIsLoading} {...props} /></>
        )
    }
}

export default withLoading;