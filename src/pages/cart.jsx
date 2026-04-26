import axios from "axios";
import { useState, useEffect } from "react";

export function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);

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
    return <div>...loading</div>
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity, 0
  )

  return (
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
              </div>
            ))}
          </div>
        )}

        <div className="text-right mt-4">
          <h2 className="text-xl font-bold">Total : ${total.toFixed(2)}</h2>
        </div>

      </div>
    </div>
  )
}