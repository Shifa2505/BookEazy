export default function Navbar(){
    return <nav className="nav">
        <a href="/" className="site-title">BookEazy</a>
        <i class="fa-solid fa-xmark" onclick="hideMenu()"></i>
        <ul>
            <li>
                <a href="/about">Home</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>
            <li>
                <a href="/services">Services</a>
                <div className="dropdown">
                    <ul>
                        <li>
                            <a href="/service1">Plumbing Repairs</a>
                        </li>
                        <li>
                            <a href="/service2">Electrical Help</a>
                        </li>
                        <li>
                            <a href="/service3">Painting</a>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <a href="/about">Contact Us</a>
            </li>
            <li>
                <a href="/login">Sign up/Log in</a>
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