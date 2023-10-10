// import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext, useRef } from "react";
import axios from "axios";
function Login(){
    const {user, setUser} = useContext(UserContext);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const userTypeRef = useRef(null);
    
    function validateAndLogin(){
        if(usernameRef.current.value.trim().length==0){
            window.alert("Please enter username")
            return
        }
        if(passwordRef.current.value.trim().length==0){
            window.alert("Please enter password")
            return
        }
        // console.log(userTypeRef.current.value)
        if(userTypeRef.current.value=="User"){
            axios.post("http://localhost:8000/sign-in/user",{username: usernameRef.current.value, password:passwordRef.current.value}, {withCredentials: true})
            .then(data=>{
                console.log(data.data);
                setUser(data.data)
            })
            .catch(err=>console.error(err))
        }
        else{
            axios.post("http://localhost:8000/sign-in/serviceperson",{username: usernameRef.current.value, password:passwordRef.current.value}, {withCredentials: true})
            .then(data=>{
                console.log(data);
                setUser(data.data)
            })
            .catch(err=>console.error(err.response.data))

        }

    }
    return(
        // <h1>hi shifa login</h1>
        <section className="login-section">
            <div className="sub-login-section">
                <div className="left-login">
                    <h1>Login</h1>
                    {/* <h2>User Name</h2> */}
                    <label htmlFor="username">User Name:</label> <br/>
                    <input ref={usernameRef} type="text" id="username" name="username" placeholder="Enter you User Name" required/><br/>
                    <label htmlFor="password">Password:</label><br/>
                    <input ref={passwordRef} type="password" id="password" name="password" placeholder="Enter you Password" required/><br/>
                    <select ref={userTypeRef} defaultValue={"Client"}>
                        <option value={"User"}>Client</option>
                        <option value={"Serviceperson"}>Serviceperson</option>
                    </select>
                    <p>New here? <br />Sign up today as a{' '}
                        <Link to="/customerSignUp">Customer</Link>{' '}
                        or{' '}
                        <Link to="/serviceProviderSignUp">Service Provider</Link>!
                    </p>
                    <button className="confirm-btn" onClick={validateAndLogin}>Login</button>
                </div>
                <div className="right-login">
                    <img src="/images/login.jpg" alt="" width={200} height={200}/>
                </div>

            </div>

        </section>

    )
}
export default Login;