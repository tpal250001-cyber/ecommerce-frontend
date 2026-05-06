import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const userId = localStorage.getItem("userId");
  console.log(userId)
  const [cart, setCart] = useState(null);
  const navigate = useNavigate()

  const loadcart = async () => {
    if (!userId) return;
    const res = await axios.get(`https://ecommerce-backend-juke.onrender.com/api/auth/getcard/${userId}`)
    setCart(res.data.cart)
  }

  useEffect(() => {
    loadcart()
  }, [])

  const removeItem = async (productId) => {
    await axios.post(`https://ecommerce-backend-juke.onrender.com/api/auth/deleteitem`, { productId, userId })
    loadcart()
    //window.dispatchEvent(new Event("cartupdated"))
  }

  const updatepty = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId)
      return
    }
    await axios.post(`https://ecommerce-backend-juke.onrender.com/api/auth/updateqty`, { productId, userId, quantity })
    loadcart()
    //window.dispatchEvent(new Event("cartupdated"))
  }

  if (!cart || !cart.items) {
    return <div>you card is empty</div>
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity, 0
  )

 /* return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl">your cart</h1>

        {cart.items.length === 0 ? (
          <div>your cart is empty</div>
        ) : (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="flex items-center justify-between p-4 border rounded"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2>{item.productId.title}</h2>
                    <p>{item.productId.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updatepty(item.productId._id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >-</button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updatepty(item.productId._id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >+</button>
                </div>

                <div>
                  <p className="font-semibold">
                    {(item.productId.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="text-red-500"
                >remove</button>
             
              <button onClick = {()=>{
                   navigate('/address')
                   }}>procced to cart</button>
              </div>
            ))}
          </div>
        )}

        <div className="text-right mt-4">
          <h2 className="text-xl font-bold">Total : Rupee:{total.toFixed(2)}</h2>
        </div>
  
      </div>
    </div>
  )*/

return (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-4xl mx-auto px-6 py-8">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart 🛒</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.productId._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between gap-4">

                <div className="flex items-center gap-4">
                  <img src={item.productId.image} alt={item.productId.title}
                    className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <h2 className="font-semibold text-gray-800">{item.productId.title}</h2>
                    <p className="text-gray-500 text-sm">Rs. {item.productId.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => updatepty(item.productId._id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full font-bold transition">-</button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button onClick={() => updatepty(item.productId._id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full font-bold transition">+</button>
                </div>

                <p className="font-bold text-gray-800 w-24 text-right">
                  Rs. {(item.productId.price * item.quantity).toFixed(2)}
                </p>

                <button onClick={() => removeItem(item.productId._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition">
                  Remove
                </button>

              </div>
            ))}
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 text-lg">Total Amount</span>
              <span className="text-2xl font-bold text-blue-600">Rs. {total.toFixed(2)}</span>
            </div>
            <button onClick={() => navigate('/address')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition text-lg">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

    </div>
  </div>
)



  }