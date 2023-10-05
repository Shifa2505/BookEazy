import { Link } from "react-router-dom";

export default function Navbar(){
    return <nav className="nav">
        <a href="/" className="site-title">BookEazy</a>
        <i className="fa-solid fa-xmark" onClick="hideMenu()"></i>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/services">Services</Link>
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