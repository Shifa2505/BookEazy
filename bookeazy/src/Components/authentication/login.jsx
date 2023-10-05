// import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

function Login(){
    return(
        // <h1>hi shifa login</h1>
        <section className="login-section">
            <div className="sub-login-section">
                <div className="left-login">
                    <h1>Login</h1>
                    {/* <h2>User Name</h2> */}
                    <label htmlFor="username">User Name:</label> <br/>
                    <input type="text" id="username" name="username" placeholder="Enter you User Name" required/><br/>
                    <label htmlFor="password">Password:</label><br/>
                    <input type="password" id="password" name="password" placeholder="Enter you Password" required/><br/>
                    <p>New here? <br />Sign up today as a{' '}
                        <Link to="/customerSignUp">Customer</Link>{' '}
                        or{' '}
                        <Link to="/serviceProviderSignUp">Service Provider</Link>!
                    </p>
                    <button className="confirm-btn">Login</button>
                </div>
                <div className="right-login">
                    <img src="/images/login.jpg" alt="" width={200} height={200}/>
                </div>

            </div>

        </section>

    )
}
export default Login;