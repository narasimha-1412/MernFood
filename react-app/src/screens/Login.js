import React, {useState} from 'react'

import {
  Link,
  useNavigate
} from "react-router-dom";
import Navbar from '../components/Navbar';

export default function Login() {

  const [credentials,setCredentials]=useState({email:"",password:""})

  const navigate=useNavigate()

    const handleSubmit=async (e)=>{
    e.preventDefault()
    const response=await fetch('http://localhost:5000/api/loginuser',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
    })

    const json=await response.json()
    console.log(json)

    if (!json.success){
    alert('Enter valid credentials')
    }

    if (json.success){
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", json.authToken)
      navigate('/')
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
          
          <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" name='email' value={credentials.email} onChange={onChange}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          </div>
          <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" name='password' value={credentials.password} onChange={onChange}  className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>

          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/createUser" className='m-3 btn btn-danger'>Signup</Link>
          </form>
      </div>
    </>
  )
}
