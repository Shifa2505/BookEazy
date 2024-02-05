import { useContext, useEffect, useState } from "react"
import style from "./ShowClientBooking.module.scss"
import axios from "../../../axios.config"
import { Box, Grid, Stack, Tab, Tabs } from "@mui/material"
import { UserContext } from "../../App"
import { useNavigate } from "react-router-dom";
import {toast, Toaster} from 'react-hot-toast';
import DropIn from "braintree-web-drop-in-react"

function ShowClientBookings() {
    const [bookings, setBookings] = useState([])
    const [pendingBookings, setPendingBookings] = useState([])
    const [acceptedBookings, setAcceptedBookings] = useState([])
    const [tab, setTab] = useState(1);
    
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();
    useEffect(()=>{
        if(!user || user.userType!=="client"){
            toast.error("You need to signin as a user first.");
            setTimeout(()=>{
              navigate("/login",{state:{userType:"client"}})
            },3000)
          }
          else{
              axios.get("/api/get-user-bookings",{withCredentials: true})
              .then(data=>{
                //   console.log(data.data.bookings)
                  setBookings(data.data.bookings)
                  // console.log(data.data.bookings.filter(d=>d.status=="ACCEPTED"))
                  setPendingBookings(data.data.bookings.filter(d=>d.status=="PENDING"))
                  setAcceptedBookings(data.data.bookings.filter(d=>d.status=="ACCEPTED"))
              })
              .catch(err=>console.error(err))
          }
    },[])
  return (
    <Box className={style.bookingsContainer}>
        <Tabs value={tab} onChange={(e,val)=>setTab(val)} style={{border:"1px solid blue", width:"80%"}} variant="fullWidth">
            <Tab label="Pending" />
            <Tab label="Accepted" />
        </Tabs>
        <Stack gap={"1rem"} marginBlock={"1rem"} width={"80%"}>
            {(tab==0)?
                pendingBookings.map((data,index)=><BookingRequest key={index} serviceperson={data.servicePerson.name} service={data.service.name} status={data.status} startTime={data.startTime}/>)
            :<>
            {(tab==1)?
            acceptedBookings.map((data,index)=><AcceptedRequest key={index} serviceperson={data.servicePerson.name} service={data.service.name} status={data.status} startTime={data.startTime} id={data._id} fare={data.fare}/>)
            :<></>}</>}
        </Stack>
        {/* {bookings.map((data, index)=><BookingRequest key={index} serviceperson={data.servicePerson.name} service={data.service.name} status={data.status} startTime={data.startTime}/>)} */}

    <Toaster position="top-center" />
    </Box>
  )
}

function BookingRequest(props){
    useEffect(()=>{
        // console.log(props)
    },[])
    
    return(
        <div className={style.bookingCard}>
            <span className={style.imageContainer}><img src={`https://ui-avatars.com/api/?name=${props.serviceperson}&background=random`}/></span>
            <span className={style.servicepersonName}>{props.serviceperson}</span>
            <span className={style.serviceName}>{props.service}</span>
            <span className={style.bookingTime}>{new Date(props.startTime).toLocaleString()}</span>
            <span className={style.bookingStatus}>Status: {props.status}</span>
        </div>
    )
}

function AcceptedRequest(props){
    const [clientToken, setClientToken] = useState(null);
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);
    
    async function getToken(){
        setLoading(true);
        axios.get("/api/get-payment-token")
        .then(data=>{
            setClientToken(data.data.clientToken)
            setLoading(false);
        })
        .catch(err=>{
            console.error("Error fetching payment token.")
            setLoading(false);
        })
    }

    useEffect(()=>{
        console.log(props)
    })
    return(
        <div className={style.acceptedRequest}>
            <div className={style.profilePhoto}>
                <img src={`https://ui-avatars.com/api/?name=${props.serviceperson}&background=random`}/>
            </div>
            <div className={style.contents}>
                <span>{props.serviceperson}</span>
                <span>Accepted</span>
                <span>{props.service}</span>
                <span>{new Date(props.startTime).toLocaleString()}</span>
                {!instance && <button onClick={getToken} disabled={loading}>{loading ? "Loading" : "Proceed to Pay"}</button>}
            </div>
            {clientToken && <div className={style.payment}>
                {/* <span>{clientToken.slice(0,10) + "..." + clientToken.slice(-10)}</span> */}
                <DropIn options={{authorization:clientToken}} onInstance={(instance)=>{
                    setInstance(instance);
                }}/>
                <button onClick={()=>{}}>Pay</button>
            </div>}
        </div>
    )
}

export default ShowClientBookings