import React, { useState } from 'react';
import "./servicemen.css"
import ShowListOfServicers from "../ServicemenShowCard/ShowListOfServicers"
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
//import Modal from './Modal';

export default function ServiceMen(){
    
  //   const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);

  // const openModal = () => {
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };
  
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };
  
    
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
                <div>
                <button className="date-btn" onClick={handleCalendarToggle}>Choose Date</button>
                <Modal isOpen={showCalendar} onClose={handleCalendarToggle}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
        />
      </Modal>
                {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Calendar Modal"
      >
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          // Add any other props or configurations you need
        />
        <button onClick={closeModal}>Close</button>
        </Modal> */}
        
      </div>
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
    );
}
