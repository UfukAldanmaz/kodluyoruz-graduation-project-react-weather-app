import { setLoggedOut } from '../storage/authStore';
import { NavLink, useNavigate } from 'react-router-dom';
import Login from '../assets/images/login.png';

const Navbar = () => {
    const navigate = useNavigate();
    const logout = () => {
        setLoggedOut();
        navigate('/login');
    };

    return <div className="navbar">
        <NavLink to="/" className="home-nav">Homepage</NavLink>
        <button className="logout" onClick={logout}>
            <div className='logout-container'>
                <img className='logout-img' src={Login} alt="logout"></img>
                <span className="tooltiptext">Logout</span>
            </div>
        </button>
    </div>
}

export default Navbar;