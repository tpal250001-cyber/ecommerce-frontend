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
  /*return(
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



)*/


return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8">

      <h2 className="text-2xl font-bold text-gray-800 mb-2">Delivery Address</h2>
      <p className="text-gray-500 text-sm mb-6">Enter your shipping details below</p>

      <div className="space-y-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key}
            onChange={handlechange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        ))}
      </div>

      <button
        onClick={() => { savaddress(); navigate('/addresscheck') }}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition text-lg"
      >
        Save & Continue
      </button>

    </div>
  </div>
)



}