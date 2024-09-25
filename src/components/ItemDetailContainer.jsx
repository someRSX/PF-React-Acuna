import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";
import './ItemDetailContainer.css';

function ItemDetailContainer() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "items", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    if (item) {
      addToCart(item, quantity);
    }
  };

  if (loading) return <p> Cargando... </p>;
  if (!item) return <p> No se ha encontrado nada. </p>;

  return (
    <div className="item-detail-container">
      <img src={item.image} alt={item.name} className="item-detail-image" />
      <h2>{item.name}</h2>
      <p>${item.price}</p>
      <p>{item.description}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
      />
      <button onClick={handleAddToCart}> Agregar al carrito </button>
    </div>
  );
}

export default ItemDetailContainer;