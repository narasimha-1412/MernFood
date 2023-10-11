import React, {useState} from 'react'

import {
    Link,
    useNavigate
  } from "react-router-dom";
import Navbar from '../components/Navbar';

export default function Signup() {

    const [credentials,setCredentials]=useState({name:"",email:"",password:"",geolocation:""})

    const navigate=useNavigate()

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const response=await fetch('http://localhost:5000/api/createUser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
    })

    const json=await response.json()
    console.log(json)

    if (!json.success){
    alert('Enter valid credentials')
    }

    if (json.success){
        navigate('/login')
      }
    }

    const onChange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }

  return (
    <>
        <Navbar/>

        <div className='container' style={{marginTop:'110px'}}>
        <form onSubmit={handleSubmit}>
            <div className="col-auto">
                <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                <input type="text" name='name' value={credentials.name} onChange={onChange} className="form-control" id="inlineFormInputGroup" placeholder="Username"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" name='email' value={credentials.email} onChange={onChange}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" name='password' value={credentials.password} onChange={onChange}  className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div className="col-auto">
                <label className="sr-only" htmlFor="address">Address</label>
                <input type="text" name='geolocation' value={credentials.geolocation} onChange={onChange}  className="form-control" id="address" placeholder="Address"/>
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/login" className='m-3 btn btn-danger'>login</Link>
            </form>
        </div>
    </>
  )
}
