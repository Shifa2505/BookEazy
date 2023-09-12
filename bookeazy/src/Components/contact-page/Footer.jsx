import "./css_files/Footer.css";
export default function Footer(){
    return(
        <div className="total-footer">
        <div className="main-footer">
            <div className="info-part">
            <h1 className="footer-heading">BookEazy</h1>
            <p>The BookEazy system is a convenient digital platform that allows users to schedule and manage appointments or services with ease. Offering a user-friendly interface that enables customers to browse available time slots, select their preferred date and time, and even choose specific service providers or locations. This streamlined process enhances efficiency for both businesses and clients, reducing scheduling conflicts and improving overall customer satisfaction. With 24/7 accessibility and automated reminders, our systems simplify the booking process, making it a valuable tool for modern businesses and service providers.</p>
            </div>
            <div className="links">
            <h2 className="footer-link">LINKS</h2>
            <ul className="all-links">
                <li className="sinle-link"><a href="#">Home</a></li>
                <li className="sinle-link"><a href="#">About</a></li>
                <li className="sinle-link"><a href="#">Services</a></li>
                <li className="sinle-link"><a href="#">Contact</a></li>
            </ul>
            </div>
            <div className="contact">
            <h2 className="footer-contact">CONTACT DETAILS</h2>
            <p><span>Phone </span>  +9999999999</p>
            <p><span>Email</span>  abc@domain.com</p>
            </div>
        </div>
        <div className="copyright">
            <p>copyright @ 2023</p>
        </div>
        </div>
    )
}