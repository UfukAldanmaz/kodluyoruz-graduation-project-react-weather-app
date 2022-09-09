import { Navigate } from "react-router-dom";
import { isLogged } from "../storage/authStore";

const withAuth = (WrappedComponent) => {
    return (props) => {
        console.log('wp', isLogged());

        if (isLogged()) {
            console.log("if");
            return <WrappedComponent {...props} />
        } else {
            console.log("else");
            return <Navigate to="/login" replace={true} />
        }
    }
};

export default withAuth;