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
     const res = await axios.get(`http://localhost:3001/api/auth/getcard/${userId}`)
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
  
  navigate("/")
  }


return(
  
  
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

  )
}