import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import './Checkout.css';

function Checkout() {
  const { cart } = useCart();
  const [buyer, setBuyer] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    confirmEmail: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState("");
  
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const handleInputChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (buyer.email !== buyer.confirmEmail) {
      setError("Los correos electrónicos no coinciden");
      return;
    }

    const order = {
      buyer,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalAmount,
      date: Timestamp.fromDate(new Date()),
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);
    } catch (error) {
      console.error("Error al agregar la orden: ", error);
    }
  };

  return (
    <div>
      <h2> Checkout </h2>
      {orderId ? (
        <p> ¡Gracias por tu compra! El ID de tu orden es: {orderId} </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3> Detalles del carrito </h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - Cantidad: {item.quantity} - Precio: ${item.price}
              </li>
            ))}
          </ul>
          <h4> Total: ${totalAmount} </h4>

          <h3> Información del comprador </h3>
          <input
            type="text"
            name="firstName"
            placeholder="Nombre"
            value={buyer.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={buyer.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={buyer.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={buyer.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="confirmEmail"
            placeholder="Confirmar correo electrónico"
            value={buyer.confirmEmail}
            onChange={handleInputChange}
            required
          />
          
          {error && <p style={{ color: "red" }}>{error}</p>}
          
          <button type="submit"> Finalizar compra </button>
        </form>
      )}
    </div>
  );
}

export default Checkout;