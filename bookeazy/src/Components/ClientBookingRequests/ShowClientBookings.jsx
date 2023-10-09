import style from "./ShowClientBooking.module.css"

function ShowClientBookings() {
  return (
    <div className={style.bookingsContainer}>
        <BookingRequest />
    </div>
  )
}

function BookingRequest(props){
    
    return(
        <div className={style.bookingCard}>
            <span className={style.imageContainer}><img src="https://i.pravatar.cc/128"/></span>
            <span className={style.servicepersonName}>John Doe</span>
            <span className={style.bookingTime}>{new Date().toISOString()}</span>
            <span className={style.bookingStatus}>Status: PENDING</span>
        </div>
    )
}

export default ShowClientBookings