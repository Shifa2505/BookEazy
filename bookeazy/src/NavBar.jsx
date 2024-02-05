import { Link } from "react-router-dom";
import { UserContext } from "./App";
import { useContext } from "react";

export default function Navbar(){
    const {user, setUser} = useContext(UserContext);

    return <nav className="nav">
        <Link to="/" className="site-title">BookEazy</Link>
        <i className="fa-solid fa-xmark"></i>
        <ul>
            {user ? <li>
                {user.userType=="client" ? 
                <Link to="/showBookings">My Bookings</Link> : 
                <Link to="/showRequests">My Bookings</Link>}
            </li> : <></>}
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <span>Services</span>
                <div className="dropdown">
                    <ul>
                        <li>
                            <Link to="/service1">Plumbing Repairs</Link>
                        </li>
                        <li>
                            <Link to="/service2">Electrical Help</Link>
                        </li>
                        <li>
                            <Link to="/service3">Painting</Link>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <Link to="/contact-us">Contact Us</Link>
            </li>
            <li>
                <Link to="/login">Sign up/Log in</Link>
                {/* <a href="/login">Sign up/Log in</a> */}
                <div className="dropdown">
                    <ul>
                        <li>
                            <a href="/">User</a>
                        </li>
                        <li>
                            <a href="/">Service Provider</a>
                        </li>
                    </ul>
                </div>
            </li>
            
        </ul>
    </nav>
}