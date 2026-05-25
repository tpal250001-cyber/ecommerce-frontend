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
    
   const res =  await axios.get(`https://ecommerce-backend-juke.onrender.com/api/auth/getpd?search=${search}&category=${category}`)
     setProducts(res.data.products)

    
  }catch(error){
    console.log("error",error)
  }
  }
   useEffect(()=>{
    loadproducts()
   },[search,category])
   if(!products){
    return <div>
      ...loading
    </div>
   }

const addTocart = async(productId) => {
const userId = localStorage.getItem("userId");

if(!userId){
 alert("Please Login to Add items in Card")
  return
}
const res = await axios.post("https://ecommerce-backend-juke.onrender.com/api/auth/cart",{productId,userId})
    console.log(res.data.card)
const total = res.data.card?.items?.reduce(
   (sum,item) => sum + item.productId.price * item.quantity,0)
   localStorage.setItem("cartcount",total);
  //window.dispatchEvent(new Event("cartupdated"))
  navigate("/cart")
}
     /* return (
      <div>
       
         <div> Welcome to Home</div>
      {/* search*///}
   
//<input type="text"
 //placeholder='search operators'
 //value={search}
 //onChange={(e)=>{
 // setsearch(e.target.value)
// }}
 //className = "w-100 h-20 border-2"
///>



 //{/* category  */}
 //<select name="" id=""
   //  value={category}
    // onChange={(e)=>{
    //  setcategory(e.target.value)
     //}}
  // >
//<option value="">all category</option>
//<option value="white">white</option>
//<option value="black">black</option>

//</select>
//<div className="grid grid-cols-3 gap-4">
//{/*product grinding */}

//{products.map((product) => {
 /*return (

    <div key={product._id} className="border p-3">
  <Link  
  to={`/products/${product._id}`}
  className="border p-3 "  
  >
  <img src={product.images}
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
    
    
)  */
 
   if(!products){
  return (
   <div>...loading</div>

  )
   }
   
   return (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto px-6 py-8">

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Welcome to Home
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setcategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Category</option>
          <option value="white">White</option>
          <option value="black">Black</option>
        </select>
      </div>


  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
            <Link to={`/products/${product._id}`}>
              <img
                src={product.images}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                <p className="text-blue-600 font-bold text-xl mt-1">Rs. {product.price}</p>
              </div>
            </Link>
            <div className="px-4 pb-4">
              <button
                onClick={() => addTocart(product._id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
)
  }




  