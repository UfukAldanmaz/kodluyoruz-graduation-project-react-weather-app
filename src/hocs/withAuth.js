import { Navigate } from "react-router-dom";
import { isLogged } from "../storage/authStore";

const withAuth = (WrappedComponent) => {
    return (props) => {

        if (isLogged()) {
            return <WrappedComponent {...props} />
        } else {
            return <Navigate to="/login" replace={true} />
        }
    }
};

export default withAuth;