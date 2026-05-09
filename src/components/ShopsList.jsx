import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";

export function ShopsList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedUser } = location.state || {};

  const [shopsList, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newShopName, setNewShopName] = useState("");

 


  useEffect(() => {
    console.log('Use effect');
    // Referencia a la colección de tiendas
    const shopsRef = collection(db, 'shops');

    // Escucha los cambios en tiempo real

    // Si estás usando Firestore, usa esto en su lugar:
     const unsubscribe = onSnapshot(shopsRef, (snapshot) => {
      const updatedShops = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          owner: data.owner || '',
          image: data.image || '',
          productCount: Array.isArray(data.products) ? data.products.length : 0,
        };
      });
      console.log(updatedShops);
       setShops(updatedShops);
       setLoading(false);

     },
      (error) => {
      console.error("Error fetching shops:", error);
      setLoading(false);
    });
    //Limpieza al desmontar el componente
    return () => unsubscribe();

  }, []);


  const handleShopClick = (shop) => {
    navigate(`/shops/${shop.name}`, { state: { shop, loggedUser } });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newShopName.trim()) return;

    try {
      const shopsCollection = collection(db, "shops");
      await addDoc(shopsCollection, {
        name: newShopName,
        owner: loggedUser || "test",
        image: "",
        products: [],
      });
      setNewShopName("");
    } catch (error) {
      console.error("Error adding shop:", error);
    }
  };

 
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando tiendas...</div>;
  }
  return (
    <div>
      <h5 className="header center">Tiendas</h5>
      <ul className="collection">
        {shopsList.map((shop) => (
          <li
            key={shop.id}
            onClick={() => handleShopClick(shop)}
            className="collection-item row"
          >
            <p className="flow-text col s10">{shop.name}</p>
            <p className="flow-text col s2">{shop.productCount}</p>
          </li>
        ))}
      </ul>
      <div className="row">
        <div className="input-field col s8">
          <input
            id="new-shop"
            type="text"
            className="validate"
            value={newShopName}
            onChange={(e) => setNewShopName(e.target.value)}
          />
          <label htmlFor="new-shop">Nueva tienda</label>
        </div>
        <div className="input-field col s4">
          <a className="waves-effect waves-light btn-large ">
            <i onClick={handleSubmit} className="material-icons ">
              add_circle
            </i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ShopsList;
