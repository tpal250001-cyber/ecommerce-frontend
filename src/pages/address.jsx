import { useState } from "react";
//import { useParams } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom"
export default function Address(){
 
  const navigate = useNavigate()
  
  const userId = localStorage.getItem("userId")
const [form,setform] = useState({
   "fullname":"",
  "phone":"",
  "addressline" :"",
  "city":"",
  "state":"",
  "pincode":""
   });
function handlechange(e){

  setform({
    ...form,
    [e.target.name]:e.target.value
  })

}
 async function savaddress(){

  await axios.post("http://localhost:3001/api/auth/addressadd",{
     ...form,
     userId
    })
  alert("address saved")
  }
  return(
  <div>
{Object.keys(form).map((key)=> {
  return (
  <input type="text" key ={key} 
  name ={key}
  placeholder={key}
  onChange={handlechange}
  className = "w-full bg-amber-700"
  
  />
  )
})}

  <button onClick={

    
  ()=>{
   savaddress()
   navigate("/addresscheck") 
  }

  }
        
  >submit</button>

   </div>



)

}