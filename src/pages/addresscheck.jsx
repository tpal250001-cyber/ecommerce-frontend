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
    
   /* return(
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




    )*/
   return (
  <div className="max-w-2xl mx-auto p-3">
    <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">
      Checkout
    </h1>

    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Delivery Address</h2>
      <div className="grid grid-cols-1 gap-4">
        {address.map((addres) => (
          <div
            key={addres._id}
            className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-400 transition-all duration-200 bg-white shadow-sm"
          >
            <p className="font-bold text-gray-800 text-lg">{addres.fullname}</p>
            <p className="text-gray-600 mt-1">
              {addres.addressline}, {addres.city}, {addres.state} - {addres.pincode}
            </p>
            <p className="text-gray-500 mt-2 flex items-center gap-1">
              📞 {addres.phone}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
      <div className="flex justify-between items-center py-3 border-t border-gray-200">
        <span className="text-gray-600">Total Amount</span>
        <span className="text-2xl font-bold text-blue-600">₹{total}</span>
      </div>
    </div>

    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 text-lg shadow-md hover:shadow-lg">
      Place Order(COD)
    </button>
  </div>
);

}