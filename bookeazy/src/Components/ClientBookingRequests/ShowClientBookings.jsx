import { useEffect, useState } from "react"
import style from "./ShowClientBooking.module.css"
import axios from "axios"

function ShowClientBookings() {
    const [bookings, setBookings] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:8000/api/get-user-bookings",{withCredentials: true})
        .then(data=>{
            // console.log(data.data.bookings)
            setBookings(data.data.bookings)
        })
        .catch(err=>console.error(err.response.data))
    },[])
  return (
    <div className={style.bookingsContainer}>
        {bookings.map((data, index)=><BookingRequest key={index} serviceperson={data.servicePerson.name} service={data.service.name} status={data.status} startTime={data.startTime}/>)}
    </div>
  )
}

function BookingRequest(props){
    useEffect(()=>{
        // console.log(props)
    },[])
    
    return(
        <div className={style.bookingCard}>
            <span className={style.imageContainer}><img src="https://cataas.com/cat"/></span>
            <span className={style.servicepersonName}>{props.serviceperson}</span>
            <span className={style.serviceName}>{props.service}</span>
            <span className={style.bookingTime}>{new Date(props.startTime).toLocaleString()}</span>
            <span className={style.bookingStatus}>Status: {props.status}</span>
        </div>
    )
}

export default ShowClientBookings