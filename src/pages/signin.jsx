 import { useState } from "react";
 import axios from "axios"
import { useNavigate } from "react-router-dom";
 export default function Signin(){
 
    const[email,setemail] = useState()
  
   const[password,setPassword] = useState()
  
   const[msg,setMsg] = useState()
   const navigate = useNavigate()
  
  // const handleChange=(e) =>{
 
    //setForm({
    //...form,
    //[e.target.name]:e.target.value,
   
  //  })
  // }

   const handleSubmit = async(e)=>{
    e.preventDefault();

    const response = await axios.post("https://ecommerce-backend-juke.onrender.com/api/auth/login",{
        
        email,
        password  
      })
    
      localStorage.setItem("token",response.data.token)
       localStorage.setItem("userId",response.data.id)
      
   setMsg(response.data.message)
      
   setTimeout(()=>{
      navigate("/home");
   },1000) 

    }
 
    return <div>
<div className="">
<div className="">
<h2 className=""> Create Account </h2>
 
   { (<div className=" ">
   
   
    {msg}
   
   </div>  )}
 
 <form onSubmit={handleSubmit} className="">
   
   <div className="pt-5">
    <input name="email"
      placeholder="enter email"
     
      onChange = {(e)=>{
    setemail(e.target.value)
      }}
      className=""
      required
    
    />
   </div>
   <div className="pt-5 border-2 w-3">
    <input name="password"
      placeholder="enter password"
  
      onChange = {(e)=>{
    setPassword(e.target.value)
      }}
      className=""
      required
    
    />
    </div>
    <button type="submit" 
      className=""
    > Login</button>
   
 </form>
 
 </div>
 </div>
  
    
    
    
    
    
    </div>
}