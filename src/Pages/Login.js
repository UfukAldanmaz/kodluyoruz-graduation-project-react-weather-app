import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/loginApi";
import { setLogged } from "../storage/authStore";

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (login(userName, password)) {
            setLogged();
            navigate('/');
        } else {
            setError('Wrong username or password!')
        }
    }

    return (<div className="login-background">
        <div className="login-container ">
            <input onChange={e => setUserName(e.target.value)}
                value={userName} placeholder="name"
                className="name-input" autoFocus />
            <input onChange={e => setPassword(e.target.value)}
                value={password} type="password" placeholder="password"
                className="pass-input" />
            <button className="login-btn" onClick={handleLogin}>
                Login
            </button>
            <span className="error-message">
                {error}
            </span>
        </div>
    </div>)
}

export default Login;