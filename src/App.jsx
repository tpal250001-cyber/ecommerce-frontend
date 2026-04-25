import './App.css'
import Signup from './pages/signup' 
import Signin from './pages/signin'
import Home from  './pages/Home'
import { BrowserRouter,Routes,Route, createBrowserRouter, Outlet, RouterProvider} from "react-router-dom"
import CreateProduct from './admin/AddProduct'
import Productlist from './admin/Productlist'
import EditProduct from './admin/Editproduct'
import Productdetails from './pages/Productdetails'
import  Navbar  from './components/Nvabar'
import { Cart } from './pages/cart'
 function Layout(){
return(
  <div>
 <Navbar />,
 <Outlet />
 </div>
)}
const router = createBrowserRouter([
{
  path:"/",
  element :<Layout />,
  children :[
{path:"/signup" , element:<Signup />  },
    { path:"/signin",  element:<Signin />  },
    { path :"/home", element :<Home /> },
   {  path : "/add" , element : <CreateProduct />  },
    {  path : "/addlist" , element : <Productlist />  },
    {  path : "/editlist/:id"  ,element : <EditProduct/> },
    {  path : "/products/:id" , element :<Productdetails />  },
    {  path : "/cart" , element :<Cart />  }
 ]
}  ])
export default function App(){

return <RouterProvider router={router}  />
}
/*function App() {
 

  
  return (
   
   <BrowserRouter>
   <Routes>
  <Route path="/signup"  element={<Signup />} />
    <Route path="/signin"  element={<Signin />} />
    <Route path ="/home" element ={<Home />} />
    <Route path = "/add"  element = {<CreateProduct />}  />
     <Route path = "/addlist"  element = {<Productlist />}  />
     <Route path = "/editlist/:id"  element = {<EditProduct/>} />
     <Route path = "/products/:id"  element ={<Productdetails />} />
   </Routes>

    </BrowserRouter>
  
  )
}*/