import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Navbar(){

 const navigate = useNavigate();
 console.log("usssss")
const[ cartcount,setcartcount ] = useState(0);
const[userId , setuserId] = useState(localStorage.getItem("userId"))

  useEffect( ()=> {

    const loadcart = async() =>{
  console.log("tuahaha")
      console.log(userId)
     if(!userId) return setcartcount(0);
    try{
     const res = await axios.get(`https://ecommerce-backend-juke.onrender.com/api/auth/getcard/${userId}`)
     const total = res.data.items.reduce(
      (sum,item) => sum+ item.quantity, 0);
      console.log(total)
    setcartcount(total)
     }catch(error){
      console.log(error)
      setcartcount(0)
     }
    loadcart()
    //window.addEventListener("cartupdated",loadcart);

    return () => {
      loadcart()
     // window.removeEventListener("cartupdated",loadcart)
    }
    }
  },[userId])

  function logout(){
  localStorage.clear()
  
  setcartcount(0)
  
  navigate("/home")
  }


/*return(
  
  
    <nav className ='flex justify-between p-4 '>
         <Link to ="/home" > mohit store</Link>

    <div className ="flex items-center">
 <Link to="/cart">
{
  cartcount > 0 && (
<span className="bg-red-400 text-white text-xs rounded-full">
{cartcount}
</span>
  )
}
</Link>
{
  !userId ?(
    <div>
     <Link to="/signin">signin</Link>
    <Link to="/signup">signup</Link>
    </div>
  ):(
    <button onClick={logout}>logout</button>
  )}
  </div>
  </nav>

  )*/
   return(
<nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">

  <Link to="/home" className="text-xl font-bold text-blue-600 tracking-wide">
    Quick Cart
  </Link>

  <div className="flex items-center gap-4">

    <Link to="/cart" className="relative">
      <span className="text-gray-700 font-medium hover:text-blue-600 transition">
        🛒 Cart
      </span>
      {cartcount > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartcount}
        </span>
      )}
    </Link>

    {!userId ? (
      <div className="flex items-center gap-2">
        <Link to="/signin"
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
          Sign In
        </Link>
        <Link to="/signup"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          Sign Up
        </Link>
      </div>
    ) : (
      <button onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium">
        Logout
      </button>
    )}

  </div>
</nav>) } 
 