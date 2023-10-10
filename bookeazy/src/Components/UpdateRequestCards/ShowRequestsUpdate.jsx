import React, { useEffect, useState } from "react";
import style from "./ShowRequests.module.css";
import axios from "axios"

function ShowRequestsUpdate() {
  const [requests, setRequests] = useState([])
  const [acceptedRequests, setAcceptedRequests] = useState([])
  const [rejectedRequests, setRejectedRequests] = useState([])


  useEffect(()=>{
    axios.get("http://localhost:8000/api/get-serviceperson-bookings",{withCredentials:true})
    .then(data=>{
      let bookings = data.data.bookings;
      // console.log(data.data.bookings)
      setRequests(data.data.bookings)
      console.log("accepted",bookings.filter(x=>x.status=="ACCEPTED"))
      setAcceptedRequests(...bookings.filter(x=>x.status=="ACCEPTED"))
      setRejectedRequests(data.data.bookings.filter(x=>x.status=="REJECTED"))
      // console.log("accepted",acceptedRequests)
      // console.log("rejected",rejectedRequests)
    })
    .catch(err=>console.error(err.response.data))
  },[])
  return (
    <div className={style.requestsList}>
      {requests.map((r, index)=><RequestCardUpdate key={index} clientName={r.user.name} location={r.user.location} startTime={r.startTime} service={r.service.name} bookingId={r._id} status={r.status}/>)}
    </div>
  );
}

function RequestCardUpdate(props) {
  const [status, setStatus] = useState(props.status);

  function accept() {
    axios.get("http://localhost:8000/api/accept-booking?bookingId="+props.bookingId, {withCredentials: true})
    .then(()=>{
      setStatus("ACCEPTED");
    })
    .catch((err)=>{console.error(err)})
  }

  function reject() {
    axios.get("http://localhost:8000/api/reject-booking?bookingId="+props.bookingId, {withCredentials: true})
    .then(()=>{
      setStatus("REJECTED");
    })
    .catch((err)=>{console.error(err)})
  }

  return (
    <div className={style.requestCard}>
      <span className={style.requestImage}>
        <img src="https://i.pravatar.cc/128" />
      </span>
      <span className={style.requestDetails1}>
        <span>{props.clientName}</span>
        <span>{props.location}</span>
      </span>
      <span className={style.requestDetails2}>
        <span>{new Date(props.startTime).toLocaleDateString()}</span>
        <span>{new Date(props.startTime).toLocaleTimeString()}</span>
      </span>
      <span className={style.service}>{props.service}</span>
      <div className={style.requestBtnContainer}>
        {status == "PENDING" ? (
          <>
            <button onClick={accept}>Accept</button>
            <button onClick={reject}>Reject</button>
          </>
        ) : (
          <>
            {status == "ACCEPTED" ? (
              <span className={style.acceptedText}>{status}</span>
            ) : (
              <span className={style.rejectedText}>{status}</span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ShowRequestsUpdate;
