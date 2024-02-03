import { useState } from "react"
import axios from 'axios'
import {toast, Toaster} from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import './Register.css'

export default function Register(){
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        username: '',
        password: '',
        
    })
    const registerUser = async (e) => {
        e.preventDefault()
        const {name, email, phone, location, username, password} = data;
        if(!name.trim()){
            toast.error("Please enter your name.");
            return;
        }
        if(!email.trim()){
            toast.error("Please enter your email.");
            return;
        }
        if(!phone.trim()){
            toast.error("Please enter your phone.");
            return;
        }
        if(!location.trim()){
            toast.error("Please enter your location.");
            return;
        }
        if(!username.trim()){
            toast.error("Please enter your username.");
            return;
        }
        if(!password.trim()){
            toast.error("Please enter your password.");
            return;
        }
        // try {
        //     const {data} = await axios.post('/register', {
        //         name, email, userType, password
        //     })
        //     if(data.error){
        //         toast.error(data.error)
        //     }else {
        //         setData({})
        //         toast.success('Registration Successful. Login to continue!');
        //         navigate('/login')
        //     }
        // }catch (error){
        //     console.log(error)
        // }
    }
    return(
        <div>
            <form onSubmit={registerUser}>
                <div className="registerUser-form">
                    <div className="registerUser-container">
                        <div className="left-register">
                            <h1>Sign Up </h1>
                            <label className="name">Name:</label>
                            <input type="text" id="username" placeholder="enter name..." value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
                            <label>Email:</label>
                            <input type="email" id="email" placeholder="enter email..." value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
                            <label>Phone:</label>
                            <input type="text" id="phone" placeholder="enter phone..." value={data.phone} onChange={(e) => setData({...data, phone: e.target.value})} />
                            <label>location:</label>
                            <input type="text" id="location" placeholder="enter location..." value={data.location} onChange={(e) => setData({...data, location: e.target.value})} />
                            <label>Username:</label>
                            <input type="text" id="username" placeholder="enter username..." value={data.username} onChange={(e) => setData({...data, username: e.target.value})} />
                            <label>Password:</label>
                            <input type="password" id="password" placeholder="enter password..." value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                            {/* <label>User Type: </label>
                            <select name="userType" id="usertype" value={data.userType} onChange={(e) => setData({ ...data, userType: e.target.value })}> 
                            <option id="usertype" value="Contributor">Contributor</option>
                            <option id="usertype" value="Organization">Organization</option>
                            </select> */}
                            <p>Already have an account?<Link className='link' to='/login'>Login</Link></p> 
                            
                            <button className="confirm-btn" type='submit'>Submit</button>
                        </div>
                        {/* <div className="right-register">
                            <img src="../images/signup.png" alt="" width={200} height={200}/>  
                        </div>  */}
                    </div>
                </div>
                
            </form>
            <Toaster position="top-center"/>
        </div>
    )
}