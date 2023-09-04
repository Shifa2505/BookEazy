export default function Homepage(){
    return <div className="dashboard">
        {/* Main Content of home screen */}
        <section className="home-page">
        <div className="home-wrap">
        <h1>BookEazy: Connecting You with Trusted Service Professionals</h1>
        <h3>At BookEazy, we believe in simplifying your life by connecting you with a network 
            of dedicated Service Professionals who are ready to assist you in various aspects of your daily routine.
             Our mission is to empower you with convenience, quality, and trustworthiness.</h3>
        </div>
        <div className="help-btn">
        <a href="#service-cards">Help Me Now</a>     
        </div>
        </section>
       
        {/* SERVICE CARDS */}
        <section id="service-cards" className="service-cards">
        <div class="service-text">
            <h2>Our Services</h2>
        </div>
        <div class="service-container">
            <div class="service-card">
                <div class="service-img">
                    <img src="images/plumbing.jpeg"  width="380" height="210"/>
                </div>
                <div class="service-content">
                    <h3>Plumbing Repairs</h3>
                    <p>Avg. Project: ₹400-₹500</p>
                </div>
            </div>
            <div class="service-card">
                <div class="service-img">
                    <img src="images/electrical.jpeg" width="380" height="210"/>
                </div>
                <div class="service-content">
                    <h3>Electrical Help</h3>
                    <p>Avg. Project: ₹400-₹500</p>
                </div>
            </div>
            <div class="service-card">
                <div class="service-img">
                    <img src="images/cleaning.jpg" width="380" height="210"/>
                </div>
                <div class="service-content">
                    <h3>Home Cleaning</h3>
                    <p>Avg. Project: ₹400-₹500</p>
                </div>
            </div>
        </div>
        <div class="service-container">
            <div class="service-card">
                <div class="service-img">
                    <img src="images/furniture.jpg"  width="380" height="210"/>
                </div>
                <div class="service-content">
                    <h3>Furniture Assembly</h3>
                    <p>Avg. Project: ₹400-₹500</p>
                </div>
            </div>
            <div class="service-card">
                <div class="service-img">
                    <img src="images/painting.jpeg" width="380" height="210"/>
                </div>
                <div class="service-content">
                    <h3>Painting</h3>
                    <p>Avg. Project: ₹400-₹500</p>
                </div>
            </div>
            <div class="service-card">
                <div class="service-img">
                    <img src="images/lifting.jpeg" width="380" height="210"/>
                </div>
                <div class="service-content">
                    <h3>Heavy Lifting</h3>
                    <p>Avg. Project: ₹400-₹500</p>
                </div>
            </div>
        </div>
        </section>
        <section id="service-cards" className="service-cardss">
        <div class="servicetext">
            <h2>Our New Services</h2>
        </div>
        <div class="service-containers">
            <div class="services-card">
                <div class="services-main">
                    <h3>Plumbing Repairs</h3>
                </div>
                <div class="services-content">
                    <h3>Plumbing Repairs</h3>
                    <p>Avg. Project: ₹400-₹500</p>
                    <button className="services-btn">Book Now</button>
                </div>
            </div>
            <div class="services-card">
                <div class="service-img">
                    <img src="images/electrical.jpeg" width="480" height="310"/>
                </div>
                <div class="services-content">
                    <h3>Electrical Help</h3>
                    <p>Avg. Project: ₹500-₹600</p>
                    <button className="services-btn">Book Now</button>
                </div>
            </div>
            <div class="services-card">
                <div class="service-img">
                    <img src="images/cleaning.jpg" width="480" height="310"/>
                </div>
                <div class="services-content">
                    <h3>Home Cleaning</h3>
                    <p>Avg. Project: ₹200-₹300</p>
                    <button className="services-btn">Book Now</button>
                </div>
            </div>
        </div>
        <div class="service-containers">
            <div class="services-card">
                <div class="service-img">
                    <img src="images/furniture.jpg"  width="480" height="310"/>
                </div>
                <div class="services-content">
                    <h3>Furniture Assembly</h3>
                    <p>Avg. Project: ₹100-₹200</p>
                    <button className="services-btn">Book Now</button>
                </div>
            </div>
            <div class="services-card">
                <div class="service-img">
                    <img src="images/painting.jpeg" width="480" height="310"/>
                </div>
                <div class="services-content">
                    <h3>Painting</h3>
                    <p>Avg. Project: ₹700-₹800</p>
                    <button className="services-btn">Book Now</button>
                </div>
            </div>
            <div class="services-card">
                <div class="service-img">
                    <img src="images/lifting.jpeg" width="480" height="310"/>
                </div>
                <div class="services-content">
                    <h3>Heavy Lifting</h3>
                    <p>Avg. Project: ₹200-₹300</p>
                    <button className="services-btn">Book Now</button>
                </div>
            </div>
        </div>
        </section>
    </div>
}