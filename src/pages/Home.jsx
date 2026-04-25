import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState ,useEffect} from 'react'
export default function Home() {

  const navigate = useNavigate()
   const [products,setProducts] = useState([])
   const [search ,setsearch] = useState("")
   const [category,setcategory] = useState("")

  async function loadproducts(){
  try {
   const res =  await axios.get(`http://localhost:3001/api/auth/getpd?search=${search}&category=${category}`)
     setProducts(res.data.products)
  }catch(error){
    console.log("erroe",error)
  }
  }
   useEffect(()=>{
    loadproducts()
   },[search,category])

const addTocart = async(productId) => {
const userId = localStorage.getItem("userId");

if(!userId){
 alert("please log in to add itmms to your card")
  return
}
const res = await axios.post("http://localhost:3001/api/auth/cart",{productId,userId})
    console.log(res.data.card)
const total = res.data.card?.items?.reduce(
   (sum,item) => sum + item.productId.price * item.quantity,0)
   localStorage.setItem("cartcount",total);
  //window.dispatchEvent(new Event("cartupdated"))
  navigate("/cart")
}
       return (
       <div>
       
         <div> Welcome to Home</div>
      {/* search*/}
   
<input type="text"
 placeholder='search operators'
 value={search}
 onChange={(e)=>{
  setsearch(e.target.value)
 }}
 className = "w-100 h-20 border-2"
/>



 {/* category  */}
   <select name="" id=""
     value={category}
     onChange={(e)=>{
      setcategory(e.target.value)
     }}
   >
<option value="">all category</option>
<option value="white">white</option>
<option value="black">black</option>

</select>
<div className="grid grid-cols-3 gap-4">
{/*product grinding */}

{products.map((product) => {
 return (

    <div key={product._id} className="border p-3">
  <Link  
  to={`/products/${product._id}`}
  className="border p-3 "  
  >
  <img src={product.image}
   alt={product.title} 
  className="w-80 h-10"
  />
  <h2 className="">{product.title}</h2>
  <p>{product.price}</p>
 </Link> 
      
       <button onClick ={() => addTocart(product._id) }
           className="mt-2 w-full bg-blue-500"
           
          >add to cart</button>
       </div>
 )
 
       })
      }
      
    </div>
     </div>
    
    
    )  
    }
      
    