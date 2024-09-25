import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams, Link } from "react-router-dom"; 
import { db } from "../firebase";
import { useCart } from "../context/CartContext";
import './ItemListContainer.css';

function ItemListContainer() {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let q;
        if (categoryId) {
          q = query(collection(db, "items"), where("categoryId", "==", categoryId));
        } else {
          q = query(collection(db, "items"));
        }

        const querySnapshot = await getDocs(q);
        const fetchedItems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [categoryId]);

  const handleAddToCart = (item) => {
    addToCart(item, 1);
  };

  return (
    <div className="item-list-container">
      {loading ? (
        <p> Cargando... </p>
      ) : (
        <ul>
          {items.length > 0 ? (
            items.map(item => (
              <li key={item.id} className="item-list-item">
                <div className="item-card">
                  <Link to={`/item/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-info">
                      <h2> {item.name} </h2>
                      <p> ${item.price} </p>
                    </div>
                  </Link>
                  <button onClick={() => handleAddToCart(item)}> Agregar al carrito </button>
                </div>
              </li>
            ))
          ) : (
            <p> ¡Acá no hay nada todavía! </p>
          )}
        </ul>
      )}
    </div>
  );
}

export default ItemListContainer;