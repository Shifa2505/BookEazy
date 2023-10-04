import "./finalbooking.css"
import { useParams } from 'react-router-dom';

export default function FinalBooking(){
    return(
        <div className="final-booking-page">
            <div className="slogan">
            <img src="/src/assets/completed-task.png"/>
        <h3>Congratulations! You're almost there. Just one last step to secure your booking and experience our exceptional service. </h3>
            </div>

            <div className="main-final-booking">
                <div className="task-description">
                    <h4>Enter Your Task Description</h4>
                    <div className="task-detail">
                        <textarea className="text-area" rows={5}></textarea>
                    </div>
                    <button className="add-des">Add Description</button>
                    <hr className="break"></hr>
                    <div>
                    <img src="/src/assets/logo.png"/>
                    </div>
                    <p className="logo-para">Experience the convenience of booking your services online - anytime, anywhere.</p>

                </div>

                <div className="confirmation-sec">
                <div className="detail-and-btn">
                <div className="service-details">
                    <div className="service-profile-sec">
                        <h3>Task Name</h3>
                        <div className="service-sec-image">
                        <img src="/src/assets/completed-task.png"/>
                        </div>
                        <p>Tasker Name</p>
                    </div>
                    <div className="service-confirm-det">
                    <div className="single-det">
                        <img src="/src/assets/calendar.png" /><span>Date Of Booking</span>
                        </div>
                        <div className="single-det">
                        <img src="/src/assets/pin.png" /><span>Location</span>
                        </div>
                        <div className="single-det">
                        <img src="/src/assets/calendar.png" /><span>Date Of Booking</span>
                        </div>
                    </div>
                </div>
                <button className="confirm-btn">Confirm Booking</button>
                </div>
                </div>
            </div>
        </div>
    )
}