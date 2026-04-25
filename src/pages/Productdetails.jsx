import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function Productdetails(){


   const {id} = useParams()

   const [products,setproducts]= useState([])

  async function loadproducts(){

 const response =  await axios.get("http://localhost:3001/api/auth/getpd")
       const Pd = response.data.products.find((p) =>p._id === id)
       setproducts(Pd)
   }

useEffect(()=>{
 loadproducts()
},[])

 return(
   <div className ="p-6">
  <img src={products.image} alt={products.title} />
  <h1 className="text-2xl">{products.title}</h1>
  <p>{products.description}</p>

<button className=" border-2 rounded-2xl p-2">add to cart</button>

   </div>
   )
}