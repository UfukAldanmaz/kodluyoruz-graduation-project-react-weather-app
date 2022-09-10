import { useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import DataContext from "../Contexts/DataContext";


const withLoading = WrappedComponent => {
    return (props) => {
        const { weatherData } = useContext(DataContext);

        const [isLoading, setIsLoading] = useState(false);

        return (<>{isLoading && <div className={(typeof weatherData?.main != "undefined")
            ? ((weatherData?.main?.temp > 18)
                ? 'app' : (weatherData?.main?.temp < 1)
                    ? 'app winter' : 'app autumn') : 'app'} ><div className="loading"><ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#C8E9E9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    /></div></div>}
            <WrappedComponent isLoading={isLoading} setIsLoading={setIsLoading} {...props} /></>
        )
    }
}

export default withLoading;