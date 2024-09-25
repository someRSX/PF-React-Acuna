import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"; 
import './cart.css';

function Cart() {
  const { cart, updateCartItemQuantity } = useCart();
  
  const handleQuantityChange = (itemId, newQuantity) => {
    updateCartItemQuantity(itemId, newQuantity);
  };

  if (cart.length === 0) {
    return <p>No hay productos en el carrito.</p>;
  }

  return (
    <div className="cart-container">
      <h2> Contenido del Carrito </h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} style={{ width: '50px' }} />
            <h3>{item.name}</h3>
            <p> Precio: ${item.price} </p>
            <label>
              Cantidad:
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                style={{ width: '50px', marginLeft: '10px' }}
              />
            </label>
            <p> Total por este producto: ${item.price * item.quantity} </p>
          </li>
        ))}
      </ul>
      <Link to="/checkout">
        <button> Ir al Checkout </button>
      </Link>
    </div>
  );
}

export default Cart;