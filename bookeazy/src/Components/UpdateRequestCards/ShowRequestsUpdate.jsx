import React, { useEffect, useState } from "react";
import style from "./ShowRequests.module.css";
import axios from "axios"

function ShowRequestsUpdate() {
  const [requests, setRequests] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:8000/api/get-serviceperson-bookings",{withCredentials:true})
    .then(data=>{
      console.log(data.data.bookings)
      setRequests(data.data.bookings)
    })
    .catch(err=>console.error(err.response.data))
  },[])
  return (
    <div className={style.requestsList}>
      {requests.map(r=><RequestCardUpdate clientName={r.user.name} location={r.user.location}/>)}
    </div>
  );
}

function RequestCardUpdate(props) {
  const [status, setStatus] = useState("unset");

  function accept() {
    setStatus("accepted");
  }

  function reject() {
    setStatus("rejected");
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
        <span>Date here</span>
        <span>Time here</span>
      </span>
      <span className={style.service}>ServiceName here</span>
      <div className={style.requestBtnContainer}>
        {status == "unset" ? (
          <>
            <button onClick={accept}>Accept</button>
            <button onClick={reject}>Reject</button>
          </>
        ) : (
          <>
            {status == "accepted" ? (
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
