import { useState } from "react";
 import axios from "axios"
export default function Signup(){
 
   const[email,setemail] = useState()
   const[name,setname] = useState()
   const[password,setPassword] = useState()

   const[msg,setMsg] = useState()

  // const handleChange=(e) =>{
 
    //setForm({
    //...form,
    //[e.target.name]:e.target.value,
   
  //  })
  // }

   const handleSubmit = async(e)=>{
    e.preventDefault();

    const response = await axios.post("http://localhost:3001/api/auth/signup",{
        
        email,name,password  
      })

      setMsg(response.data.message)
   }
 
    return <div>
<div className="">
<div className="">
<h2 className=""> Create Account </h2>
 
   { (<div className="">
   
   
    {msg}
   
   </div>  )}
 
 <form onSubmit={handleSubmit} className="">

    <input name="email"
      placeholder="enter email"
     
      onChange = {(e)=>{
    setemail(e.target.value)
      }}
      className=""
      required
    
    />
   <input name="name"
      placeholder="enter name"
    
      onChange = {(e)=>{
    setname(e.target.value)
      }}
      className=""
      required
    
    />
    <input name="password"
      placeholder="enter password"
  
      onChange = {(e)=>{
    setPassword(e.target.value)
      }}
      className=""
      required
    
    />
    <button type="submit" 
      className=""
    > signup</button>
 </form>
 
 </div>
 </div>
  
    
    
    
    
    
    </div>
}