import { useEffect, useState } from "react";

import axios from "axios";
export default function Addresscheck(){

 const userId = localStorage.getItem("userId")
    const[address,setaddress] = useState([])
    const[cart, setcart] = useState(null)
  console.log(userId)
   async function loaditems(){
    
        const res = await axios.get(`http://localhost:3001/api/auth/getcard/${userId}`)
        console.log(res.data.cart)
        setcart(res.data.cart)
    
      const res1 = await axios.get(`http://localhost:3001/api/auth/getaddress/${userId}` )
        console.log(res1.data.addresss)
        setaddress(res1.data.addresss)
    }

    useEffect(() => {
              
        loaditems()

    } ,[userId])

    if(!cart){
        
        return <div>...loading</div>
    }

    const total = cart.items?.reduce(

   (sum,item)=> sum+item.quantity * item.productId.price,0)
    console.log(total)
    
    return(
   <div className ="max-w-4xl mx-auto p-6">
   <h1 className="text-2xl font-bold mb-4" >checkout</h1>
   <h2 className="text-2xl font-bold mb-4" >checkout</h2>
   {
  address.map((addres) => (
       <div
      key={addres._id }
  className="border border-gray-300 rounded p-4"
    >
    <p>{addres.fullname}</p>
     <p>{addres.addressline},{addres.city},{addres.state} - {addres.pincode}</p>
<p>{addres.phone}</p>
      
      </div>
       
  )
) }
<h2>ordre summary</h2>
<p>total amount : rupee{total}</p>

<button>place order</button>
   </div>




    )

}