import React, { useState } from "react";
import style from "./ShowRequests.module.css";

function ShowRequestsUpdate() {
  return (
    <div className={style.requestsList}>
      <RequestCardUpdate clientName="John Doe" location="Sion, Mumbai"/>
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
