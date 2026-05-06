import { useState } from "react";
 import axios from "axios"
import { useNavigate } from "react-router-dom";
export default function Signup(){
 
   const[email,setemail] = useState()
   const[name,setname] = useState()
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

    const response = await axios.post("https://ecommerce-backend-juke.onrender.com/api/auth/signup",{
        
        email,name,password  
      })

      setMsg(response.data.message)
   }
 
   /* return (
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
  )*/
  
  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h2>

      {(<div className="">
        {msg}
      </div>)}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" placeholder="Enter Email"
          onChange={(e) => setemail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required />

        <input name="name" placeholder="Enter Name"
          onChange={(e) => setname(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required />

        <input name="password" type="password" placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required />

        <button type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200">
          Signup
        </button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-4">
        Already have an account? <span className="text-blue-600 cursor-pointer hover:underline" onClick={()=>{
          navigate("/signin")
        }}>Login</span>
      </p>

    </div>
  </div>
)


  
  }