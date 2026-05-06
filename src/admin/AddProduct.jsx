import { useState } from "react";

import axios from "axios";
export default function CreateProduct(){
/*const [form,setform] = useState({

 
   title :"",
  price :"",
    description:"",
    category:"",
    images:"",
    stock:""



})*/

  const[title,settitle] = useState()
   const[price,setprice] = useState() 
   const[description,setdescription] = useState()
   const[category,setcategory] = useState()
    const[images,setimages] = useState()
    const[stock,setstock] = useState()
   
   

  //function OnhandleChange(e){

   //setform({
  //...form,
   //[e.target.name]:e.target.value,

  //})
  //}

   async function handlesubmit(e){
    
      e.preventDefault()
   
   const response =    await axios.post("https://ecommerce-backend-juke.onrender.com/api/auth/products",{
  title,
  price,
  description,
  category,
  images,
  stock
   

      })
     console.log(response.data.message)
  }

return <div>

    <h2>Create Product</h2>
  <form action="" className = "">
  <div className = "flex border-2 ">
   <input type="text" name="title"  
   placeholder="title"
   onChange={((e)=>{

       settitle(e.target.value)
   })}
      className= "w-50 h-5 border-2"
   />
   
    <input type="text" name="price" 
    placeholder="price"
   onChange={((e)=>{

       setprice(e.target.value)
   })}
      className= "w-50 h-5 border-2"
   />
    <input type="text" name="description"  
    placeholder="description"
   onChange={((e)=>{

       setdescription(e.target.value)
   })}
   className= "w-50 h-5 border-2"
     
   />
    <input type="text" name="category"  
    placeholder="category"
  
    onChange={((e)=>{

       setcategory(e.target.value)
   })}
   className= "w-50 h-5 border-2"
     
   />
    <input type="text" name="images" 
    placeholder="images"
   onChange={((e)=>{

       setimages(e.target.value)
   })}
   className= "w-50 h-5 border-2"
     
   />
    <input type="text" value="" name="stock"  
    placeholder="stock"
  
    onChange={((e)=>{

       setstock(e.target.value)})}
     className= "w-50 h-5 border-2"
     />
    
<button onClick= {handlesubmit}>submit</button>


</div>
  </form>




</div>



}




  
/*return <div>

<form action="">

  {Object.keys(form).map((key)  =>{
    <input
      key={key}
      name={key}
      value={form[key]}
        onChange ={OnhandleChange}
        placeholder = {key}
        className= "w-full p-2 border-4 border-gray-500 rounded-2xl bg-amber-200"
       
  />
    
  } )}
   <input type="text"  className =" border-2 w-10   "/>
<button type="submit" onChange={handlesubmit} >add product</button>

</form>
  



</div>

}*/

