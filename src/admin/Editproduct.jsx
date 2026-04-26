import { useNavigate, useParams } from "react-router-dom";
import { useState ,useEffect } from "react";
import axios from "axios";

export default function EditProduct(){

const { id } = useParams()
const navigate  = useNavigate()
const [form , setform] = useState({
"title":"",  "price":"","description":"","category":"",  "images":"", "stock":""
  
})
const allowfields=["title","price","description","category","images","stock"]

 async function loadproduct(){

const res = await axios.get("http://localhost:3001/api/auth/getpd")
console.log(res.data)
const product = res.data.products.find((p) => p._id.toString() === id.toString());
console.log(id)
setform(product)

}
 function handlechange(e){
    setform({
   ...form,
   [e.target.name]:e.target.value,
})
 }
useEffect(()=>{
    loadproduct()
},[])

async function handlesubmit(e){
    e.preventDefault()
   await axios.put(`https://ecommerce-backend-juke.onrender.com/api/auth/update/${id}`,form)

   navigate("/addlist")
}
return <div>
<h2>Edit submit</h2>
<form action="" onSubmit={handlesubmit}>

{Object.keys(form).map((key) => {
return(
allowfields.includes(key) &&
<input 
key={key}
name={key}
value={form[key]}
onChange ={handlechange}
placeholder={key} 
className ="w-30 h-5 border-2" />)
})
}
<button type="submit">update product</button>
</form></div>}