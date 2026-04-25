import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { tr } from "zod/locales";
import axios from "axios";


 export default function Productlist(){

  const [product,setproduct] = useState([])
  
  async function Loadproducts(){
      try{
    
     const response = await axios.get("http://localhost:3001/api/auth/getpd")
    console.log(response.data)
     setproduct(response.data.products)
  } catch(error){

   console.log("erroe",error)
  }
  }
async function Deletepd(id) {
    
  await axios.delete(`http://localhost:3001/api/auth/delete/${id}`)
  alert("product delelte succesfully");
Loadproducts()
}

useEffect(() => {

  Loadproducts()

}, [])

  return <div>


    <table>
 <thead>
    <tr>
<th>title</th>
<th>price</th>
<th>description</th>
<th>stock</th>
   </tr>
</thead>
<tbody>
{product.map((product) => {
  return(
   <tr key= {product._id} >
<td>{product.title}</td>
<td>{product.price}</td>
<td>{product.description}</td>
<td>{product.stock}</td>
<td>
<Link to={`/editlist/${product._id}`} >
edit
</Link>

</td>
<td>
<button onClick={
 ()=>{ Deletepd(product._id)
}}>
  delete
</button>

</td>
   </tr>
  )
 })}
</tbody>
</table>
  </div>

}