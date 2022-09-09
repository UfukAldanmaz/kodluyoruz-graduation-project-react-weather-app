import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const withLoading = WrappedComponent => {
    return (props) => {
        const [isLoading, setIsLoading] = useState(false);

        return (<>{isLoading && <div><ThreeDots
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