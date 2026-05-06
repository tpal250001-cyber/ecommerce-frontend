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
      console.log(response.data)
       localStorage.setItem("userId",response.data.id)
     
   setMsg(response.data.message)
      
   setTimeout(()=>{
      navigate("/home");
   },1000) 

    }
 /*return( 
<div className="min-h-screen bg-gray-100 flex items-center ">
<h2 className="bg bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"> Create Account </h2>
   { (<div className=" ">
    {msg}
   </div>  )}
 <form onSubmit={handleSubmit} className="">
  
   <div className="pt-4  border-2 w-20">
    <input name="email"
      placeholder="enter email"
     
      onChange = {(e)=>{
    setemail(e.target.value)
      }}
      className=""
      required
    />
   </div>
   <div className="pt-4 border-2">
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
 </div>)
}*/

return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h2>

      {msg && (
        <div className="bg-green-100 text-green-700 text-center p-2 rounded mb-4">
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <input
            name="email"
            placeholder="Enter Email"
            onChange={(e) => setemail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Login
        </button>

      </form>
    </div>
  </div>
)
 }