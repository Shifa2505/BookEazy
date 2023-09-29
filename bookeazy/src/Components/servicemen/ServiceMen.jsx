import "./servicemen.css"
import ShowListOfServicers from "../ServicemenShowCard/ShowListOfServicers"
export default function ServiceMen(){
    return(
        <div className="select-servicemen">
        <div className="slogan">
        <img src="/src/assets/customer-service.png"/>
        <h3>"Discover the Perfect Service Professional: Your Preferred Services, Our Expert Hands!"</h3>
             </div>
        <div className="main-section">
            <div className="filters">
                <h4>Date</h4>
                <div className="date-selection">
                <div className="left-side-btns">
                <button className="date-btn">Today</button>
                <button className="date-btn">Within A Week</button>
                </div>
                <div className="right-side-btns">
                <button className="date-btn">Within 3 Days</button>
                <button className="date-btn">Choose Date</button>
                </div>
                </div>
                <hr className="horizontal-line"></hr>
                <div className="time-selection">
                <h4>Time Of Day</h4>
                <div className="checkbox-1">
                    <input type="checkbox"/>
                    <p>Morning (8am to 12pm)</p>
                </div>
                <div className="checkbox-2">
                    <input type="checkbox"/>
                    <p>Afternoon (12pm to 5 pm)</p>
                </div>
                <div className="checkbox-3">
                    <input type="checkbox"/>
                    <p>Evening (5pm to 9:30pm)</p>
                </div>
                </div>
                <hr className="horizontal-line"></hr>
                <h4>Price</h4>
                <div className="price">
                <input type="range" list="value"/>
                <datalist id="values">
                    <option value={0} label="0"></option>
                    <option value={100} label="100"></option>
                </datalist>
            </div>
            </div>
            
            <div className="servicemens">
            <ShowListOfServicers />
            </div>
        </div>
        </div>
    )
}